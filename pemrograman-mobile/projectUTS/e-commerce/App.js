import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Import screen utama
import HomeScreen from './screens/HomeScreen';
import ProfilScreen from './screens/ProfilScreen';
import InfoScreen from './screens/InfoScreen';
import KontakScreen from './screens/KontakScreen';
import DetailScreen from './screens/DetailScreen';

// Import screen kategori
import AllCategory from './screens/allcategory';
import BagsCategory from './screens/bagscategory';
import ShoesCategory from './screens/shoescategory';
import ClothingCategory from './screens/clothingcategory';
import AccessoriesCategory from './screens/accessoriescategory';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom theme untuk NavigationContainer
const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fdf7f0', // warm beige background ala voila.id
  },
};

// Stack untuk Home + Detail + kategori
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Beranda' }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Detail Produk' }} />
      <Stack.Screen name="AllCategory" component={AllCategory} options={{ title: 'All Products' }} />
      <Stack.Screen name="BagsCategory" component={BagsCategory} options={{ title: 'Bags' }} />
      <Stack.Screen name="ShoesCategory" component={ShoesCategory} options={{ title: 'Shoes' }} />
      <Stack.Screen name="ClothingCategory" component={ClothingCategory} options={{ title: 'Clothing' }} />
      <Stack.Screen name="AccessoriesCategory" component={AccessoriesCategory} options={{ title: 'Accessories' }} />
    </Stack.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer theme={CustomTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Info') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Kontak') {
              iconName = focused ? 'call' : 'call-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: '#8B5E3C', // Coklat elegan
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            backgroundColor: '#fdf7f0', // Warm beige ala voila
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: Platform.OS === 'ios' ? 90 : 70,
            paddingBottom: 15,
            paddingTop: 10,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 4,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Info" component={InfoScreen} />
        <Tab.Screen name="Kontak" component={KontakScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
