import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Sign Up</Text>
      <Button
        title="Sudah punya akun? Masuk di sini"
        onPress={() => navigation.navigate('SignIn')}
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

export default SignUp;
