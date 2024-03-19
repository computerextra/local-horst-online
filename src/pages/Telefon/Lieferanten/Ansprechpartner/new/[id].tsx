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
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string(),
  Telefon: z.string().optional(),
  Mobil: z.string().optional(),
  Mail: z.string().email().optional(),
});

export default function NewAp() {
  const ApAnleger = api.Ansprechpartner.create.useMutation();

  const router = useRouter();
  const { id } = router.query;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await ApAnleger.mutateAsync({
      lieferantenId: id as string,
      ...values,
    });
    if (res != null) {
      await router.push("/Telefon/Lieferanten");
    }
  }

  return (
    <>
      <Head>
        <title>LocalHorst V9 | Neuer Ansprechpartner</title>
      </Head>
      <SectionCard title="Neuer Ansprechpartner">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Peter Pan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Telefon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input placeholder="0561/601440" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Mobil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobil</FormLabel>
                  <FormControl>
                    <Input placeholder="0151/123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="U7lT6@example.com" {...field} />
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
