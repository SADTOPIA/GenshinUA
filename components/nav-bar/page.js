'use client';

import {useDispatch, useSelector } from "react-redux";
import Link from "next/link";


import {uiActions} from "@/store/ui-slice";
import styles from "./nav-bar.module.css";
import { useEffect } from "react";

export default function NavBar() {
  const dispatch = useDispatch();
  const currentPath = useSelector((state) => state.ui.currentPath);

  useEffect(() => {
    const path = window.location.pathname; // Получаем текущий путь из URL
    dispatch(uiActions.highlightBtn(path)); // Устанавливаем его в состоянии
  }, [dispatch]);

  const highlightHandler = (path) => {
    dispatch(uiActions.highlightBtn(path));
  };

  return(
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <h1>GenshinUA</h1>
        </div>
        <div className={styles.navbarRight}>
          <Link
            href="/"
            className={currentPath === "/" ? styles.activeNavLink : styles.navLink}
            onClick={() => highlightHandler("/")}
          >
            Home
          </Link>
          <Link
            href="/item-list/characters"
            className={currentPath === "/item-list/characters" ? styles.activeNavLink : styles.navLink}
            onClick={() => highlightHandler("/item-list/characters")}
          >
            Characters
          </Link>
          <Link
            href="/item-list/weapons"
            className={currentPath === "/item-list/weapons" ? styles.activeNavLink : styles.navLink}
            onClick={() => highlightHandler("/item-list/weapons")}
          >
            Weapons
          </Link>
          <Link
            href="/item-list/artifacts"
            className={currentPath === "/item-list/artifacts" ? styles.activeNavLink : styles.navLink}
            onClick={() => highlightHandler("/item-list/artifacts")}
          >
            Artifacts
          </Link>
        </div>
      </div>
    </nav>
  )
}