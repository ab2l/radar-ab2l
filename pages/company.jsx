import React from 'react';
import Head from 'next/head';

import Header from '../components/header';
import Footer from '../components/footer';
import CompanyProfile from '../components/company-profile';

export default () => (
  <div>
    <Header />
    <Head>
      <title>Radar das Lawtechs</title>
    </Head>
    <CompanyProfile
      img1280by960="http://lorempixel.com/1280/960/"
      caption1280by960="Foto da Sede da Empresa"
    />
    <Footer />
  </div>
);
