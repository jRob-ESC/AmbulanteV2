import { useLocalSearchParams } from 'expo-router';
import { VendorCatalogScreen } from '@/features/products/screens';

export default function VendorCatalogPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return <VendorCatalogScreen vendorId={id} />;
}
