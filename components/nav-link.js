'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";

import styles from "@/components/nav-bar.module.css";


export default function NavLink({href, children}) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={path.endsWith(href) ? styles.activeNavLink : styles.navLink}
    >
      {children}
    </Link>
  )
}


