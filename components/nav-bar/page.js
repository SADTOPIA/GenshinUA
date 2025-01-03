import Link from "next/link";
import styles from "./nav-bar.module.css";

export default function NavBar() {
  return(
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <h1>GenshinUA</h1>
        </div>
        <div className={styles.navbarRight}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/item-list/characters" className={styles.navLink}>Characters</Link>
          <Link href="/item-list/weapons" className={styles.navLink}>Weapons</Link>
        </div>
      </div>
    </nav>
  )
}