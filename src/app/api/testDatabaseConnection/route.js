import { query } from '../../lib/db';

export async function GET(request) {
  try {
    const result = await query('SELECT * FROM privategp_schema.formdata LIMIT 1', []);
    return new Response(JSON.stringify({ data: result.rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return new Response(JSON.stringify({ error: 'Database connection error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
