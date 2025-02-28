"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCharactersList, setItemListSlug  } from "@/store/characters-list-slice";
import Filtration from "@/components/filtration";
import styles from "@/app/item-list/item-list.module.css";

export default function ClientItemList({ itemListSlug, initialData }) {
  const dispatch = useDispatch();
  const { data: fetchedCharactersListData, loading, error, filters } = useSelector((state) => state.characters);


  useEffect(() => {
    dispatch(setItemListSlug(itemListSlug));
    dispatch(fetchCharactersList({ itemListSlug, filters, initialData }));
  }, [dispatch, itemListSlug]);


  return (
    <div className={styles.background}>
      <main className={styles.container}>
        <Filtration itemListSlug={itemListSlug} />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul className={styles.itemList}>
            {fetchedCharactersListData.map((item) => (
              <li key={item.id} className={styles.li}>
                <Link href={`/item-page/${item.name}`}>
                  <img src={item.mini_img} alt={item.name} className={styles.characterImage} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}




