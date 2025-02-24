'use client';

import styles from "./page.module.css"
import {Provider} from "react-redux";
import store from "@/store/page";
import NavBar from "@/components/nav-bar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
      <Provider store={store}>
        <NavBar/>
        {children}
      </Provider>
      </body>
    </html>
  );
}
