<template>
  <transition name="fade-slide" appear>
    <div class="shop">
      <!-- Replaced <body> with div -->
      <div class="shop-content">
        <nav>
          <ShopNavBar />
        </nav>

        <aside id="filterside" :class="{ show: isFilterOpen }" class="PageTargetter">
          <ShopFilterBar category="All" />
        </aside>

        <main>
          <!-- Loader -->
          <div v-if="showLoader" class="loader-container" :class="{ 'fade-out': !loading }">
            <div class="loader"></div>
          </div>

          <!-- Product cards -->
          <div v-else class="ProductCardView">
            <ShopProdCard v-for="prod in products" :key="prod.id" :product="prod" @open-product="openProductModal" />
          </div>
        </main>

        <ProductModal :product="selectedProduct" @add-to-cart="handleAddToCart" />
      </div>
    </div>
  </transition>
</template>


<script>
import ShopNavBar from "../components/ShopNavBar.vue";
import ShopProdCard from "@/components/ShopProdCard.vue";
import ShopFilterBar from "../components/ShopFilterBar.vue";
import ProductModal from "@/components/ProductModal.vue";
import * as bootstrap from "bootstrap";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ShopNavBar,
    ShopFilterBar,
    ShopProdCard,
    ProductModal,
  },

  data() {
    return {
      selectedProduct: null,
      loading: false,
      showLoader: false, // controls loader DOM presence
    };
  },

  computed: {
    ...mapState(["user"]),
    products() {
      return this.$store.getters.filteredProducts;
    },
  },

  methods: {
    ...mapActions(["addToCart", "loadCategoryProducts"]),

    openProductModal(product) {
      this.selectedProduct = product;
      this.$nextTick(() => {
        const modalEl = document.getElementById("productModal");
        if (modalEl) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      });
    },

    async handleAddToCart(product) {
      if (!this.user) {
        const modalEl = document.getElementById("productModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        this.$router.push("/login");
        return;
      }

      await this.addToCart(product);
      alert(`${product.title} added to your cart!`);

      const modalEl = document.getElementById("productModal");
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
    },

    async loadProductsFromRoute() {
      this.showLoader = true;
      this.loading = true;

      const minLoaderTime = new Promise((resolve) => setTimeout(resolve, 500)); // minimum loader visible
      const loadProducts = this.loadCategoryProducts(
        (this.$route.query.category || "All").charAt(0).toUpperCase() +
        (this.$route.query.category || "All").slice(1)
      );

      await Promise.all([minLoaderTime, loadProducts]);

      this.scrollToTop();

      // Fade out loader
      this.loading = false;

      // Wait for fade-out animation to finish before removing loader from DOM
      setTimeout(() => {
        this.showLoader = false;

        // Animate product cards
        this.$nextTick(() => {
          const cards = document.querySelectorAll(".ProductCardView > *");
          cards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.transition = "all 0.5s ease";
              card.style.opacity = 1;
              card.style.transform = "translateY(0)";
            }, index * 100);
          });
        });
      }, 300);
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    async openProductFromQuery() {
      const productId = this.$route.query.productId;
      if (!productId) return;

      const waitForProducts = () =>
        new Promise((resolve) => {
          const check = () => {
            if (this.products.length > 0 && !this.loading) resolve();
            else setTimeout(check, 50);
          };
          check();
        });

      await waitForProducts();

      const productToOpen = this.products.find((p) => p.id == productId);
      if (productToOpen) {
        this.openProductModal(productToOpen);
      }
    },
  },

  mounted() {
    this.loadProductsFromRoute();
    this.openProductFromQuery();
  },

  watch: {
    "$route.query.category": function () {
      this.loadProductsFromRoute();
    },

    "$route.query.productId": function () {
      this.openProductFromQuery();
    },

    products(newProducts) {
      const productId = this.$route.query.productId;
      if (!productId || newProducts.length === 0 || this.loading) return;

      const productToOpen = newProducts.find((p) => p.id == productId);
      if (productToOpen) {
        this.openProductModal(productToOpen);
      }
    },
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

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

/* Loader fade-in/out */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.loader-container.fade-out {
  animation: fadeOut 0.3s forwards;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3B82F6;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

/* ProductCardView animation handled via JS, you could also do CSS transition */
.ProductCardView>* {
  will-change: transform, opacity;
}


/* sho */
* {
  margin: 0;
  padding: 0;
  font-family: FontInter;
}

.shop-content {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "navbar navbar"
    "sidebar main";
}

nav {
  top: 0;
  grid-area: navbar;
  position: sticky;
  z-index: 1;
}

aside {
  height: calc(100dvh - 60px);
  top: 60px;
  position: sticky;
  grid-area: sidebar;
  border-right: none;
  box-shadow: 6px 0 5px 0px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

@media (max-width: 900px) {
  body {
    grid-template-columns: 1fr;
    grid-template-areas:
      "navbar"
      "main";
  }

  aside {
    position: fixed;
    top: 60px;
    left: 0;
    width: 250px;
    height: calc(100dvh - 60px);
    background: white;
    transform: translateX(-100%);
    z-index: 9998;
  }

  aside.show {
    transform: translateX(0);
  }

  .filter-btn-container {
    display: block;
  }
}

main {
  grid-area: main;
  padding: 15px;
}

.ProductCardView {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;

}

/* ---------------------- MOBILE / TABLET MEDIA QUERIES ---------------------- */

/* Tablets: 900px and below */
@media (max-width: 900px) {
  .shop-content {
    grid-template-columns: 1fr;
    grid-template-areas:
      "navbar"
      "main";
  }

  aside#filterside {
    position: fixed;
    top: 60px;
    left: 0;
    width: 220px;
    height: calc(100vh - 60px);
    transform: translateX(-100%);
    z-index: 9998;
    border-radius: 12px;
  }

  aside#filterside.show {
    transform: translateX(0);
  }

  main {
    padding: 10px;
  }

  .ProductCardView {
    justify-content: center;
    gap: 20px;
  }

  /* Navbar adjustments */
  .header {
    flex-direction: column;
    height: auto;
    padding: 0.5rem 1rem;
    text-align: center;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
}

/* Mobile: 640px and below */
@media (max-width: 640px) {
  .ProductCardView {
    padding-top: 30px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .ProdCard {
    width: 90%;
    max-width: 250px;
    height: auto;
  }

  .imgWrapper {
    height: 200px;
  }

  .view-button {
    width: 80%;
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }

  .filterBar {
    padding-top: 1rem;
    gap: 0.75rem;
  }

  .filterHead h3 {
    font-size: 1rem;
  }

  .filterBar h4 {
    font-size: 0.9rem;
  }

  /* Sidebar tweaks */
  aside#filterside {
    width: 200px;
  }
}

/* Extra small mobile: 480px and below */
@media (max-width: 480px) {
  .nav-links {
    gap: 0.5rem;
  }

  .ProdCard {
    width: 95%;
  }

  .imgWrapper {
    height: 180px;
  }

  .view-button {
    width: 90%;
  }
}



@font-face {
  font-family: FontInter;
  src: url(../assets/fonts/Inter-VariableFont_opsz\,wght.ttf);
}
</style>
