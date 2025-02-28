// 'use client';
//
// import { useDispatch, useSelector } from "react-redux";
// import { useCallback } from "react";
// import debounce from "lodash.debounce";
// import styles from "./filtration.module.css";
// import { filterActions } from "@/store/filter-slice";
// import { fetchCharactersList } from "@/store/characters-list-slice";
//
// export default function Filtration({ itemListSlug }) {
//   const dispatch = useDispatch();
//   const { selectedFilters, inputQuery, searchQuery } = useSelector((state) => state.filter);
//
//   const categories = {
//     stars: ["All", "4*", "5*"],
//     weapons: ["All", "sword", "bow", "catalyst", "polearm", "claymore"],
//     elements: [
//       "All",
//       "pyro",
//       "hydro",
//       "anemo",
//       "electro",
//       "dendro",
//       "cryo",
//       "geo",
//     ],
//   };
//
//   // Дебаунсинг для функции поиска
//   const debouncedSearch = useCallback(
//     debounce((query) => {
//       dispatch(filterActions.setSearchQuery(query));
//       fetchFilteredData({ ...selectedFilters, name: query });
//     }, 500), //
//     [dispatch, selectedFilters]
//   );
//
//   const updateSearchQuery = (e) => {
//     const query = e.target.value;
//     dispatch(filterActions.setInputQuery(query));
//     debouncedSearch(query);
//   };
//
//   const fetchFilteredData = (currentFilters) => {
//     const filtersToSend = Object.fromEntries(
//       Object.entries(currentFilters).filter(([_, value]) => value.length > 0)
//     );
//     console.log('filtersToSend: ',filtersToSend);
//     dispatch(fetchCharactersList({ itemListSlug, filters: filtersToSend }));
//   };
//
//   const updateFilter = (filterType, value) => {
//     const updatedFilters = { ...selectedFilters };
//
//     if (value === 'All') {
//       updatedFilters[filterType] = [];
//     } else {
//       const filterValues = updatedFilters[filterType] || [];
//       const index = filterValues.indexOf(value);
//
//       if (index > -1) {
//         updatedFilters[filterType] = filterValues.filter((item) => item !== value);
//       } else {
//         updatedFilters[filterType] = [...filterValues, value];
//       }
//     }
//
//     dispatch(filterActions.setFilter({ filterType, value }));
//     fetchFilteredData(updatedFilters);
//
//     console.log('updatedFilters',updatedFilters);
//   };
//
//   const renderButtons = (items, filterType) =>
//     items.map((item) => (
//       <button
//         type="button"
//         key={item}
//         className={`${styles.button} ${
//           selectedFilters[filterType]?.includes(item) ? styles.active : ""
//         }`}
//         onClick={() => updateFilter(filterType, item)}
//       >
//         {item}
//       </button>
//     ));
//
//   return (
//     <div>
//       <div className={styles.centerDiv}>
//         {renderButtons(categories.stars, "stars")}
//       </div>
//       <div className={styles.centerDiv}>
//         {(itemListSlug === "characters" || itemListSlug === "weapons") && renderButtons(categories.weapons, "weapons")}
//       </div>
//       <div className={styles.centerDiv}>
//         {itemListSlug === "characters" && renderButtons(categories.elements, "elements")}
//       </div>
//       <div className={styles.inputDiv}>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="Search..."
//           value={inputQuery}
//           onChange={updateSearchQuery}
//         />
//       </div>
//     </div>
//   );
// }
///////////////////////////////////////////////////////////////////////////////////



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
      searchQuery: searchQuery || "",
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






//////////////////////////////////////////////////////////////////////////////////
// "use client";
//
// import debounce from "lodash.debounce";
// import { useDispatch, useSelector } from "react-redux";
// import { filterActions } from "@/store/filter-slice";
// import { fetchCharactersList } from "@/store/characters-list-slice";
// import { revalidateItemList } from "@/lib/revalidate-path";
//
// import styles from "./filtration.module.css";
//
// export default function Filtration({ itemListSlug }) {
//   const dispatch = useDispatch();
//   const { selectedFilters, inputQuery } = useSelector((state) => state.filter);
//
//   const categories = {
//     stars: ["All", "4*", "5*"],
//     weapons: ["All", "sword", "bow", "catalyst", "polearm", "claymore"],
//     elements: [
//       "All",
//       "pyro",
//       "hydro",
//       "anemo",
//       "electro",
//       "dendro",
//       "cryo",
//       "geo",
//     ],
//   };
//
//   // Дебаунсинг для поиска
//   const debouncedSearch = debounce((query) => {
//     dispatch(filterActions.setSearchQuery(query));
//     fetchFilteredData({ ...selectedFilters, name: query });
//   }, 500);
//
//   const updateSearchQuery = (e) => {
//     const query = e.target.value;
//     dispatch(filterActions.setInputQuery(query));
//     debouncedSearch(query);
//   };
//
//   const fetchFilteredData = async (currentFilters) => {
//     const filtersToSend = Object.fromEntries(
//       Object.entries(currentFilters).filter(([_, value]) => value.length > 0)
//     );
//     dispatch(fetchCharactersList({ itemListSlug, filters: filtersToSend }));
//     await revalidateItemList("itemListSlug");
//
//   };
//
//   const updateFilter = (filterType, value) => {
//     const updatedFilters = { ...selectedFilters };
//
//     if (value === "All") {
//       updatedFilters[filterType] = [];
//     } else {
//       const filterValues = updatedFilters[filterType] || [];
//       const index = filterValues.indexOf(value);
//
//       if (index > -1) {
//         updatedFilters[filterType] = filterValues.filter((item) => item !== value);
//       } else {
//         updatedFilters[filterType] = [...filterValues, value];
//       }
//     }
//
//     dispatch(filterActions.setFilter({ filterType, value }));
//     fetchFilteredData(updatedFilters);
//
//   };
//
//   const renderButtons = (items, filterType) =>
//     items.map((item) => (
//       <button
//         type="button"
//         key={item}
//         className={`${styles.button} ${
//           selectedFilters[filterType]?.includes(item) ? styles.active : ""
//         }`}
//         onClick={() => updateFilter(filterType, item)}
//       >
//         {item}
//       </button>
//     ));
//
//   return (
//     <div>
//       <div className={styles.centerDiv}>{renderButtons(categories.stars, "stars")}</div>
//       <div className={styles.centerDiv}>
//         {(itemListSlug === "characters" || itemListSlug === "weapons") &&
//           renderButtons(categories.weapons, "weapons")}
//       </div>
//       <div className={styles.centerDiv}>
//         {itemListSlug === "characters" && renderButtons(categories.elements, "elements")}
//       </div>
//       <div className={styles.inputDiv}>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="Search..."
//           value={inputQuery}
//           onChange={updateSearchQuery}
//         />
//       </div>
//     </div>
//   );
// }