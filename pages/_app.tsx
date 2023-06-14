import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Console from './routes/Console'
import Login from './routes/Console'
import React, {useEffect, useState} from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? <Component {...pageProps} /> : null;
}
