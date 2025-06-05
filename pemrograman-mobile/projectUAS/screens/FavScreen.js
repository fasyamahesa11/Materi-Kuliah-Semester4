import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function FavScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchFavorites() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const favs = [];
      querySnapshot.forEach((doc) => {
        favs.push({ id: doc.id, ...doc.data() });
      });
      setFavorites(favs);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await deleteDoc(doc(db, 'favorites', id));
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() =>
              navigation.navigate('DetailScreen', {
                product: {
                  id: item.productId,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                },
              })
            }
          >
            <Text style={styles.detailButtonText}>Detail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item.id)}
          >
            <Text style={styles.removeButtonText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18, color: '#555' }}>Belum ada produk favorit.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#27ae60',
    marginVertical: 4,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailButton: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
