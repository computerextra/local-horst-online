import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { parse } from "rss-to-json";

type RssFeed = {
  id: string;
  content: string;
  created: number;
  link: string;
  title: string;
};

type DrDatenschutzRSSFeed = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export const RSSRouter = createTRPCRouter({
  Heise: publicProcedure.query(async () => {
    const url = "https://www.heise.de/security/rss/alert-news-atom.xml";
    const feed = await parse(url);
    return feed.items as RssFeed[];
  }),
  Datenschutz: publicProcedure.query(async () => {
    const url = "https://www.dr-datenschutz.de/feed/";
    const feed = await parse(url);
    // console.log(feed.items);
    return feed.items as DrDatenschutzRSSFeed[];
  }),
});
