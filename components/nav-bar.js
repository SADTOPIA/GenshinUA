import styles from "./nav-bar.module.css";
import NavLink from "@/components/nav-link";

export default function NavBar() {

  return(
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <h1>GenshinUA</h1>
        </div>
        <div className={styles.navbarRight}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/item-list/characters">Characters</NavLink>
          <NavLink href="/item-list/weapons">Weapons</NavLink>
          <NavLink href="/item-list/artifacts">Artifacts</NavLink>
        </div>
      </div>
    </nav>
  )
}