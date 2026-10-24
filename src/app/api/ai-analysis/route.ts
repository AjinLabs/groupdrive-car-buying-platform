import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';
import { analyzeQuotationsDeterministically } from '@/lib/ai-intelligence';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { groupId } = body;

    if (!groupId) {
      return NextResponse.json({ success: false, error: 'Group ID is required' }, { status: 400 });
    }

    const quotes = dataStore.getQuotesByGroupId(groupId);
    const analysis = analyzeQuotationsDeterministically(quotes);

    return NextResponse.json({
      success: true,
      data: {
        groupId,
        totalQuotesAnalyzed: quotes.length,
        analysis,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
