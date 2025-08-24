<template>
  <transition name="fade-slide" appear>
    <div id="app">
      <!-- Hero Section -->
      <section class="return-hero">
        <h1>Returns</h1>
        <p>Want to return an item? We're here to help</p>
      </section>
      <main>
        <!-- Form for submitting return information -->
        <div v-if="!isSubmitted" class="return-form-container">
          <form @submit.prevent="submitReturn">
            <!-- Input for the order number -->
            <div class="form-group">
              <label for="orderNumber">Product Name</label>
              <input type="text" id="orderNumber" v-model="orderNumber" placeholder="Enter your Product Name"
                required />
            </div>
            <!-- Dropdown for the return reason -->
            <div class="form-group">
              <label for="returnReason">Reason for return:</label>
              <select id="returnReason" v-model="returnReason" required>
                <option value="" disabled>Select a reason</option>
                <option>Defective item</option>
                <option>Wrong size or color</option>
                <option>Changed my mind</option>
                <option>Item not as described</option>
                <option>Other</option>
              </select>
            </div>

            <!-- Text area for additional details -->
            <div class="form-group">
              <label for="returnDetails">Additional Details:</label>
              <textarea id="returnDetails" v-model="returnDetails"
                placeholder="Provide more details about the return (e.g., what is wrong with the item?)"
                rows="4"></textarea>
            </div>

            <!-- Submit button -->
            <button type="submit">Submit Return Request</button>
          </form>
        </div>

        <!-- Success message displayed after form submission -->
        <div v-else class="success-message">
          <h3>Thank you!</h3>
          <p>Your return request for order <strong>{{ orderNumber }}</strong> has been submitted. We will contact you
            shortly with further instructions.</p>
        </div>
      </main>
      <FooterComp />
    </div>
  </transition>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
export default {
  name: "ReturnPage",
  components: { FooterComp },
  data() {
    return {
      orderNumber: "",
      returnReason: "",
      returnDetails: "",
      isSubmitted: false, // Flag to show success message
    };
  },
  methods: {
    submitReturn() {
      // In a real application, you would send this data to a backend API.
      // For this example, we'll simulate a submission delay.
      console.log("Submitting return request...");
      console.log("Order Number:", this.orderNumber);
      console.log("Reason:", this.returnReason);
      console.log("Details:", this.returnDetails);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitted = true;
      }, 1000);
    },
  },
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

/* Scoped styles to keep the component's CSS isolated */
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background: #f5f5f5;
  color: #333;
}

.return-hero {
  text-align: center;
  padding: 60px 20px 30px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  color: white;
  border-radius: 0 0 30px 30px;
}

.return-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.return-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
}

main {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

.return-form-container {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}

.form-group {
  margin-bottom: 20px;

}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1.4rem;
  font-weight: bold;
  padding-bottom: 6px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  border-bottom: 2px solid #eee;
}


.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  /* Ensures padding doesn't affect width */
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 6px rgba(139, 92, 246, 0.3);
}

.form-group textarea {
  resize: vertical;
  /* Allow vertical resizing but not horizontal */
}

button {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6);
}

.success-message {
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin: 50px;
  padding: 20px;
  ;
  padding-bottom: 6px;
  background: linear-gradient(90deg, #1e4481, #3b256d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 2px solid #d3d3d3;
  border-left: #3b82f6 6px solid;
}
</style>
