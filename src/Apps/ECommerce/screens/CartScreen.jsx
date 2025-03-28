import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useCartStore } from '../store/card';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

export default function CartScreen() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length == 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <ScrollView style={styles.itemList}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  style={styles.quantityButton}>
                  <Minus size={18} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityButton}>
                  <Plus size={18} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={styles.removeButton}>
              <Trash2 size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
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
    paddingTop: 60,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color: '#666666',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  itemList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    marginHorizontal: 20,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginHorizontal: 15,
  },
  removeButton: {
    padding: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  totalAmount: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  checkoutButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});