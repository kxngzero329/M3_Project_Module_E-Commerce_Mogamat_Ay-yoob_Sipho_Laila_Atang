<template>

  <body>
    <nav>
      <ShopNavBar />
    </nav>

    <aside id="filterside" :class="{ show: isFilterOpen }" class="PageTargetter">
      <ShopFilterBar category="Tops" />
    </aside>

    <main>
      <div class="ProductCardView">
        <ShopProdCard v-for="prod in products" :key="prod.id" :product="prod" @open-product="openProductModal" />
      </div>
    </main>

    <!-- Zuhayr's ProductModal -->
    <ProductModal :product="selectedProduct" @add-to-cart="handleAddToCart" />
  </body>
</template>

<script>
import ShopNavBar from "../components/ShopNavBar.vue";
import ShopFilterBar from "../components/ShopFilterBar.vue";
import ShopProdCard from "@/components/ShopProdCard.vue";
import ProductModal from "../components/ProductModal.vue";
import { mapState } from "vuex";
import * as bootstrap from "bootstrap";

export default {
  components: { ShopNavBar, ShopFilterBar, ShopProdCard, ProductModal },

  data() {
    return {
      isFilterOpen: false,
      selectedProduct: null
    };
  },

  computed: {
    ...mapState(["user"]),
    products() {
      return this.$store.getters.filteredProducts;
    }
  },

  methods: {
    toggleSide() {
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

      await this.$store.dispatch("addToCart", product);
      alert(`${product.title} added to your cart!`);

      const modalEl = document.getElementById("productModal");
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
    }
  },

  mounted() {
    this.$store.dispatch("loadCategoryProducts", "Tops");
  }
};
</script>

<style scoped>
/* Keep your existing grid and sidebar styling */
* {
  margin: 0;
  padding: 0;
  font-family: FontInter;
}

body {
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
</style>
