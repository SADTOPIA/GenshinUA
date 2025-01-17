'use client'

import { fetchDataItem } from '../../../lib/dataFetcher';
import styles from '../item-page.module.css';
import NavBar from "@/components/nav-bar/page";
import {useEffect, useState} from "react";
import { use } from 'react';

export default function ItemPage({params}) {
  const {itemPageSlug} = use(params);
  // const data = await fetchDataItem(itemPageSlug);
  // let filter = {};

  const [fetchedCharacterData, setFetchedCharacterData] = useState([]);
  const [loading, setLoading] = useState(true);

  // let filter = {};

  useEffect(() => {
    async function characterDataReceiver() {
      try {
        setLoading(true);
        const filter = {}; // Define your filter here if needed
        const data = await fetchDataItem(itemPageSlug);
        setFetchedCharacterData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    characterDataReceiver();
  }, [itemPageSlug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.background}>
      <NavBar />
      <div className={styles.mainContainer}>
        <div className={styles.section}>
          <div className={styles.imageContainer}>
            <img
              src={fetchedCharacterData.img}
              alt={fetchedCharacterData.name}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>{fetchedCharacterData.description}</div>
            <div className={styles.infoBox}>Graph</div>
          </div>
          <div className={styles.chartContainer}>Chart Section</div>
        </div>

      {/*  <div className={styles.secondarySection}>*/}
      {/*    <div className={styles.thumbnailContainer}>*/}
      {/*      <img*/}
      {/*        src={fetchedCharacterData.mini_img}*/}
      {/*        alt={fetchedCharacterData.name}*/}
      {/*        className={styles.itemImg}*/}
      {/*        style={{ width: '100px', height: '100px', objectFit: 'cover' }}*/}
      {/*      />*/}
      {/*      <div className={styles.textContainer}>{fetchedCharacterData.weapons[0].name}</div>*/}
      {/*      <div className={styles.verdictContainer}>{fetchedCharacterData.weapons[0].passive}</div>*/}
      {/*    </div>*/}

      {/*    */}

      {/*    <div className={styles.thumbnailContainer}>*/}
      {/*      <img*/}
      {/*        src={fetchedCharacterData.mini_img}*/}
      {/*        alt={fetchedCharacterData.name}*/}
      {/*        className={styles.itemImg}*/}
      {/*        style={{ width: '100px', height: '100px', objectFit: 'cover' }}*/}
      {/*      />*/}
      {/*      <div className={styles.textContainer}>{fetchedCharacterData.weapons[1].name}</div>*/}
      {/*      <div className={styles.verdictContainer}>{fetchedCharacterData.weapons[1].passive}</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

        <div className={styles.secondarySection}>
          <div className={styles.thumbnailContainer}>
            <div className={styles.imageContainer}>
              <img
                src={fetchedCharacterData.img}
                alt={fetchedCharacterData.name}
                className={styles.mainImage}
              />
            </div>

            <div className={styles.verdictContainer}>
              <div className={styles.textContainer}>
                <img
                  src={fetchedCharacterData.mini_img}
                  alt={fetchedCharacterData.name}
                  className={styles.itemImg}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.textContainer}>{fetchedCharacterData.name}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.description}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.stars}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.element}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.birthday}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.weapon}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.region}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.release_date}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.hp}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.atc}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.deff}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.flex}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.flex_name}</div>
              <div className={styles.textContainer}>{fetchedCharacterData.signature_weapon_id}</div>
            </div>
          </div>


        </div>

        <div className={styles.secondarySection}>
          {fetchedCharacterData.weapons.map((weapon, index) => (
            <div key={index}>
            <div  className={styles.thumbnailContainer}>
              <img
                src={fetchedCharacterData.mini_img}
                alt={weapon.name}
                className={styles.itemImg}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div className={styles.textContainer}>{weapon.name}</div>
              <div className={styles.verdictContainer}>{weapon.passive}</div>
            </div>
             <hr className={styles.separator} />
            </div>
          ))}
        </div>

        <div className={styles.secondarySection}>
          {fetchedCharacterData.constellations.map((constellations, index) => (
            <div key={index}>
              <div  className={styles.thumbnailContainer}>
                <img
                  src={fetchedCharacterData.mini_img}
                  alt={constellations.name}
                  className={styles.itemImg}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className={styles.textContainer}>{constellations.name}</div>
                <div className={styles.verdictContainer}>{constellations.description}</div>
              </div>
              <hr className={styles.separator} />
            </div>
          ))}
        </div>

        <div className={styles.secondarySection}>
          {fetchedCharacterData.talents.map((talents, index) => (
            <div key={index}>
              <div  className={styles.thumbnailContainer}>
                <img
                  src={fetchedCharacterData.mini_img}
                  alt={talents.name}
                  className={styles.itemImg}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className={styles.textContainer}>{talents.name}</div>
                <div className={styles.verdictContainer}>{talents.type}</div>
                <div className={styles.verdictContainer}>{talents.description}</div>
              </div>
              <hr className={styles.separator} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}