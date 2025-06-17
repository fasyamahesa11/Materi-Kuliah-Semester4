import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const bags = [
  { name: 'Mini Bag', image: require('../assets/shoes1.webp') },
  { name: 'Tote Bag', image: require('../assets/shoes2.webp') },
  { name: 'Backpack', image: require('../assets/shoes2.webp') },
];

export default function ShoesCategory() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bags Collection</Text>
      <View style={styles.grid}>
        {bags.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  name: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
  },
});
