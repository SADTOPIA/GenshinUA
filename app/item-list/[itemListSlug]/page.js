'use client'

import NavBar from "@/components/nav-bar/page";
import styles from "../../page.module.css";
import Filtration from "@/components/filtration/page";
import {fetchDataListItems} from '../../../lib/dataFetcher';
import Link from "next/link";
import {useEffect, useState} from "react";


export default  function ItemListSlugPage(){
  // let filter = {};
  // const fetchedData = await fetchDataListItems(filter);

  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function dataReceiver() {
      try {
        setLoading(true);
        const filter = {};
        const data = await fetchDataListItems(filter);
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    dataReceiver();
  }, []);



  return (
      <div className={styles.background}>
        <NavBar/>
        <div className={styles.container}>
          <div className={styles.section}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
            <div>
              <Filtration charactersData={fetchedData}/>
            </div>
            <div className={styles.itemList}>
              <ul className={styles.ul}>
                {fetchedData.map((item) => (
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
              </>
              )}
          </div>
        </div>
      </div>
  )
}