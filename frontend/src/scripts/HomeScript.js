// scripts for Home.vue (DB-based cart + JWT-safe)

//Imports
import { mapState, mapMutations, mapActions } from 'vuex';
import NavbarComp from '../components/NavbarComp.vue';
import FooterComp from '../components/FooterComp.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductModal from '../components/ProductModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import * as bootstrap from 'bootstrap';
import axios from 'axios';

SwiperCore.use([Navigation, Autoplay]);

export default {
  components: {
    NavbarComp,
    FooterComp,
    ProductCard,
    ProductModal,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      featuredProducts: [],
      selectedProduct: null, // For product modal
      categories: [
        { id: 1, name: 'Tops', image: require('../assets/mc6.jpg') },
        { id: 2, name: 'Bottoms', image: require('../assets/highwaist1.jpg') },
        { id: 3, name: 'Sneakers', image: require('../assets/shoes2.jpg') },
        { id: 4, name: 'Accessories', image: require('../assets/watch.jpg') },
      ],
      testimonials: [
        { id: 1, name: "Khanyiso Haman", role: "Full-Stack Developer", text: "Absolutely obsessed with the styles! Super fast delivery and amazing quality. This is my go-to store now.", rating: 5, avatar: 'https://ca.slack-edge.com/T02LW4RMXJQ-U07PJR51HHT-9852e27ea190-512' },
        { id: 2, name: "Matthew Brown", role: "Software Developer", text: "The checkout process was smooth and the packaging was premium. 10/10 would recommend to friends!", rating: 5, avatar: 'https://ca.slack-edge.com/T02LW4RMXJQ-U05SH6EC6DN-983198ea2475-512' },
        { id: 3, name: "Ruth N'zola", role: "UI/UX Designer", text: "Stylish, comfortable and exactly what I expected. This brand knows how to deliver fashion with confidence.", rating: 5, avatar: 'https://ca.slack-edge.com/T02LW4RMXJQ-U07SJPJPNDC-7ea8b4614759-512' },
      ],
      subscriberEmail: '',
      showSubscribeMessage: false
    };
  },

  async created() {
    // Restore user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.setUser(JSON.parse(storedUser));
      await this.fetchCart(); // fetch cart automatically if logged in
    }

    // Fetch featured products via Axios (JWT automatically included)
    try {
      const res = await axios.get('/products/featured');
      this.featuredProducts = res.data;
    } catch (err) {
      console.error("Failed to fetch featured products:", err);
    }
  },

  computed: {
    ...mapState(['user', 'cartItems']),
    cartTotal() {
      return this.cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    }
  },

  methods: {
    ...mapMutations(['setUser']),
    ...mapActions(['fetchCart', 'addToCart', 'removeFromCart']),

    logout() {
      localStorage.removeItem('user');
      this.setUser(null);
      this.$router.push('/login');
    },

    openProductModal(product) {
      this.selectedProduct = product;
      this.$nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
      });
    },

    async handleAddToCart(product) {
      if (!this.user) {
        const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        if (productModal) productModal.hide();
        alert("Please log in to add items to your cart.");
        this.$router.push('/login');
        return;
      }

      await this.addToCart(product);
      alert(`${product.title} added to your cart!`);

      const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
      if (productModal) productModal.hide();
    },

    async openCartModal() {
      if (this.user) {
        await this.fetchCart();
      }
      const modalEl = document.getElementById('cartModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
      }
    },

    handleSubscribe() {
      if (!this.subscriberEmail) return;

      this.showSubscribeMessage = true;
      this.subscriberEmail = '';

      setTimeout(() => {
        const popup = document.querySelector('.popup-message');
        if (popup) {
          popup.classList.add('hide');
          setTimeout(() => this.showSubscribeMessage = false, 400);
        }
      }, 4000);
    },

    goToShopWithProduct(product) {
      this.$router.push({ path: '/shop', query: { productId: product.id } });
    }



  }
};
