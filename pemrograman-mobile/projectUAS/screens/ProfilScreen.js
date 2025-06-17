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
  Platform,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+6281234567890',
    address: 'Jl. Contoh No. 123, Jakarta',
  });
  const [editing, setEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    Alert.alert('Sukses', 'Profil berhasil diperbarui');
    setEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Keluar',
          onPress: () => navigation.replace('Login'),
          style: 'destructive',
        },
      ]
    );
  };

  const openHelpCenter = () => {
    Linking.openURL('https://help.yourshop.com');
  };

  const openAboutPage = () => {
    navigation.navigate('About');
  };

  const openOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };

  const openAccountSettings = () => {
    navigation.navigate('AccountSettings');
  };

  return (
    <ScrollView 
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar 
        barStyle={darkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={darkMode ? '#121212' : '#f8f9fa'}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>Profil Saya</Text>
        <View style={styles.settingsContainer}>
          <TouchableOpacity 
            style={styles.themeToggle}
            onPress={() => setDarkMode(!darkMode)}
          >
            <Icon 
              name={darkMode ? 'wb-sunny' : 'nights-stay'} 
              size={24} 
              color={darkMode ? '#f5dd4b' : '#666'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Card */}
      <View style={[styles.profileCard, darkMode && styles.darkCard]}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/brandonline.png')}
            style={styles.avatar}
          />
          {editing && (
            <TouchableOpacity style={styles.changePhotoBtn}>
              <Icon name="photo-camera" size={20} color="#4e74f9" />
              <Text style={styles.changePhotoText}>Ubah Foto</Text>
            </TouchableOpacity>
          )}
        </View>

        {editing ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, darkMode && styles.darkSubText]}>Nama Lengkap</Text>
              <TextInput
                style={[styles.input, darkMode && styles.darkInput]}
                value={profile.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Masukkan nama lengkap"
                placeholderTextColor={darkMode ? '#888' : '#aaa'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, darkMode && styles.darkSubText]}>Email</Text>
              <TextInput
                style={[styles.input, darkMode && styles.darkInput]}
                value={profile.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Masukkan email"
                keyboardType="email-address"
                placeholderTextColor={darkMode ? '#888' : '#aaa'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, darkMode && styles.darkSubText]}>Nomor Telepon</Text>
              <TextInput
                style={[styles.input, darkMode && styles.darkInput]}
                value={profile.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
                placeholder="Masukkan nomor telepon"
                keyboardType="phone-pad"
                placeholderTextColor={darkMode ? '#888' : '#aaa'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, darkMode && styles.darkSubText]}>Alamat</Text>
              <TextInput
                style={[styles.input, darkMode && styles.darkInput, { height: 80, textAlignVertical: 'top' }]}
                value={profile.address}
                onChangeText={(text) => handleInputChange('address', text)}
                placeholder="Masukkan alamat lengkap"
                placeholderTextColor={darkMode ? '#888' : '#aaa'}
                multiline
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setEditing(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.buttonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={[styles.profileName, darkMode && styles.darkText]}>{profile.name}</Text>
            <View style={styles.profileDetailItem}>
              <Icon name="email" size={16} color={darkMode ? '#aaa' : '#666'} />
              <Text style={[styles.profileDetail, darkMode && styles.darkSubText, { marginLeft: 8 }]}>{profile.email}</Text>
            </View>
            <View style={styles.profileDetailItem}>
              <Icon name="phone" size={16} color={darkMode ? '#aaa' : '#666'} />
              <Text style={[styles.profileDetail, darkMode && styles.darkSubText, { marginLeft: 8 }]}>{profile.phone}</Text>
            </View>
            <View style={styles.profileDetailItem}>
              <Icon name="home" size={16} color={darkMode ? '#aaa' : '#666'} />
              <Text style={[styles.profileDetail, darkMode && styles.darkSubText, { marginLeft: 8 }]}>{profile.address}</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Order Section */}
      <View style={[styles.menuCard, darkMode && styles.darkCard]}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={openOrderHistory}
        >
          <View style={styles.menuItemLeft}>
            <Icon name="history" size={24} color="#4e74f9" />
            <Text style={[styles.menuText, darkMode && styles.darkText, { marginLeft: 12 }]}>Riwayat Pesanan</Text>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#aaa' : '#666'} />
        </TouchableOpacity>

        <View style={[styles.divider, darkMode && styles.darkDivider]} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <View style={styles.menuItemLeft}>
            <Icon name="favorite" size={24} color="#ff4d4f" />
            <Text style={[styles.menuText, darkMode && styles.darkText, { marginLeft: 12 }]}>Wishlist</Text>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#aaa' : '#666'} />
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={[styles.menuCard, darkMode && styles.darkCard]}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={openAccountSettings}
        >
          <View style={styles.menuItemLeft}>
            <Icon name="settings" size={24} color="#666" />
            <Text style={[styles.menuText, darkMode && styles.darkText, { marginLeft: 12 }]}>Pengaturan Akun</Text>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#aaa' : '#666'} />
        </TouchableOpacity>

        <View style={[styles.divider, darkMode && styles.darkDivider]} />

        <View style={[styles.menuItem, { justifyContent: 'space-between' }]}>
          <View style={styles.menuItemLeft}>
            <Icon name="notifications" size={24} color="#666" />
            <Text style={[styles.menuText, darkMode && styles.darkText, { marginLeft: 12 }]}>Notifikasi</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.divider, darkMode && styles.darkDivider]} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={openHelpCenter}
        >
          <View style={styles.menuItemLeft}>
            <Icon name="help" size={24} color="#666" />
            <Text style={[styles.menuText, darkMode && styles.darkText, { marginLeft: 12 }]}>Pusat Bantuan</Text>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#aaa' : '#666'} />
        </TouchableOpacity>

        <View style={[styles.divider, darkMode && styles.darkDivider]} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={openAboutPage}
        >
          <View style={styles.menuItemLeft}>
            <Icon name="info" size={24} color="#666" />
            <Text style={[styles.menuText, darkMode && styles.darkText, { marginLeft: 12 }]}>Tentang Aplikasi</Text>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#aaa' : '#666'} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Icon name="logout" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 40,
    paddingBottom: 40,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggle: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#444',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4e74f9',
  },
  changePhotoBtn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhotoText: {
    color: '#4e74f9',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  profileDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    paddingHorizontal: 8,
  },
  profileDetail: {
    fontSize: 15,
    color: '#666',
    flexShrink: 1,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f5f6fa',
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkInput: {
    backgroundColor: '#2a2a2a',
    color: '#eee',
    borderColor: '#444',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4e74f9',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4e74f9',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#4e74f9',
  },
  saveButton: {
    backgroundColor: '#4e74f9',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
  darkDivider: {
    backgroundColor: '#333',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
});

export default ProfileScreen;