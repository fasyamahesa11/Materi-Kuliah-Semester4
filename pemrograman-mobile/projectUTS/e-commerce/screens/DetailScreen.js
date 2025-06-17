import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function DetailScreen({ route }) {
  const { product } = route.params;

  const handleAddToBag = () => {
    Alert.alert('Berhasil', `${product.name} berhasil ditambahkan ke bag!`);
  };

  const handleChatCS = () => {
    Alert.alert('Chat CS', 'Menghubungkan dengan customer service...');
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Rp 2.999.000</Text>
      <Text style={styles.desc}>
        Tas elegan cocok untuk berbagai acara. Material kulit sintetis premium.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToBag}>
        <Text style={styles.buttonText}>Add to Bag</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.chat} onPress={handleChatCS}>
        <Text style={styles.chatText}>Chat CS</Text>
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: '#8B5E3C',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B5E3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  chat: {
    borderColor: '#8B5E3C',
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  chatText: {
    color: '#8B5E3C',
    fontWeight: '600',
  },
});
