const { query } = require('../../lib/db');
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('log from sendFormData api route');

  const { firstname, lastname, email, message, phone } = await request.json();
  console.log(`API RETURNING firstname: ${firstname}, lastname: ${lastname}, email: ${email}, message: ${message}, and phone: ${phone}`)
  try {
    console.log('log from sendFormData api route try scope');
    // const { firstname, lastname, email, message, phone } = await request.json();

    console.log('Form Data:', { firstname, lastname, email, message, phone });

    const result = await query(
      'INSERT INTO privategp_schema.formdata (firstname, lastname, email, message, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstname, lastname, email, message, phone]
    );

    console.log('Database Insert Result:', result);

    return new NextResponse(JSON.stringify({ data: result.rows[0] }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    return new NextResponse(JSON.stringify({ error: 'Database insertion error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
