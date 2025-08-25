<template>

  <!-- Hero Section -->
  <transition name="fade-slide" appear>

    <div class="contact">
      <section class="contact-hero">
        <h1>Get in Touch</h1>
        <p>
          Have questions about our products, your order, or want to collaborate?
          We're here to help.
        </p>
      </section>

      <!-- Main Contact Section -->
      <section class="contact-wrapper">
        <!-- Contact Form -->
        <div class="contact-container">
          <h2 class="section-title">Send us a message</h2>

          <div v-if="thankYou" class="thank-you-message">
            <p>✅ Thank you for contacting us! We'll get back to you shortly.</p>
          </div>

          <form action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="fd06f1fd-0026-46d5-8c05-500ce4b40e09" />

            <div class="form-grid">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" name="first_name" :value="user?.name || ''" required disabled />
              </div>
              <div class="form-group">
                <label>Surname</label>
                <input type="text" name="surname" :value="user?.surname || ''" required disabled />
              </div>
              <!-- Hidden fields to actually submit the values -->
              <input type="hidden" name="first_name" :value="user?.name || ''" />
              <input type="hidden" name="surname" :value="user?.surname || ''" />
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" name="email" :value="user?.email || ''" required disabled />
              </div>
              <div class="form-group">
                <label>Cell Number</label>
                <input type="tel" name="cell" pattern="[0-9]{10}" required />
              </div>
            </div>

            <div class="form-group">
              <label>Subject</label>
              <select name="subject" required>
                <option value="" disabled selected>Select a subject</option>
                <option>General Inquiry</option>
                <option>Product Information</option>
                <option>Order Status</option>
                <option>Returns & Refunds</option>
                <option>Business Collaboration</option>
                <option>Other</option>
              </select>
            </div>

            <div class="form-group">
              <label>Message</label>
              <textarea name="message" rows="5" required></textarea>
            </div>

            <div class="buttons">
              <button type="submit" class="btn-primary">Send Message</button>
              <button type="reset" class="btn-secondary">Clear</button>
            </div>
          </form>
        </div>

        <!-- Contact Details -->
        <div class="contact-details">
          <h2 class="section-title">Visit Our Store</h2>
          <p class="text-center">
            Upper Level Durban Station Complex,<br />
            65 Riverside Ave,<br />
            Stamford Hill, Durban,<br />
            4001
          </p>

          <h3 class="section-title">Chat with Us on WhatsApp</h3>
          <p class="text-center">
            <a href="https://wa.me/276879637" target="_blank">
              <i class="fab fa-whatsapp" style="font-size: 1.7rem;"></i>
            </a>
          </p>

          <div class="map-container">
            <iframe
              src="https://www.google.com/maps?q=Upper+Level+Durban+Station+Complex,+65+Riverside+Ave,+Stamford+Hill,+Durban,+4001&output=embed"
              width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <!-- footer -->
      <FooterComp />
    </div>
  </transition>
</template>

<script>
import NavbarComp from '../components/NavbarComp.vue';
import ProductCard from '../components/ProductCard.vue';
import FooterComp from '@/components/FooterComp.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export default {
  name: 'Contact',
  components: { NavbarComp, ProductCard, FooterComp },
  data() {
    return {
      products: [],
      selectedCategory: ''
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
    // Restore user if present
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.setUser(JSON.parse(storedUser));
      await this.fetchCart(); // fetch cart automatically if logged in
    }

    if (this.$route.query.category) {
      this.selectedCategory = this.$route.query.category;
    }

    // Fetch all products via Axios (JWT automatically added)
    try {
      const res = await axios.get('/products');
      this.products = res.data;
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapActions(['fetchCart', 'addToCart']),

    async handleAddToCart(product) {
      if (!this.user) {
        alert('Please log in to add items to your cart.');
        this.$router.push('/login');
        return;
      }
      await this.addToCart(product);
      alert(`${product.title} added to your cart!`);
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

/* Fade slide animation */
.fade-slide-enter-active {
  transition: all 0.8s ease;
}

.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.contact-hero {
  text-align: center;
  padding: 60px 20px 30px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  color: white;
  border-radius: 0 0 30px 30px;
}

.contact-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.contact-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 40px;
  padding: 50px 20px;
}

.contact-container,
.contact-details {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #3b82f6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
}

input,
textarea,
select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 6px rgba(139, 92, 246, 0.3);
  outline: none;
}

textarea {
  /* make width 100% */
  width: 100%;
}

.buttons {
  display: flex;
  gap: 12px;
}

.btn-primary {
  flex: 1;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  flex: 1;
  background: #f3f4f6;
  color: #374151;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.thank-you-message {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 14px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.contact-details p {
  color: #4b5563;
  line-height: 1.6;
}

.contact-details a {
  color: #3b82f6;
  font-weight: 600;
}

.map-container {
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
}

/* ===================== */
/* Responsive Fixes */
/* ===================== */

/* Tablets & below */
@media (max-width: 1024px) {
  .contact-hero h1 {
    font-size: 2rem;
  }
  .contact-hero p {
    font-size: 1rem;
  }
  .contact-wrapper {
    grid-template-columns: 1fr; /* stack form and details */
    gap: 30px;
    padding: 40px 16px;
  }
  .contact-container,
  .contact-details {
    padding: 28px;
  }
}

/* Mobile screens */
@media (max-width: 768px) {
  .contact-hero {
    padding: 40px 16px 20px;
    border-radius: 0 0 20px 20px;
  }
  .contact-hero h1 {
    font-size: 1.8rem;
  }
  .contact-hero p {
    font-size: 0.95rem;
  }
  .form-grid {
    grid-template-columns: 1fr; /* make form inputs full width */
    gap: 16px;
    width: 100%;
  }

  /* Make form inputs full width */
input,
textarea,
select {
  width: 100%;   /* ensures full container width */
  box-sizing: border-box;
}

  .buttons {
    flex-direction: column;
  }
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

/* Very small phones */
@media (max-width: 480px) {
  .contact-hero h1 {
    font-size: 1.5rem;
  }
  .contact-hero p {
    font-size: 0.9rem;
  }
  .contact-container,
  .contact-details {
    padding: 20px;
  }
  .section-title {
    font-size: 1.2rem;
  }
}

</style>
