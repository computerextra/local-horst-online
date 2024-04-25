import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ADMIN_MAILS } from "~/conf";

export default function useAdmin() {
  const { data: sessionData } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (sessionData == null) return;
    if (sessionData.user == null) return;
    if (sessionData.user.email == null) return;

    if (ADMIN_MAILS.includes(sessionData.user.email)) setIsAdmin(true);
  }, [sessionData]);

  return { isAdmin };
}
