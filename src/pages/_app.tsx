import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import { type AppType } from "next/app";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}
    >
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
