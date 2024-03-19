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
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  Empfänger: z.string().email(),
  Auftrag: z.string(),
});

export default function MailAnKunde() {
  const Mailer = api.Mail.sendInfoMail.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await Mailer.mutateAsync(values);

    if (res == "Sent") {
      location.reload();
    } else {
      alert("E-Mail konnte nicht gesendet werden.");
    }
  }

  return (
    <>
      <Head>
        <title>LocalHorst V9 | Mail an Kunde</title>
      </Head>
      <SectionCard title="Mail an Kunde">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Empfänger"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empfänger</FormLabel>
                  <FormControl>
                    <Input placeholder="expample@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Auftrag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auftrag</FormLabel>
                  <FormControl>
                    <Input placeholder="Auftrag ohne AU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SectionCard>
    </>
  );
}
