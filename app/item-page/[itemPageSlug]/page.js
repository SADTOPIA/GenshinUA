import {fetchDataItem} from '../../../lib/dataFetcher';
import styles from '../item-page.module.css'
import NavBar from "@/components/nav-bar/page";

export default async function ItemPage({params}) {
  const {itemPageSlug} = params;
  const data = await fetchDataItem(itemPageSlug);
  return (
    <div className={styles.background}>
      <NavBar/>
      <div className={styles.mainContainer}>
        <div className={styles.section}>
          <div className={styles.imageContainer}>
            <img src={data.img}
                 alt={data.name}
                 className={styles.mainImage} />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>{data.description}</div>
            <div className={styles.infoBox}>Graph</div>
          </div>
          <div className={styles.chartContainer}>Chart Section</div>
        </div>

        <div className={styles.secondarySection}>
          <div className={styles.thumbnailContainer}>
            <img
              src={data.mini_img}
              alt={data.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover'}}
            />
          </div>
          <div className={styles.textContainer}>{data.weapons[0].name}</div>
          <div className={styles.verdictContainer}>{data.weapons[0].passive}</div>
          <div className={styles.thumbnailContainer}>
            <img
              src={data.mini_img}
              alt={data.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover'}}
            />
          </div>
          <div className={styles.textContainer}>{data.weapons[1].name}</div>
          <div className={styles.verdictContainer}>{data.weapons[1].passive}</div>
        </div>

      </div>
    </div>
    )
}