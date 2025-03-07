import { fetchCharactersList } from "@/lib/fetch-requests";
import styles from "@/app/item-list/item-list.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import {verifyAuth} from "@/lib/verify-auth";

export default async function TeamBuilderPage() {
  const result = await verifyAuth();

  if(!result.user) {
    return redirect("/");
  }

  const charactersData = await fetchCharactersList();

  return (
    <div className={styles.background}>
      <main className={styles.container}>
        <ul className={styles.itemList}>
          {charactersData.map((item) => (
            <li key={item.id} className={styles.li}>
              <Link href={`/item-page/${item.name}`}>
                <img src={item.mini_img} alt={item.name} className={styles.characterImage} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
