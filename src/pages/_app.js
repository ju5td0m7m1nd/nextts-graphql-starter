import React from 'react';

import '../../styles/globals.css';

import Router from 'next/router';
import { withApollo } from '../graphql/client';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps}></Component>;
}

export default withApollo(MyApp);
