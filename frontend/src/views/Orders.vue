<template>
  <transition name="fade-slide" appear>
    <div class="orders">
      <div class="container py-5">
        <h2 class="mb-4 text-center">
          <i class="bi bi-bag-check-fill me-2"></i> {{ user.name }}'s Order History
        </h2>

        <div v-if="loading" class="text-center my-5">
          <div class="spinner-border text-primary"></div>
        </div>

        <div v-else>
          <div v-if="orders.length">
            <div v-for="order in orders" :key="order.id" class="order-card mb-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 class="mb-1">Order #{{ order.id }}</h5>
                  <p class="text-muted small mb-0">{{ formatDate(order.created_at) }}</p>
                </div>
                <transition name="status-fade" mode="out-in">
                  <span :key="order.status" class="badge rounded-pill px-3 py-2" :class="statusClass(order.status)">
                    {{ order.status }}
                  </span>
                </transition>
              </div>

              <!-- Progress Bar -->
              <div class="progress-container mb-4">
                <div v-for="(step, index) in statusSteps" :key="index" class="progress-step"
                  :class="{ active: statusIndex(order.status) >= index }">
                  <span>
                    <template v-if="statusIndex(order.status) >= index">✔</template>
                    <template v-else>{{ index + 1 }}</template>
                  </span>
                  <p>{{ step }}</p>
                </div>

                <div class="progress-bar-bg"></div>
                <div class="progress-bar-fill" :style="{ width: statusProgress(order) }"></div>
              </div>

              <!-- Items -->
              <div v-for="item in order.items" :key="item.product_id" class="order-item">
                <img :src="item.image" alt="product" />
                <div class="flex-grow-1">
                  <h6 class="mb-1">{{ item.title }}</h6>
                  <small class="text-muted">Qty: {{ item.quantity }}</small>
                </div>
                <p class="fw-semibold mb-0">R{{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>

              <!-- Total -->
              <div class="d-flex justify-content-center border-top pt-3 mt-3">
                <h6 class="fs-5">Total:&nbsp;</h6>
                <h6 class="text-primary fs-5">R{{ Number(order.total).toFixed(2) }}</h6>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-5">
            <i class="bi bi-inbox display-4 text-muted"></i>
            <p class="mt-3">No orders yet. Start shopping!</p>
          </div>
        </div>
      </div>

      <!-- <FooterComp /> -->
    </div>
  </transition>
</template>

<script>
import NavbarComp from "@/components/NavbarComp.vue";
import FooterComp from "@/components/FooterComp.vue";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  components: { NavbarComp, FooterComp },
  data() {
    return {
      orders: [],
      loading: true,
      user: JSON.parse(localStorage.getItem("user")) || null,
      statusSteps: ["Pending", "Paid", "Shipped", "Completed"],
    };
  },
  methods: {
    ...mapMutations(["setUser"]),

    getAuthHeaders() {
      const token = localStorage.getItem("token");
      return token ? { Authorization: `Bearer ${token}` } : {};
    },

    async fetchOrders() {
      if (!this.user) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/orders/${this.user.id}`,
          { headers: this.getAuthHeaders() }
        );
        this.orders = res.data;

        // auto progress for incomplete orders
        this.orders.forEach(order => {
          if (!["completed", "cancelled"].includes(order.status.toLowerCase())) {
            this.startAutoProgress(order);
          }
        });
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        this.loading = false;
      }
    },

    async updateStatus(order, newStatus) {
      try {
        await axios.put(
          `http://localhost:3000/api/orders/${order.id}/status`,
          { status: newStatus },
          { headers: this.getAuthHeaders() }
        );
        order.status = newStatus;

        // Clear cart when order is completed
        if (newStatus.toLowerCase() === "completed") {
          this.clearCart();
        }
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    },

    startAutoProgress(order) {
      const statuses = ["pending", "paid", "shipped", "completed"];
      let currentIndex = statuses.indexOf(order.status.toLowerCase());
      if (currentIndex === -1 || ["completed", "cancelled"].includes(order.status.toLowerCase())) return;

      statuses.slice(currentIndex + 1).forEach((status, i) => {
        setTimeout(() => {
          this.updateStatus(order, status);
        }, (i + 1) * 5000);
      });
    },

    statusIndex(status) {
      const map = { pending: 0, paid: 1, shipped: 2, completed: 3 };
      return map[status.toLowerCase()] ?? 0;
    },

    statusProgress(order) {
      const percent = (this.statusIndex(order.status) / (this.statusSteps.length - 1)) * 100;
      return percent + "%";
    },

    statusClass(status) {
      switch (status) {
        case "paid": return "bg-success text-white";
        case "shipped": return "bg-info text-dark";
        case "completed": return "bg-primary text-white";
        case "cancelled": return "bg-danger text-white";
        default: return "bg-secondary text-white";
      }
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    },

    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.setUser(null);
      this.user = null;
      this.$router.push("/login");
    },

    // ---------------------- Clear Cart ----------------------
    clearCart() {
      this.$store.commit("setCartItems", []);
    }
  },

  mounted() {
    if (!this.user) this.$router.push("/login");
    else this.fetchOrders();
  },
};
</script>


<style scoped>
.order-card {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.144);
}
.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.order-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
}

/* Progress Bar */
.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 1.5rem 0;
}
.progress-step {
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 2;
}
.progress-step span {
  display: inline-block;
  width: 35px;
  height: 35px;
  background: #ddd;
  border-radius: 50%;
  line-height: 35px;
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
  transition: all 0.3s ease;
  z-index: 2;
  position: relative;
}
.progress-step.active span {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
.progress-step p {
  margin-top: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
}

/* Bars behind circles */
.progress-bar-bg {
  content: "";
  position: absolute;
  top: 17px;
  left: 0;
  right: 0;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  z-index: 1;
}
.progress-bar-fill {
  position: absolute;
  top: 17px;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
  transition: width 0.5s ease-in-out;
  z-index: 1;
}

/* Status Badge Animation */
.status-fade-enter-active,
.status-fade-leave-active {
  transition: all 0.4s ease;
}
.status-fade-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.status-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
