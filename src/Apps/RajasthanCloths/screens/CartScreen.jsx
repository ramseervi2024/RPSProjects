import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

const CART_ITEMS = [
  {
    id: 1,
    name: 'Luxurious Wedding Dress',
    price: 499,
    image: 'https://api.a0.dev/assets/image?text=Luxurious%20Wedding%20Dresses%20with%20gold%20embroidery&aspect=4:5',
    quantity: 1,
    size: 'M',
  },
  {
    id: 2,
    name: 'Bridal Lehenga Choli',
    price: 899,
    image: 'https://api.a0.dev/assets/image?text=Bridal%20Lehenga%20Choli%20with%20gold%20embroidery&aspect=4:5',
    quantity: 2,
    size: 'L',
  },
  {
    id: 3,
    name: 'Groom Sherwani',
    price: 1199,
    image: 'https://api.a0.dev/assets/image?text=Groom%20Sherwani%20with%20traditional%20embroidery&aspect=4:5',
    quantity: 1,
    size: 'L',
  },
  {
    id: 4,
    name: 'Bridal Bridal Veil',
    price: 199,
    image: 'https://api.a0.dev/assets/image?text=Elegant%20Bridal%20Veil%20with%20lace%20details&aspect=4:5',
    quantity: 1,
    size: 'One Size',
  },
  {
    id: 5,
    name: 'Wedding Suit for Men',
    price: 799,
    image: 'https://api.a0.dev/assets/image?text=Wedding%20Suit%20for%20Men%20with%20tailored%20fit&aspect=4:5',
    quantity: 1,
    size: 'M',
  },
  {
    id: 6,
    name: 'Bridal Accessories Set',
    price: 249,
    image: 'https://api.a0.dev/assets/image?text=Bridal%20Accessories%20Set%20with%20necklace%2C%20earrings%20and%20headpiece&aspect=4:5',
    quantity: 1,
    size: 'One Size',
  }
];


export default function CartScreen() {
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const updateQuantity = (id, increment) => {
    setCartItems(items =>
      items.map(item =>
        item.id == id
          ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart </Text>
        <Text style={styles.itemCount}>{cartItems.length} Items</Text>
      </View>

      <ScrollView style={styles.content}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSize}>Size: {item.size}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
              
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, false)}
                  style={styles.quantityButton}
                >
                  <Minus size={16} color="#666666" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, true)}
                  style={styles.quantityButton}
                >
                  <Plus size={16} color="#666666" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={styles.removeButton}
                >
                  <Trash2 size={16} color="#E83E8C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{totalAmount}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#E83E8C', // Soft pink background
    paddingTop: 70,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemCount: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 120,
    height: 180, // Adjust image size
    borderRadius: 12,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: '#333',
  },
  itemSize: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
  },
  itemPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#E83E8C',
    marginTop: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    marginHorizontal: 16,
  },
  removeButton: {
    marginLeft: 'auto',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#333',
  },
  totalAmount: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#E83E8C',
  },
  checkoutButton: {
    backgroundColor: '#E83E8C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});
