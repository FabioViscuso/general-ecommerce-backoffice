import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// import stores
import useUIstore from '../lib/store/UIstore';

import Layout from '../components/layout/Layout'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const formattedPath = router.pathname.replace(/\//, '').replace(/-/, ' ');
  const isNotificationVisible = useUIstore(state => state.isNotificationVisible)
  const resetNotification = useUIstore(state => state.resetNotificationContent);

  /* NOTIFICATION POPUP LOGIC */
  useEffect(() => {
    const id = setTimeout(() => {
      resetNotification()
    }, 3000)

    return () => {
      clearTimeout(id)
    }
  }, [isNotificationVisible, resetNotification])

  return (
    <>
      <Head>
        <title>
          {router.pathname === '/' ? 'CMS Demo: home' : `CMS Demo: ${formattedPath}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
