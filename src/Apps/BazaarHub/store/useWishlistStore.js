import { create } from 'zustand';

const useWishlistStore = create((set, get) => ({
    wishlist: [],

    addToWishlist: (business) => set((state) => {
        const exists = state.wishlist.find(item => item.id === business.id);
        if (exists) return state;
        return { wishlist: [...state.wishlist, business] };
    }),

    removeFromWishlist: (businessId) => set((state) => ({
        wishlist: state.wishlist.filter(item => item.id !== businessId)
    })),

    toggleWishlist: (business) => {
        const state = get();
        const exists = state.wishlist.find(item => item.id === business.id);
        if (exists) {
            state.removeFromWishlist(business.id);
        } else {
            state.addToWishlist(business);
        }
    },

    isInWishlist: (businessId) => {
        return !!get().wishlist.find(item => item.id === businessId);
    }
}));

export default useWishlistStore;
