import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q')?.toLowerCase();
    const fuel = searchParams.get('fuel');
    const body = searchParams.get('body');
    const maxBudget = searchParams.get('budget') ? Number(searchParams.get('budget')) : null;

    let cars = dataStore.getCars();

    if (search) {
      cars = cars.filter(c => 
        c.make.toLowerCase().includes(search) || 
        c.model.toLowerCase().includes(search)
      );
    }
    if (fuel && fuel !== 'ALL') {
      cars = cars.filter(c => c.fuelOptions.includes(fuel as any));
    }
    if (body && body !== 'ALL') {
      cars = cars.filter(c => c.bodyType === body);
    }
    if (maxBudget) {
      cars = cars.filter(c => c.startingPrice <= maxBudget);
    }

    return NextResponse.json({ success: true, count: cars.length, data: cars });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
