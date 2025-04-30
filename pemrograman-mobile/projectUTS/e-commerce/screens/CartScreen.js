import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CartScreen({ route }) {
  const { product } = route.params;
  const price = 9495;
  const discount = 237;
  const shipping = 0; // Atur 0 biar totalnya pas kayak screenshot kamu

  const total = price + shipping - discount;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.productRow}>
          <Image source={product.image} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.discountText}>(40%) Off Coupon Applicable</Text>
            <Text>Delivery By 21st July</Text>
            <Text style={styles.save}>SAVE</Text>
            <Text style={styles.qty}>Qty: 1</Text>
          </View>
        </View>
      </View>

      <View style={styles.summary}>
        <Text>Bag Total: ₹{price}</Text>
        <Text>Shipping Charge: ₹{shipping}</Text>
        <Text>Product Discount: -₹{discount}</Text>
        <Text style={styles.total}>Total Payable: ₹{total}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={{ color: '#fff' }}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    marginVertical: 5,
  },
  discountText: {
    color: 'green',
    fontSize: 12,
  },
  save: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  qty: {
    marginTop: 5,
  },
  summary: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkoutButton: {
    marginTop: 30,
    backgroundColor: '#d81b60',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
});
