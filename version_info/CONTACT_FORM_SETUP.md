# Contact Form Setup Guide

## Problem
The contact forms (homepage and `/contact` page) are not working because Supabase Row Level Security (RLS) policies are not configured to allow public INSERT operations on the `contact_messages` table.

## Solution

### Quick Fix (Recommended)

1. **Go to your Supabase Dashboard**
   - Navigate to: https://app.supabase.com/project/YOUR_PROJECT_ID/editor

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar

3. **Run the RLS Setup Script**
   - Copy the contents of `supabase-rls-setup.sql`
   - Paste into the SQL Editor
   - Click "Run" or press Ctrl+Enter

4. **Verify the Policy**
   - Go to Authentication → Policies
   - Select the `contact_messages` table
   - You should see a policy named "Allow public insert on contact_messages"

### Manual Setup (Alternative)

If you prefer to set it up manually through the UI:

1. **Go to Authentication → Policies**
2. **Select `contact_messages` table**
3. **Click "New Policy"**
4. **Choose "For full customization" or "Create a custom policy"**
5. **Fill in:**
   - **Policy Name**: `Allow public insert on contact_messages`
   - **Policy Command**: `INSERT`
   - **Target Roles**: `public`
   - **USING expression**: Leave empty or use `true`
   - **WITH CHECK expression**: `true`
6. **Click "Review" then "Save"**

## Testing

### Option 1: Use the Test Page

1. Start the dev server:
   ```bash
   pnpm dev
   ```

2. Navigate to: http://localhost:3000/test-contact

3. Click "Test Connection & Insert"

4. Expected results:
   - ✅ Connection successful
   - ✅ Insert successful
   - If you see errors, they will indicate what's wrong

### Option 2: Test the Actual Forms

1. Go to http://localhost:3000/contact or http://localhost:3000/
2. Fill out the contact form
3. Submit
4. Check the browser console (F12) for any errors
5. Check your Supabase dashboard → Table Editor → contact_messages for new entries

## What Changed in the Code

### Fixed Issues:
1. ✅ Changed `status: "new"` to `status: "unread"` (matches database schema)
2. ✅ Removed manual `created_at` field (Supabase handles this automatically)
3. ✅ Added better error logging with detailed error messages
4. ✅ Added proper TypeScript error handling with `error?.message`

### Updated Files:
- `app/contact/page.tsx` - Contact page form
- `app/page.tsx` - Homepage contact form
- `app/test-contact/page.tsx` - NEW test page for debugging
- `supabase-rls-setup.sql` - NEW SQL script for RLS policies

## Database Schema

The `contact_messages` table has the following structure:

```typescript
{
  id: string                    // Auto-generated UUID
  name: string                  // Required
  email: string                 // Required
  subject: string | null        // Optional (null on homepage form)
  message: string               // Required
  phone: string | null          // Optional
  status: 'unread' | 'read' | 'replied' | 'archived'
  is_starred: boolean           // Optional
  replied_at: string | null     // Optional
  reply_message: string | null  // Optional
  ip_address: string | null     // Optional
  user_agent: string | null     // Optional
  metadata: object | null       // Optional
  created_at: string            // Auto-generated timestamp
}
```

## Troubleshooting

### Error: "new row violates row-level security policy"
**Solution**: Run the `supabase-rls-setup.sql` script in your Supabase SQL Editor.

### Error: "invalid input value for enum message_status"
**Solution**: This is already fixed. We changed `status: "new"` to `status: "unread"`.

### Error: "relation 'contact_messages' does not exist"
**Solution**: The table hasn't been created yet. Check your database migrations or create it manually.

### Form submits but no data appears
**Solution**: 
1. Check browser console for errors
2. Verify RLS policies are set up correctly
3. Use the test page at `/test-contact` to diagnose

### "Failed to send message" error
**Solution**: 
1. Check browser console for detailed error
2. Verify your `.env.local` has correct Supabase credentials
3. Ensure Supabase project is active and not paused

## Environment Variables

Ensure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: Supabase Dashboard → Settings → API

## Next Steps

After fixing the RLS policies:

1. ✅ Test both forms (homepage and contact page)
2. ✅ Verify messages appear in Supabase dashboard
3. ✅ Delete the test page (`app/test-contact/page.tsx`) - optional
4. ✅ Monitor the contact_messages table for real submissions
5. ✅ Consider adding email notifications for new messages (future enhancement)

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Check Supabase logs: Dashboard → Logs → API
3. Use the test page to get detailed diagnostic information
4. Verify your Supabase project is active and not paused
