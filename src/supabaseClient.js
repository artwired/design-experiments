import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hagnicruggqwdpuobhpw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZ25pY3J1Z2dxd2RwdW9iaHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NDMxMDMsImV4cCI6MjA5MjAxOTEwM30.oPCKXFd54ZsqQ7Ox1Uhz8mN4swoWSBx74HBJhmtoiYY";

export const supabase = createClient(supabaseUrl, supabaseKey);
