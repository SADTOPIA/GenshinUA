import styles from "./filtration.module.css";


export default function Filtration({charactersData}) {
  // console.log(charactersData);
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
  
  // let filter = {};

  // const setFilter = async(data) => {
  //   'use server'
  //   const itemId = data.get("itemId");
  //   console.log(itemId);
  //   filter.weapon = itemId;
  //   const newCharacterFilter = await fetchDataListItems(filter);
  //
  //
  // }

  // const renderButtons = (items) =>
  //   items.map((item) => (
  //     <form action={setFilter}>
  //       <input name="itemId" className="hidden" value={item} readOnly/>
  //       <button type="submit" key={item} className={styles.button}>
  //       {item}
  //       </button>
  //     </form>
  //   ));

  const renderButtons = (items) =>
    items.map((item) => (
        <button type="submit" key={item} className={styles.button}>
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