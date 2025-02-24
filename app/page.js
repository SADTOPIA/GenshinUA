import styles from "./page.module.css";
import HomePage from "@/app/home/page";


export default function Home() {
  return (
    <div className={styles.background}>
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
