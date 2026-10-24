import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');

    if (groupId) {
      const quotes = dataStore.getQuotesByGroupId(groupId);
      return NextResponse.json({ success: true, count: quotes.length, data: quotes });
    }

    const allQuotes = dataStore.getQuotations();
    return NextResponse.json({ success: true, count: allQuotes.length, data: allQuotes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.groupId || !body.dealerId || !body.exShowroom) {
      return NextResponse.json({ success: false, error: 'Missing required quotation fields' }, { status: 400 });
    }

    const quote = dataStore.submitQuotation(body);
    return NextResponse.json({ success: true, data: quote }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
