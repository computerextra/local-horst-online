import SectionCard from "@/components/SectionCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import Image from "next/image";

export default function RSSPage() {
  const Heise = api.RSS.Heise.useQuery();
  const Datenschutz = api.RSS.Datenschutz.useQuery();

  if (Heise.isLoading) return <div>loading ...</div>;
  if (Heise.isError) return <div>Error</div>;
  if (Datenschutz.isLoading) return <div>loading ...</div>;
  if (Datenschutz.isError) return <div>Error</div>;

  return (
    <SectionCard title="RSS Feed">
      <div className="grid grid-cols-2">
        <div>
          {Heise.data?.map((x) => {
            const linkArr = x.content.split('"');
            const link = linkArr[1];
            const pic = linkArr[3];
            const pArr = x.content.split("<p>");
            let p = "";
            if (pArr[2]) p = pArr[2].replace("</p>", "");
            if (link && pic)
              return (
                <Card className="mx-auto my-2 w-[90%]" key={x.id}>
                  <CardHeader>
                    <CardTitle>{x.title}</CardTitle>
                    <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row gap-3">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        <Image
                          className="rounded-lg object-cover"
                          width={300}
                          height={100}
                          src={pic}
                          alt=""
                        />
                      </a>
                      <p>{p}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Card>
              );
          })}
        </div>
        <div>
          {Datenschutz.data?.map((x, idx) => (
            <Card className="mx-auto my-2 w-[90%]" key={idx}>
              <CardHeader>
                <CardTitle>{x.title}</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-3">
                  <div
                    dangerouslySetInnerHTML={{ __html: x.description }}
                  ></div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
