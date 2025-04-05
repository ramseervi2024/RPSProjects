import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Minus, Plus, Trash2, MapPin, CreditCard, ChevronRight, Tag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const navigation = useNavigation();

  const handleModifyAddress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartList}>
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressName}>Home</Text>
            <Text style={styles.addressText}>123 Main Street, Apt 4B</Text>
            <Text style={styles.addressText}>New York, NY 10001</Text>
            <TouchableOpacity style={styles.modifyButton} onPress={handleModifyAddress}>
              <Text style={styles.modifyButtonText}>Modify Address</Text>
              <ChevronRight size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={[styles.paymentMethod, styles.selectedPayment]}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1622637989322-77d98dd4ddf9?w=50&q=80' }}
                style={styles.paymentIcon}
              />
              <Text style={styles.paymentText}>Apple Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethod}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&q=80' }}
                style={styles.paymentIcon}
              />
              <Text style={styles.paymentText}>PayPal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethod}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1580508174046-170816f65662?w=50&q=80' }}
                style={styles.paymentIcon}
              />
              <Text style={styles.paymentText}>Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.cartItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Premium Wireless Headphones</Text>
              <Text style={styles.itemPrice}>$299.99</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Minus size={18} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.quantity}>1</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Plus size={18} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Trash2 size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Discount Coupon */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Tag size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>Add Discount Code</Text>
          </View>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter coupon code"
              placeholderTextColor="#8E8E93"
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Price Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>$299.99</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>$9.99</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>VAT (7.5%)</Text>
          <Text style={styles.summaryValue}>$23.25</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={[styles.summaryValue, styles.discountText]}>-$10.00</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>$323.23</Text>
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
    backgroundColor: '#FFFFFF',
  },
  cartList: {
    flex: 1,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  addressContainer: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 12,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  modifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modifyButtonText: {
    color: '#007AFF',
    fontSize: 14,
    marginRight: 4,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paymentMethod: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    marginHorizontal: 4,
  },
  selectedPayment: {
    backgroundColor: '#E1F0FF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginBottom: 6,
  },
  paymentText: {
    fontSize: 12,
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: 8,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  summary: {
    padding: 20,
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  discountText: {
    color: '#34C759',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});