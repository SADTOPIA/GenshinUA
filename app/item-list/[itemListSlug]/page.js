'use client'

import NavBar from "@/components/nav-bar/page";
import styles from "../../page.module.css";
import Filtration from "@/components/filtration/page";

import { useSelector, useDispatch } from "react-redux";
import { fetchCharactersList } from "../../../store/characters-list-slice";

import Link from "next/link";
import {use, useEffect} from "react";


export default  function ItemListSlugPage({params}){
  const {itemListSlug} = use(params);
  const dispatch = useDispatch();
  const { data: fetchedCharactersListData, loading, error } = useSelector(
    (state) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharactersList(itemListSlug));
    console.log(itemListSlug);
  }, [dispatch, itemListSlug]);

  return (
    <div className={styles.background}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.section}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <div>
                <Filtration charactersData={fetchedCharactersListData} />
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
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
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
  );
}