<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<template>
  <div>
    <h2>{{ title }}</h2>

    <input v-model="search" placeholder="Search product..." />

    <p v-if="loading">Loading products...</p>

    <ul v-show="!loading">
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }} - ₹{{ product.price }}
        <button @click="removeProduct(product.id)"></button>
      </li>
    </ul>

    <p :style="{ color: totalPrice > 60000 ? 'red' : 'green' }">
      Total Price: ₹{{ totalPrice }}
    </p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { fetchProducts } from "./api.js";

const title = ref("Product Dashboard");
const search = ref("");
const loading = ref(false);

const state = reactive({
  products: []
});

const loadProducts = async () => {
  loading.value = true;
  state.products = await fetchProducts();
  loading.value = false;
};

const filteredProducts = computed(() => {
  return state.products.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const totalPrice = computed(() =>
  state.products.reduce((sum, p) => sum + p.price, 0)
);

const removeProduct = id => {
  state.products = state.products.filter(p => p.id !== id);
};

watch(search, newValue => {
  console.log("Searching:", newValue);
});

onMounted(loadProducts);
</script>

