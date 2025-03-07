import styles from "./nav-bar.module.css";
import NavLink from "@/components/nav-link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
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
          <NavLink href="/team-builder">Team Builder</NavLink>
          {session && (
            <button className={styles.logoutButton} onClick={() => signOut()}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}