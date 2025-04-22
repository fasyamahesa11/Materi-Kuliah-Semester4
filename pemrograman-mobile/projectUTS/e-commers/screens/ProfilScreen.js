import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfilScreen() {
  const [name, setName] = useState('Nama Pengguna');
  const [email, setEmail] = useState('email@example.com');
  const [editing, setEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleEdit = () => setEditing(!editing);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <LinearGradient
      colors={darkMode ? ['#1e1e1e', '#000'] : ['#e0eafc', '#cfdef3']}
      style={styles.container}
    >
      <View style={styles.themeSwitchContainer}>
        <Text style={[styles.switchLabel, darkMode && { color: '#fff' }]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Image source={require('../assets/brandonline.png')} style={styles.avatar} />

        {editing ? (
          <>
            <TextInput
              style={[styles.input, darkMode && styles.darkInput]}
              value={name}
              onChangeText={setName}
              placeholder="Nama"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={[styles.input, darkMode && styles.darkInput]}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.name, darkMode && { color: '#fff' }]}>{name}</Text>
            <Text style={[styles.email, darkMode && { color: '#aaa' }]}>{email}</Text>
            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
              <Text style={styles.buttonText}>Edit Profil</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => alert('Logout berhasil')}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 60 : 80,
    alignItems: 'center',
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    width: '90%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  darkCard: {
    backgroundColor: '#2a2a2a',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#007bff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#444',
    color: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
});
