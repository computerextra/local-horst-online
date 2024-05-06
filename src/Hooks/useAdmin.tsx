/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function useAdmin() {
  const { data: sessionData } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const User = api.User.get.useMutation();

  useEffect(() => {
    if (sessionData == null) return;
    if (sessionData.user == null) return;
    if (sessionData.user.email == null) return;

    if (User == null) return;
    if (User.data?.isAdmin) {
      setIsAdmin(true);
    }
  }, [sessionData]);

  return { isAdmin };
}
