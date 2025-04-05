import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const cartItems = [
  {
    id: 1,
    name: 'Fresh Oranges',
    price: 4.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&q=80',
  },
  {
    id: 2,
    name: 'Organic Milk',
    price: 3.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
  },
];

export default function CartScreen() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
        </View>

        <ScrollView style={styles.cartList}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Minus size={16} color="#64748b" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Plus size={16} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <Trash2 size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1f2937',
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#16a34a',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 6,
  },
  quantity: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1f2937',
    marginHorizontal: 16,
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#64748b',
  },
  totalAmount: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#16a34a',
  },
  checkoutButton: {
    backgroundColor: '#16a34a',
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