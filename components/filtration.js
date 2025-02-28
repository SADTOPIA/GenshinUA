import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./filtration.module.css";
import { filterActions } from "@/store/filter-slice";
import { fetchCharactersList } from "@/store/characters-list-slice";

export default function Filtration({ itemListSlug }) {
  const dispatch = useDispatch();
  const { selectedFilters, searchQuery } = useSelector((state) => state.filter);

  console.log("🔥 Текущие фильтры:", selectedFilters);
  console.log("🔍 Поисковый запрос:", searchQuery);

  const categories = {
    stars: ["4*", "5*"],
    weapons: ["sword", "bow", "catalyst", "polearm", "claymore"],
    elements: ["pyro", "hydro", "anemo", "electro", "dendro", "cryo", "geo"],
  };

  // Обновление строки поиска
  const updateSearchQuery = (e) => {
    const query = e.target.value;
    dispatch(filterActions.setSearchQuery(query.trim())); // Убираем лишние пробелы
  };

  // Обновление фильтров
  const updateFilter = (filterType, value) => {
    let updatedFilters = { ...selectedFilters };

    if (updatedFilters[filterType]?.includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
    } else {
      updatedFilters[filterType] = [...(updatedFilters[filterType] || []), value];
    }

    console.log("🔄 Обновленные фильтры:", updatedFilters);
    dispatch(filterActions.setFilters(updatedFilters));
  };

  // Отправка запроса при изменении фильтров или поиска
  useEffect(() => {
    const filtersToSend = {
      stars: selectedFilters.stars || [],
      weapons: selectedFilters.weapons || [],
      elements: selectedFilters.elements || [],
      name: searchQuery || "",
    };

    console.log("🚀 Отправка запроса с фильтрами:", filtersToSend);
    dispatch(fetchCharactersList({ itemListSlug, filters: filtersToSend }));
  }, [selectedFilters, searchQuery, itemListSlug, dispatch]);

  const renderButtons = (items, filterType) =>
    items.map((item) => (
      <button
        type="button"
        key={item}
        className={`${styles.button} ${selectedFilters[filterType]?.includes(item) ? styles.active : ""}`}
        onClick={() => updateFilter(filterType, item)}
      >
        {item}
      </button>
    ));

  return (
    <div>
      <div className={styles.centerDiv}>{renderButtons(categories.stars, "stars")}</div>
      <div className={styles.centerDiv}>
        {(itemListSlug === "characters" || itemListSlug === "weapons") && renderButtons(categories.weapons, "weapons")}
      </div>
      <div className={styles.centerDiv}>
        {itemListSlug === "characters" && renderButtons(categories.elements, "elements")}
      </div>
      <div className={styles.inputDiv}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={updateSearchQuery}
        />
      </div>
    </div>
  );
}



