import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import { getApp } from 'firebase/app'

initializeFirebaseApp()
export default function App({ Component, pageProps }: AppProps) {
  console.log(getApp());
  
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
