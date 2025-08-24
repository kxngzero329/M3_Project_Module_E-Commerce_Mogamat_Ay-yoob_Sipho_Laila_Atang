<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.title" class="product-image"/>
    </div>
    <div class="product-details">
      <h3 class="product-title">{{ product.title }}</h3>
      <!-- <p class="product-description">{{ product.description }}</p> -->
      <p class="product-price">R{{ product.price }}</p>
      <div class="button-group">
        <!-- View Item always available -->
        <button class="view-button" @click="$emit('view-item', product)">View Item</button>
        <!-- Add to cart with hover text change -->
        <button
          class="add-button"
          @click="handleAddClick"
          @mouseenter="handleHover(true)"
          @mouseleave="handleHover(false)"
        >
          {{ addButtonText }}
        </button>
      </div>
    </div>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as bootstrap from 'bootstrap';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      addButtonText: 'Add to Cart'
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['addToCart']),
    async handleAddClick() {
      if (!this.user) {
        const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        if (productModal) {
          productModal.hide();
        }
        this.$router.push('/login');
        return;
      }
      await this.addToCart(this.product);
      alert(`${this.product.title} added to your cart!`);
    },
    handleHover(isHovering) {
      if (!this.user) {
        this.addButtonText = isHovering ? 'Please log in' : 'Add to Cart';
      }
    }
  }
};
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 330px;
  width: 280px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border: 1px solid rgba(226, 232, 240, 0.7);
}

.product-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.09);
}

.image-container {
  height: 180px;
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
  padding: 16px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 1.05rem;
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
  line-height: 1.2;
  font-size: 0.88rem;
  margin-bottom: 8px;
  color: #475569;
}

.product-price {
  font-size: 1rem;
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
  flex: 1 1 auto;
  padding: 7px;
  border: none;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  font-weight: 600;
  border-radius: 6px;
  font-size: 0.88rem;
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: center;
}

.view-button:hover,
.add-button:hover {
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  transform: translateY(-1px);
}

/* Tablet */
@media (max-width: 768px) {
  .product-card {
    height: 360px;
    width: 220px;
  }
  .image-container {
    height: 160px;
  }
  .product-details {
    padding: 14px;
  }
  .view-button,
  .add-button {
    font-size: 0.85rem;
    padding: 6px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .product-card {
    height: 330px;
    width: 230px;
  }
  .image-container {
    height: 150px;
  }
  .product-details {
    padding: 12px;
  }
  .product-title {
    font-size: 1rem;
  }
  .product-description {
    font-size: 0.82rem;
  }
  .product-price {
    font-size: 0.98rem;
  }
  .view-button,
  .add-button {
    font-size: 0.8rem;
    padding: 5px;
  }
}

/* Extra small mobile */
@media (max-width: 360px) {
  .product-card {
    height: 300px;
    width: 200px;
  }
  .image-container {
    height: 130px;
  }
  .product-details {
    padding: 10px;
  }
  .product-title {
    font-size: 0.95rem;
  }
  .product-description {
    font-size: 0.75rem;
  }
  .product-price {
    font-size: 0.95rem;
  }
  .view-button,
  .add-button {
    font-size: 0.75rem;
    padding: 4px;
  }
}
</style>

