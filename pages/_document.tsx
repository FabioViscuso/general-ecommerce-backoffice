import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            < body >
                <Main />
                <div id="loginModal"></div>
                <div id="signupModal"></div>
                <div id="notificationPopup"></div>
                <div id="cartContainer"></div>
                <div id="navbarContainer"></div>
                < NextScript />
            </body>
        </Html>
    )
}
