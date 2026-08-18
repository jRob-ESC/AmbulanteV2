import { useLocalSearchParams } from 'expo-router';
import { ProfileScreen } from '@/features/profile/screens';

export default function VendorProfilePage() {
    const { id } = useLocalSearchParams<{ id?: string }>();

    return <ProfileScreen vendorId={id} />;
}
