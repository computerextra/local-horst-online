import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SearchResult = {
  id: number;
  title: string;
};

const formSchema = z.object({
  searchTerm: z.string().min(3, {
    message: "Es müssen mind. 3 Zeichen eingegeben werden.",
  }),
});

export default function ArchivePage() {
  const ArchiveSearcher = api.Archive.get.useMutation();
  const ArchiveDownloader = api.Archive.download.useMutation();
  const [Results, setResults] = useState<SearchResult[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await ArchiveSearcher.mutateAsync(values.searchTerm);
    if (res) {
      setResults(res);
      setLoading(false);
    }
  }

  const handleDownload = async (id: number) => {
    const data = await ArchiveDownloader.mutateAsync(id);
    if (data == null) return;
    const a = document.createElement("a");
    a.href = "data:application/pdf;base64," + data;
    a.download = "Rechnung.pdf";
    a.click();
  };

  return (
    <>
      <Head>
        <title>LocalHorst V9 | Archiv</title>
      </Head>

      <SectionCard title="CE Archiv">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suchbegriff</FormLabel>
                  <FormControl>
                    <Input placeholder="Suche ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Suchen</Button>
          </form>
        </Form>
      </SectionCard>
      {loading && <p>Loading ...</p>}
      {Results && (
        <SectionCard title="Suchergebnisse">
          {Results.map((result) => (
            <div key={result.id}>
              <p
                onClick={() => handleDownload(result.id)}
                className="cursor-pointer underline"
              >
                {result.title}
              </p>
            </div>
          ))}
        </SectionCard>
      )}
    </>
  );
}
