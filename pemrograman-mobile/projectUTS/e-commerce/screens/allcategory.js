// screens/AllCategory.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AllCategory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text>
      {/* Tambahkan isi produk nanti di sini */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
