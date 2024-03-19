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
import type { Anschprechpartner } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function NewAp() {
  const router = useRouter();
  const { id } = router.query;

  const AP = api.Ansprechpartner.get.useQuery(id as string);

  if (AP.isLoading) return <p>Loading...</p>;
  if (AP.isError) return <p>Error</p>;

  return (
    <>
      <Head>
        <title>LocalHorst V9 | {AP.data?.Name + " bearbeiten"}</title>
      </Head>
      <SectionCard title={AP.data?.Name + " bearbeiten"}>
        <UpdateForm id={id as string} Ap={AP.data!} />
      </SectionCard>
    </>
  );
}

const formSchema = z.object({
  Name: z.string(),
  Telefon: z.string().optional(),
  Mobil: z.string().optional(),
  Mail: z.string().email().optional(),
});

const UpdateForm = ({ id, Ap }: { id: string; Ap: Anschprechpartner }) => {
  const router = useRouter();
  const ApUpdater = api.Ansprechpartner.update.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: Ap.Name,
      Telefon: Ap.Telefon ?? undefined,
      Mobil: Ap.Mobil ?? undefined,
      Mail: Ap.Mail ?? undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await ApUpdater.mutateAsync({
      id,
      ...values,
    });
    if (res != null) {
      await router.push("/Telefon/Lieferanten");
    }
  }

  return (
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
  );
};
