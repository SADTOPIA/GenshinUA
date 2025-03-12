'use client';

import styles from "./page.module.css"
import {Provider} from "react-redux";
import store from "../store/page";
import NavBar from "../components/nav-bar";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
      <Provider store={store}>
        <SessionProvider>
          <NavBar/>
        {children}
        </SessionProvider>
      </Provider>
      </body>
    </html>
  );
}
