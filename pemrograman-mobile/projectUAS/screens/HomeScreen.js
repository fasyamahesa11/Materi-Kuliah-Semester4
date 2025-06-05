
    import React, { useState } from 'react';
    import {
      View,
      Text,
      StyleSheet,
      FlatList,
      Image,
      TouchableOpacity,
      ScrollView,
    } from 'react-native';

    const allProducts = [
      {
        id: '1',
        name: 'Petualang Hebat Si MOIS',
        price: 'Rp 150.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '2',
        name: 'Komik Sains Kuark',
        price: 'Rp 100.000',
        category: 'Sains',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '3',
        name: 'Komik Si Juki Anak Kosan',
        price: 'Rp 50.000',
        category: 'Lucu',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '4',
        name: 'Doraemon Petualangan',
        price: 'Rp 70.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1509228627152-5f6a134f9b45?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '5',
        name: 'Komik Naruto Vol.1',
        price: 'Rp 85.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '6',
        name: 'Komik One Piece Vol.10',
        price: 'Rp 90.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '7',
        name: 'Komik Sains Astrofisika',
        price: 'Rp 110.000',
        category: 'Sains',
        image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '8',
        name: 'Petualangan di Hutan',
        price: 'Rp 120.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '9',
        name: 'Komik Lucu Si Bebek',
        price: 'Rp 45.000',
        category: 'Lucu',
        image: 'https://images.unsplash.com/photo-1527252691053-8b4f64722023?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '10',
        name: 'Sains untuk Anak',
        price: 'Rp 95.000',
        category: 'Sains',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '11',
        name: 'Petualangan di Laut',
        price: 'Rp 130.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '12',
        name: 'Komik Sains Biologi',
        price: 'Rp 105.000',
        category: 'Sains',
        image: 'https://images.unsplash.com/photo-1523958203904-cdcb402031af?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '13',
        name: 'Si Juki Lagi',
        price: 'Rp 55.000',
        category: 'Lucu',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '14',
        name: 'Petualangan di Gunung',
        price: 'Rp 140.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '15',
        name: 'Komik Sains Fisika',
        price: 'Rp 115.000',
        category: 'Sains',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '16',
        name: 'Komik Lucu Anak Kampus',
        price: 'Rp 60.000',
        category: 'Lucu',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '17',
        name: 'Petualangan di Gurun',
        price: 'Rp 135.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1501769214405-5e9c7b3b0b62?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '18',
        name: 'Komik Sains Kimia',
        price: 'Rp 120.000',
        category: 'Sains',
        image: 'https://images.unsplash.com/photo-1532635223-bc79b6e29e94?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '19',
        name: 'Si Juki Lagi Seru',
        price: 'Rp 65.000',
        category: 'Lucu',
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80',
      },
      {
        id: '20',
        name: 'Petualangan di Pulau',
        price: 'Rp 145.000',
        category: 'Petualangan',
        image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=150&q=80',
      },
    ];

    const categories = ['Semua', 'Petualangan', 'Sains', 'Lucu'];

    export default function HomeScreen({ navigation }) {
      const [selectedCategory, setSelectedCategory] = useState('Semua');

      const filteredProducts =
        selectedCategory === 'Semua'
          ? allProducts
          : allProducts.filter((p) => p.category === selectedCategory);

      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Selamat Datang di TOKO KOMIK!</Text>

          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBox,
                  selectedCategory === cat && styles.categoryBoxActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subtitle}>Komik Kategori: {selectedCategory}</Text>

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={5} // buat grid 2 kolom
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => navigation.navigate('DetailScreen', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      );
    }

    const styles = StyleSheet.create({
      container: {
        padding: 20,
        paddingBottom: 60,
        flexGrow: 1,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
      },
      subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 15,
        color: '#0a84ff',
      },
      categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      categoryBox: {
        backgroundColor: '#f0f4f7',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginRight: 10,
      },
      categoryBoxActive: {
        backgroundColor: '#0a84ff',
      },
      categoryText: {
        fontWeight: '600',
        color: '#555',
      },
      categoryTextActive: {
        color: '#fff',
      },
      productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 8,
        flex: 1, // supaya fleksibel di grid
        maxWidth: '47%', // agar 2 kolom dengan jarak
        elevation: 3,
      },
      productImage: {
        width: '100%',
        height: 130,
        borderRadius: 10,
        backgroundColor: '#ccc',
      },
      productName: {
        marginTop: 10,
        fontWeight: '600',
        color: '#333',
      },
      productPrice: {
        color: 'green',
        marginTop: 5,
        fontWeight: '500',
      },
    });
