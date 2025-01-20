'use client';

import styles from "./page.module.css"
import {Provider} from "react-redux";
import store from "@/store/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
      <Provider store={store}>
        {children}
      </Provider>
      </body>
    </html>
  );
}
