<template>
  <transition name="fade-slide" appear>
  <div id="app">
    <!-- Hero Section -->
    <section class="faq-hero">
      <h1>Frequently Asked Questions</h1>
      <p>Have questions about our products, your order? We're here to help.</p>
      <input type="text" id="searchBar" v-model="searchQuery" placeholder="Search" />
    </section>

    <!-- FAQ Categories -->
    <main>
      <div v-for="(category, cIndex) in filteredCategories" :key="cIndex">
        <h2 class="faq-category">{{ category.title }}</h2>

        <div class="faq-item" v-for="(faq, fIndex) in (category.items || [])" :key="fIndex">
          <h3 @click="toggleFaq(cIndex, fIndex)">
            <span v-html="highlightMatch(faq.question)"></span>
            <span>{{ faq.open ? '−' : '+' }}</span>
          </h3>

          <!-- Animated Answer -->
          <transition name="faq-slide">
            <p v-if="faq.open" v-html="highlightMatch(faq.answer)"></p>
          </transition>
        </div>
      </div>

      <p v-if="filteredCategories.length === 0">No results found.</p>

      <!-- Help CTA -->
      <div class="help-cta">
        <h3>Still need help?</h3>
        <p>Contact our support team, we’re happy to assist.</p>
        <a href="/contact" class="cta-btn">Contact Us</a>
      </div>
    </main>

    <!-- Footer -->
    <FooterComp />
  </div>
   </transition>
</template>

<script>
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  name: "FAQ",
  components: { NavbarComp, FooterComp },
  data() {
    return {
      searchQuery: "",
      categories: [
        {
          title: "Orders & Shipping",
          items: [
            { question: "How long does shipping take?", answer: "Shipping typically takes 3-7 business days depending on your location.", open: false },
            { question: "Do you offer international shipping?", answer: "Yes, we ship worldwide. Delivery times vary by destination.", open: false }
          ]
        },
        {
          title: "Returns & Refunds",
          items: [
            { question: "What is your return policy?", answer: "You can return items within 30 days in original condition for a full refund.", open: false },
            { question: "Can I return sale items?", answer: "Sale items can be returned unless marked as final sale.", open: false }
          ]
        },
        {
          title: "Account & Payments",
          items: [
            { question: "How do I create an account?", answer: "Click on the Register link at the top right and fill in your details.", open: false },
            { question: "What payment methods are accepted?", answer: "We accept Credit/Debit Cards, PayPal, and Cash on Delivery.", open: false }
          ]
        }
      ]
    };
  },
  computed: {
    filteredCategories() {
      const query = this.searchQuery.toLowerCase();
      return this.categories
        .map(category => ({
          ...category,
          items: category.items.filter(
            faq => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
          )
        }))
        .filter(category => category.items.length > 0);
    }
  },
  methods: {
    toggleFaq(catIndex, faqIndex) {
      this.categories[catIndex].items[faqIndex].open =
        !this.categories[catIndex].items[faqIndex].open;
    },
    highlightMatch(text) {
      if (!this.searchQuery) return text;
      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return text.replace(regex, `<mark>$1</mark>`);
    },
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
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background: #f5f5f5;
  color: #333;
}

/* Keep Hero section exactly as you had it */
.faq-hero {
  text-align: center;
  padding: 60px 20px 30px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  color: white;
  border-radius: 0 0 30px 30px;
}

.faq-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.faq-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
}

#searchBar {
  width: 80%;
  max-width: 600px;
  padding: 10px 15px;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  outline: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

main {
  max-width: 850px;
  margin: 40px auto;
  padding: 0 20px;
}

/* Category title styling */
.faq-category {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 40px 0 20px;
  padding-bottom: 6px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  border-bottom: 2px solid #eee;
}

/* FAQ card styling */
.faq-item {
  background: white;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 12px;
  border-left: 5px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #3b82f6;
}

.faq-item h3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  color: #3b82f6;
}

/* Search match highlight */
mark {
  background-color: #ffec99;
  padding: 0 3px;
  border-radius: 3px;
}

/* Slide animation */
.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: all 0.3s ease;
}

.faq-slide-enter-from,
.faq-slide-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.faq-slide-enter-to,
.faq-slide-leave-from {
  opacity: 1;
  max-height: 300px;
  overflow: hidden;
}

/* Help CTA styling */
.help-cta {
  text-align: center;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  margin-top: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.164);
}

.help-cta h3 {
  margin-bottom: 10px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-btn {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 18px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.cta-btn:hover {
  opacity: 0.9;
}
</style>
