// client/src/hooks/useMe.js
import { useEffect, useState } from "react";
import { fetchMe, onAuthStateChange } from "../lib/auth";
import { sb } from "../lib/supabase";

export default function useMe() {
  const [me, setMe] = useState({ user: null, isAdmin: false, loading: true });

  async function refetch() {
    try {
      const d = await fetchMe(); // { user, isAdmin }

      setMe({ ...d, loading: false });
    } catch {
      setMe({ user: null, isAdmin: false, loading: false });
    }
  }

  useEffect(() => {
    let alive = true;
    refetch();

    // 세션 변화 감지 → 다시 /auth/me 호출
    const unsub = sb.auth.onAuthStateChange((_event, _session) => {
      if (!alive) return;
      refetch();
    });

    return () => {
      alive = false;
      unsub.data.subscription.unsubscribe();
    };
  }, []);

  return me;
}
