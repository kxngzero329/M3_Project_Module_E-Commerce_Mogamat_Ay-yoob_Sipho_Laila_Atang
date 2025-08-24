<template>
  <transition name="fade-slide" appear>
    <div class="sign-up">
      <div class="register-wrapper">
        <div class="card">
          <div class="card-left">
            <img src="../assets/register2.jpg" alt="left-image" />
          </div>
          <div class="card-right">
            <h2>Join the Trend!</h2>
            <p class="subtitle">Create your account to start shopping in style</p>

            <form @submit.prevent="registerUser">
              <div class="form-group">
                <i class="fas fa-user"></i>
                <input v-model="form.name" type="text" placeholder=" " required />
                <label>First Name</label>
              </div>

              <div class="form-group">
                <i class="fas fa-user"></i>
                <input v-model="form.surname" type="text" placeholder=" " required />
                <label>Last Name</label>
              </div>

              <div class="form-group">
                <i class="fas fa-envelope"></i>
                <input v-model="form.email" type="email" placeholder=" " required />
                <label>Email Address</label>
              </div>

              <div class="form-group">
                <i class="fas fa-lock"></i>
                <input v-model="form.password" type="password" placeholder=" " required />
                <label>Password</label>
              </div>

              <button class="btn">Sign Up</button>
              <p v-if="message" class="error">{{ message }}</p>
              <p class="login-redirect">
                Already have an account?
                <router-link to="/login">Login</router-link> | <router-link to="/">Go Back Home</router-link>
              </p>
            </form>

          </div>
        </div>

        <!-- Success Alert -->
        <transition name="fade">
          <div v-if="showSuccess" class="success-alert">
            <div class="alert-content">
              <i class="fas fa-check-circle"></i>
              <span>Your Account has been successfully created. You may proceed to login.</span>
              <button @click="showSuccess = false" class="close-btn">&times;</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        password: ''
      },
      message: '',
      showSuccess: false
    };
  },
  methods: {
    async registerUser() {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/register', this.form);

        // toggle this flag (true = auto login, false = redirect to login)
        const AUTO_LOGIN = false;

        if (AUTO_LOGIN) {
          // Save JWT token + user in localStorage
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));

          this.message = '';
          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
            this.$router.push('/'); // straight to homepage
          }, 2000);

        } else {
          // Just show success and redirect to login page
          this.message = '';
          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
            this.$router.push('/login'); // force login step
          }, 2000);
        }

      } catch (err) {
        this.message = err.response?.data?.message || 'Registration failed';
      }
    }

  }
};
</script>


<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.register-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
  overflow: hidden;
}

.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  height: 550px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-left {
  flex: 1;
  display: none;
}

.card-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-right {
  flex: 1;
  padding: 40px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-right h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
}

.subtitle {
  text-align: center;
  color: #424242;
  margin-bottom: 25px;
  font-size: 0.95rem;
}

form {
  display: flex;
  flex-direction: column;
}

/* Fixing form-group with Bootstrap interference */
.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group i {
  position: absolute;
  top: 14px;
  left: 15px;
  color: #999;
  font-size: 1rem;
  z-index: 2;
}

input {
  width: 100%;
  padding: 14px 20px 14px 40px;
  border: 1px solid #ccc !important;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: none !important;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #222;
}

label {
  position: absolute;
  left: 40px;
  top: 14px;
  color: #999;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  pointer-events: none;
  background: white;
  padding: 0 4px;
}

input:focus+label,
input:not(:placeholder-shown)+label {
  top: -10px;
  left: 35px;
  font-size: 0.75rem;
  color: #222;
}

.btn {
  padding: 14px;
  border: none;
  border-radius: 10px;
  background-color: #222;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn:hover {
  background-color: #000;
}

.error {
  color: #dc3545;
  margin-top: 15px;
  text-align: center;
}

.login-redirect {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 20px;
}

.login-redirect a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.login-redirect a:hover {
  color: #003670;
}

/* Success alert popup */
.success-alert {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #4CAF50;
  color: white;
  padding: 16px 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.success-alert .alert-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.success-alert .fa-check-circle {
  font-size: 1.2rem;
}

.success-alert .close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: white;
  margin-left: auto;
  cursor: pointer;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}


/* Responsive: Show image only on large screens */
@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }

  .card-left {
    display: block;
    flex: 1;
  }

  .card-right {
    flex: 1;
    padding: 50px;
  }
}
</style>
