import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

const CART_ITEMS = [
  {
    id: 1,
    title: 'iPhone 13',
    price: '₹54,999',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    quantity: 1,
  },
  {
    id: 2,
    title: 'Nike Shoes',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    quantity: 2,
  },
];

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsContainer}>
        {CART_ITEMS.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <View style={styles.quantityContainer}>
                <Pressable style={styles.quantityButton}>
                  <Minus size={16} color="#2874F0" />
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable style={styles.quantityButton}>
                  <Plus size={16} color="#2874F0" />
                </Pressable>
                <Pressable style={styles.removeButton}>
                  <Trash2 size={16} color="#ff6161" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₹64,997</Text>
        </View>
        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Place Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  itemsContainer: {
    flex: 1,
    padding: 12,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2874F0',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityButton: {
    backgroundColor: '#f1f3f6',
    padding: 8,
    borderRadius: 4,
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2874F0',
  },
  checkoutButton: {
    backgroundColor: '#2874F0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});