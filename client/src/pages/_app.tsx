import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/globals.css';
import 'tailwindcss/tailwind.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>TOP</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
