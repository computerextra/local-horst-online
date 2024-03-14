import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/api";
import type { Mitarbeiter } from "@prisma/client";
import { useState } from "react";

export default function AbrechnungsForm({
  Mitarbeiter,
}: {
  Mitarbeiter: ({
    Einkauf: {
      id: string;
      Paypal: boolean;
      Abonniert: boolean;
      Geld: string | null;
      Pfand: string | null;
      Dinge: string | null;
      Abgeschickt: Date | null;
      mitarbeiterId: string;
    } | null;
  } & Mitarbeiter)[];
}) {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [Betrag, setBetrag] = useState<string | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const PaypalMailSender = api.Mail.sendPaypalMail.useMutation();

  const sendMail = async () => {
    if (username == null) return;
    if (Betrag == null) return;
    if (selectedId == null) return;

    const res = await PaypalMailSender.mutateAsync({
      id: selectedId,
      username: username,
      Schulden: Betrag,
    });

    if (res == "Sent") {
      alert("E-Mail gesendet");
    } else {
      alert("E-Mail nicht gesendet");
    }
  };
  return (
    <div>
      <Input
        type="text"
        placeholder="Dein Paypalbenutzername"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className="my-3"
      />
      <p className="py-2">Gespeicherter Benutzername für Paypal: {username}</p>
      <Select onValueChange={setSelectedId}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Mitarbeiter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Mitarbeiter.map((mitarbeiter) => {
              if (
                mitarbeiter.Einkauf?.Abgeschickt &&
                new Date(mitarbeiter.Einkauf?.Abgeschickt).toDateString() ==
                  new Date().toDateString() &&
                mitarbeiter.Einkauf.Paypal &&
                mitarbeiter.Email
              ) {
                return (
                  <SelectItem key={mitarbeiter.id} value={mitarbeiter.id}>
                    {mitarbeiter.Name}
                  </SelectItem>
                );
              }
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-3 items-center gap-4">
        <Input
          type="text"
          placeholder="Zu zahlender Betrag (in Euro)"
          onChange={(e) => setBetrag(e.target.value)}
          value={Betrag}
          className="col-span-2 my-3"
        />
        <Button variant="outline" onClick={sendMail}>
          Mail Senden
        </Button>
      </div>
    </div>
  );
}
