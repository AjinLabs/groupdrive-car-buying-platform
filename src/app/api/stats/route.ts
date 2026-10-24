import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function GET() {
  try {
    const stats = dataStore.getPlatformStats();
    const demands = dataStore.getKeralaDemands();
    return NextResponse.json({ success: true, data: { stats, demands } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
