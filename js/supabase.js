// ADD CDN IN HTML:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

const SUPABASE_URL = "https://hegyyjazkmovyyczotnw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ3l5amF6a21vdnl5Y3pvdG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDUyNzIsImV4cCI6MjA5MDAyMTI3Mn0._UMi4rG9RGc0rTsko2w8oEYmbXzdVEkwjnh1Uk6f8PE";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
