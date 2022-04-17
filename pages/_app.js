import Layout from '../components/Layout'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps: { session, ...pageProps },router }) {
 

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <RecoilRoot>
       <Layout>
          <Component {...pageProps} key={router.route} />
        </Layout>
        </RecoilRoot>
    </SessionProvider>
  )
}


export default MyApp

