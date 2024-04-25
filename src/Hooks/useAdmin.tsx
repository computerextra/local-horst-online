import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAdmin() {
  const { data: sessionData } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (sessionData == null) return;
    if (sessionData.user == null) return;
    if (sessionData.user.email == null) return;

    if (sessionData.user.email === "johannes.kirchner@computer-extra.de")
      setIsAdmin(true);
    if (sessionData.user.email === "christoph.salowski@computer-extra.de")
      setIsAdmin(true);
  }, [sessionData]);

  return { isAdmin };
}
