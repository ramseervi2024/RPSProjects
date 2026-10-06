import { useState } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import { createRazorpayOrder, placeOrderWithPayment } from '../api/orderApi';
import { clearCartAction } from '../redux/cart/action';
import { COLORS } from '../theme/theme';
import { showToast } from '../components/common/Toast';

export const useCheckout = (navigation) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state.auth.user || state.profile.profiledetails || {});

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      showToast.warning('Cart Empty', 'Please add items to your cart before checking out.');
      return;
    }

    setLoading(true);

    try {
      // 1. Calculate subtotal
      const totalSum = cart.reduce(
        (sum, item) => sum + (parseFloat(item.priceRaw != null ? item.priceRaw : item.price || 0) * (item.qty || 1)),
        0
      );

      // Handle Free items (totalSum === 0)
      if (totalSum <= 0) {
        await placeOrderWithPayment(
          { razorpay_payment_id: '', razorpay_order_id: '', razorpay_signature: '' },
          cart
        );
        dispatch(clearCartAction());
        showToast.success('Order Placed Successfully! 🎉', 'Your order has been recorded.');
        navigation.navigate('Orders');
        setLoading(false);
        return;
      }

      // 2. Step 1: Create Razorpay Order on server
      const rzpOrderRes = await createRazorpayOrder(totalSum);
      if (!rzpOrderRes.success || !rzpOrderRes.data) {
        throw new Error(rzpOrderRes.message || 'Failed to initialize payment gateway.');
      }

      const { key, order_id, amount } = rzpOrderRes.data;

      // 3. Step 2: Open Native Razorpay Popup
      const options = {
        description: 'Corporate Services Checkout',
        currency: 'INR',
        key: key,
        amount: amount, // in paise
        name: 'AssuredGain',
        order_id: order_id,
        prefill: {
          email: user.email || '',
          contact: user.mobile || user.phone || '',
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Valued Client',
        },
        theme: {
          color: COLORS.primary || '#0d9488',
        },
      };

      RazorpayCheckout.open(options)
        .then(async (paymentResponse) => {
          // paymentResponse contains:
          // { razorpay_payment_id, razorpay_order_id, razorpay_signature }

          // 4. Step 3: Verify signature & place order on backend
          try {
            const orderResult = await placeOrderWithPayment(paymentResponse, cart);

            if (orderResult.success) {
              // Clear cart in Redux & AsyncStorage
              dispatch(clearCartAction());

              const orders = orderResult.orders || orderResult.results || [];
              const orderIdText = orders.length > 0 ? `#${orders[0].order_id}` : '';

              showToast.success(
                'Order Placed Successfully! 🎉',
                `Thank you! Your order ${orderIdText} has been placed.`
              );
              navigation.navigate('Orders', { refresh: true });
            } else {
              showToast.error('Order Placement Failed', orderResult.message || 'Could not verify payment.');
            }
          } catch (placeErr) {
            showToast.error('Error', placeErr.message || 'Failed to record your order on server.');
          } finally {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          // Payment was cancelled or failed in Razorpay UI
          if (error.code !== 0 && error.code !== 2) {
            showToast.info('Payment Incomplete', error.description || error.message || 'Payment was not completed.');
          }
        });
    } catch (err) {
      setLoading(false);
      showToast.error('Checkout Error', err.message || 'Unable to proceed with checkout.');
    }
  };

  return { handleCheckout, loading };
};

export default useCheckout;
