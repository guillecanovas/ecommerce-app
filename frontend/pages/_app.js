import React from 'react'

import { Layout } from '../components';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} /> {/* el componente en el que estamos */}
    </Layout>
  )
}

export default MyApp
