import { useLocalSearchParams } from 'expo-router';
import { ChatScreen } from '@/features/profile/screens';

export default function VendorChatPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return <ChatScreen vendorId={id} />;
}
