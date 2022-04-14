import "../styles/globals.css";

import { FC } from "react";
import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default MyApp;
