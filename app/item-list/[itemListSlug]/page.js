import NavBar from "@/components/nav-bar/page";
import styles from "../../page.module.css";
import Filtration from "@/components/filtration/page";
import fetchDataListItems from '../../../lib/characters';
import Link from "next/link";

export default async function ItemListSlugPage({params}){
  const data = await fetchDataListItems();

  return (
      <div className={styles.background}>
        <NavBar/>
        <div className={styles.container}>
          <div className={styles.section}>
            <div>
              <Filtration/>
            </div>
            <div className={styles.itemList}>
              <ul className={styles.ul}>
                {data.map((item) => (
                  <li key={item.id} className={styles.li}>
                    <Link href={`/item-page/${item.name}`}>
                      <div>
                        <img
                          src={item.mini_img}
                          alt={item.name}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}