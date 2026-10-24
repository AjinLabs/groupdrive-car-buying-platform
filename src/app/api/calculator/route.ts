import { NextResponse } from 'next/server';
import { getKeralaOnRoadBreakdown } from '@/lib/kerala-tax';
import { FuelType } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const exShowroom = Number(body.exShowroom || 0);
    const fuelType: FuelType = body.fuelType || 'PETROL';
    const includeZeroDep = body.includeZeroDep !== false;
    const includeRTI = body.includeRTI !== false;
    const includeEngineProtect = body.includeEngineProtect !== false;
    const includeAccessories = !!body.includeAccessories;

    const breakdown = getKeralaOnRoadBreakdown(exShowroom, fuelType, {
      includeZeroDep,
      includeRTI,
      includeEngineProtect,
      includeAccessories
    });

    return NextResponse.json({ success: true, data: breakdown });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
