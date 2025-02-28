import styles from "../item-page.module.css";
import { fetchCharacter } from "@/lib/fetch-requests"; // Импортируем вашу функцию


export default async function ItemPage({ params }) {
  const { itemPageSlug } = params;


  const fetchedCharacterData = await fetchCharacter(itemPageSlug);

  return (
    <div className={styles.background}>
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
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>

              <div>
                {Object.entries({
                  name: fetchedCharacterData.name,
                  description: fetchedCharacterData.description,
                  stars: fetchedCharacterData.stars,
                  element: fetchedCharacterData.element,
                  birthday: fetchedCharacterData.birthday,
                  weapon: fetchedCharacterData.weapon,
                  region: fetchedCharacterData.region,
                  release_date: fetchedCharacterData.release_date,
                  hp: fetchedCharacterData.hp,
                  atc: fetchedCharacterData.atc,
                  deff: fetchedCharacterData.deff,
                  flex: fetchedCharacterData.flex,
                  flex_name: fetchedCharacterData.flex_name,
                  signature_weapon_id: fetchedCharacterData.signature_weapon_id,
                }).map(([key, value]) => (
                  <div key={key} className={styles.textContainer}>
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Вторичный раздел с оружием */}
        <div className={styles.secondarySection}>
          {fetchedCharacterData.weapons?.length > 0 ? (
            fetchedCharacterData.weapons.map((weapon, index) => (
              <div key={index}>
                <div className={styles.thumbnailContainer}>
                  <img
                    src={fetchedCharacterData.mini_img}
                    alt={weapon.name}
                    className={styles.itemImg}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className={styles.textContainer}>{weapon.name}</div>
                  <div className={styles.verdictContainer}>{weapon.passive}</div>
                </div>
                <hr className={styles.separator} />
              </div>
            ))
          ) : (
            <p>No weapons available.</p>
          )}
        </div>

        {/* Вторичный раздел с созвездиями */}
        <div className={styles.secondarySection}>
          {fetchedCharacterData.constellations?.length > 0 ? (
            fetchedCharacterData.constellations.map((constellation, index) => (
              <div key={index}>
                <div className={styles.thumbnailContainer}>
                  <img
                    src={fetchedCharacterData.mini_img}
                    alt={constellation.name}
                    className={styles.itemImg}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className={styles.textContainer}>{constellation.name}</div>
                  <div className={styles.verdictContainer}>{constellation.description}</div>
                </div>
                <hr className={styles.separator} />
              </div>
            ))
          ) : (
            <p>No constellations available.</p>
          )}
        </div>

        {/* Вторичный раздел с талантами */}
        <div className={styles.secondarySection}>
          {fetchedCharacterData.talents?.length > 0 ? (
            fetchedCharacterData.talents.map((talent, index) => (
              <div key={index}>
                <div className={styles.thumbnailContainer}>
                  <img
                    src={fetchedCharacterData.mini_img}
                    alt={talent.name}
                    className={styles.itemImg}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className={styles.textContainer}>{talent.name}</div>
                  <div className={styles.verdictContainer}>{talent.type}</div>
                  <div className={styles.verdictContainer}>{talent.description}</div>
                </div>
                <hr className={styles.separator} />
              </div>
            ))
          ) : (
            <p>No talents available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
