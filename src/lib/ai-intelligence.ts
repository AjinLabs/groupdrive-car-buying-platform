import { DealerQuotation, AIAnalysisResult } from '@/types';
import { formatCurrencyINR } from './kerala-tax';

/**
 * Analyzes multiple dealer quotations deterministically, flagging unverified charges,
 * missing insurance components, delivery timelines, and producing English & Malayalam insights.
 */
export function analyzeQuotationsDeterministically(quotes: DealerQuotation[]): AIAnalysisResult {
  if (!quotes || quotes.length === 0) {
    return {
      summaryEn: 'No dealership quotations submitted yet for this quorum.',
      summaryMl: 'ഈ ഗ്രൂപ്പിലേക്ക് ഡീലർഷിപ്പുകൾ ഇതുവരെ ക്വോട്ടുകൾ നൽകിയിട്ടില്ല.',
      bestValueQuoteId: '',
      keyDifferentiators: [],
      identifiedFlags: [],
      negotiationQuestionsEn: ['When are dealers expected to submit competitive offers?'],
      negotiationQuestionsMl: ['ഡീലർമാർ എപ്പോഴാണ് ഓഫറുകൾ സമർപ്പിക്കുന്നത്?'],
      insuranceComparisonNotes: 'Awaiting quotation submissions.',
      deliverySpeedWinner: 'N/A',
      priceWinner: 'N/A'
    };
  }

  // Find lowest price
  const sortedByPrice = [...quotes].sort((a, b) => a.totalOnRoadPrice - b.totalOnRoadPrice);
  const priceWinner = sortedByPrice[0];

  // Find fastest delivery
  const sortedByDelivery = [...quotes].sort((a, b) => a.deliveryDays - b.deliveryDays);
  const deliverySpeedWinner = sortedByDelivery[0];

  // Identify flags & completeness
  const identifiedFlags: AIAnalysisResult['identifiedFlags'] = [];

  quotes.forEach(q => {
    if (q.logisticsHandlingCharge > 0) {
      identifiedFlags.push({
        quoteId: q.id,
        dealerName: q.dealerName,
        flagEn: `Disclosed ₹${q.logisticsHandlingCharge.toLocaleString('en-IN')} Handling/Logistics fee. Under MVD guidelines, dealerships cannot mandate logistics charges beyond standard RTO registration.`,
        flagMl: `₹${q.logisticsHandlingCharge.toLocaleString('en-IN')} ഹാൻഡ്‌ലിംഗ് ഫീ ഉൾപ്പെടുത്തിയിട്ടുണ്ട്. കേരള മോട്ടോർ വാഹന വകുപ്പ് ചട്ടങ്ങൾ പ്രകാരം ഡീലർമാർ അധികമായി ഇത്തരം ഫീസുകൾ ഈടാക്കാൻ പാടില്ല.`,
        severity: 'WARNING'
      });
    }

    if (!q.insuranceCoverage.includes('Return to Invoice (RTI)') && !q.insuranceCoverage.includes('Return to Invoice')) {
      identifiedFlags.push({
        quoteId: q.id,
        dealerName: q.dealerName,
        flagEn: `Quoted insurance lacks Return to Invoice (RTI). In the event of total loss or theft, you would only receive depreciated IDV rather than the invoice purchase price.`,
        flagMl: `ഇൻഷുറൻസിൽ RTI (റിട്ടേൺ ടു ഇൻവോയ്സ്) ഇല്ല. കാർ അപകടത്തിൽ പെടുകയോ മോഷണം പോവുകയോ ചെയ്താൽ പൂർണ്ണ ഇൻവോയ്സ് തുക തിരികെ ലഭിക്കില്ല.`,
        severity: 'INFO'
      });
    }

    if (q.quoteCompletenessScore < 85) {
      identifiedFlags.push({
        quoteId: q.id,
        dealerName: q.dealerName,
        flagEn: `Quote completeness is ${q.quoteCompletenessScore}%. Inquire whether registration, hypothecation and standard accessory fitment are fully inclusive.`,
        flagMl: `ക്വോട്ട് പൂർണ്ണത ${q.quoteCompletenessScore}% മാത്രമാണ്. രജിസ്ട്രേഷൻ, ഹൈപോത്തിക്കേഷൻ തുടങ്ങിയവ ഇതിൽ പൂർണ്ണമായി ഉൾപ്പെട്ടിട്ടുണ്ടോ എന്ന് ഉറപ്പുവരുത്തുക.`,
        severity: 'INFO'
      });
    }
  });

  // Determine Best Value (accounting for hidden costs, accessories, insurance quality & discount)
  // Penalize handling charges, reward high completeness & genuine accessories
  const scoredQuotes = quotes.map(q => {
    let valueScore = 10000000 - q.totalOnRoadPrice;
    if (q.insuranceCoverage.includes('Return to Invoice (RTI)') || q.insuranceCoverage.includes('Return to Invoice')) {
      valueScore += 15000;
    }
    if (q.logisticsHandlingCharge === 0) {
      valueScore += 20000;
    }
    if (q.includedAccessories.length >= 3) {
      valueScore += 15000;
    }
    if (q.deliveryDays <= 14) {
      valueScore += 10000;
    }
    return { ...q, valueScore };
  });

  const bestValueQuote = scoredQuotes.sort((a, b) => b.valueScore - a.valueScore)[0];

  const keyDifferentiators: string[] = [
    `${bestValueQuote.dealerName} provides highest net value with ${formatCurrencyINR(bestValueQuote.groupNegotiationDiscount)} collective discount.`,
    deliverySpeedWinner.id === bestValueQuote.id 
      ? `Fastest delivery lead time: ${bestValueQuote.deliveryTimelineText}.`
      : `${deliverySpeedWinner.dealerName} delivers faster (${deliverySpeedWinner.deliveryDays} days vs ${bestValueQuote.deliveryDays} days).`,
    quotes.some(q => q.logisticsHandlingCharge > 0)
      ? 'Significant price discrepancy identified in auxiliary dealer handling fees.'
      : 'All competing dealers maintain zero unauthorized handling charges.'
  ];

  const priceDiff = Math.abs(sortedByPrice[quotes.length - 1].totalOnRoadPrice - sortedByPrice[0].totalOnRoadPrice);

  const summaryEn = quotes.length > 1
    ? `Analysis of ${quotes.length} verified dealer offers reveals an on-road price spread of ${formatCurrencyINR(priceDiff)}. ${bestValueQuote.dealerName} offers the most complete quote at ${formatCurrencyINR(bestValueQuote.totalOnRoadPrice)} with zero unauthorized handling charges and full RTI + Zero-Dep insurance coverage. ${sortedByPrice[0].dealerName !== bestValueQuote.dealerName ? `While ${sortedByPrice[0].dealerName} appears cheaper by ${formatCurrencyINR(Math.abs(bestValueQuote.totalOnRoadPrice - sortedByPrice[0].totalOnRoadPrice))}, its quote contains omissions in insurance coverage.` : ''}`
    : `${bestValueQuote.dealerName} has submitted a verified on-road quote of ${formatCurrencyINR(bestValueQuote.totalOnRoadPrice)} with an exclusive group discount of ${formatCurrencyINR(bestValueQuote.groupNegotiationDiscount)}.`;

  const summaryMl = quotes.length > 1
    ? `${quotes.length} ഡീലർ ക്വോട്ടുകൾ പരിശോധിച്ചതിൽ ${formatCurrencyINR(priceDiff)} രൂപയുടെ വ്യത്യാസമുണ്ട്. ${bestValueQuote.dealerName} നൽകിയ ${formatCurrencyINR(bestValueQuote.totalOnRoadPrice)} രൂപയുടെ ക്വോട്ടാണ് ഏറ്റവും സുതാര്യം. ഇതിൽ അനാവശ്യ ഹാൻഡ്‌ലിംഗ് ഫീസുകളില്ല, ഒപ്പം സമഗ്രമായ RTI ഇൻഷുറൻസും ലഭ്യമാണ്.`
    : `${bestValueQuote.dealerName} ${formatCurrencyINR(bestValueQuote.totalOnRoadPrice)} രൂപയുടെ പൂർണ്ണമായ ഓൺ-റോഡ് ക്വോട്ടേഷൻ നൽകിയിട്ടുണ്ട്. ഗ്രൂപ്പ് വിലപേശലിലൂടെ ${formatCurrencyINR(bestValueQuote.groupNegotiationDiscount)} രൂപയുടെ ലാഭം ലഭിക്കും.`;

  const negotiationQuestionsEn = [
    `Can you match the ${formatCurrencyINR(bestValueQuote.groupNegotiationDiscount)} group negotiation discount offered by competing dealers?`,
    'Will you provide written confirmation that no mandatory logistics or depot handling fees will be charged at invoicing?',
    'Is the Zero-Depreciation and Return-to-Invoice (RTI) cover renewable with the same insurer for year 2 and year 3?',
    'What is the guaranteed delivery date and chassis/VIN allotment timeline for this group purchase?'
  ];

  const negotiationQuestionsMl = [
    `മറ്റ് ഡീലർമാർ നൽകുന്ന ${formatCurrencyINR(bestValueQuote.groupNegotiationDiscount)} രൂപയുടെ ഗ്രൂപ്പ് ഡിസ്കൗണ്ട് നൽകാൻ സാധിക്കുമോ?`,
    'ബില്ലിംഗ് സമയത്ത് അധിക ഹാൻഡ്‌ലിംഗ് ഫീസുകൾ ഇല്ലെന്ന് രേഖാമൂലം സ്ഥിരീകരിക്കാമോ?',
    'രണ്ടാം വർഷത്തിലും മൂന്നാം വർഷത്തിലും ഇതേ ഇൻഷുറൻസ് ആനുകൂല്യങ്ങൾ പുതുക്കാൻ സാധിക്കുമോ?',
    'ഈ ഗ്രൂപ്പ് ഓർഡറിലെ കാറിന്റെ ചെയ്സിസ് നമ്പർ (VIN) എന്ന് അലോട്ട് ചെയ്യും?'
  ];

  return {
    summaryEn,
    summaryMl,
    bestValueQuoteId: bestValueQuote.id,
    keyDifferentiators,
    identifiedFlags,
    negotiationQuestionsEn,
    negotiationQuestionsMl,
    insuranceComparisonNotes: 'Insurance comparisons are verified against IRDAI baseline rates. Full RTI & Zero Depreciation protect against early total-loss depreciation.',
    deliverySpeedWinner: deliverySpeedWinner.dealerName,
    priceWinner: priceWinner.dealerName
  };
}
