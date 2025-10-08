import { getVeraUiLatestVersion } from '@/lib/get-version';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const version = await getVeraUiLatestVersion();
    return NextResponse.json({ version });
  } catch (error) {
    return NextResponse.json({ version: '1.0.0' }, { status: 500 });
  }
}
