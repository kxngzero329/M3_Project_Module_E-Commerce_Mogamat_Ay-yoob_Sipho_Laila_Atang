import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Shop from '../views/Shop.vue';
import Contact from '../views/Contact.vue';
import Checkout from '../views/Checkout.vue';
import Orders from '../views/Orders.vue';

// Import ShopRoutes

import Tops from '../views/ShopTops.vue';
import Bottoms from '../views/ShopBottoms.vue';
import Sneakers from '../views/ShopSneakers.vue';
import Accessories from '../views/ShopAccessories.vue';



// import from company policies folder
import FAQ from '../views/company_policies/FAQ.vue';
import PrivacyPolicy from '../views/company_policies/PrivacyPolicy.vue';
import Returns from '../views/company_policies/Returns.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/orders', name: 'Orders', component: Orders },

  //Shop Routes

  { path: '/tops', name: 'Tops', component: Tops },
  { path: '/bottoms', name: 'Bottoms', component: Bottoms },
  { path: '/sneakers', name: 'Sneakers', component: Sneakers },
  { path: '/accessories', name: 'accessories', component: Accessories },


  // company policies
  { path: '/faq', name: 'FAQ', component: FAQ },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: PrivacyPolicy },
  { path: '/returns', name: 'Returns', component: Returns },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // if the user used the back/forward buttons, keep the saved scroll
    if (savedPosition) {
      return savedPosition;
    }
    // always scroll to top for new route
    return { top: 0 };
  }
});


export default router;
