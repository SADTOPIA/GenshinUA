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

  const updateFilter = (filterType, value) => {
    const updatedFilters = { ...selectedFilters };

    if (value === 'All') {
      updatedFilters[filterType] = [];
    } else {
      const filterValues = updatedFilters[filterType] || [];
      const index = filterValues.indexOf(value);

      if (index > -1) {
        updatedFilters[filterType] = filterValues.filter((item) => item !== value);
      } else {
        updatedFilters[filterType] = [...filterValues, value];
      }
    }

    dispatch(filterActions.setFilter({ filterType, value }));
    fetchFilteredData(updatedFilters);
  };

  const fetchFilteredData = (currentFilters) => {
    const filtersToSend = Object.fromEntries(
      Object.entries(currentFilters).filter(([_, value]) => value.length > 0)
    );

    dispatch(fetchCharactersList({ itemListSlug, filters: filtersToSend }));
  };

  const updateSearchQuery = (e) => {
    const query = e.target.value;
    dispatch(filterActions.setSearchQuery(query));
    fetchFilteredData({ ...selectedFilters, name: query });
  };

  const renderButtons = (items, filterType) =>
    items.map((item) => (
      <button
        type="button"
        key={item}
        className={`${styles.button} ${
          selectedFilters[filterType]?.includes(item) ? styles.active : ""
        }`}
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
        {renderButtons(categories.weapons, "weapons")}
      </div>
      <div className={styles.centerDiv}>
        {renderButtons(categories.elements, "elements")}
      </div>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={updateSearchQuery}
        />
      </div>
    </div>
  );
}
