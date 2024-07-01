import { View } from 'react-native';
import Notifier from '@/components/Notifier';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Notifier />
    </View>
  );
}
