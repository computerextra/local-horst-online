import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

export default function QRPage() {
  const [file, setFile] = useState<File>();
  const [inhalt, setInhalt] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const res = await axios<
      {
        symbol: {
          data: string | null;
          error: string | null;
          seq: number;
        }[];
        type: string;
      }[]
    >({
      method: "POST",
      url: "http://api.qrserver.com/v1/read-qr-code/",
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: {
        file: file,
      },
    });
    if (res.data) {
      const data = res.data;

      if (data[0]?.symbol[0]?.data) {
        const i = data[0].symbol[0].data;
        setInhalt(i);
      }
    }
  };

  return (
    <>
      <SectionCard title="QR-Code">
        <input type="file" name="file" onChange={handleFileChange} required />
        <Button onClick={handleSubmit}>Absenden</Button>
      </SectionCard>
      <SectionCard title="Ergebnis">
        <h2>Inhalt des QR Codes:</h2>
        <p className="text-red-500">
          Info: Links sind mit absicht deaktiviert. Der Inhalt wird als Text
          ausgegeben.
        </p>
        <p className="text-red-500">
          Bitte darauf achten, dass nicht vertrauenwürdige Links nicht einfach
          geöffnet werden sollten.
        </p>
        <p className="text-red-500">
          Im Zweifel in der Werkstatt nachfragen, ob der angegebene Inhalt Okay
          ist.
        </p>
        <p className="border pb-3 pt-3">{inhalt}</p>
      </SectionCard>
    </>
  );
}
