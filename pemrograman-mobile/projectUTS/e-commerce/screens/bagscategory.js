import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const bags = [
  { name: 'Mini Bag', image: require('../assets/bag1.webp') },
  { name: 'Tote Bag', image: require('../assets/bag2.webp') },
  { name: 'Backpack', image: require('../assets/bag3.webp') },
];

export default function BagsCategory() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bags Collection</Text>
      <View style={styles.grid}>
        {bags.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('DetailScreen', { product: item })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
