import { Poppins } from 'next/font/google'; // Import the Lobster font
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import Head from 'next/head'; // Import next/head

// Load the Lobster font from google (just for funzy)
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '600'] });

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
        {/* Other meta tags */}
        <meta name="description" content="Simply Books application" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Simply B</title>
      </Head>
      <html lang="en">
        <body className={poppins.className}>
          <ClientProvider>{children}</ClientProvider>
        </body>
      </html>
    </>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
