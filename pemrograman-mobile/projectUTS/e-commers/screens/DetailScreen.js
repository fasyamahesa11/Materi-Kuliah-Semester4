import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.description}>short description</Text>
        <Text style={styles.discount}>(40%)</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>ADD TO BAG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buyButton]}
          onPress={() => navigation.navigate('CartScreen', { product })}
        >
          <Text style={{ color: '#fff' }}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    color: 'gray',
    marginTop: 10,
  },
  discount: {
    marginTop: 5,
    color: 'green',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#eee',
    alignItems: 'center',
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#d81b60',
    marginRight: 0,
  },
});
