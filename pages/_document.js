import { Html,Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html>
      <Head>
        <title>mTunes</title>
        <link className='rounded-full' href='https://img.icons8.com/fluency/200/international-music.png' rel="icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}