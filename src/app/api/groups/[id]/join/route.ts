import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.userName || !body.userPhone) {
      return NextResponse.json({ success: false, error: 'User name and phone number required' }, { status: 400 });
    }

    const result = dataStore.joinGroup(id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.group });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
