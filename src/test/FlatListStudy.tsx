import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}
const DATA = [
  { id: '1', title: 'Apple', color: '#FF6B6B' },
  { id: '2', title: 'Banana', color: '#FFD93D' },
  { id: '3', title: 'Cherry', color: '#FF4757' },
  { id: '4', title: 'Grape', color: '#A78BFA' },
  { id: '5', title: 'Mango', color: '#FFA94D' },
  { id: '6', title: 'Orange', color: '#FF8C42' },
  { id: '7', title: 'Peach', color: '#FFB3BA' },
  { id: '8', title: 'Plum', color: '#9B5DE5' },
  { id: '9', title: 'Watermelon', color: '#51CF66' },
  { id: '10', title: 'Lemon', color: '#F9E547' },
  { id: '11', title: 'Pineapple', color: '#FFD23F' },
  { id: '12', title: 'Strawberry', color: '#FF6392' },
  { id: '13', title: 'Blueberry', color: '#4D96FF' },
  { id: '14', title: 'Kiwi', color: '#8AC926' },
  { id: '15', title: 'Papaya', color: '#FF9F1C' },
  { id: '16', title: 'Coconut', color: '#C9ADA7' },
  { id: '17', title: 'Guava', color: '#7BC950' },
  { id: '18', title: 'Pomegranate', color: '#C1121F' },
  { id: '19', title: 'Apricot', color: '#FFA07A' },
  { id: '20', title: 'Fig', color: '#6A4C93' },
];

const FlatListStudy: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      {DATA.map(item => {
        return (
          <View
            style={[styles.item, { backgroundColor: item.color }]}
            key={item.id}
          >
            <Text style={styles.title}>{item.title}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default FlatListStudy;
