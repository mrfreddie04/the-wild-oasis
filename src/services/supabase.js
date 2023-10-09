import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cskbjpnldbuacvnwknlo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNza2JqcG5sZGJ1YWN2bndrbmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5NjMyNDEsImV4cCI6MjAxMTUzOTI0MX0.LqzWvWwDyxGoZCArGHyr1nCmdtZUh3Km7ki8zOprGVY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
