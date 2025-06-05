import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

export default function ProfilScreen({ logout }) {
  const [name, setName] = useState('Aurel Septia');
  const [email, setEmail] = useState('aurel@example.com');
  const [editing, setEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleEdit = () => {
    if (editing) {
      Alert.alert('Profil Disimpan', 'Data profil berhasil diperbarui.');
    }
    setEditing(!editing);
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    Alert.alert('Logout', 'Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Logout', onPress: () => logout() },
    ]);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Image
          source={{
            uri: 'https://i.pravatar.cc/150?img=65',
          }}
          style={styles.avatar}
        />
        {editing ? (
          <>
            <TextInput
              style={[styles.input, darkMode && styles.darkInput]}
              value={name}
              onChangeText={setName}
              placeholder="Nama"
              placeholderTextColor={darkMode ? '#888' : '#aaa'}
            />
            <TextInput
              style={[styles.input, darkMode && styles.darkInput]}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={darkMode ? '#888' : '#aaa'}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.name, darkMode && styles.darkText]}>{name}</Text>
            <Text style={[styles.email, darkMode && styles.darkText]}>{email}</Text>
            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
              <Text style={styles.buttonText}>Edit Profil</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, darkMode && styles.darkText]}>
            Mode Gelap
          </Text>
          <Switch value={darkMode} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  darkText: {
    color: '#eee',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#eee',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
});
