import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ProfilScreen from './screens/ProfilScreen';
import InfoScreen from './screens/InfoScreen';
import DetailScreen from './screens/DetailScreen';
import LoginScreen from './screens/LoginScreen';
import FavScreen from './screens/FavScreen'; // import FavScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack untuk Home + Detail
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Beranda' }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Detail Produk' }} />
    </Stack.Navigator>
  );
}

// Stack untuk Favorite + Detail
function FavStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavScreen" component={FavScreen} options={{ title: 'Favorit' }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Detail Produk' }} />
    </Stack.Navigator>
  );
}

// Tab Navigasi utama
function MainTabs({ logout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorit') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorit" component={FavStack} />
      {/* Pass logout prop ke ProfilScreen */}
      <Tab.Screen name="Profil">
        {(props) => <ProfilScreen {...props} logout={logout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs logout={handleLogout} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
