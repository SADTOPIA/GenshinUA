import styles from "./filtration.module.css";

export default function Filtration() {
  const categories = {
    rarity: ["All", "4*", "5*"],
    weapons: ["All", "sword", "bow", "catalyst", "spear", "claymore"],
    elements: [
      "All",
      "pyro",
      "hydro",
      "anemo",
      "electro",
      "dendro",
      "cryo",
      "geo",
    ],
  };

  const renderButtons = (items) =>
    items.map((item) => (
      <button key={item} className={styles.button}>
        {item}
      </button>
    ));

  return (
    <div>
      <div className={styles.centerDiv}>{renderButtons(categories.rarity)}</div>
      <div className={styles.centerDiv}>{renderButtons(categories.weapons)}</div>
      <div className={styles.centerDiv}>{renderButtons(categories.elements)}</div>
      <div className={styles.input}>
        <input />
      </div>
    </div>
  );
}