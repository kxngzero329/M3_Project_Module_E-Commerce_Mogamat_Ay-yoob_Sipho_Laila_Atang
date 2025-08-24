<template>
  <div class="ProdCard">
    <div class="imgWrapper">
      <img class="imgprod" :src="product.image" :alt="product.title" />
    </div>

    <div class="scrollwrapper">
      <h3 class="ProdText scrolltext">{{ product.title }}</h3>
    </div>

    <p class="fw-light ProdPrice">R{{ product.price }}</p>

    <button class="view-button" @click="$emit('open-product', product)">
      View Item
    </button>
  </div>
</template>

<script>
export default {
  name: "ShopProdCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* ---------------------- Card Container ---------------------- */
.ProdCard {
  height: 420px;
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.ProdCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.18);
}

/* ---------------------- Product Image ---------------------- */
.imgWrapper {
  width: 100%;
  height: 260px;
  overflow: hidden;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

.imgprod {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.ProdCard:hover .imgprod {
  transform: scale(1.05);
}

/* ---------------------- Title / Scroll ---------------------- */
.scrollwrapper {
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  margin: 0.5rem 0;
  mask-image: linear-gradient(to right, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, black 85%, transparent);
}

.scrolltext {
  display: inline-block;
  white-space: nowrap;
  transform: translateX(0);
  transition: transform 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  color: #111827;
}

.ProdCard:hover .scrolltext {
  animation: scroll-loop 8s linear infinite;
}

@keyframes scroll-loop {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

/* ---------------------- Price ---------------------- */
.ProdPrice {
  font-weight: 500;
  color: #374151;
  margin-bottom: 10px;
}

/* ---------------------- Button ---------------------- */
.view-button {
  border: none;
  border-radius: 12px;
  width: 140px;
  height: 40px;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 10px;
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
  position: relative;
  overflow: hidden;
}

.view-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.5);
}

.view-button::before {
  content: '';
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(255,255,255,0.15);
  opacity:0;
  transition: opacity 0.4s ease;
}

.view-button:hover::before {
  opacity:1;
}

/* ---------------------- Responsive ---------------------- */
@media (max-width: 500px) {
  .ProdCard {
    width: 160px;
    height: 360px;
  }

  .imgWrapper {
    height: 200px;
  }

  .view-button {
    width: 120px;
    height: 36px;
    font-size: 0.9rem;
  }
}
</style>
