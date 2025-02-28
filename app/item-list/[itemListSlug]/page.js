import ClientItemList from "@/components/ClientItemList";
import { fetchListCharacters } from "@/lib/fetch-requests";

export default async function ItemListSlugPage({ params }) {
  const { itemListSlug } = params;

  const initialData = await fetchListCharacters({ itemListSlug, filters: {} });

  return <ClientItemList itemListSlug={itemListSlug} initialData={initialData} />;
}
