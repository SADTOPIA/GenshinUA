'use client'

import NavBar from "@/components/nav-bar/page";
import styles from "../item-list.module.css";
import Filtration from "@/components/filtration/page";

import { useSelector, useDispatch } from "react-redux";
import { fetchCharactersList } from "../../../store/characters-list-slice";

import Link from "next/link";
import {use, useEffect} from "react";


export default  function ItemListSlugPage({params}){
  const {itemListSlug} = use(params);
  const dispatch = useDispatch();
  const { data: fetchedCharactersListData, loading, error } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchCharactersList({ itemListSlug, filters: {} }));
  }, [dispatch, itemListSlug]);

  return (
    <div className={styles.background}>
      <NavBar />
      <main className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <Filtration itemListSlug={itemListSlug} />
            <ul className={styles.itemList}>
              {fetchedCharactersListData.map((item) => (
                <li key={item.id} className={styles.li}>
                  <Link href={`/item-page/${item.name}`}>
                    <img
                      src={item.mini_img}
                      alt={item.name}
                      className={styles.characterImage}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}