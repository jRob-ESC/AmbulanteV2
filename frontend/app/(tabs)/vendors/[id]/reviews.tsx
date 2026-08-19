import { useLocalSearchParams } from 'expo-router';
import { ReviewsScreen } from '@/features/profile/screens';

export default function VendorReviewsPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return <ReviewsScreen vendorId={id} />;
}
