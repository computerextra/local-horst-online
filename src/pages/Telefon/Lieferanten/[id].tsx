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
import type { Lieferanten } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditLieferant() {
  const router = useRouter();
  const { id } = router.query;

  const Lieferant = api.Lieferant.get.useQuery(id as string);

  if (Lieferant.isLoading) return <p>Loading...</p>;
  if (Lieferant.isError) return <p>Error</p>;

  return (
    <SectionCard title={Lieferant.data?.Firma + " bearbeiten"}>
      <UpdateForm id={id as string} lieferant={Lieferant.data!} />
    </SectionCard>
  );
}

const formSchema = z.object({
  Firma: z.string().min(2),
  Kundennummer: z.string().optional(),
  Webseite: z.string().url().optional(),
});

const UpdateForm = ({
  id,
  lieferant,
}: {
  id: string;
  lieferant: Lieferanten;
}) => {
  const LieferantenAnleger = api.Lieferant.update.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Firma: lieferant.Firma,
      Kundennummer: lieferant.Kundennummer ?? undefined,
      Webseite: lieferant.Webseite ?? undefined,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await LieferantenAnleger.mutateAsync({
      id,
      ...values,
    });
    if (res) {
      location.reload();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Firma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firma</FormLabel>
              <FormControl>
                <Input placeholder="Muster KG" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Kundennummer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kundennummer</FormLabel>
              <FormControl>
                <Input placeholder="0815" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Webseite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webseite</FormLabel>
              <FormControl>
                <Input placeholder="www.musterkg.de" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          Speichern
        </Button>
      </form>
    </Form>
  );
};
