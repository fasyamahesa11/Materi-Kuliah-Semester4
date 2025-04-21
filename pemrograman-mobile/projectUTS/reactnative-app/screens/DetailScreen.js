import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const otherProducts = [
  {
    id: '5',
    name: 'Zara Floral Maxi Dress',
    price: '₹1199',
    discount: '20% Off',
    image: require('../assets/kaospolos.jpg'),
  },
  {
    id: '6',
    name: 'H&M Casual Fit Dress',
    price: '₹1399',
    discount: '25% Off',
    image: require('../assets/jeans.jpg'),
  },
  {
    id: '7',
    name: 'Uniqlo Linen Blend Shirt Dress',
    price: '₹1799',
    discount: '15% Off',
    image: require('../assets/kets.jpg'),
  },
];

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendCard}
      onPress={() => navigation.push('DetailScreen', { product: item })}
    >
      <Image source={item.image} style={styles.recommendImage} />
      <Text style={styles.recommendName}>{item.name}</Text>
      <Text style={styles.recommendPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.discount}>{product.discount}</Text>
      <Text style={styles.desc}>
        Produk ini nyaman dipakai dan cocok untuk berbagai suasana. Tersedia dalam berbagai ukuran.
      </Text>

      <Text style={styles.sectionTitle}>Produk Lainnya</Text>
      <FlatList
        data={otherProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    marginTop: 4,
  },
  discount: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  recommendCard: {
    marginRight: 10,
    width: 140,
  },
  recommendImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  recommendName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  recommendPrice: {
    fontSize: 13,
    color: '#444',
  },
});
