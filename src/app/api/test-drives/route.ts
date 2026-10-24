import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function GET(request: Request) {
  try {
    const testDrives = dataStore.getTestDrives();
    return NextResponse.json({ success: true, count: testDrives.length, data: testDrives });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.carId || !body.dealerId || !body.userName || !body.userPhone) {
      return NextResponse.json({ success: false, error: 'Missing required test drive booking fields' }, { status: 400 });
    }

    const testDrive = dataStore.createTestDriveRequest(body);
    return NextResponse.json({ success: true, data: testDrive }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Test drive ID and target status required' }, { status: 400 });
    }

    const updated = dataStore.updateTestDriveStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Test drive request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
