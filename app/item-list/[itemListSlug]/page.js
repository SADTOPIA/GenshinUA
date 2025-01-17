'use client'

import NavBar from "@/components/nav-bar/page";
import styles from "../../page.module.css";
import Filtration from "@/components/filtration/page";
import {fetchDataListItems} from '../../../lib/dataFetcher';
import Link from "next/link";
import {use, useEffect, useState} from "react";


export default  function ItemListSlugPage({params}){
  const {itemListSlug} = use(params);
  const [fetchedCharactersListData, setFetchedCharactersListData] = useState([]);
  const [loading, setLoading] = useState(true);

  // let filter = {};

  useEffect(() => {
    async function charactersListDataReceiver() {
      try {
        setLoading(true);
        const filter = {};
        const data = await fetchDataListItems(itemListSlug);
        setFetchedCharactersListData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    charactersListDataReceiver();
  }, [itemListSlug]);



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
              <Filtration charactersData={fetchedCharactersListData}/>
            </div>
            <div className={styles.itemList}>
              <ul className={styles.ul}>
                {fetchedCharactersListData.map((item) => (
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