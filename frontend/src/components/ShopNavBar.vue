<template>
  <header class="header">
    <div class="introText">Browse options:</div>
    <div class="mobile-top-bar">
      <!-- Mobile menu toggle for categories -->
      <button class="menu-toggle-mobile" @click="showMobileMenu = !showMobileMenu" :class="{ active: showMobileMenu }">
        <i class="bi" :class="showMobileMenu ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
      </button>
      <!-- Filter Button (Mobile only) -->
      <button class="filter-btn-mobile" @click="toggleFilter" :class="{ active: isFilterOpen }">
        <i class="bi bi-funnel"></i>
        Filter
      </button>
    </div>
    <div class="center-container" :class="{ show: showMobileMenu }">
      <nav class="nav-links">
        <router-link
          :to="{ path: '/shop', query: { category: 'all' } }"
          :class="{ active: currentCategory === 'all' }"
          @click="showMobileMenu = false"
        >All</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'tops' } }"
          :class="{ active: currentCategory === 'tops' }"
          @click="showMobileMenu = false"
        >Tops</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'bottoms' } }"
          :class="{ active: currentCategory === 'bottoms' }"
          @click="showMobileMenu = false"
        >Bottoms</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'sneakers' } }"
          :class="{ active: currentCategory === 'sneakers' }"
          @click="showMobileMenu = false"
        >Sneakers</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'accessories' } }"
          :class="{ active: currentCategory === 'accessories' }"
          @click="showMobileMenu = false"
        >Accessories</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "ShopNavBar",
  props: {
    isFilterOpen: Boolean,
  },
  data() {
    return {
      showMobileMenu: false,
    };
  },
  computed: {
    currentCategory() {
      return this.$route.query.category ? this.$route.query.category.toLowerCase() : 'all';
    },
  },
  methods: {
    toggleFilter() {
      this.$emit('toggle-filter');
    },
  },
};
</script>

<style scoped>
/* DESKTOP STYLES */
.header {
    position: sticky;
    top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
    padding: 0 2rem;
    font-family: Playfair-Display;
    font-size: 18px;
    z-index: 1;
    border-radius: 0 0 18px 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.introText {
    font-weight: bold;
    color: #fff;
    font-family: FontInter;
}

.mobile-top-bar {
    display: none;
}

.menu-toggle-mobile {
    display: none;
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0;
}

.center-container {
    flex: 1;
    display: flex;
    justify-content: center;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-links a {
    font-size: clamp(1rem, 1vw, 1.1rem);
    position: relative;
    text-decoration: none;
    color: #ffffff;
    padding: 0.5rem;
    font-weight: 500;
    transition: color 0.3s ease;
    font-family: FontInter;
}

.nav-links a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #d7d7d7;
    transition: width 0.4s ease;
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
    left: 0;
}

.filter-btn-mobile {
    display: none;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    gap: 0.5rem;
    align-items: center;
    font-family: FontInter;
}

.filter-btn-mobile:hover {
    background: rgba(255, 255, 255, 0.3);
}

.filter-btn-mobile.active {
    background: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.5);
}

/* ---------------------- MOBILE: 800px and below ---------------------- */
@media (max-width: 800px) {
  .introText {
    display: none;
  }

  .header {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    padding: 0.5rem;
    position: sticky;
    top: 60px;
    width: 100%;
    gap: 0.5rem;
    z-index: 10;
    border-radius: 0;
  }

  /* Show mobile top bar with toggle and filter */
  .mobile-top-bar {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
  }

  .menu-toggle-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 1.2rem;
  }

  /* Filter button in top bar */
  .filter-btn-mobile {
    display: flex !important;
    flex: 1;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  /* Collapsible menu container */
  .center-container {
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .center-container.show {
    max-height: 400px;
    overflow-y: auto;
  }

  /* Nav links stack vertically */
  .nav-links {
    flex-direction: column;
    gap: 0;
    width: 100%;
    display: flex;
    justify-content: stretch;
  }

  .nav-links a {
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
  }

  .nav-links a::after {
    display: none;
  }

  .nav-links a.active {
    background: rgba(255, 255, 255, 0.2);
  }
}

/* ---------------------- SMALLER MOBILE: 640px and below ---------------------- */
@media (max-width: 640px) {
  .mobile-top-bar {
    gap: 0.4rem;
  }

  .filter-btn-mobile {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }

  .menu-toggle-mobile {
    font-size: 1.1rem;
  }

  .nav-links a {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
}

/* ---------------------- EXTRA SMALL MOBILE: 480px and below ---------------------- */
@media (max-width: 480px) {
  .header {
    padding: 0.4rem;
    gap: 0.4rem;
  }

  .mobile-top-bar {
    gap: 0.3rem;
  }

  .filter-btn-mobile {
    padding: 0.35rem 0.5rem;
    font-size: 0.7rem;
  }

  .menu-toggle-mobile {
    font-size: 1rem;
  }

  .nav-links a {
    padding: 0.5rem 0.6rem;
    font-size: 0.85rem;
  }
}
</style>
