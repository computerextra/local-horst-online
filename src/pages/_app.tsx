import { MantineProvider } from "@mantine/core";
import { type AppType } from "next/app";
import Navigation from "~/Components/Navigation";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}>
      <Navigation />
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
