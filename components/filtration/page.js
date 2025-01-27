'use client';

import { useDispatch, useSelector } from "react-redux";
import styles from "./filtration.module.css";
import { filterActions } from "@/store/filter-slice";
import { fetchCharactersList } from "@/store/characters-list-slice";

export default function Filtration({ itemListSlug }) {
  const dispatch = useDispatch();
  const { selectedFilters, searchQuery } = useSelector((state) => state.filter);

  const categories = {
    stars: ["All", "4*", "5*"],
    weapons: ["All", "sword", "bow", "catalyst", "polearm", "claymore"],
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

  // Функция для обновления фильтров
  const updateFilter = (filterType, value) => {
    const updatedFilters = {
      ...selectedFilters,
      // Если фильтр "All", убираем его (не передаем)
      [filterType]: value === 'All' ? undefined : value
    };

    dispatch(filterActions.setFilter({ filterType, value })); // Обновляем фильтр в Redux
    fetchFilteredData(updatedFilters); // Запрос с обновленными фильтрами
  };

  const fetchFilteredData = (currentFilters) => {
    // Отправляем запрос с текущими фильтрами
    // Убираем фильтры, которые равны undefined или "All" (чтобы они не попадали в запрос)
    const filtersToSend = Object.fromEntries(
      Object.entries(currentFilters).filter(([key, value]) => value && value !== 'All')
    );

    dispatch(fetchCharactersList({ itemListSlug, filters: filtersToSend }));
  };

  // Функция для обновления поискового запроса
  const updateSearchQuery = (e) => {
    const query = e.target.value;
    dispatch(filterActions.setSearchQuery(query)); // Обновляем поисковый запрос в Redux
    fetchFilteredData({ ...selectedFilters, name: query }); // Запрос с фильтрами и новым поисковым запросом
  };

  const renderButtons = (items, filterType) =>
    items.map((item) => (
      <button
        type="button"
        key={item}
        className={styles.button}
        onClick={() => updateFilter(filterType, item)}
      >
        {item}
      </button>
    ));

  return (
    <div>
      <div className={styles.centerDiv}>
        {renderButtons(categories.stars, "stars")}
      </div>
      <div className={styles.centerDiv}>
        {renderButtons(categories.weapons, "weapon")}
      </div>
      <div className={styles.centerDiv}>
        {renderButtons(categories.elements, "element")}
      </div>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery} // Связываем значение поиска с состоянием Redux
          onChange={updateSearchQuery}
        />
      </div>
    </div>
  );
}


// 'use client';
//
// import { useDispatch, useSelector } from "react-redux";
// import styles from "./filtration.module.css";
// import { filterActions } from "@/store/filter-slice";
// import { fetchCharactersList } from "@/store/characters-list-slice";
//
// export default function Filtration({ itemListSlug }) {
//   const dispatch = useDispatch();
//   const { selectedFilters, searchQuery } = useSelector((state) => state.filter);
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
//   // Функция для обновления фильтров
//   const updateFilter = (filterType, value) => {
//     const updatedFilters = { ...selectedFilters };
//
//     // Если фильтр "All", удаляем его (не передаем)
//     if (value === 'All') {
//       delete updatedFilters[filterType];
//     } else {
//       // Если фильтр уже существует
//       if (updatedFilters[filterType]) {
//         if (Array.isArray(updatedFilters[filterType])) {
//           const index = updatedFilters[filterType].indexOf(value);
//           if (index === -1) {
//             updatedFilters[filterType].push(value); // Добавляем значение в массив
//           } else {
//             updatedFilters[filterType].splice(index, 1); // Удаляем значение из массива, если оно уже есть
//           }
//         } else {
//           // Если значение фильтра не массив, то создаем массив с текущим значением
//           updatedFilters[filterType] = [updatedFilters[filterType], value];
//         }
//       } else {
//         // Если фильтр не существует, создаем новый массив с выбранным значением
//         updatedFilters[filterType] = [value];
//       }
//     }
//
//     dispatch(filterActions.setFilter({ filterType, value })); // Обновляем фильтр в Redux
//     fetchFilteredData(updatedFilters); // Запрос с обновленными фильтрами
//   };
//
//   const fetchFilteredData = (currentFilters) => {
//     // Отправляем запрос с текущими фильтрами
//     // Убираем фильтры, которые равны undefined или "All" (чтобы они не попадали в запрос)
//     const filtersToSend = Object.fromEntries(
//       Object.entries(currentFilters).filter(([key, value]) => value && value !== 'All')
//     );
//
//     dispatch(fetchCharactersList({ itemListSlug, filters: filtersToSend }));
//   };
//
//   // Функция для обновления поискового запроса
//   const updateSearchQuery = (e) => {
//     const query = e.target.value;
//     dispatch(filterActions.setSearchQuery(query)); // Обновляем поисковый запрос в Redux
//     fetchFilteredData({ ...selectedFilters, name: query }); // Запрос с фильтрами и новым поисковым запросом
//   };
//
//   const renderButtons = (items, filterType) =>
//     items.map((item) => (
//       <button
//         type="button"
//         key={item}
//         className={styles.button}
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
//         {renderButtons(categories.weapons, "weapon")}
//       </div>
//       <div className={styles.centerDiv}>
//         {renderButtons(categories.elements, "element")}
//       </div>
//       <div className={styles.input}>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery} // Связываем значение поиска с состоянием Redux
//           onChange={updateSearchQuery}
//         />
//       </div>
//     </div>
//   );
// }
