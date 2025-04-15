import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Sign In</Text>
      <Button
        title="Belum punya akun? Daftar di sini"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SignIn;
