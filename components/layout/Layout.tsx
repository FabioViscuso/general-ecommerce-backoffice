import Head from 'next/head'
import { Footer } from './Footer'
import RenderedNotificationPopup from '../UI/NotificationPopup'
import useUIstore from '../../lib/store/UIstore'
import { Navbar } from './Navbar'

interface Props {
    children: JSX.Element | JSX.Element[]
}

export default function Layout({ children }: Props) {
    const isNotificationVisible = useUIstore(store => store.isNotificationVisible)
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        "Hello! That's me!",
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content="Sweet Bakery" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {isNotificationVisible && <RenderedNotificationPopup />}
            <Navbar />
            <div className='h-full flex flex-col justify-between text-center md:text-left'>
                <>
                    {children}
                </>
                <Footer />
            </div>
        </>
    )
}
