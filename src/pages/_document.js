import React, { Fragment } from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Check if in production
    const isProduction = process.env.NODE_ENV === 'production';

    return {
      ...initialProps,
      isProduction,
    };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content="" />
          {/* We only want to add the scripts if in production */}
          {isProduction && (
            {
              /**
               * Init some third party extentions if needed.
               */
            }     
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
