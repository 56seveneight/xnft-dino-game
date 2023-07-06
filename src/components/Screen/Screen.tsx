import { StyleSheet, View } from 'react-native';

type Props = {
  children: JSX.Element | JSX.Element[] | null;
};

export function Screen({ children }: Props) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
});
