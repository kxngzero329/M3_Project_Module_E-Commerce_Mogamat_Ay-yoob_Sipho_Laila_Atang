<template>
  <!-- Product Modal -->
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content product-modal-content" v-if="product">
        
        <!-- Header -->
        <div class="modal-header product-modal-header">
          <h5 class="modal-title fw-bold" id="productModalLabel">
            <i class="bi bi-bag me-2"></i>
            {{ product.title }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Body -->
        <div class="modal-body product-modal-body">
          <!-- Image -->
          <div class="product-modal-image">
            <img :src="product.image" :alt="product.title" class="img-fluid rounded-3 shadow-sm">
          </div>

          <!-- Details -->
          <div class="product-modal-details">
            <p class="text-muted mb-3">{{ product.description }}</p>
            <h4 class="product-price">R{{ Number(product.price).toFixed(2) }}</h4>

            <!-- Buttons -->
            <button
              v-if="user"
              class="btn product-add-btn"
              @click="$emit('add-to-cart', product)"
            >
              <i class="bi bi-cart-plus me-2"></i> Add to Cart
            </button>

            <button
              v-else
              class="btn product-login-btn"
              @click="redirectToLogin"
            >
              <i class="bi bi-lock me-2"></i> Please log in to add
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as bootstrap from 'bootstrap';

export default {
  name: 'ProductModal',
  props: {
    product: { type: Object, default: null }
  },
  computed: { ...mapState(['user']) },
  methods: {
    redirectToLogin() {
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('productModal'));
      if (modalInstance) modalInstance.hide();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.product-modal-content {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.product-modal-header {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 1rem 1.25rem;
}

.product-modal-body {
  display: flex;
  flex-wrap: nowrap;
  gap: 2rem;
  padding: 2.5rem;
  flex: 1;
  overflow-y: auto;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.product-modal-image {
  flex: 0 0 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-modal-image img {
  width: 250px;
  height: 250px;
  border-radius: 0.75rem;
  object-fit: cover;
}

.product-modal-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  gap: 1rem;
}

.product-price {
  color: #3b82f6;
  font-weight: 700;
  margin-bottom: 1rem;
}

.product-add-btn {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  width: 50%;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.product-add-btn:hover {
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  transform: translateY(-1px);
}

.product-login-btn {
  background: #f3f4f6;
  color: #374151;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  transition: all 0.2s ease;
}

.product-login-btn:hover {
  background: #e5e7eb;
}

@media (max-width: 768px) {
  .product-modal-body {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .product-modal-details {
    align-items: center;
    text-align: center;
  }

  .product-add-btn {
    width: 70%;
  }
}
</style>
