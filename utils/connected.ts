import { supabase } from "@/utils/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function isConnected() {
    return new Promise<boolean>((resolve, reject) => {
        const handleAuthStateChange = (event: AuthChangeEvent, session: Session | null) => {
            if (session?.user) {
                resolve(true);
            } else {
                resolve(false);
            }
        };
        supabase.auth.onAuthStateChange(handleAuthStateChange);
    }); 
}
