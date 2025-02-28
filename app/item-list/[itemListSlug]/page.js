// 'use client'
//
// import Link from "next/link";
//
// import styles from "../item-list.module.css";
// import Filtration from "@/components/filtration";
// import {fetchListCharacters} from "@/lib/fetch-requests";
//
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCharactersList } from "../../../store/characters-list-slice";
//
// import {use, useEffect} from "react";
//
// export default  function ItemListSlugPage({params}){
//   const {itemListSlug} = use(params);
//   const dispatch = useDispatch();
//   const { data: fetchedCharactersListData, loading, error } = useSelector((state) => state.characters);
//
//   useEffect(() => {
//     dispatch(fetchCharactersList({ itemListSlug, filters: {} }));
//   }, [dispatch, itemListSlug]);
//   console.log('fetchedCharactersListData: ',fetchedCharactersListData);
//   return (
//     <div className={styles.background}>
//       <main className={styles.container}>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <>
//             <Filtration itemListSlug={itemListSlug} />
//             <ul className={styles.itemList}>
//               {fetchedCharactersListData.map((item) => (
//                 <li key={item.id} className={styles.li}>
//                   <Link href={`/item-page/${item.name}`}>
//                     <img
//                       src={item.mini_img}
//                       alt={item.name}
//                       className={styles.characterImage}
//                     />
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////////////


import ClientItemList from "@/components/ClientItemList";
import { fetchListCharacters } from "@/lib/fetch-requests";

export default async function ItemListSlugPage({ params }) {
  const { itemListSlug } = params;

  const initialData = await fetchListCharacters({ itemListSlug, filters: {} });

  return <ClientItemList itemListSlug={itemListSlug} initialData={initialData} />;
}





////////////////////////////////////////////////////////////////////////////
// import Link from "next/link";
//
// import styles from "../item-list.module.css";
// import Filtration from "@/components/filtration";
// import { fetchListCharacters } from "@/lib/fetch-requests";
//
// export default async function ItemListSlugPage({ params }) {
//   const { itemListSlug } = params;
//
//   try {
//     const fetchedCharactersListData = await fetchListCharacters({ itemListSlug, filters: {} });
//
//     console.log('fetchedCharactersListData: ',fetchedCharactersListData);
//
//     return (
//       <div className={styles.background}>
//         <main className={styles.container}>
//           <Filtration itemListSlug={itemListSlug} />
//           <ul className={styles.itemList}>
//             {fetchedCharactersListData.map((item) => (
//               <li key={item.id} className={styles.li}>
//                 <Link href={`/item-page/${item.name}`}>
//                   <img
//                     src={item.mini_img}
//                     alt={item.name}
//                     className={styles.characterImage}
//                   />
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </main>
//       </div>
//     );
//   } catch (error) {
//     return (
//       <div className={styles.background}>
//         <main className={styles.container}>
//           <p>Error: {error.message}</p>
//         </main>
//       </div>
//     );
//   }
// }