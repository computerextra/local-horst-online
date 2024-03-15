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
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Mitarbeiter } from "@prisma/client";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { useState } from "react";
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

  const [file1, setFile1] = useState<string | undefined>(undefined);
  const [file2, setFile2] = useState<string | undefined>(undefined);
  const [file3, setFile3] = useState<string | undefined>(undefined);

  const [allowed2, setAllowed2] = useState(false);
  const [allowed3, setAllowed3] = useState(false);

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
    // TODO: Wenn keine Bilder da sind, diese aus der DB löschen!°

    // const encoder = cipher();
    let filename1: string | undefined = undefined,
      filename2: string | undefined = undefined,
      filename3: string | undefined = undefined;
    // // Upload Images
    if (file1 != null) {
      filename1 = file1;
    }
    if (file2 != null) {
      filename2 = file2;
    }
    if (file3 != null) {
      filename3 = file3;
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
      location.reload();
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
          <div className="flex flex-col items-center">
            {file1 && (
              <Image
                width={200}
                height={200}
                className="mb-5 rounded-lg"
                style={{ maxHeight: 200, width: "auto" }}
                src={file1}
                alt="Uploaded image"
              />
            )}
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                setFile1(res[0]?.url);
                setAllowed2(true);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          {allowed2 && (
            <div className="flex flex-col items-center justify-center">
              {file2 && (
                <Image
                  width={200}
                  height={200}
                  className="mb-5 rounded-lg"
                  style={{ maxHeight: 200, width: "auto" }}
                  src={file2}
                  alt="Uploaded image"
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setFile2(res[0]?.url);
                  setAllowed3(true);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          )}
          {allowed3 && (
            <div className="flex flex-col items-center justify-center">
              {file3 && (
                <Image
                  width={200}
                  height={200}
                  className="mb-5 rounded-lg"
                  style={{ maxHeight: 200, width: "auto" }}
                  src={file3}
                  alt="Uploaded image"
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setFile3(res[0]?.url);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          )}
        </div>
        {/* <div className="grid grid-cols-3 gap-4">
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
        </div> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
