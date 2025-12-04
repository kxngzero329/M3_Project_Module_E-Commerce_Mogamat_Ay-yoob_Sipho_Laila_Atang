<template>
  <header class="navbar">
    <div class="container nav-content">
      <!-- Logo -->
      <div class="logo" @click="$router.push('/')">Fashion<span>Hub</span></div>

      <!-- Mobile Profile Badge (Mobile only) -->
      <span class="mobile-profile-badge" v-if="user">
        <i class="bi bi-person-fill me-2"></i>
        <b>{{ user.name }}</b>
      </span>

      <!-- Hamburger + Cart for mobile -->
      <div class="mobile-controls">
        <button class="cart-btn mobile-cart" @click="openCartModal"><i class="bi bi-bag-fill"></i></button>
        <div class="hamburger" @click="toggleMobileMenu">
          <span :class="{ open: isMobileMenuOpen }"></span>
          <span :class="{ open: isMobileMenuOpen }"></span>
          <span :class="{ open: isMobileMenuOpen }"></span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav :class="['nav-links', { 'mobile-open': isMobileMenuOpen }]">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          exact
          class="nav-link"
          @click="closeMobileMenu"
          :class="{ active: isActiveLink(link.path) }"
        >
          {{ link.name }}
        </router-link>

        <!-- Auth inside mobile menu -->
        <div class="mobile-auth" v-if="isMobileMenuOpen">
          <template v-if="!user">
            <router-link to="/login" @click="closeMobileMenu">Login</router-link>
            <router-link to="/register" @click="closeMobileMenu">Register</router-link>
          </template>
          <template v-else>
            <span class="welcome-btn">
              <i class="bi bi-person-fill me-2"></i>
            <b>{{ user.name }}</b>
            </span>
            <router-link to="/orders" @click="closeMobileMenu">View Orders</router-link>
            <button class="logout-btn" @click="logoutUser">Logout</button>
          </template>
        </div>
      </nav>

      <!-- Auth & Cart (Desktop only) -->
      <div class="auth-section desktop-only">
        <template v-if="!user">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </template>
        <template v-else>
          <span class="welcome-btn">
            <i class="bi bi-person-fill me-2"></i>
            Welcome, <b>{{ user.name }}!</b>
          </span>
          <router-link to="/orders">View Orders</router-link>
          <button class="logout-btn" @click="logoutUser">Logout</button>
        </template>

        <button class="cart-btn" @click="openCartModal"><i class="bi bi-bag-fill"></i></button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      isMobileMenuOpen: false,
      links: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Shop', path: '/shop' },
        { name: 'Contact', path: '/contact' }
      ]
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    isActiveLink(path) {
      return this.$route.path === path;
    },
    logoutUser() {
      setTimeout(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.$emit('logout');
        this.$router.push('/login');
      }, 2000);
    },
    openCartModal() {
      this.$emit('open-cart');
    }
  }
};
</script>
