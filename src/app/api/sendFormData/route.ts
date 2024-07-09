// pages/api/form.js

import { query } from '../../lib/db';

export default async function handler(req: { body?: any; method?: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: any; message?: string; }): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { name, email, message } = req.body;
        const result = await query(
          'INSERT INTO submissions(name, email, message) VALUES($1, $2, $3) RETURNING *',
          [name, email, message]
        );
        res.status(200).json({ success: true, data: result.rows[0] });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
