import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Mitarbeiter } from "@prisma/client";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string().min(2),
  Short: z.string().min(2).max(2),
  Gruppenwahl: z.string().optional(),
  InternTelefon1: z.string().optional(),
  InternTelefon2: z.string().optional(),
  FestnetzAlternativ: z.string().optional(),
  FestnetzPrivat: z.string().optional(),
  HomeOffice: z.string().optional(),
  MobilBusiness: z.string().optional(),
  MobilPrivat: z.string().optional(),
  Email: z.string().email().optional(),
  Azubi: z.boolean().default(false),
  Geburtstag: z.date().optional(),
});

export default function MitarbeiterEdit() {
  const router = useRouter();
  const { id } = router.query;

  const Mitarbeiter = api.Mitarbeiter.get.useQuery(id as string);

  if (Mitarbeiter.isLoading) return <p>Loading...</p>;
  if (Mitarbeiter.isError) return <p>Error</p>;
  if (!Mitarbeiter.data) return <p>No data</p>;

  return (
    <SectionCard title={`${Mitarbeiter.data.Name} bearbeiten`}>
      <UpdateForm id={id as string} Mitarbeiter={Mitarbeiter.data} />
    </SectionCard>
  );
}

const UpdateForm = ({
  Mitarbeiter,
  id,
}: {
  Mitarbeiter: Mitarbeiter;
  id: string;
}) => {
  const router = useRouter();
  const MitarbeiterUpdater = api.Mitarbeiter.update.useMutation();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await MitarbeiterUpdater.mutateAsync({
      id,
      ...values,
    });
    if (res) {
      await router.push("/Telefon/Mitarbeiter");
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: Mitarbeiter.Name,
      Short: Mitarbeiter.Short,
      Gruppenwahl: Mitarbeiter.Gruppenwahl ?? undefined,
      InternTelefon1: Mitarbeiter.InternTelefon1 ?? undefined,
      InternTelefon2: Mitarbeiter.InternTelefon2 ?? undefined,
      FestnetzAlternativ: Mitarbeiter.FestnetzAlternativ ?? undefined,
      FestnetzPrivat: Mitarbeiter.FestnetzPrivat ?? undefined,
      HomeOffice: Mitarbeiter.HomeOffice ?? undefined,
      MobilBusiness: Mitarbeiter.MobilBusiness ?? undefined,
      MobilPrivat: Mitarbeiter.MobilPrivat ?? undefined,
      Email: Mitarbeiter.Email ?? undefined,
      Azubi: Mitarbeiter.Azubi ?? undefined,
      Geburtstag: Mitarbeiter.Geburtstag ?? undefined,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Short"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short</FormLabel>
                <FormControl>
                  <Input placeholder="MM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Gruppenwahl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gruppenwahl</FormLabel>
                <FormControl>
                  <Input placeholder="121" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="InternTelefon1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interne Nummer 1</FormLabel>
                <FormControl>
                  <Input placeholder="221" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="InternTelefon2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interne Nummer 2</FormLabel>
                <FormControl>
                  <Input placeholder="321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="FestnetzAlternativ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Festnetz</FormLabel>
                <FormControl>
                  <Input placeholder="0561 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="FestnetzPrivat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Festnetz Privat</FormLabel>
                <FormControl>
                  <Input placeholder="0561 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="HomeOffice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HomeOffice</FormLabel>
                <FormControl>
                  <Input placeholder="421" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="MobilBusiness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobil Geschäftlich</FormLabel>
                <FormControl>
                  <Input placeholder="0151 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="MobilPrivat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobil Privat</FormLabel>
                <FormControl>
                  <Input placeholder="0151 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="max@muster.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="Geburtstag"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Geburtstag</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: de })
                      ) : (
                        <span>Wähle ein Datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Azubi"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Azubi?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
