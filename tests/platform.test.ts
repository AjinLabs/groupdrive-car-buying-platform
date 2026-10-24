import test from 'node:test';
import assert from 'node:assert';
import { calculateKeralaRoadTax, calculateTCS, getKeralaOnRoadBreakdown, formatCurrencyINR } from '../src/lib/kerala-tax';
import { dataStore } from '../src/lib/data-store';
import { analyzeQuotationsDeterministically } from '../src/lib/ai-intelligence';

test('Kerala Road Tax Engine: calculates correct tax slabs', () => {
  // Slab 1: <= 5 Lakhs (9%)
  const tax4L = calculateKeralaRoadTax(400000, 'PETROL');
  assert.strictEqual(tax4L.slabPercentage, 9);
  assert.strictEqual(tax4L.roadTax, 36000);

  // Slab 2: 5L - 10L (11%)
  const tax8L = calculateKeralaRoadTax(800000, 'PETROL');
  assert.strictEqual(tax8L.slabPercentage, 11);
  assert.strictEqual(tax8L.roadTax, 88000);

  // Slab 3: 10L - 15L (13%)
  const tax12L = calculateKeralaRoadTax(1200000, 'PETROL');
  assert.strictEqual(tax12L.slabPercentage, 13);
  assert.strictEqual(tax12L.roadTax, 156000);

  // Slab 4: 15L - 20L (16%)
  const tax18L = calculateKeralaRoadTax(1800000, 'PETROL');
  assert.strictEqual(tax18L.slabPercentage, 16);
  assert.strictEqual(tax18L.roadTax, 288000);

  // Slab 5: > 20 Lakhs (21%)
  const tax25L = calculateKeralaRoadTax(2500000, 'PETROL');
  assert.strictEqual(tax25L.slabPercentage, 21);
  assert.strictEqual(tax25L.roadTax, 525000);

  // EV Special: Flat 5% concession in Kerala
  const taxEV = calculateKeralaRoadTax(1800000, 'EV');
  assert.strictEqual(taxEV.slabPercentage, 5);
  assert.strictEqual(taxEV.roadTax, 90000);
});

test('TCS Calculation: 1% applies only on vehicles exceeding ₹10,00,000', () => {
  assert.strictEqual(calculateTCS(950000), 0);
  assert.strictEqual(calculateTCS(1000000), 0);
  assert.strictEqual(calculateTCS(1000001), 10000);
  assert.strictEqual(calculateTCS(2015000), 20150);
});

test('Currency Formatter: Formats Indian Rupee in Lakhs and formatted numbers', () => {
  assert.strictEqual(formatCurrencyINR(2015000, true), '₹20.15 Lakh');
  assert.strictEqual(formatCurrencyINR(2015000, false), '₹20,15,000');
});

test('Buyer Group Management: Prevents duplicate membership', () => {
  const groups = dataStore.getGroups();
  const targetGroup = groups[0];
  const initialCount = targetGroup.currentMembers;

  const joinAttempt1 = dataStore.joinGroup(targetGroup.id, {
    userName: 'Unique Test User ' + Date.now(),
    userPhone: '+91 99999 11111',
    district: 'Ernakulam (Kochi)',
    selectedVariantId: targetGroup.targetVariantId || 'var-default',
    targetBudget: 2500000,
    preferredPurchaseTimeline: 'Within 15 days',
    needFinance: true,
    needExchange: false
  });

  assert.strictEqual(joinAttempt1.success, true);
  assert.strictEqual(targetGroup.currentMembers, initialCount + 1);

  // Duplicate join attempt with same user name or phone
  const joinAttempt2 = dataStore.joinGroup(targetGroup.id, {
    userName: joinAttempt1.group!.members[joinAttempt1.group!.members.length - 1].userName,
    userPhone: '+91 99999 11111',
    district: 'Ernakulam (Kochi)',
    selectedVariantId: targetGroup.targetVariantId || 'var-default',
    targetBudget: 2500000,
    preferredPurchaseTimeline: 'Within 15 days',
    needFinance: true,
    needExchange: false
  });

  assert.strictEqual(joinAttempt2.success, false);
  assert.ok(joinAttempt2.error?.includes('already an active member'));
});

test('AI Deal Intelligence: Flags unapproved handling fees and missing RTI', () => {
  const quotes = dataStore.getQuotesByGroupId('grp-creta-kochi-01');
  assert.ok(quotes.length >= 2);

  const analysis = analyzeQuotationsDeterministically(quotes);
  assert.ok(analysis.bestValueQuoteId.length > 0);
  assert.ok(analysis.identifiedFlags.some(f => f.flagEn.includes('Handling/Logistics')));
  assert.ok(analysis.negotiationQuestionsEn.length > 0);
  assert.ok(analysis.negotiationQuestionsMl.length > 0);
});
