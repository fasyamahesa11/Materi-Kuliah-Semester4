import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Kaos Polos',
    price: 'Rp 50.000',
    image: require('../assets/kaospolos.jpg'),
  },
  {
    id: '2',
    name: 'Celana Jeans',
    price: 'Rp 150.000',
    image: require('../assets/jeans.jpg'),
  },
  {
    id: '3',
    name: 'Sepatu Kets',
    price: 'Rp 300.000',
    image: require('../assets/kets.jpg'),
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selamat Datang di Toko Online!</Text>
      <Text style={styles.subtitle}>Produk Unggulan</Text>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('DetailScreen', { product: item })}
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBox: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 150,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontWeight: '600',
  },
  productPrice: {
    color: 'green',
    marginTop: 5,
  },
});