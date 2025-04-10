import { Pressable } from 'react-native-gesture-handler';
import { FontSize, Margin, TailwindColor } from '@/constants/styles';

import { ThemedText as Text } from './ThemedText';

export default function Button({
  onPress,
  title,
  disabled,
}: {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <Pressable
      hitSlop={{ top: 16, left: 16, bottom: 16, right: 16 }}
      disabled={disabled}
      onPress={onPress}
    >
      {({ pressed }) => {
        return (
          <Text
            lightColor={
              disabled ? TailwindColor['gray-500'] : TailwindColor['blue-500']
            }
            darkColor={
              disabled ? TailwindColor['gray-500'] : TailwindColor['white']
            }
            style={{
              fontSize: FontSize.xl,
              marginTop: Margin[1],
              marginBottom: Margin[4],
              textAlign: 'center',
              opacity: pressed ? 0.5 : 1,
            }}
          >
            {title}
          </Text>
        );
      }}
    </Pressable>
  );
}
