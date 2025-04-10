// Import dependencies
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import Login from './Screens/Login';
import Signup from './Screens/Signup';

// Component
export default function App() {
  // const [text, setText] = useState('');
  // const pressHandler = () => {
  //   alert('Event OnPressed', 'Button Pressed');
  // }
  return (
    // <ScrollView onScroll={()=>alert('scrolling')}>
    <View style={styles.container}>
      <Text style={{color:'blue', fontSize:35}}>Hello React Native</Text>
      
      <Signup />
      
      {/* <Button
        onPress={pressHandler}
        title="Press Me"
      />
      <TextInput style={{borderBottomWidth:1,height:40 }}
      placeholder='Ketik Sesuatu' 
      onChangeText={(value) => setText(value)} 

      />
      <Text>Hasil input text:{text}</Text> */}
      
      
    </View>
    // </ScrollView>

  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
