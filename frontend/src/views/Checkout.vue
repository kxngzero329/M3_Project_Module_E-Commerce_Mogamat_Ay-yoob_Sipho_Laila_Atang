<template>
  <transition name="fade-slide" appear>
    <div class="checkout">
      <!-- Progress Bar -->
      <div class="progress-container">
        <div v-for="(step, index) in steps" :key="index" class="progress-step"
          :class="{ active: currentStep >= index }">
          <span>
            <template v-if="currentStep > index">✔</template>
            <template v-else>{{ index + 1 }}</template>
          </span>
          <p>{{ step }}</p>
        </div>

        <!-- Gradient Line -->
        <div class="progress-bar" :style="{ width: progressWidth }"></div>
      </div>

      <!-- Step Content -->
      <div class="step-container">
        <!-- Step 1: Shipping -->
        <div v-if="currentStep === 0" class="step">
          <h2>Shipping Information</h2>
          <form @submit.prevent="nextStep">
            <div class="form-group">
              <input v-model="shipping.name" placeholder=" " required autocomplete="name" />
              <label>Full Name</label>
            </div>
            <div class="form-group">
              <input v-model="shipping.address" placeholder=" " required autocomplete="street-address" />
              <label>Street Address</label>
            </div>
            <div class="form-group">
              <input v-model="shipping.city" placeholder=" " required autocomplete="address-level2" />
              <label>City</label>
            </div>
            <div class="form-group">
              <input v-model="shipping.postal_code" placeholder=" " required autocomplete="postal-code" />
              <label>Postal Code</label>
            </div>
            <div class="form-group">
              <input v-model="shipping.country" placeholder=" " required autocomplete="country" />
              <label>Country</label>
            </div>
            <button type="submit">Next</button>
          </form>
        </div>

        <!-- Step 2: Payment -->
        <div v-if="currentStep === 1" class="step">
          <h2>Payment Details</h2>
          <form @submit.prevent="nextStep">
            <div class="form-group">
              <input v-model="payment.card_name" placeholder=" " required autocomplete="cc-name" />
              <label>Cardholder Name</label>
            </div>
            <div class="form-group">
              <input v-model="payment.card_number" placeholder=" " maxlength="19" required autocomplete="cc-number"
                @input="formatCardNumber" />
              <label>Card Number</label>
            </div>
            <div class="flex">
              <div class="form-group">
                <input v-model="payment.expiry" placeholder=" " required autocomplete="cc-exp" @input="formatExpiry" />
                <label>MM/YY</label>
              </div>
              <div class="form-group">
                <input v-model="payment.cvv" placeholder=" " maxlength="3" required autocomplete="cc-csc" />
                <label>CVV</label>
              </div>
            </div>
            <div class="form-group">
              <select v-model="payment.method" required>
                <option disabled value="">Select Payment Method</option>
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            <div class="step-actions">
              <button type="button" @click="prevStep">Back</button>
              <button type="submit">Next</button>
            </div>
          </form>
        </div>

        <!-- Step 3: Review -->
        <div v-if="currentStep === 2" class="step review-step">
          <h2>Review & Confirm</h2>

          <!-- Order Summary -->
          <div class="order-summary">
            <div v-for="item in cart" :key="item.product_id" class="order-item">
              <img :src="item.image" alt="item-image" />
              <div class="item-details">
                <h4>{{ item.title }}</h4>
                <p>Qty: {{ item.quantity }}</p>
              </div>
              <p class="price">R{{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
            <h3 class="total">Total: R{{ orderTotal.toFixed(2) }}</h3>
          </div>

          <!-- Change Buttons -->
          <div class="review-actions">
            <button type="button" @click="currentStep = 0">Change Shipping</button>
            <button type="button" @click="currentStep = 1">Change Payment</button>
          </div>

          <!-- Step Actions -->
          <div class="step-actions">
            <button type="button" @click="prevStep">Back</button>
            <button @click="placeOrder">Place Order</button>
          </div>
        </div>
      </div> <!-- step-container -->

      <!-- Footer -->
      <FooterComp />
    </div> <!-- checkout -->
  </transition>
</template>

<script>
import axios from "axios";
import NavbarComp from "@/components/NavbarComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  components: { NavbarComp, FooterComp },
  data() {
    return {
      steps: ["Shipping", "Payment", "Review"],
      currentStep: 0,
      cart: [],
      shipping: { name: "", address: "", city: "", postal_code: "", country: "" },
      payment: { card_name: "", card_number: "", expiry: "", cvv: "", method: "" },
      user: null, // initialize as null
    };
  },
  computed: {
    orderTotal() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    progressWidth() {
      return `${(this.currentStep / (this.steps.length - 1)) * 100}%`;
    },
  },
  methods: {
    async fetchCart() {
      if (!this.user) return;
      try {
        const res = await axios.get(`http://localhost:3000/api/cart/${this.user.id}`);
        this.cart = res.data.map(item => ({ ...item, quantity: Number(item.quantity), price: Number(item.price) }));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) this.currentStep++;
      if (this.currentStep === 2) this.fetchCart();
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--;
    },
    async placeOrder() {
      try {
        if (!this.user) {
          alert("Please log in to place an order.");
          this.$router.push("/login");
          return;
        }

        await this.fetchCart();
        if (!this.cart.length) return alert("Your cart is empty!");

        const res = await axios.post("http://localhost:3000/api/orders", {
          user_id: this.user.id,
          shipping_address: this.shipping.address,
          city: this.shipping.city,
          postal_code: this.shipping.postal_code,
          country: this.shipping.country,
          payment_method: this.payment.method,
        });

        const newOrder = {
          id: res.data.orderId,
          user_id: this.user.id,
          items: this.cart.map(item => ({ ...item })),
          total: this.orderTotal,
          status: "pending",
          created_at: new Date().toISOString(),
        };

        const savedOrders = JSON.parse(localStorage.getItem('orders_' + this.user.id) || '[]');
        savedOrders.push(newOrder);
        localStorage.setItem('orders_' + this.user.id, JSON.stringify(savedOrders));

        this.simulateStatus(newOrder);

        alert("Order placed successfully! Order ID: " + res.data.orderId);
        this.$router.push("/orders");
      } catch (err) {
        console.error(err);
        alert("Error placing order");
      }
    },
    simulateStatus(order) {
      const statuses = ["pending", "paid", "shipped", "completed"];
      let currentIndex = statuses.indexOf(order.status?.toLowerCase());
      if (currentIndex === -1 || order.status === "completed" || order.status === "cancelled") return;
      statuses.slice(currentIndex + 1).forEach((status, i) => {
        setTimeout(() => {
          order.status = status;
          const storedOrders = JSON.parse(localStorage.getItem('orders_' + this.user.id) || '[]');
          const index = storedOrders.findIndex(o => o.id === order.id);
          if (index > -1) {
            storedOrders[index].status = status;
            localStorage.setItem('orders_' + this.user.id, JSON.stringify(storedOrders));
          }
        }, (i + 1) * 5000);
      });
    },
    formatCardNumber() {
      this.payment.card_number = this.payment.card_number.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    },
    formatExpiry() {
      this.payment.expiry = this.payment.expiry.replace(/\D/g, "").replace(/(\d{2})(\d{1,2})/, "$1/$2").substr(0, 5);
    },
  },
  mounted() {
    // Sync JWT/localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== 'undefined') {
      this.user = JSON.parse(storedUser);
    }

    // Redirect if not logged in
    if (!this.user) {
      this.$router.push("/login");
    } else {
      this.fetchCart();
    }
  },
};
</script>


<style scoped>
/* Progress Bar */
.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  max-width: 700px;
  margin: 2rem auto;
  z-index: 1;
}

.progress-step {
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 2;
}

.progress-step span {
  display: inline-block;
  width: 50px;
  height: 50px;
  background: #ddd;
  border-radius: 50%;
  line-height: 50px;
  font-weight: bold;
  position: relative;
  color: #fff;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.progress-step.active span {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
}

.progress-step p {
  margin-top: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.progress-container::before {
  content: "";
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  z-index: 0;
}

.progress-bar {
  position: absolute;
  top: 25px;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
  transition: width 0.5s ease-in-out;
  z-index: 1;
}

/* Step container */
.step-container {
  max-width: 700px;
  margin: 0 auto;
}

.step {
  margin-bottom: 2rem;
  padding: 2.5rem 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
}

.step h2 {
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
  color: #333;
}

/* Floating labels */
.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  background: #fff;
  transition: all 0.3s ease;
}

.form-group label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.2s ease;
  background: #fff;
  padding: 0 4px;
}

.form-group input:focus+label,
.form-group input:not(:placeholder-shown)+label,
.form-group select:focus+label,
.form-group select:not([value=""])+label {
  top: -8px;
  font-size: 0.8rem;
  color: #3b82f6;
}

/* Flex row for expiry & CVV */
.flex {
  display: flex;
  gap: 1rem;
}

.flex input {
  flex: 1;
}

/* Buttons */
button {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Step actions */
.step-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.step-actions button {
  flex: none;
  margin-top: 0.5rem;
  width: 48%;
}

/* Review buttons */
.review-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.review-actions button {
  flex: 1 1 48%;
  background: #f0f0f0;
  color: #333;
  font-weight: 600;
  transition: 0.3s ease;
}

.review-actions button:hover {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: #fff;
}

/* Order Summary */
.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 12px;
  background: #fafafa;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.order-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
}

.item-details h4 {
  margin: 0 0 0.2rem 0;
  font-size: 1rem;
  color: #333;
}

.price {
  margin-left: auto;
  font-weight: bold;
  color: #3b82f6;
  font-size: 1rem;
}

.total {
  text-align: right;
  margin-top: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
}

/* Autofill input fix for Chrome/Edge */
input:-webkit-autofill {
  box-shadow: 0 0 0 30px #fff inset !important;
  -webkit-text-fill-color: #000 !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }

  .step-actions button,
  .review-actions button {
    flex: 1 1 100%;
  }

  .progress-step p {
    font-size: 0.8rem;
  }
}
</style>
