import ClientItemList from "@/components/ClientItemList";
import { fetchItemList } from "@/lib/fetch-requests";

export default async function ItemListSlugPage({ params }) {
  const { itemListSlug } = params;

  const initialData = await fetchItemList({ itemListSlug, filters: {} });

  return <ClientItemList itemListSlug={itemListSlug} initialData={initialData} />;
}
