import React from 'react'

import { Layout } from '../components';
import '../styles/globals.css'
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';


//Esta es la pagina principal, es decir, sabemos que las demas van a aparecer siempre en su ruta
//pero esta pagina engloba a todas las demas
//es decir, todas las paginas ...
//estan wrapeadas con StateContext para guardar el contexto de la app
//y estan wrappeadas con layout que a su vez esta formada por
//       <Header />
//          <Children />
//        <Footer />

//No renderiza MyApp, el componente que renderiza es Layout
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} /> {/* el componente en el que estamos */}
      </Layout>
    </StateContext>
  )
}

export default MyApp
