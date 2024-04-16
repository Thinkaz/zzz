import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://znduqcoyaawtmdkvrxqt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHVxY295YWF3dG1ka3ZyeHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1NjQzMTcsImV4cCI6MjAyNzE0MDMxN30.8457GkafsNaEWZeVEBHMHwhlp0bOfaim6u4mlQbbjS0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export async function retriveName() {
  const user = await supabase.auth.getUser();
  const userName = user?.data.user?.user_metadata.full_name.split(" ")[0];
  return userName;
};