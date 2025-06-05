import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const stock = 10; // contoh stok

  const description =
    'Komik ini menceritakan petualangan seru dan penuh kejutan. Cocok untuk semua usia dan pecinta cerita menarik.';
  const reviews = [
    { id: 1, user: 'Andi', comment: 'Komik yang sangat menarik dan menghibur!' },
    { id: 2, user: 'Sari', comment: 'Ilustrasi dan cerita sangat bagus.' },
  ];

  // Cek apakah produk favorit di Firestore
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
        // Hapus dari favorit
        await deleteDoc(docRef);
        setIsFavorite(false);
        Alert.alert('Favorit', 'Produk dihapus dari favorit.');
      } else {
        // Tambah ke favorit
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

  const openBuyModal = () => {
    setModalVisible(true);
  };

  const closeBuyModal = () => {
    setModalVisible(false);
    setQuantity('1');
    setName('');
    setPhone('');
    setAddress('');
  };

  const handleConfirmPurchase = async () => {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) {
      Alert.alert('Jumlah tidak valid', 'Masukkan jumlah pembelian yang benar.');
      return;
    }
    if (qty > stock) {
      Alert.alert('Stok Tidak Cukup', `Stok tersedia hanya ${stock} buah.`);
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Form belum lengkap', 'Mohon lengkapi semua data pembeli.');
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
      Alert.alert(
        'Pembelian Berhasil',
        `Terima kasih telah membeli ${qty} x ${product.name}!`
      );
      closeBuyModal();
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Gagal menyimpan data pembelian, coba lagi.');
      console.error('Firestore error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Kembali</Text>
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.stock}>{stock > 0 ? `Stok tersedia: ${stock}` : 'Stok habis'}</Text>

        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
          onPress={toggleFavorite}
        >
          <Text style={[styles.favoriteText, isFavorite && { color: '#fff' }]}>
            {isFavorite ? '❤️ Favorit' : '♡ Tambah ke Favorit'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.description}>{description}</Text>

        <Text style={styles.sectionTitle}>Review Pembeli</Text>
        {reviews.map((rev) => (
          <View key={rev.id} style={styles.reviewBox}>
            <Text style={styles.reviewUser}>{rev.user}:</Text>
            <Text style={styles.reviewComment}>{rev.comment}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.buyButton} onPress={openBuyModal}>
          <Text style={styles.buyButtonText}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Pembelian */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeBuyModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Form Pembelian</Text>
            <Text style={styles.modalProductName}>{product.name}</Text>

            <Text style={styles.modalLabel}>Jumlah Beli:</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Masukkan jumlah"
            />

            <Text style={styles.modalLabel}>Nama Lengkap:</Text>
            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setName}
              placeholder="Nama pembeli"
            />

            <Text style={styles.modalLabel}>No. Telepon:</Text>
            <TextInput
              style={styles.modalInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="Nomor telepon"
              keyboardType="phone-pad"
            />

            <Text style={styles.modalLabel}>Alamat Lengkap:</Text>
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              value={address}
              onChangeText={setAddress}
              placeholder="Alamat pengiriman"
              multiline
            />

            {loading ? (
              <ActivityIndicator size="large" color="#27ae60" style={{ marginTop: 10 }} />
            ) : (
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={closeBuyModal}
                  disabled={loading}
                >
                  <Text style={styles.modalButtonText}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonConfirm}
                  onPress={handleConfirmPurchase}
                  disabled={loading}
                >
                  <Text style={styles.modalButtonText}>Konfirmasi</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginTop: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 22,
    color: '#27ae60',
    marginBottom: 8,
  },
  stock: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  favoriteButton: {
    borderWidth: 1,
    borderColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteActive: {
    backgroundColor: '#3498db',
  },
  favoriteText: {
    fontSize: 16,
    color: '#3498db',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  reviewBox: {
    backgroundColor: '#f0f4f7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  reviewUser: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
  },
  buyButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonCancel: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonConfirm: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
