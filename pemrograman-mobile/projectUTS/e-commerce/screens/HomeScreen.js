import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { name: 'All', image: require('../assets/all.webp'), route: 'AllCategory' },
  { name: 'Bags', image: require('../assets/bags.webp'), route: 'BagsCategory' },
  { name: 'Shoes', image: require('../assets/shoes.webp'), route: 'ShoesCategory' },
  { name: 'Clothing', image: require('../assets/clothing.webp'), route: 'ClothingCategory' },
  { name: 'Accessories', image: require('../assets/accessories.webp'), route: 'AccessoriesCategory' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/icon.webp')}
        style={styles.banner}
        resizeMode="cover"
      />

      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(cat.route)}
          >
            <Image source={cat.image} style={styles.image} />
            <Text style={styles.label}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf7f0', // background soft cream/beige
    paddingHorizontal: 16,
  },
  banner: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    marginVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2e2e2e',
    fontFamily: 'sans-serif',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  label: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});
