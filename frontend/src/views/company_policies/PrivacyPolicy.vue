<template>
  <transition name="fade-slide" appear>
  
  
  <div id="app">
    <section class="privacy-hero">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy matters to us. We only collect what’s needed to give you the best FashionHub experience.
      </p>
    </section>

    <main>
      <div class="policy-section">
        <h3>1. What We Collect</h3>
        <p>
          When you interact with FashionHub, we may collect personal details such as your name, email, shipping address, and purchase history. This helps us provide a seamless shopping experience, recommend your next favorite outfit, and keep you updated on exclusive drops.
        </p>
      </div>

      <div class="policy-section">
        <h3>2. How We Use Your Info</h3>
        <p>
          Your information helps us make FashionHub work for you. We may use it to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Send personalized promotions, offers, and product updates.</li>
          <li>Process orders, returns, and exchanges smoothly.</li>
          <li>Improve our website, services, and styling recommendations.</li>
          <li>Share inspiring looks and testimonials with your permission.</li>
        </ul>
      </div>

      <div class="policy-section">
        <h3>3. Keeping Your Data Safe</h3>
        <p>
          We use modern security measures to protect your personal data, but no online system is 100% foolproof. Shopping with FashionHub is always done with care, and we take every step to keep your information secure.
        </p>
      </div>

      <div class="policy-section">
        <h3>4. Your Privacy Choices</h3>
        <p>
          You’re in control. Update your account info, opt out of marketing emails, or request deletion of your data anytime. Just <router-link to="/contact" style="text-decoration: none;">contact us</router-link>, and we’ll handle it promptly.
        </p>
      </div>

      <div class="policy-section">
        <h3>5. How We Collect Your Details</h3>
        <p>
          We only collect what’s necessary when you:
        </p>
        <ul>
          <li>Create an account or sign up for our newsletter.</li>
          <li>Shop online, return, exchange, or track your orders.</li>
          <li>Participate in contests, events, or promotions.</li>
          <li>Contact our support team for help or feedback.</li>
          <li>Apply for jobs through our Careers portal.</li>
        </ul>
        <p>
          Occasionally, we may receive information from trusted partners but only if you’ve allowed them to share it with us.
        </p>
      </div>
    </main>
    <FooterComp />
  </div>
</transition>
</template>

<script>
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "PrivacyPolicy",
  components: { FooterComp },
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

.privacy-hero {
  text-align: center;
  padding: 60px 20px 30px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  color: white;
  border-radius: 0 0 30px 30px;
}

.privacy-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.privacy-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
}

main {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

.policy-section {
  background: white;
  margin-bottom: 20px;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.policy-section:hover {
  transform: translateY(-2px);
}

.policy-section h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #3b82f6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.policy-section p {
  line-height: 1.7;
  margin-bottom: 15px;
}

.policy-section ul {
  list-style-type: disc;
  padding-left: 20px;
}

.policy-section ul li {
  margin-bottom: 10px;
}
</style>
