<template>
  <transition name="fade-slide" appear>
    <div class="home">

      <!-- Hero Section -->
      <section class="hero">
        <video autoplay muted loop playsinline class="hero-video">
          <source :src="heroVideo" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div class="overlay"></div>

        <div class="hero-content">
          <h1>Discover <span>Your</span> Style</h1>
          <p>Shop the latest fashion trends now</p>
          <button @click="$router.push('/shop')">Shop Now</button>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="featured-products container">
        <h2 class="section-title text-center display-6">Featured Products</h2>
        <p class="section-subtitle text-center mb-5 text-muted">Explore our exclusive collection</p>

        <Swiper :slides-per-view="1" :space-between="20" :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }" :navigation="true"
          :breakpoints="{
            360: { slidesPerView: 1, spaceBetween: 15 },
            480: { slidesPerView: 1.2, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 30 }
          }" class="featured-swiper">
          <SwiperSlide class="my-3" v-for="product in featuredProducts" :key="product.id">
            <div class="card-wrapper">
              <ProductCard :product="product" @view-item="openProductModal(product)" />
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Product Modal -->
        <ProductModal v-if="selectedProduct" :product="selectedProduct" @add-to-cart="handleAddToCart" />
      </section>

      <!-- Promo Section -->
      <section class="promos">
        <h2 class="section-title display-6">What We Offer</h2>
        <p class="section-subtitle mb-5 text-muted">Explore our exclusive offers and services</p>
        <div class="promos-grid">
          <div class="promo-card">
            <img src="../assets/freed.png" alt="Free Delivery" />
            <h3>Free Delivery</h3>
            <p>On all orders over R500</p>
          </div>
          <div class="promo-card">
            <img src="../assets/24_7.jpg" alt="24/7 Support" />
            <h3>24/7 Support</h3>
            <p>Customer support anytime</p>
          </div>
          <div class="promo-card">
            <img src="../assets/easy_returns.png" alt="Easy Returns" />
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
        </div>
      </section>

      <!-- trending now -->
      <section class="trending">
        <div class="container">
          <h2 class="section-title display-6">Trending Now</h2>
          <p class="section-subtitle mb-5 text-muted">Don't miss out on the latest trends</p>
          <Swiper :slides-per-view="1" :space-between="10" :loop="true"
            :autoplay="{ delay: 0, disableOnInteraction: false }" :speed="4000" :allow-touch-move="true"
            :pagination="false" :navigation="false" :breakpoints="{
              480: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }" class="trending-swiper swiper-wrapper-fix">

            <SwiperSlide style="cursor: pointer;" v-for="product in featuredProducts" :key="product.id">
              <div class="trend-card text-center p-4 rounded-4 shadow-sm bg-white"
                @click="goToShopWithProduct(product)">
                <img :src="product.image" alt="Product" class="mb-3 rounded-3"
                  style="width: 180px; height: 180px; object-fit: cover;" />
                <h4 class="mb-2">{{ product.title }}</h4>
                <p class="fw-bold fs-5">R{{ product.price }}</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories">
        <div class="container mb-5">
          <h2 class="section-title display-6">Shop by Category</h2>
          <p class="section-subtitle mb-5">Explore our wide range of categories</p>
          <div class="category-grid">
            <router-link class="category-card" style="text-decoration: none;" v-for="cat in categories" :key="cat.id"
              :to="{ path: '/shop', query: { category: cat.name.toLowerCase() } }">
              <img :src="cat.image" :alt="cat.name" />
              <div class="content-overlay">
                <h4>{{ cat.name }}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- newsletter -->
      <section class="newsletter">
        <h3>Stay in the Loop</h3>
        <p>Subscribe to get exclusive offers & new arrivals</p>
        <form @submit.prevent="handleSubscribe">
          <input type="email" v-model="subscriberEmail" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>

        <!-- Popup message -->
        <div v-if="showSubscribeMessage" class="popup-message">
          <h4>Thank you for subscribing!</h4>
          <p>You’ll now receive exclusive deals, discounts, and our monthly top picks.</p>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials">
        <div class="container">
          <h2 class="section-title display-6">What Our Customers Say</h2>
          <p class="section-subtitle mb-5 text-muted">Reviews from our satisfied customers</p>
          <div class="testimonial-grid">
            <div class="testimonial-card" v-for="review in testimonials" :key="review.id">
              <div class="testimonial-header d-flex align-items-center mb-3">
                <img :src="review.avatar" class="avatar me-3" alt="User avatar" />
                <div class="text-start">
                  <h5 class="mb-0">{{ review.name }}</h5>
                  <small class="text-muted">{{ review.role }}</small>
                </div>
              </div>
              <p class="testimonial-text">"{{ review.text }}"</p>
              <div class="stars mt-3">
                <i v-for="n in review.rating" :key="n" class="bi bi-star-fill text-warning me-1"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <FooterComp />
      <!-- Product Modal -->
      <ProductModal :product="selectedProduct" />
    </div>
  </transition>
</template>

<script setup>
import heroVideo from "../assets/Hailuo_Video_A high-resolution group photos_414924195115798535.mp4";
</script>

<!-- importing from the scripts file -->
<script>

import script from '../scripts/HomeScript.js'

export default {

  mixins: [script],
}
</script>

<!-- loader transition -->
<style scoped>
/* Smooth fade & slide in animation */
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

/* social icons */
.social-icons a {
  font-size: 1.2rem;
}
</style>