<template>
  <transition name="fade-slide" appear>
    <div class="shop">

      <!-- Page Header -->
      <section class="shop-hero">
        <h1>Browse Our Collection</h1>
        <p>
          Discover a wide range of fashion products to elevate your style and
          express your individuality.
        </p>
      </section>

      <!-- Categories Filter -->
      <div class="container my-5">
        <div class="d-flex flex-wrap justify-content-center gap-2">
          <button class="category-btn" :class="{ active: selectedCategory === '' }" @click="filterByCategory('')">
            All
          </button>
          <button v-for="cat in categories" :key="cat.id" class="category-btn"
            :class="{ active: selectedCategory === cat.name }" @click="filterByCategory(cat.name)">
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="container my-5">
        <div class="row g-4 justify-content-center">
          <div v-for="product in filteredProducts" :key="product.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center">

            <!-- Product Card -->
            <div class="product-card">
              <div class="image-container">
                <img :src="product.image" :alt="product.title" class="product-image" />
              </div>
              <div class="product-details">
                <h3 class="product-title">{{ product.title }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <p class="product-price">R{{ product.price }}</p>

                <div class="button-group">
                  <button class="view-button" @click="openProductModal(product)">View Item</button>

                  <!-- Add to cart with hover-text change when not logged in -->
                  <button class="add-button"
                    :title="user ? 'Add to Cart' : (hoveredProductId === product.id ? 'Please log in' : 'Add to Cart')"
                    @mouseenter="handleHover(product.id, true)" @mouseleave="handleHover(product.id, false)"
                    @click="handleAddFromCard(product)">
                    {{ user ? 'Add to Cart' : (hoveredProductId === product.id ? 'Please log in' : 'Add to Cart') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!filteredProducts.length" class="text-center py-5 text-muted">
          <i class="bi bi-emoji-frown display-4"></i>
          <p class="mt-3">No products found in this category.</p>
        </div>
      </div>

      <!-- Product Modal (shared component) -->
      <ProductModal :product="selectedProduct" @add-to-cart="handleAddToCart" />

      <!-- Footer -->
      <FooterComp />
    </div>
  </transition>
</template>

<script>
import NavbarComp from '../components/NavbarComp.vue';
import ProductModal from '../components/ProductModal.vue';
import FooterComp from '../components/FooterComp.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export default {
  components: {
    NavbarComp,
    ProductModal,
    FooterComp
  },
  data() {
    return {
      products: [],
      categories: [
        { id: 1, name: 'Tops' },
        { id: 2, name: 'Bottoms' },
        { id: 3, name: 'Sneakers' },
        { id: 4, name: 'Accessories' }
      ],
      selectedCategory: '',
      selectedProduct: null,
      hoveredProductId: null // track which product button is being hovered
    };
  },
  computed: {
    ...mapState(['user', 'cartItems']),
    filteredProducts() {
      if (!this.selectedCategory) return this.products;
      return this.products.filter(
        p => p.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  },
  async created() {
    // Restore user from localStorage & fetch cart
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.setUser(JSON.parse(storedUser));
      await this.fetchCart();
    }

    // Set category from query if available
    if (this.$route.query.category) {
      this.selectedCategory = this.$route.query.category;
    }

    // Fetch products via Axios (JWT included automatically)
    try {
      const res = await axios.get('/products');
      this.products = res.data;

      // Auto-open modal if productId query is present
      if (this.$route.query.productId) {
        this.openProductById(this.$route.query.productId);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  },
  watch: {
    '$route.query.productId'(newId) {
      if (newId) {
        this.openProductById(newId);
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapActions(['fetchCart', 'addToCart']),

    filterByCategory(cat) {
      this.selectedCategory = cat;
    },

    handleHover(productId, isHover) {
      this.hoveredProductId = isHover ? productId : null;
    },

    openProductModal(product) {
      this.selectedProduct = product;
      this.$nextTick(() => {
        const modalEl = document.getElementById('productModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      });
    },

    openProductById(id) {
      const foundProduct = this.products.find(p => String(p.id) === String(id));
      if (foundProduct) {
        this.openProductModal(foundProduct);
        this.$router.replace({ query: { ...this.$route.query, productId: undefined } });
      }
    },

    async handleAddFromCard(product) {
      if (!this.user) {
        const existingModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        if (existingModal) existingModal.hide();
        this.$router.push('/login');
        return;
      }
      await this.addToCart(product);
      alert(`${product.title} added to your cart!`);
    },

    async handleAddToCart(product) {
      if (!this.user) {
        const existingModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        if (existingModal) existingModal.hide();
        this.$router.push('/login');
        return;
      }

      await this.addToCart(product);
      alert(`${product.title} added to your cart!`);

      const modalEl = document.getElementById('productModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
    },

    logout() {
      localStorage.removeItem('user');
      this.setUser(null);
      this.$router.push('/login');
    },

    async openCartModal() {
      if (this.user) {
        await this.fetchCart();
      }
      const modalEl = document.getElementById('cartModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
      }
    }
  }
};
</script>



<style scoped>
/* Header with gradient backgound */

.shop-hero {
  text-align: center;
  padding: 60px 20px 30px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  color: white;
  border-radius: 0 0 30px 30px;
}

.shop-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.shop-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
}


/* Fade-slide animation */
.fade-slide-enter-active {
  transition: all 0.8s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* Category filter buttons */
.category-btn {
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid #d1d5db;
  background: white;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.category-btn:hover,
.category-btn.active {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  border-color: transparent;
}

/* Product Card Styling */
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 420px;
  width: 300px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.7);
}

.product-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.09);
}

.image-container {
  height: 220px;
  width: 100%;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.04);
}

.product-details {
  padding: 20px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.4em;
  line-height: 1.2;
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #475569;
}

.product-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.view-button,
.add-button {
  flex: 1;
  padding: 8px;
  border: none;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  font-weight: 600;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.view-button:hover,
.add-button:hover {
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  transform: translateY(-1px);
}
</style>
