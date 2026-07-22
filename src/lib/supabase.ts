import { createClient } from "@supabase/supabase-js";

// User's BYO Supabase project. Anon/publishable keys are safe in client code.
const SUPABASE_URL = "https://hyopaxudcrcurqyyutim.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5b3BheHVkY3JjdXJxeXl1dGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDQ0NTgsImV4cCI6MjEwMDMyMDQ1OH0._LKUP9YftO2JY2kO5IZsAtP_B3knvbeuauM-HahIEFY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "chronova-auth",
  },
});