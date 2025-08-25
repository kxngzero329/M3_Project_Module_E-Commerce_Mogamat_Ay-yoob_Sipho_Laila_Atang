<template>
  <aside id="filterside" :class="{ show: isFilterOpen }">
    <div class="filterBar">
      <div class="filterHead">
        <h3>Filters</h3>
      </div>
      <ul>
        <!-- Type / Gender -->
        <li>
          <h4>Type</h4>
          <ul class="TypeFilter">
            <li>
              <input type="radio" name="type" value="Male" v-model="selectedGender" @change="applyGender" /> Male
            </li>
            <li>
              <input type="radio" name="type" value="Female" v-model="selectedGender" @change="applyGender" /> Female
            </li>
            <li>
              <input type="radio" name="type" value="Youth" v-model="selectedGender" @change="applyGender" /> Youth
            </li>
          </ul>
        </li>
        <!-- Style -->
        <li>
          <h4>Style</h4>
          <ul class="StyleFilter">
            <li>
              <input type="radio" name="style" value="Casual" v-model="selectedStyle" @change="applyStyle" /> Casual
            </li>
            <li>
              <input type="radio" name="style" value="SmartCasual" v-model="selectedStyle" @change="applyStyle" /> Smart
              Casual
            </li>
            <li>
              <input type="radio" name="style" value="Formal" v-model="selectedStyle" @change="applyStyle" /> Formal
            </li>
            <li>
              <input type="radio" name="style" value="Sport" v-model="selectedStyle" @change="applyStyle" /> Sporty
            </li>
          </ul>
        </li>
        <!-- Price -->
        <li>
          <h4>Price</h4>
          <div class="PriceRangeFilter">
            <label>Min: R{{ minPrice }}</label>
            <input type="range" min="0" max="15000" step="5" v-model.number="minPrice" @change="applyPrice" />
            <label>Max: R{{ maxPrice }}</label>
            <input type="range" min="0" max="15000" step="5" v-model.number="maxPrice" @change="applyPrice" />
          </div>
        </li>
        <!-- Reset -->
        <li>
          <button @click="resetFilters" class="filter-toggle">Clear Filters</button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    category: { type: String, required: true },
    isFilterOpen: { type: Boolean, default: false }
  },
  data() {
    return {
      selectedGender: null,
      selectedStyle: null,
      minPrice: 20,
      maxPrice: 15000
    };
  },
  mounted() {
    this.$store.dispatch('loadCategoryProducts', this.category.toLowerCase());
  },
  methods: {
    applyGender() {
      this.$store.commit('setFilter', { key: 'type', value: this.selectedGender });
    },
    applyStyle() {
      this.$store.commit('setFilter', { key: 'style', value: this.selectedStyle });
    },
    applyPrice() {
      if (this.minPrice >= this.maxPrice) this.minPrice = this.maxPrice - 5;
      this.$store.commit('setFilter', { key: 'minPrice', value: this.minPrice });
      this.$store.commit('setFilter', { key: 'maxPrice', value: this.maxPrice });
    },
    resetFilters() {
      const currentCategory = this.$store.state.filters.category || this.category;
      this.selectedGender = null;
      this.selectedStyle = null;
      this.minPrice = 20;
      this.maxPrice = 15000;
      this.$store.commit('resetFilters');
      this.$store.dispatch('loadCategoryProducts', currentCategory.toLowerCase());
    }
  }
};
</script>

<style scoped>
aside#filterside {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  z-index: 999;
  transition: transform 0.3s ease;
}

aside#filterside.show {
  transform: translateX(0);
}

.filterBar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 60px;
}

.filterHead h3 {
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  color: #111827;
}

.filterBar h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #374151;
}

.filterBar ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0.5rem;
}

.filterBar li {
  margin-bottom: 0.5rem;
}

.TypeFilter ul,
.StyleFilter ul {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* .PriceRangeFilter input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 50px;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  outline: none;
  margin: 0.25rem 0;
}

.PriceRangeFilter input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border: 2px solid #fff;
  cursor: pointer;
} */

.PriceRangeFilter input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: linear-gradient(to right, #3315dec4, rgb(54, 142, 237));
  margin: 0.25rem 0;
  width: 100%;
  height: 6px;
  /* background: linear-gradient(100deg, #000000, #3B3B3C, #F9750F); */
}

.PriceRangeFilter input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #3315dec4, rgb(54, 142, 237));
  /* background: linear-gradient(100deg, #000000, #3B3B3C, #F9750F); */
  border-radius: 50px;
  height: 6px;
  /* box-shadow:
        /* right shadow *
        6px 0px 10px -1px rgba(250, 141, 25, 0.738),
        /* left shadow *
        -4px 0px 3.5px -2px rgba(22, 22, 22, 0.738),
        /* top shadow *
        0px -4px 3.5px -2px rgba(22, 22, 22, 0.738),
        /* bottom shadow *
        0px 6px 8px -1px rgba(250, 141, 25,0.738)  ; */
  box-shadow:
    /* right shadow */
    6px 0px 10px -1px rgba(25, 96, 250, 0.414),
    /* left shadow*/
    -4px 0px 3.5px -2px rgba(152, 30, 246, 0.414),
    /* top shadow */
    0px -4px 3.5px -2px rgba(152, 30, 246, 0.414),
    /* bottom shadow */
    0px 6px 8px -1px rgba(25, 96, 250, 0.414);
}

.PriceRangeFilter input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: linear-gradient(to right, #3315DE, rgb(54, 142, 237));
  /* background: linear-gradient(100deg, #000000, #3B3B3C, #F9750F); */
  border: solid rgb(0, 0, 0) 2.5px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: -4px;
  transition: background 0.3s;
}

.filter-toggle {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
}

.filter-toggle:hover {
  transform: translateY(-2px);
  background: linear-gradient(90deg, #2563eb, #7c3aed);
}

@media (max-width: 900px) {
  aside#filterside {
    transform: translateX(-100%);
    width: 220px;
    height: calc(100vh - 60px);
  }

  aside#filterside.show {
    transform: translateX(0);
  }
}
</style>
