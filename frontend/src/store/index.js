import { createStore } from 'vuex';
import axios from 'axios';

const API = 'http://localhost:3000';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // set localstorage for users when they log in
    cartItems: [], // the cart will be fetched from the api
    //Shop States:
    allProducts: [],
    filters: {
      category: null,
      type: null,
      style: null,
      minPrice: 0,
      maxPrice: Infinity

    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCartItems(state, cart) {
      state.cartItems = cart;
    },
    // Shop Setters/Mutations:
    setAllProducts(state, products) {
      state.allProducts = products;

    },

    setFilter(state, { key, value }) {
      state.filters[key] = value;
    },

    resetFilters(state) {
      state.filters.type = null;
      state.filters.style = null;
      state.filters.minPrice = 0;
      state.filters.maxPrice = Infinity;
    }
  },
  actions: {
    // Register new user
    async register({ dispatch }, form) {
      await axios.post('http://localhost:3000/api/auth/register', form);
    },

    // Login user and fetch their cart
    async login({ commit, dispatch }, form) {
      const res = await axios.post('http://localhost:3000/api/auth/login', form);
      const user = res.data.user;
      commit('setUser', user);
      localStorage.setItem('user', JSON.stringify(user));
      await dispatch('fetchCart');
      return res.data;
    },

    // Logout clears everything
    logout({ commit }) {
      commit('setUser', null);
      commit('setCartItems', []);
      localStorage.removeItem('user');
    },

    // Fetch user's cart
    async fetchCart({ commit, state }) {
      if (!state.user) {
        commit('setCartItems', []);
        return;
      }
      const res = await axios.get(`http://localhost:3000/api/cart/${state.user.id}`);
      commit('setCartItems', res.data);
    },

    // Add product (overwrites quantity correctly in backend)
    async addToCart({ dispatch, state }, { id, quantity = 1 }) {
      if (!state.user) return alert("Please log in to add items to cart");
      await axios.post('http://localhost:3000/api/cart', {
        user_id: state.user.id,
        product_id: id,
        quantity
      });
      await dispatch('fetchCart');
    },

    // Update item quantity
    async updateCartItemQuantity({ dispatch, state }, { productId, quantity }) {
      if (!state.user) return;
      await axios.put(`http://localhost:3000/api/cart/${state.user.id}/${productId}`, {
        quantity
      });
      await dispatch('fetchCart');
    },

    // Remove product
    async removeFromCart({ dispatch, state }, productId) {
      if (!state.user) return;
      await axios.delete(`http://localhost:3000/api/cart/${state.user.id}/${productId}`);
      await dispatch('fetchCart');
    },

    // Shop Actions:
    // ----------------- Load category products -----------------
    async loadCategoryProducts({ commit }, category) {
      try {
        let url = `${API}/api/products`;

        // If category is not "All", add ?category=...
        if (category && category.toLowerCase() !== "all") {
          url += `?category=${encodeURIComponent(category)}`;
        }

        const { data } = await axios.get(url);

        commit('setAllProducts', data);
        commit('setFilter', { key: 'category', value: category });
      } catch (err) {
        console.error("Error loading products:", err);
      }
    }

  },
  getters: {
    isLoggedIn: state => !!state.user,
    cartTotal: state =>
      state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    cartCount: state =>
      state.cartItems.reduce((count, item) => count + item.quantity, 0),

    //Shop Getters(Filter Functionality):
    filteredProducts(state) {
      return state.allProducts.filter(p => {
        const okType = !state.filters.type || p.type === state.filters.type;

        const okStyle = !state.filters.style || p.style === state.filters.style;

        const okPrice =
          p.price >= (state.filters.minPrice ?? 0) &&
          p.price <= (state.filters.maxPrice ?? Infinity);

        return okType && okStyle && okPrice;
      });
    }
  }
});

export default store;
