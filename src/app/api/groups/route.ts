import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const status = searchParams.get('status');
    const carId = searchParams.get('carId');

    let groups = dataStore.getGroups();

    if (district && district !== 'ALL') {
      groups = groups.filter(g => g.district === district);
    }
    if (status && status !== 'ALL') {
      groups = groups.filter(g => g.status === status);
    }
    if (carId && carId !== 'ALL') {
      groups = groups.filter(g => g.carId === carId);
    }

    return NextResponse.json({ success: true, count: groups.length, data: groups });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.carId || !body.district || !body.creatorName) {
      return NextResponse.json({ success: false, error: 'Missing required group parameters' }, { status: 400 });
    }

    const newGroup = dataStore.createGroup(body);
    return NextResponse.json({ success: true, data: newGroup }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
