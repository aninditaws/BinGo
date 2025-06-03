-- Setup Realtime Broadcast from Database for bins table
-- This script implements the Supabase Realtime Broadcast from Database feature

-- Step 1: Set up RLS policies for realtime.messages table
-- This allows authenticated users to receive broadcast messages
CREATE POLICY "Authenticated users can receive broadcasts"
ON "realtime"."messages"
FOR SELECT
TO authenticated
USING (true);

-- Step 2: Create function to handle bins table changes
-- This function will be called by triggers when bins table changes occur
CREATE OR REPLACE FUNCTION public.bins_realtime_changes()
RETURNS trigger
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Use realtime.broadcast_changes helper function to send structured payloads
  PERFORM realtime.broadcast_changes(
    'bins_changes', -- channel/topic name
    TG_OP, -- operation type (INSERT, UPDATE, DELETE)
    TG_OP, -- event name (same as operation)
    TG_TABLE_NAME, -- table name
    TG_TABLE_SCHEMA, -- schema name
    CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END, -- new record
    CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NULL END -- old record for updates/deletes
  );
  
  -- Return the appropriate record
  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$;

-- Step 3: Create triggers for INSERT, UPDATE, and DELETE operations
-- These triggers will fire after each operation on the bins table
DROP TRIGGER IF EXISTS bins_realtime_insert_trigger ON public.bins;
DROP TRIGGER IF EXISTS bins_realtime_update_trigger ON public.bins;
DROP TRIGGER IF EXISTS bins_realtime_delete_trigger ON public.bins;

-- INSERT trigger
CREATE TRIGGER bins_realtime_insert_trigger
  AFTER INSERT ON public.bins
  FOR EACH ROW
  EXECUTE FUNCTION public.bins_realtime_changes();

-- UPDATE trigger
CREATE TRIGGER bins_realtime_update_trigger
  AFTER UPDATE ON public.bins
  FOR EACH ROW
  EXECUTE FUNCTION public.bins_realtime_changes();

-- DELETE trigger
CREATE TRIGGER bins_realtime_delete_trigger
  AFTER DELETE ON public.bins
  FOR EACH ROW
  EXECUTE FUNCTION public.bins_realtime_changes();

-- Step 4: Optional - Create a more specific function for custom payloads
-- This function allows you to send only specific fields instead of the full record
CREATE OR REPLACE FUNCTION public.bins_custom_broadcast(
  operation_type TEXT,
  bin_data JSONB,
  user_id_param UUID DEFAULT NULL
)
RETURNS void
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Send custom payload with only the fields you want to broadcast
  PERFORM realtime.send(
    jsonb_build_object(
      'operation', operation_type,
      'user_id', COALESCE(user_id_param, (bin_data->>'user_id')::UUID),
      'bin_id', bin_data->>'id',
      'title', bin_data->>'title',
      'location', bin_data->>'location',
      'level_percentage', (bin_data->>'level_percentage')::INTEGER,
      'status', bin_data->>'status',
      'organik_status', bin_data->>'organik_status',
      'anorganik_status', bin_data->>'anorganik_status',
      'b3_status', bin_data->>'b3_status',
      'last_updated', bin_data->>'last_updated',
      'timestamp', extract(epoch from now())
    ), -- payload
    operation_type, -- event name
    'bins_changes', -- topic/channel
    false -- public flag (false = private, requires authentication)
  );
END;
$$;

-- Step 5: Create a trigger function that uses the custom broadcast function
-- This gives you more control over what data is sent in the payload
CREATE OR REPLACE FUNCTION public.bins_custom_realtime_changes()
RETURNS trigger
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Determine which record to use based on operation
  DECLARE
    record_to_send JSONB;
    user_id_to_send UUID;
  BEGIN
    CASE TG_OP
      WHEN 'INSERT' THEN
        record_to_send := to_jsonb(NEW);
        user_id_to_send := NEW.user_id;
      WHEN 'UPDATE' THEN
        record_to_send := to_jsonb(NEW);
        user_id_to_send := NEW.user_id;
      WHEN 'DELETE' THEN
        record_to_send := to_jsonb(OLD);
        user_id_to_send := OLD.user_id;
    END CASE;

    -- Send the custom broadcast
    PERFORM public.bins_custom_broadcast(
      TG_OP,
      record_to_send,
      user_id_to_send
    );

    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
  END;
END;
$$;

-- Step 6: Comment out the default triggers and create custom ones (optional)
-- Uncomment these lines if you want to use the custom broadcast function instead

/*
-- Drop the default triggers
DROP TRIGGER IF EXISTS bins_realtime_insert_trigger ON public.bins;
DROP TRIGGER IF EXISTS bins_realtime_update_trigger ON public.bins;
DROP TRIGGER IF EXISTS bins_realtime_delete_trigger ON public.bins;

-- Create custom triggers
CREATE TRIGGER bins_custom_realtime_insert_trigger
  AFTER INSERT ON public.bins
  FOR EACH ROW
  EXECUTE FUNCTION public.bins_custom_realtime_changes();

CREATE TRIGGER bins_custom_realtime_update_trigger
  AFTER UPDATE ON public.bins
  FOR EACH ROW
  EXECUTE FUNCTION public.bins_custom_realtime_changes();

CREATE TRIGGER bins_custom_realtime_delete_trigger
  AFTER DELETE ON public.bins
  FOR EACH ROW
  EXECUTE FUNCTION public.bins_custom_realtime_changes();
*/

-- Step 7: Create a function to manually test the broadcast functionality
CREATE OR REPLACE FUNCTION public.test_bins_broadcast()
RETURNS void
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Test sending a manual broadcast message
  PERFORM realtime.send(
    jsonb_build_object(
      'message', 'Test broadcast from database',
      'timestamp', extract(epoch from now()),
      'test', true
    ),
    'test_event',
    'bins_changes',
    false
  );
  
  RAISE NOTICE 'Test broadcast sent to bins_changes channel';
END;
$$;

-- Instructions for testing:
-- 1. Run this script in your Supabase SQL editor
-- 2. Test with: SELECT public.test_bins_broadcast();
-- 3. Try inserting/updating/deleting a bin record to see the triggers in action
-- 4. Check your backend logs to see if the realtime events are being received

-- Note: Make sure your backend service is running and has the correct
-- Supabase credentials configured in the environment variables 