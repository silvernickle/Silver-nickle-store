import '../styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '../components/Layout';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <SessionProvider session={pageProps.session}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </GoogleOAuthProvider>
      </SessionProvider>
    </StateContext>
  )}

export default MyApp
