import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

const CART_ITEMS = [
  {
    id: 1,
    name: 'Floral Print Dress',
    price: 499,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
    quantity: 1,
    size: 'M',
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 899,
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500',
    quantity: 2,
    size: 'L',
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const updateQuantity = (id, increment) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
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
        <Text style={styles.headerTitle}>Shopping Cart</Text>
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
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#E83E8C',
    paddingTop:70
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  itemCount: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },
  itemSize: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  itemPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#E83E8C',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
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
    color: '#ffffff',
  },
});