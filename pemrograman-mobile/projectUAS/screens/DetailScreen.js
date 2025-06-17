import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const stock = 10;

  // Product descriptions based on category or product ID
  const productDescriptions = {
    default: `Premium quality product from ${product.brand}. This item features excellent craftsmanship and attention to detail.`,
    polo: `Inspired by East Coast preppy icons, this airy cotton polo is a sophisticated take on a classic silhouette. Features include:
    - Partial Front button placket
    - Spread polo collar
    - Name tag applique above hem
    - Button side vents with grosgrain trim
    - Signature striped grosgrain loop tab`,
    shirt: `This premium shirt from ${product.brand} offers exceptional comfort and style. Features:
    - 100% high-quality cotton
    - Button-down collar
    - Single chest pocket
    - Classic fit
    - Machine washable`,
    pants: `Tailored for comfort and style, these ${product.brand} pants feature:
    - Stretch fabric for mobility
    - Multiple pocket options
    - Adjustable waist
    - Wrinkle-resistant material
    - Perfect for both casual and formal occasions`
  };

  // Get the appropriate description for the product
  const getProductDescription = () => {
    // You can use product.id or product.category to determine the description
    if (productDescriptions[product.category.toLowerCase()]) {
      return productDescriptions[product.category.toLowerCase()];
    }
    return productDescriptions.default;
  };

  useEffect(() => {
    async function checkFavorite() {
      try {
        const docRef = doc(db, 'favorites', product.id.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error checking favorite:', error);
      }
    }
    checkFavorite();
  }, [product.id]);

  const toggleFavorite = async () => {
    try {
      const docRef = doc(db, 'favorites', product.id.toString());
      if (isFavorite) {
        await deleteDoc(docRef);
        setIsFavorite(false);
        Alert.alert('Favorit', 'Produk dihapus dari favorit.');
      } else {
        await setDoc(docRef, {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          createdAt: serverTimestamp(),
        });
        setIsFavorite(true);
        Alert.alert('Favorit', 'Produk ditambahkan ke favorit.');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui favorit.');
      console.error(error);
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

    setLoading(true);
    try {
      await addDoc(collection(db, 'purchases'), {
        productId: product.id,
        productName: product.name,
        quantity: qty,
        buyerName: name.trim(),
        buyerPhone: phone.trim(),
        buyerAddress: address.trim(),
        price: product.price,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      Alert.alert('Success', `Thank you for purchasing ${qty} x ${product.name}!`);
      setModalVisible(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to process purchase.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "#FF0000" : "#000"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={product.image}
            style={styles.productImage}
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
            )}
          </View>

          {product.isSale && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.discount}</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {getProductDescription()}
          </Text>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="cube-outline" size={20} color="#666" />
              <Text style={styles.detailText}>Free Shipping</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="return-down-back-outline" size={20} color="#666" />
              <Text style={styles.detailText}>30-Day Returns</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buyButtonText}>ADD TO BAG</Text>
        </TouchableOpacity>
      </View>

      {/* Purchase Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Complete Your Purchase</Text>
            
            <View style={styles.modalProduct}>
              <Image 
                source={{ uri: product.image }} 
                style={styles.modalProductImage}
              />
              <View>
                <Text style={styles.modalProductName}>{product.name}</Text>
                <Text style={styles.modalProductPrice}>{product.price}</Text>
              </View>
            </View>

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

            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleConfirmPurchase}
              >
                <Text style={styles.modalButtonText}>CONFIRM PURCHASE</Text>
              </TouchableOpacity>
            )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: width * 0.8,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  infoContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  brand: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    marginLeft: 8,
    textDecorationLine: 'line-through',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 40,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
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