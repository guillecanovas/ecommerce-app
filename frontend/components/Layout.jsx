import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

// children no es algo que le pasamos
// children es algo que permite react para identificar a lo que esta contenido dentro de otro
// de esta manera accedemos a los componentes 

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Guillermo Cánovas</title> {/* titulo de la pagina */}
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout