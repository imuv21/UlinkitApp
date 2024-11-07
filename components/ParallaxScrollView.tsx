import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{
  bgColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({ children, bgColor }: Props) {

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor.light }]}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
