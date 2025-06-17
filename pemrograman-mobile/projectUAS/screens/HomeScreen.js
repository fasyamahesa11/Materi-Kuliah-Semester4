import { db } from '../firebaseConfig';
import { collection, doc, setDoc, deleteDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  Animated,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ================= DATA =================
const bannerData = [
  { id: '1', image: require('../assets/banner1.jpg') },
  { id: '2', image: require('../assets/banner2.jpg') },
  { id: '3', image: require('../assets/banner3.jpg') },
  { id: '4', image: require('../assets/banner4-0000.jpg') },
  { id: '5', image: require('../assets/banner-0000.jpg') },
];

const allProducts = [
  {
    id: '1',
    name: 'Merino Wool Brushed Tuck Stitch Keyhole Polo White',
    brand: 'Thom Browne',
    price: 'Rp 10.500.000',
    originalPrice: 'Rp 13.750.000',
    category: 'Clothing',
    image: require('../assets/clothing1.webp'),
    isNew: true,
    isSale: true,
    discount: '20% OFF'
  },
  {
    id: '2',
    name: 'Triophe Teddy Jacket In Double Face Cashmere Navy',
    brand: 'Celine',
    price: 'Rp 40.500.000',
    category: 'Clothing',
    image: require('../assets/clothing2.webp'),
    isNew: false,
    isSale: false
  },
  {
    id: '3',
    name: 'Drava Reversible Water Repellent Canvas',
    brand: 'Max Mora',
    price: 'Rp 5.250.000',
    originalPrice: 'Rp 11.500.000',
    category: 'Clothing',
    image: require('../assets/clothing3.webp'),
    isNew: true,
    isSale: true,
    discount: '15% OFF'
  },
  {
    id: '4',
    name: 'Check Cotton Shirt Dress Husk',
    brand: 'Burberry',
    price: 'Rp 11.000.000',
    category: 'Clothing',
    image: require('../assets/clothing4.webp'),
    isNew: true,
    isSale: false
  },
  {
    id: '5',
    name: 'Draped Trousers in Wool Light Grey',
    brand: 'Loewey',
    price: 'Rp 9.250.000',
    originalPrice: 'Rp 11.500.000',
    category: 'Clothing',
    image: require('../assets/clothing5.webp'),
    isNew: true,
    isSale: true,
    discount: '15% OFF'
  },
  {
    id: '6',
    name: 'OnTheGo East West Tote Bag Black GHW',
    brand: 'Louis Vuitton',
    price: 'Rp 51.500.000',
    category: 'Bags',
    image: require('../assets/bag7.webp'),
    isNew: false,
    isSale: false
  },
  {
    id: '7',
    name: 'Stella Ryder Shoulder Bag black',
    brand: 'Stella McCartney',
    price: 'Rp 10.000.000',
    originalPrice: 'Rp 12.750.000',
    category: 'Bags',
    image: require('../assets/bag6.webp'),
    isNew: true,
    isSale: true,
    discount: '20% OFF'
  },
  {
    id: '8',
    name: 'Numero Neuf Mini Crossbody Bag',
    brand: 'Polene',
    price: 'Rp 3.000.000',
    originalPrice: 'Rp 3.750.000',
    category: 'Bags',
    image: require('../assets/bag4.webp'),
    isNew: true,
    isSale: true,
    discount: '20% OFF'
  },
  {
    id: '9',
    name: 'Body Bag Flat Pocket Shoulder',
    brand: 'CHARLES & KEITH',
    price: 'Rp 3.000.000',
    originalPrice: 'Rp 3.750.000',
    category: 'Bags',
    image: require('../assets/bag2.webp'),
    isNew: true,
    isSale: true,
    discount: '20% OFF'
  },
  {
    id: '10',
    name: 'Interlocking G 75 Leather Sandal Brown',
    brand: 'Gucci',
    price: 'Rp 3.000.000',
    originalPrice: 'Rp 10.750.000',
    category: 'Shoes',
    image: require('../assets/shoes1.webp'),
    isNew: true,
    isSale: true,
    discount: '20% OFF'
  },
  {
    id: '11',
    name: 'Oasis 50mm Leather Sandal Brown',
    brand: 'Hermes',
    price: 'Rp 9.000.000',
    originalPrice: 'Rp 10.750.000',
    category: 'Shoes',
    image: require('../assets/shoes2.webp'),
    isNew: true,
    isSale: true,
    discount: '20% OFF'
  },
  {
    id: '12',
    name: 'Horsebit Sacchetto Ballet Flat Rosso Ancora',
    brand: 'Gucci',
    price: 'Rp 11.500.000',
    category: 'Shoes',
    image: require('../assets/shoes3.webp'),
    isNew: false,
    isSale: false
  },
  {
    id: '13',
    name: 'Vennera 20 Pattent Calfskin Pumps',
    brand: 'Ferragamo',
    price: 'Rp 9.500.000',
    category: 'Shoes',
    image: require('../assets/shoes4.webp'),
    isNew: false,
    isSale: false
  },
  {
    id: '14',
    name: 'Intricate Details Gancini Slide Gold',
    brand: 'Ferragamo',
    price: 'Rp 9.000.000',
    category: 'Shoes',
    image: require('../assets/shoes5.webp'),
    isNew: false,
    isSale: false
  },
  {
    id: '15',
    name: 'Pochette Metis East Manogram Shoulder Bag Brown',
    brand: 'Louis Vuitton',
    price: 'Rp 3.000.000',
    originalPrice: 'Rp 3.750.000',
    category: 'Bags',
    image: require('../assets/bag10.webp'),
    isNew: true,
    isSale: true,
    discount: '20% OFF'
  },
  {
    id: '16',
    name: 'Numero Dix Half Moon Croosobody Bag',
    brand: 'Polene',
    price: 'Rp 8.800.000',
    category: 'Bags',
    image: require('../assets/bag9.webp'),
    isNew: false,
    isSale: false
  },
];

const categories = ['All', 'Bags', 'Shoes', 'Clothing', 'Accessories'];

// ================= BANNER COMPONENT =================
const BannerSlider = ({ handleShopNow }) => {
  const { width } = Dimensions.get('window');
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerData.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
    startAutoScroll();
  };

  return (
    <View style={styles.bannerContainer}>
      <Animated.FlatList
        ref={flatListRef}
        data={bannerData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image 
              source={item.image} 
              style={styles.bannerImage} 
              resizeMode="cover"
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerText}>New Collection 2025</Text>
              <TouchableOpacity 
                style={styles.bannerButton} 
                onPress={handleShopNow}
              >
                <Text style={styles.bannerButtonText}>SHOP NOW</Text>
                <Ionicons name="arrow-forward" size={14} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.indicatorContainer}>
        {bannerData.map((_, i) => {
          const opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View 
              key={i} 
              style={[styles.indicatorDot, { opacity }]} 
            />
          );
        })}
      </View>
    </View>
  );
};

// ================= MAIN COMPONENT =================
export default function HomeScreen({ navigation }) {
  const { width } = Dimensions.get('window');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef();
  const CARD_WIDTH = (width - 48) / 2;

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'favorites'));
        const favs = querySnapshot.docs.map(doc => doc.data().productId);
        setFavorites(favs);
      } catch (error) {
        Alert.alert('Error', 'Gagal memuat favorit');
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (product) => {
    try {
      const docRef = doc(db, 'favorites', product.id);
      
      if (favorites.includes(product.id)) {
        await deleteDoc(docRef);
        setFavorites(favorites.filter(id => id !== product.id));
      } else {
        await setDoc(docRef, {
          productId: product.id,
          name: product.name,
          image: product.image, 
          price: product.price,
          brand: product.brand,
          createdAt: serverTimestamp(),
        });
        setFavorites([...favorites, product.id]);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui favorit');
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  const handleShopNow = () => {
    setSelectedCategory('All');
    scrollViewRef.current?.scrollTo({ y: 300, animated: true });
  };

  const handleSearchPress = () => {
    navigation.navigate('Search', { allProducts });
  };

  const ProductCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, { width: CARD_WIDTH }]}
      onPress={() => navigation.navigate('DetailScreen', { product: item })}
    >
      <View style={[styles.imageContainer, { height: CARD_WIDTH }]}>
        <Image 
          source={item.image} 
          style={styles.productImage} 
          resizeMode="contain"
        />
        <View style={styles.badgeContainer}>
          {item.isNew && (
            <View style={[styles.badge, styles.newBadge]}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
          )}
          {item.isSale && (
            <View style={[styles.badge, styles.saleBadge]}>
              <Text style={styles.badgeText}>{item.discount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity 
          style={styles.wishlistButton} 
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons 
            name={favorites.includes(item.id) ? "heart" : "heart-outline"} 
            size={18} 
            color={favorites.includes(item.id) ? "#e0245e" : "#333"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Viola.Stylist</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleSearchPress}>
            <Ionicons name="search" size={22} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FavScreen', { favorites })}>
            <Ionicons name="heart" size={22} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={22} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <BannerSlider handleShopNow={handleShopNow} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBox,
                selectedCategory === cat && styles.categoryBoxActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productGrid}>
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ================= STYLESHEET =================
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 18,
  },
  icon: {
    color: '#333',
  },
  bannerContainer: {
    height: 200,
    marginBottom: 20,
  },
  bannerImage: {
    width: width,
    height: 200,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  bannerButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 4,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicatorDot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginHorizontal: 3,
  },
  categoryContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryBox: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f8f8f8',
  },
  categoryBoxActive: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    backgroundColor: '#f9f9f9',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newBadge: {
    backgroundColor: '#ff4444',
  },
  saleBadge: {
    backgroundColor: '#333',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  brandText: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productPrice: { 
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  originalPrice: {
    color: '#999',
    fontWeight: '400',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});