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
import type { sg_auf_artikel } from "prisma/generated/Sage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  search: z.string().min(5),
});

export default function CESN() {
  const [Ergebnis, setErgebnis] = useState<sg_auf_artikel | null>(null);
  const Artikelsuche = api.Sage.getName.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await Artikelsuche.mutateAsync(values.search);
    if (res) {
      setErgebnis(res);
      const Textarea = document.createElement("textarea");
      Textarea.value = `${res.ARTNR}: ${res.SUCHBEGRIFF}`;
      document.body.appendChild(Textarea);
      Textarea.focus();
      Textarea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.log("Unable to copy to clipboard", err);
      }
      document.body.removeChild(Textarea);
      setTimeout(() => {
        setErgebnis(null);
      }, 2000);
    }
  }

  return (
    <>
      <SectionCard title="CE Seriennummern">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artikelnummer</FormLabel>
                  <FormControl>
                    <Input placeholder="00660" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SectionCard>
      <SectionCard title="Ergebnis">
        {Ergebnis ? (
          <p>
            {Ergebnis.ARTNR}: {Ergebnis.SUCHBEGRIFF}
          </p>
        ) : (
          <p>Kein Ergebnis</p>
        )}
      </SectionCard>
    </>
  );
}
