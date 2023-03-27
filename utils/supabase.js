import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wpezvjidxetkoklidmjx.supabase.co";

export const supabase = createClient(
  SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZXp2amlkeGV0a29rbGlkbWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4NDAzODUsImV4cCI6MTk5MzQxNjM4NX0.VradqnV3uMxX6aRFtPcF-i2nX_BO2IImKuPRCqrlBSM"
);
