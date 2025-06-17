import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

export default function FavScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const stock = 10;

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const favs = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        favs.push({ 
          id: doc.id,
          productId: data.productId,
          name: data.name,
          image: data.image, 
          price: data.price,
          brand: data.brand
        });
      });

      setFavorites(favs);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      Alert.alert('Error', 'Gagal memuat daftar favorit');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchFavorites);
    return unsubscribe;
  }, [navigation]);

  const removeFavorite = async (id) => {
    try {
      await deleteDoc(doc(db, 'favorites', id));
      fetchFavorites();
      Alert.alert('Berhasil', 'Produk dihapus dari favorit');
    } catch (error) {
      console.error('Error removing favorite:', error);
      Alert.alert('Error', 'Gagal menghapus favorit');
    }
  };

  const handleConfirmPurchase = async () => {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid quantity.');
      return;
    }
    if (qty > stock) {
      Alert.alert('Out of Stock', `Only ${stock} items available.`);
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Incomplete Form', 'Please fill all fields.');
      return;
    }

    setPurchaseLoading(true);
    try {
      await addDoc(collection(db, 'purchases'), {
        productId: selectedProduct.productId,
        productName: selectedProduct.name,
        quantity: qty,
        buyerName: name.trim(),
        buyerPhone: phone.trim(),
        buyerAddress: address.trim(),
        price: selectedProduct.price,
        createdAt: serverTimestamp(),
      });
      setPurchaseLoading(false);
      Alert.alert('Success', `Thank you for purchasing ${qty} x ${selectedProduct.name}!`);
      setModalVisible(false);
      // Reset form
      setQuantity('1');
      setName('');
      setPhone('');
      setAddress('');
    } catch (error) {
      setPurchaseLoading(false);
      Alert.alert('Error', 'Failed to process purchase.');
      console.error(error);
    }
  };

  const openDetailModal = (item) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openDetailModal(item)}
          >
            <Text style={styles.buttonText}>Detail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.removeButton]}
            onPress={() => removeFavorite(item.id)}
          >
            <Text style={styles.buttonText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-dislike" size={50} color="#ccc" />
        <Text style={styles.emptyText}>Belum ada produk favorit</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Favorit</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Purchase Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              <Text style={styles.modalTitle}>Complete Your Purchase</Text>
              
              {selectedProduct && (
                <View style={styles.modalProduct}>
                  <Image 
                    source={typeof selectedProduct.image === 'string' ? { uri: selectedProduct.image } : selectedProduct.image}
                    style={styles.modalProductImage}
                  />
                  <View>
                    <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                    <Text style={styles.modalProductPrice}>{selectedProduct.price}</Text>
                  </View>
                </View>
              )}

              <Text style={styles.modalLabel}>Quantity</Text>
              <TextInput
                style={styles.modalInput}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />

              <Text style={styles.modalLabel}>Your Information</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <TextInput
                style={[styles.modalInput, styles.multilineInput]}
                placeholder="Shipping Address"
                multiline
                value={address}
                onChangeText={setAddress}
              />

              {purchaseLoading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={handleConfirmPurchase}
                >
                  <Text style={styles.modalButtonText}>CONFIRM PURCHASE</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    marginBottom: 12,
  },
  brand: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  removeButton: {
    backgroundColor: '#ffecec',
  },
  buttonText: {
    fontWeight: '600',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalScrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalProduct: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  modalProductImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: 'contain',
  },
  modalProductName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  modalProductPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});