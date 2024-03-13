import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Mitarbeiter } from "@prisma/client";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Home() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();

  const [ausgewählterMitarbeiter, setAusgewählterMitarbeiter] = useState<
    Mitarbeiter | undefined
  >(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  if (Mitarbeiter.isLoading) return <p>Loading...</p>;
  if (Mitarbeiter.error) return <p>Error: {Mitarbeiter.error.message}</p>;

  return (
    <>
      <Head>
        <title>LocalHorst V9</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SectionCard title="Einkaufen">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mitarbeiter" />
            </SelectTrigger>
            <SelectContent>
              {Mitarbeiter.data?.map((mitarbeiter) => (
                <SelectItem
                  key={mitarbeiter.id}
                  value={mitarbeiter.id}
                  onClick={() => setAusgewählterMitarbeiter(mitarbeiter)}
                >
                  {mitarbeiter.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {ausgewählterMitarbeiter != undefined && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          )}
        </SectionCard>
        <SectionCard title="Einkaufsliste">
          {Mitarbeiter.data?.map((mitarbeiter) => {
            if (
              mitarbeiter.Einkauf?.Abgeschickt &&
              new Date(mitarbeiter.Einkauf.Abgeschickt).toDateString() ==
                new Date().toDateString()
            ) {
              return (
                <div key={mitarbeiter.id}>
                  <p>Wer: {mitarbeiter.Name}</p>
                  <p>Pfand: {mitarbeiter.Einkauf.Pfand}</p>
                  <p>Geld: {mitarbeiter.Einkauf.Geld}</p>
                  <p>Was: {mitarbeiter.Einkauf.Dinge}</p>
                  <hr />
                </div>
              );
            }
          })}
        </SectionCard>
      </main>
    </>
  );
}
