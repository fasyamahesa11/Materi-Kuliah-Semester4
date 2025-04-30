import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const products = [
  {
    id: '1',
    name: 'Rangriti Blue Printed A-Line Dress',
    price: '₹1079',
    discount: '30% Off',
    image: require('../assets/jeans.jpg'),
  },
  {
    id: '2',
    name: 'GAP Purple Full Length Shirt Dress',
    price: '₹2098',
    discount: '30% Off',
    image: require('../assets/kaospolos.jpg'),
  },
  {
    id: '3',
    name: 'PlusS Mustard Floral Print Dress',
    price: '₹809',
    discount: '30% Off',
    image: require('../assets/kaospolos.jpg'),
  },
  {
    id: '4',
    name: 'PlusS Yellow Printed Below Knee Dress',
    price: '₹689',
    discount: '30% Off',
    image: require('../assets/kaospolos.jpg'),
  },
];

export default function ProductListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('DetailScreen', { product: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.discount}>{item.discount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  image: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  discount: {
    fontSize: 12,
    color: 'green',
    marginTop: 2,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    fontSize: 14,
    fontWeight: '500',
  },
});
