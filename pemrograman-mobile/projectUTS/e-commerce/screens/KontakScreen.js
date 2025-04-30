import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KontakScreen() {
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [semuaKontak, setSemuaKontak] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const loadKontak = async () => {
      try {
        const data = await AsyncStorage.getItem('semuaKontak');
        if (data) setSemuaKontak(JSON.parse(data));
      } catch (error) {
        console.error(error);
      }
    };
    loadKontak();
  }, []);

  const resetForm = () => {
    setNama('');
    setTelepon('');
    setEmail('');
    setAlamat('');
    setEditMode(false);
    setEditId(null);
  };

  const handleSimpan = async () => {
    if (!nama || !telepon || !email || !alamat) {
      Alert.alert('Oops!', 'Semua kolom harus diisi!');
      return;
    }

    try {
      const oldData = await AsyncStorage.getItem('semuaKontak');
      const data = oldData ? JSON.parse(oldData) : [];

      let updatedData;

      if (editMode) {
        updatedData = data.map((item) =>
          item.id === editId ? { ...item, nama, telepon, email, alamat } : item
        );
        Alert.alert('Berhasil!', 'Kontak diperbarui!');
      } else {
        const newContact = {
          id: Date.now().toString(),
          nama,
          telepon,
          email,
          alamat,
        };
        updatedData = [...data, newContact];
        Alert.alert('Berhasil!', 'Kontak disimpan!');
      }

      await AsyncStorage.setItem('semuaKontak', JSON.stringify(updatedData));
      setSemuaKontak(updatedData);
      resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal menyimpan data.');
    }
  };

  const handleEdit = (kontak) => {
    setNama(kontak.nama);
    setTelepon(kontak.telepon);
    setEmail(kontak.email);
    setAlamat(kontak.alamat);
    setEditMode(true);
    setEditId(kontak.id);
  };

  const handleHapus = async (id) => {
    try {
      const filtered = semuaKontak.filter((item) => item.id !== id);
      await AsyncStorage.setItem('semuaKontak', JSON.stringify(filtered));
      setSemuaKontak(filtered);
      Alert.alert('Berhasil', 'Kontak dihapus');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{editMode ? 'Edit Kontak' : 'Tambah Kontak'}</Text>

      <View style={styles.card}>
        <Input icon="person" placeholder="Nama" value={nama} onChangeText={setNama} />
        <Input icon="phone" placeholder="Telepon" value={telepon} onChangeText={setTelepon} keyboardType="phone-pad" />
        <Input icon="email" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input icon="location-on" placeholder="Alamat" value={alamat} onChangeText={setAlamat} multiline />

        <TouchableOpacity style={styles.button} onPress={handleSimpan}>
          <Text style={styles.buttonText}>{editMode ? 'Update Kontak' : 'Simpan Kontak'}</Text>
        </TouchableOpacity>
      </View>

      {semuaKontak.length > 0 && (
        <>
          <Text style={styles.savedTitle}>Daftar Kontak</Text>
          {semuaKontak.map((kontak) => (
            <View style={styles.contactCard} key={kontak.id}>
              <Text style={styles.contactName}>{kontak.nama}</Text>
              <Text style={styles.contactInfo}>📞 {kontak.telepon}</Text>
              <Text style={styles.contactInfo}>✉️ {kontak.email}</Text>
              <Text style={styles.contactInfo}>📍 {kontak.alamat}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#007AFF' }]} onPress={() => handleEdit(kontak)}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF3B30' }]} onPress={() => handleHapus(kontak.id)}>
                  <Text style={styles.actionText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

function Input({ icon, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Icon name={icon} size={20} color="#555" />
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  savedTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
