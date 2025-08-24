<template>
    <!-- footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-columns">
            <div>
              <h4>Fashion Hub</h4>
              <!-- small about us section -->
              <p>Fashion Hub is your one-stop destination for the latest trends in fashion.</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/shop">Shop</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <p>Email: support@fashionhub.com</p>
              <p>Phone: +27 123 456 7890</p>
            </div>
            <!-- support section of footer -->
            <div>
              <h4>Support</h4>
              <ul>
                <li><router-link to="/faq">FAQ</router-link></li>
                <li><router-link to="/returns">Returns</router-link></li>
                <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
              </ul>
            </div>
          </div>
          <!-- social icons -->
          <p class="text-center">Follow us on:</p>
          <div class="social-icons text-center mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><i
                class="bi bi-instagram"></i></a>&nbsp;
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><i
                class="bi bi-facebook"></i></a>&nbsp;
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"><i
                class="bi bi-twitter"></i></a>
          </div>
          
          <hr class="text-secondary" />
          <div class="footer-bottom text-center">
            <p>&copy; {{ new Date().getFullYear() }} Fashion Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
</template>

<script>
export default {
  name: 'FooterComp',
};



</script>