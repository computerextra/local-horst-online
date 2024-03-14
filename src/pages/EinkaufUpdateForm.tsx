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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Mitarbeiter } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  Paypal: z.boolean().default(false),
  Abonniert: z.boolean().default(false),
  Geld: z.string().optional(),
  Pfand: z.string().optional(),
  Dinge: z.string().optional(),
});

export default function EinkaufUpdateForm({
  mitarbeiter,
}: {
  mitarbeiter: {
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
  } & Mitarbeiter;
}) {
  const EinkaufUpdater = api.Einkauf.upsert.useMutation();
  const BildUploader = api.EinkaufBild.upload.useMutation();

  const [file1, setFile1] = useState<File | undefined>();
  const [checkFile1, setCheckFile1] = useState(false);
  const [file2, setFile2] = useState<File | undefined>();
  const [checkFile2, setCheckFile2] = useState(false);
  const [file3, setFile3] = useState<File | undefined>();
  const [checkFile3, setCheckFile3] = useState(false);

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { files } = e.target;
    if (files == null) return;
    const selectedFiles = files;
    switch (id) {
      case 1: {
        setFile1(selectedFiles?.[0]);
        setCheckFile1(true);
        break;
      }
      case 2: {
        setFile2(selectedFiles?.[0]);
        setCheckFile2(true);
        break;
      }
      case 3: {
        setFile3(selectedFiles?.[0]);
        setCheckFile3(true);
        break;
      }
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Paypal: mitarbeiter.Einkauf?.Paypal,
      Abonniert: mitarbeiter.Einkauf?.Abonniert,
      Geld: mitarbeiter.Einkauf?.Geld ?? undefined,
      Pfand: mitarbeiter.Einkauf?.Pfand ?? undefined,
      Dinge: mitarbeiter.Einkauf?.Dinge ?? undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Get Images
    // TODO: Bilder verarbeiten und hochloden

    const encoder = cipher();
    let filename1: string | undefined = undefined,
      filename2: string | undefined = undefined,
      filename3: string | undefined = undefined;
    // Upload Images
    if (file1) {
      const base64 = (await convertBase64(file1)) as string;
      const encString = encoder(base64);
      filename1 = await BildUploader.mutateAsync({
        file: encString,
        filetype: base64.split(";")[0]!.split("/")[1]!,
        mitarbeiterId: mitarbeiter.id,
        imageNo: 1,
      });
    }
    if (file2) {
      const base64 = (await convertBase64(file2)) as string;
      const encString = encoder(base64);
      filename2 = await BildUploader.mutateAsync({
        file: encString,
        filetype: base64.split(";")[0]!.split("/")[1]!,
        mitarbeiterId: mitarbeiter.id,
        imageNo: 2,
      });
    }
    if (file3) {
      const base64 = (await convertBase64(file3)) as string;
      const encString = encoder(base64);
      filename3 = await BildUploader.mutateAsync({
        file: encString,
        filetype: base64.split(";")[0]!.split("/")[1]!,
        mitarbeiterId: mitarbeiter.id,
        imageNo: 3,
      });
    }

    const res = await EinkaufUpdater.mutateAsync({
      id: mitarbeiter.Einkauf?.id,
      ...values,
      Bild1: filename1,
      Bild2: filename2,
      Bild3: filename3,
      mitarbeiterId: mitarbeiter.id,
      Abgeschickt: new Date(),
    });

    if (res) {
      // location.reload();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Paypal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Paypal</FormLabel>
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="Geld"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geld</FormLabel>
                <FormControl>
                  <Input placeholder="Geld" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Pfand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pfand</FormLabel>
                <FormControl>
                  <Input placeholder="Pfand" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="Dinge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Was darf es denn sein?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Abonniert"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Abonniert?</FormLabel>
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
        <div className="grid grid-cols-3 gap-4">
          <div className="grid w-[320px] gap-2">
            <div className="relative flex h-24 cursor-pointer items-center justify-center rounded-lg border-2">
              <input
                type="file"
                name="file1"
                onChange={(e) => imageHandler(e, 1)}
                className="z-20 h-full w-full cursor-pointer opacity-0"
              />
              <div className="absolute flex items-center justify-center gap-2">
                <Image
                  width={100}
                  height={100}
                  alt="image"
                  className={`h-10 w-10 rounded-full ${checkFile1 ? "opacity-1" : "opacity-0"}`}
                  src={file1 ? URL.createObjectURL(file1) : ""}
                />
                <span className="w-56 truncate text-[18px]">
                  {checkFile1 ? file1?.name : "choose a file"}
                </span>
              </div>
            </div>
          </div>
          <div className="grid w-[320px] gap-2">
            <div className="relative flex h-24 cursor-pointer items-center justify-center rounded-lg border-2">
              <input
                type="file"
                name="file2"
                onChange={(e) => imageHandler(e, 2)}
                className="z-20 h-full w-full cursor-pointer opacity-0"
              />
              <div className="absolute flex items-center justify-center gap-2">
                <Image
                  width={100}
                  height={100}
                  alt="image"
                  className={`h-10 w-10 rounded-full ${checkFile2 ? "opacity-1" : "opacity-0"}`}
                  src={file2 ? URL.createObjectURL(file2) : ""}
                />
                <span className="w-56 truncate text-[18px]">
                  {checkFile2 ? file2?.name : "choose a file"}
                </span>
              </div>
            </div>
          </div>
          <div className="grid w-[320px] gap-2">
            <div className="relative flex h-24 cursor-pointer items-center justify-center rounded-lg border-2">
              <input
                type="file"
                name="file3"
                onChange={(e) => imageHandler(e, 3)}
                className="z-20 h-full w-full cursor-pointer opacity-0"
              />
              <div className="absolute flex items-center justify-center gap-2">
                <Image
                  width={100}
                  height={100}
                  alt="image"
                  className={`h-10 w-10 rounded-full ${checkFile3 ? "opacity-1" : "opacity-0"}`}
                  src={file3 ? URL.createObjectURL(file3) : ""}
                />
                <span className="w-56 truncate text-[18px]">
                  {checkFile3 ? file3?.name : "choose a file"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
