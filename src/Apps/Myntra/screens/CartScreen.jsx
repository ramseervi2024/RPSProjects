import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CART_ITEMS = [
  {
    id: 1,
    title: 'Summer Dress',
    brand: 'Zara',
    price: 2499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
  },
  {
    id: 2,
    title: 'Denim Jacket',
    brand: 'Levis',
    price: 3999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=500&q=80',
  },
];

export default function CartScreen() {
  const totalAmount = CART_ITEMS.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
        </View>

        {CART_ITEMS.length > 0 ? (
          <>
            <ScrollView style={styles.itemsContainer}>
              {CART_ITEMS.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.brandName}>{item.brand}</Text>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                    <View style={styles.quantityContainer}>
                      <Pressable style={styles.quantityButton}>
                        <Minus size={16} color="#282C3F" />
                      </Pressable>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <Pressable style={styles.quantityButton}>
                        <Plus size={16} color="#282C3F" />
                      </Pressable>
                      <Pressable style={styles.removeButton}>
                        <Trash2 size={16} color="#FF3F6C" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalAmount}>₹{totalAmount}</Text>
              </View>
              <Pressable style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <ShoppingBag size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>Your cart is empty</Text>
            <Text style={styles.emptyStateSubtext}>Add items to start shopping</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#282C3F',
  },
  itemsContainer: {
    flex: 1,
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
  },
  itemImage: {
    width: 100,
    height: 130,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 15,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#282C3F',
  },
  itemTitle: {
    fontSize: 14,
    color: '#7E818C',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#282C3F',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#f5f5f6',
    borderRadius: 4,
  },
  quantity: {
    paddingHorizontal: 15,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
    marginLeft: 15,
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
    marginBottom: 15,
  },
  totalText: {
    fontSize: 18,
    color: '#282C3F',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#282C3F',
  },
  checkoutButton: {
    backgroundColor: '#FF3F6C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#282C3F',
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#7E818C',
    marginTop: 8,
    textAlign: 'center',
  },
});