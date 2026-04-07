# Study Platform MVP (Next.js + Supabase)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then update values in `.env.local` with your Supabase project credentials.
3. Create DB tables by running SQL in `supabase/schema.sql` in the Supabase SQL editor.
4. Start app:
   ```bash
   npm run dev
   ```

## Features

- Notes feed
- Note file upload to Supabase Storage
- Attendance marking (Present/Absent)
- Discussion board
