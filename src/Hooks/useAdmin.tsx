import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function useAdmin() {
  const { data: sessionData } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const User = api.User.get.useMutation();

  useEffect(() => {
    async function y() {
      if (sessionData == null) return;
      if (sessionData.user == null) return;
      if (sessionData.user.email == null) return;
      const x = await User.mutateAsync({ id: sessionData.user.id });
      if (x == null) return;
      if (x?.isAdmin) {
        setIsAdmin(true);
      }
    }
    void y();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  return { isAdmin };
}
