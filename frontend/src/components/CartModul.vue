<template>
  <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true" ref="modalRoot">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg rounded-4">

        <div class="modal-header bg-light border-bottom-0">
          <h5 class="modal-title" id="cartModalLabel">
            <i class="bi bi-bag-fill me-2"></i>
            <span>{{ user ? user.name : 'Guest' }}'s</span> Cart
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <template v-if="user">
            <div v-if="cartItems.length">
              <div class="cart-list">
                <div class="cart-item" v-for="item in cartItems" :key="item.product_id">
                  <img :src="item.image" alt="product" class="cart-item-image me-3" />
                  <div class="cart-item-info">
                    <h6 class="mb-1">{{ item.title }}</h6>
                    <div class="quantity-controls mb-1">
                      <button class="btn btn-sm btn-outline-secondary" @click="decrement(item)">−</button>
                      <input type="number" v-model.number="item.quantity" @change="updateQuantity(item)" min="1" />
                      <button class="btn btn-sm btn-outline-secondary" @click="increment(item)">+</button>
                    </div>
                    <p class="mb-0 fw-bold">R{{ Number(item.price).toFixed(2) }}</p>
                  </div>
                  <div class="cart-item-actions text-end">
                    <p class="mb-1 fw-semibold">R{{ (item.price * item.quantity).toFixed(2) }}</p>
                    <button class="btn btn-sm btn-outline-danger mt-2" @click="handleRemoveFromCart(item.product_id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-4 border-top pt-3 d-flex justify-content-between align-items-center">
                <h5>Total:</h5>
                <h5 class="text-primary">R{{ cartTotal }}</h5>
              </div>

              <div class="text-end mt-3">
                <button class="btn btn-dark px-4 py-2 rounded-pill" @click="goToCheckout">
                  Checkout <i class="bi bi-check-circle"></i>
                </button>
              </div>
            </div>

            <div v-else class="text-center py-4">
              <i class="bi bi-cart-x display-4 text-muted"></i>
              <p class="mt-3">Your cart is empty.</p>
            </div>
          </template>

          <template v-else>
            <div class="text-center">
              <i class="bi bi-person-circle display-4 text-muted"></i>
              <p class="mt-3">
                Please
                <a href="#" @click.prevent="hideCartAndRedirect" class="text-primary text-decoration-none">
                  log in
                </a>
                to view your cart.
              </p>
            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as bootstrap from 'bootstrap';

export default {
  computed: {
    ...mapState(['user', 'cartItems']),
    cartTotal() {
      return this.cartItems.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2);
    }
  },
  methods: {
    ...mapActions(['fetchCart', 'removeFromCart', 'updateCartItemQuantity']),

    async handleRemoveFromCart(productId) {
      await this.removeFromCart(productId);
      await this.fetchCart();
    },

    async increment(item) {
      item.quantity++;
      await this.updateCartItemQuantity({ productId: item.product_id, quantity: item.quantity });
    },

    async decrement(item) {
      if (item.quantity > 1) {
        item.quantity--;
        await this.updateCartItemQuantity({ productId: item.product_id, quantity: item.quantity });
      }
    },

    async updateQuantity(item) {
      if (item.quantity < 1) item.quantity = 1;
      await this.updateCartItemQuantity({ productId: item.product_id, quantity: item.quantity });
    },

    hideCartAndRedirect() {
      const modalEl = this.$refs.modalRoot;
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
      this.$router.push('/login');
    },

    async goToCheckout() {
      const modalEl = this.$refs.modalRoot;
      if (modalEl) {
        let modal = bootstrap.Modal.getInstance(modalEl);
        if (!modal) modal = new bootstrap.Modal(modalEl);
        modal.hide();
      }

      if (this.user) await this.fetchCart();
      this.$router.push('/checkout');
    }
  }
};
</script>





<style scoped>
h5 span {
  color: #0d6efd;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem;
  background: white;
}

.cart-item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
}

.cart-item-info {
  flex: 1;
}

.cart-item-actions {
  min-width: 80px;
}

/* Quantity controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls input {
  width: 60px;
  /* shorter width */
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.cart-item-actions {
  min-width: 80px;
}
</style>
