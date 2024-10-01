import React from "react";
import Document, {Html, Head, Main, NextScript} from 'next/document'
import analyticsHead from "../constants/analytics/analyticsHead.html";
import analyticsBody from "../constants/analytics/analyticsBody.html";
import parse from 'html-react-parser';
import baseUrl from "../utils/data/baseUrl";
import erudaScripts from "../constants/DOM/erudaScript.html";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps}
  }

  render() {
    return (
      <Html id={"html-point"} lang={"ru"}>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
          <meta name="format-detection" content="telephone=no"/>
          <meta name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover, target-densitydpi=medium-dpi"/>
          <link href={baseUrl(`fonts/fonts.css`)} rel="stylesheet"/>
          <link rel="icon" href={baseUrl(`favicon.ico`)}/>
          {parse(analyticsHead)}
          {process.env.NODE_ENV === "development" && parse(erudaScripts)}
        </Head>
        <body className={"_preloader"}>
          {parse(analyticsBody)}
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}

export default CustomDocument;
