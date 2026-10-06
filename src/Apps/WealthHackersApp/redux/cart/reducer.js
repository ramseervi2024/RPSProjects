import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_QTY_OPTIMISTIC,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  CHECKOUT_ORDER_REQUEST,
  CHECKOUT_ORDER_SUCCESS,
  CHECKOUT_ORDER_FAILURE,
  CHECKOUT_INIT_REQUEST,
  CHECKOUT_INIT_SUCCESS,
  CHECKOUT_INIT_FAILURE,
} from './constants';

const initialState = {
  items: [],
  loading: false,
  updating: false,
  error: null,
  lastOrder: null,
};

// Helper: match item identity across platform & id
const isSameItem = (a, b) =>
  String(a?.id) === String(b?.id) &&
  String(a?.platform || '').toLowerCase() === String(b?.platform || '').toLowerCase();

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
    case 'persist/REHYDRATE':
      // Never rehydrate stale cart items from disk cache
      return initialState;

    case GET_CART_REQUEST:
      // Only show full loading if there are no items currently in local state
      return { ...state, loading: state.items.length === 0, error: null };

    case GET_CART_SUCCESS: {
      const serverItems = action.payload;
      if (Array.isArray(serverItems)) {
        // Keep any newly added items that are still in-flight (added in the last 5 seconds)
        const recentOptimisticItems = state.items.filter(
          (localItem) =>
            localItem._optimisticAt &&
            Date.now() - localItem._optimisticAt < 5000 &&
            !serverItems.some((s) => isSameItem(localItem, s))
        );

        const reconciled = serverItems.map((sItem) => {
          const localItem = state.items.find((l) => isSameItem(l, sItem));
          return {
            ...localItem,
            ...sItem,
            priceRaw: sItem.priceRaw != null ? sItem.priceRaw : localItem?.priceRaw,
            image: sItem.image || sItem.image_url || localItem?.image || localItem?.image_url,
            qty: parseInt(sItem.qty || localItem?.qty || 1, 10),
            _optimisticAt: undefined,
          };
        });
        return {
          ...state,
          loading: false,
          items: [...reconciled, ...recentOptimisticItems],
          error: null,
        };
      }
      return { ...state, loading: false, error: null };
    }

    case GET_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // OPTIMISTIC ADD: Immediately update state in 0ms so navigating to cart never shows previous/stale values
    case ADD_TO_CART_REQUEST: {
      const newItem = action.payload;
      if (!newItem || !newItem.id) {
        return { ...state, updating: true, error: null };
      }
      const existingIdx = state.items.findIndex((i) => isSameItem(i, newItem));
      let updatedItems;
      if (existingIdx >= 0) {
        updatedItems = state.items.map((item, idx) => {
          if (idx === existingIdx) {
            const addQty = parseInt(newItem.qty || 1, 10);
            return {
              ...item,
              qty: parseInt(item.qty || 1, 10) + addQty,
              _optimisticAt: Date.now(),
            };
          }
          return item;
        });
      } else {
        updatedItems = [
          ...state.items,
          {
            ...newItem,
            qty: parseInt(newItem.qty || 1, 10),
            _optimisticAt: Date.now(),
          },
        ];
      }
      return {
        ...state,
        items: updatedItems,
        updating: false,
        error: null,
      };
    }

    case ADD_TO_CART_SUCCESS: {
      const serverItems = action.payload;
      if (Array.isArray(serverItems) && serverItems.length > 0) {
        const reconciled = serverItems.map((sItem) => {
          const localItem = state.items.find((l) => isSameItem(l, sItem));
          return {
            ...localItem,
            ...sItem,
            priceRaw: sItem.priceRaw != null ? sItem.priceRaw : localItem?.priceRaw,
            image: sItem.image || sItem.image_url || localItem?.image || localItem?.image_url,
            qty: parseInt(sItem.qty || localItem?.qty || 1, 10),
            _optimisticAt: undefined,
          };
        });
        return { ...state, updating: false, items: reconciled, error: null };
      }
      return { ...state, updating: false, error: null };
    }

    // OPTIMISTIC STEPPER: Immediate quantity update in 0ms on +/- taps
    case UPDATE_CART_QTY_OPTIMISTIC: {
      const { id, platform, delta } = action.payload || {};
      const updated = state.items
        .map((item) => {
          if (isSameItem(item, { id, platform })) {
            const newQty = parseInt(item.qty || 1, 10) + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
      return { ...state, items: updated, updating: false, error: null };
    }

    // OPTIMISTIC REMOVE: Immediate item deletion in 0ms
    case REMOVE_FROM_CART_REQUEST: {
      const target = action.payload;
      if (target && target.id) {
        const filtered = state.items.filter((i) => !isSameItem(i, target));
        return { ...state, items: filtered, updating: false, error: null };
      }
      return { ...state, updating: false, error: null };
    }

    case REMOVE_FROM_CART_SUCCESS: {
      const serverItems = action.payload;
      if (Array.isArray(serverItems)) {
        return { ...state, updating: false, items: serverItems, error: null };
      }
      return { ...state, updating: false, error: null };
    }

    case CLEAR_CART_REQUEST:
    case CLEAR_CART_SUCCESS:
      return { ...state, updating: false, items: [], error: null };

    case ADD_TO_CART_FAILURE:
    case REMOVE_FROM_CART_FAILURE:
    case CLEAR_CART_FAILURE:
      return { ...state, updating: false, error: action.payload };

    case CHECKOUT_INIT_REQUEST:
    case CHECKOUT_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CHECKOUT_INIT_SUCCESS:
      return { ...state, loading: false, error: null };
    case CHECKOUT_INIT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CHECKOUT_ORDER_SUCCESS:
      return { ...state, loading: false, items: [], lastOrder: action.payload, error: null };
    case CHECKOUT_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
