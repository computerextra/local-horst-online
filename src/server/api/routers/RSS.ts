import { parse } from "rss-to-json";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
}

export const RSSRouter = createTRPCRouter({
  getHeiseSecurity: publicProcedure.query(async () => {
    const url = "https://www.heise.de/security/rss/alert-news-atom.xml";
    const feed = await parse(url);
    return feed.items as RssFeed[];
  }),
  getHeiseTipps: publicProcedure.query(async () => {
    const url = "https://www.heise.de/rss/tipps-und-tricks-atom.xml";
    const feed = await parse(url);
    return feed.items as RssFeed[];
  }),
  getDrDatenschutz: publicProcedure.query(async () => {
    const url = "https://www.dr-datenschutz.de/feed/";
    const feed = await parse(url);
    // console.log(feed.items);
    return feed.items as DrDatenschutzRSSFeed[];
  })
});
