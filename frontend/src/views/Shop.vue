<template>
  <transition name="fade-slide" appear>
    <div class="shop">
      <div class="shop-content">
        <nav>
          <ShopNavBar :isFilterOpen="isFilterOpen" @toggle-filter="toggleFilter" />
        </nav>

        <aside id="filterside" :class="{ show: isFilterOpen }">
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
      showLoader: false,
      isFilterOpen: false,
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

    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },

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

      const minLoaderTime = new Promise((resolve) => setTimeout(resolve, 500));
      const loadProducts = this.loadCategoryProducts(
        (this.$route.query.category || "All").charAt(0).toUpperCase() +
        (this.$route.query.category || "All").slice(1)
      );

      await Promise.all([minLoaderTime, loadProducts]);

      this.scrollToTop();

      this.loading = false;

      setTimeout(() => {
        this.showLoader = false;

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

/* Animations */
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

/* Loader */
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

/* Layout */
* {
  margin: 0;
  padding: 0;
  font-family: FontInter;
}

.shop-content {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "navbar navbar"
    "navbar navbar"
    "sidebar main";
}

nav {
  grid-area: navbar;
  position: sticky;
  top: 0;
  z-index: 11;
}

aside {
  height: calc(100dvh - 106px);
  top: 106px;
  position: sticky;
  grid-area: sidebar;
  border-right: none;
  box-shadow: 6px 0 5px 0px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  background: white;
  padding: 0;
  overflow-y: auto;
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

.ProductCardView > * {
  will-change: transform, opacity;
}

/* MOBILE: 900px and below */
@media (max-width: 900px) {
  .shop-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      "navbar"
      "navbar"
      "main";
  }

  aside {
    position: fixed;
    top: 60px;
    left: 0;
    width: 250px;
    height: auto;
    max-height: calc(100dvh - 60px);
    background: white;
    transform: translateX(-100%);
    z-index: 5;
    border-radius: 0;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    grid-area: unset;
  }

  aside.show {
    transform: translateX(0);
  }

  .ProductCardView {
    justify-content: center;
    gap: 20px;
  }
}

/* Tablet: 768px and below */
@media (max-width: 768px) {
  aside {
    width: 200px;
    top: 60px;
  }

  .ProductCardView {
    padding-top: 10px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  main {
    padding: 10px 8px;
  }
}

/* Small mobile: 640px and below */
@media (max-width: 640px) {
  aside {
    width: 180px;
    top: 60px;
  }

  .ProductCardView {
    padding-top: 10px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  main {
    padding: 10px 8px;
  }
}

/* Extra small mobile: 480px and below */
@media (max-width: 480px) {
  aside {
    width: 160px;
    top: 60px;
  }

  main {
    padding: 8px 5px;
  }
}

@font-face {
  font-family: FontInter;
  src: url(../assets/fonts/Inter-VariableFont_opsz\,wght.ttf);
}
</style>
