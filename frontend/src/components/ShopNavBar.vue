<template>
  <header class="header">
    <div class="introText">Browse options:</div>
    <div class="center-container">
      <nav class="nav-links">
        <router-link
          :to="{ path: '/shop', query: { category: 'all' } }"
          :class="{ active: currentCategory === 'all' }"
        >All</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'tops' } }"
          :class="{ active: currentCategory === 'tops' }"
        >Tops</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'bottoms' } }"
          :class="{ active: currentCategory === 'bottoms' }"
        >Bottoms</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'sneakers' } }"
          :class="{ active: currentCategory === 'sneakers' }"
        >Sneakers</router-link>
        <router-link
          :to="{ path: '/shop', query: { category: 'accessories' } }"
          :class="{ active: currentCategory === 'accessories' }"
        >Accessories</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "ShopNavBar",
  computed: {
    currentCategory() {
      // default to 'all' if no query
      return this.$route.query.category ? this.$route.query.category.toLowerCase() : 'all';
    },
  },
};
</script>


<style scoped>
.header {
    position: sticky;    /* stick below main navbar */
    top: 60px;           /* main navbar height */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
    padding: 0 2rem;
    font-family: Playfair-Display;
    font-size: 18px;
    z-index: 1;          /* below filter sidebar */
    border-radius: 0 0 18px 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.introText {
    font-weight: bold;
    color: #fff;
    font-family: FontInter;
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

@media(max-width:800px){
    .introText {
        display: none; /* instead of visibility:hidden */
    }
}

/* ---------------------- SHOPNAVBAR MOBILE ---------------------- */

/* Tablets & small screens: 800px and below */
@media (max-width: 800px) {
  /* Hide introText and remove its layout space */
  .introText {
    display: none;
  }

  /* Stack header vertically */
  .header {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 0.5rem 1rem;
    position: absolute; /* keep it sticky below main navbar */
    top: 0;
    left: 0;
    width: 100%;
    padding-bottom: 20px;
  }

  /* Center the nav links */
  .center-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  /* Wrap nav links and adjust spacing */
  .nav-links {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  /* Make links smaller and more compact */
  .nav-links a {
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    padding: 0.25rem 0.5rem;
  }
}

/* Medium mobile: 640px and below */
@media (max-width: 640px) {
  .nav-links {
    gap: 0.4rem;
  }

  .nav-links a {
    font-size: clamp(0.85rem, 2.2vw, 0.95rem);
    padding: 0.25rem 0.4rem;
  }
}

/* Extra small mobile: 480px and below */
@media (max-width: 480px) {
  .nav-links {
    gap: 0.3rem;
    justify-content: center;
  }

  .nav-links a {
    font-size: 0.8rem;
    padding: 0.2rem 0.3rem;
  }
}

</style>
