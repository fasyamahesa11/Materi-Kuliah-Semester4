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

  const loadKontak = async () => {
    try {
      const data = await AsyncStorage.getItem('semuaKontak');
      if (data) {
        setSemuaKontak(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      const dataLama = await AsyncStorage.getItem('semuaKontak');
      const parsedData = dataLama ? JSON.parse(dataLama) : [];

      if (editMode) {
        // Update kontak
        const dataBaru = parsedData.map((item) =>
          item.id === editId
            ? { ...item, nama, telepon, email, alamat }
            : item
        );
        await AsyncStorage.setItem('semuaKontak', JSON.stringify(dataBaru));
        setSemuaKontak(dataBaru);
        Alert.alert('Berhasil!', 'Kontak berhasil diperbarui!');
      } else {
        // Tambah kontak baru
        const kontakBaru = {
          id: Date.now().toString(),
          nama,
          telepon,
          email,
          alamat,
        };
        const dataBaru = [...parsedData, kontakBaru];
        await AsyncStorage.setItem('semuaKontak', JSON.stringify(dataBaru));
        setSemuaKontak(dataBaru);
        Alert.alert('Berhasil!', 'Kontak baru disimpan!');
      }

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
      const dataBaru = semuaKontak.filter((item) => item.id !== id);
      await AsyncStorage.setItem('semuaKontak', JSON.stringify(dataBaru));
      setSemuaKontak(dataBaru);
      Alert.alert('Dihapus!', 'Kontak berhasil dihapus.');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadKontak();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        {editMode ? 'Edit Kontak' : 'Form Kontak'}
      </Text>

      <View style={styles.inputGroup}>
        <Icon name="person" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="phone" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Telepon"
          value={telepon}
          onChangeText={setTelepon}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="email" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="location-on" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Alamat"
          value={alamat}
          onChangeText={setAlamat}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSimpan}>
        <Text style={styles.buttonText}>
          {editMode ? 'Update Kontak' : 'Simpan'}
        </Text>
      </TouchableOpacity>

      {semuaKontak.length > 0 && (
        <>
          <Text style={styles.savedTitle}>📋 Daftar Kontak:</Text>

          {semuaKontak.map((kontak) => (
            <View style={styles.kontakCard} key={kontak.id}>
              <Text style={styles.kontakText}>👤 {kontak.nama}</Text>
              <Text>📞 {kontak.telepon}</Text>
              <Text>✉️ {kontak.email}</Text>
              <Text>📍 {kontak.alamat}</Text>

              <View style={styles.kontakActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#007AFF' }]}
                  onPress={() => handleEdit(kontak)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#FF3B30' }]}
                  onPress={() => handleHapus(kontak.id)}
                >
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    elevation: 2,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 20,
  },
  kontakCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  kontakText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  kontakActions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
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
