import styles from "./page.module.css";
import HomePage from "@/app/home/page";
import NavBar from "@/components/nav-bar/page";

export default function Home() {
  return (
    <div className={styles.background}>
      <NavBar/>
      <div className={styles.parentContainer}>
        <div className={styles.container}>
          <div className={styles.h1}>
            <HomePage/>
          </div>
        </div>
      </div>
    </div>
  );
}
