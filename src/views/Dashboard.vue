<template>
  <div class="flex max-w-full md:mx-auto py-20">
    <div class="flex flex-col p-6 sm bg-white shadow-xl w-full">
      <div class="flex font-semibold text-3xl text-gray-800 leading-tight pb-3 mb-5 border-b-2 border-gray-300">
        <h1 class="flex-1">Daftar Produk</h1>
        <div class="flex flex-wrap">
          <div class="flex">
            <div class="relative inline-block w-full text-gray-700">
              <select 
                v-model="filterBy.category"
                class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border appearance-none focus:shadow-outline"
                placeholder="Pilih Kategori">
                <option value="" selected>Semua Kategori</option>
                <option v-for="(category, index) in showCategories" :key="index" :value="category">{{ category }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="relative inline-block w-full text-gray-700">
              <select 
                v-model="sortBy.name"
                class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border appearance-none focus:shadow-outline"
                placeholder="Urut Berdasarkan">
                <option value="title" selected>Urut Berdasarkan Nama Produk</option>
                <option value="category">Urut Berdasarkan Kategori</option>
                <option value="price">Urut Berdasarkan Harga</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2">
        <div class="flex w-1/3 px-2 py-2" v-for="(product, index) in filteredProducts" :key="index">
          <div class="w-full overflow-hidden shadow-lg mb-5">
            <img class="object-cover mx-auto h-48" :src="product.image" alt="Flower and sky"/>
            <div class="px-6 py-4">
              <h4 class="mb-3 text-xl font-semibold tracking-tight text-gray-800">{{ product.title }}</h4>
              <p class="mb-3 text-sm font-semibold tracking-tight mb-2">{{ product.category }}</p>
              <p class="leading-normal text-gray-700"><b>${{product.price}}</b></p>
              <button 
                @click="handleAddToCart(product)"
                class="mt-3 text-sm font-semibold bg-green-700 w-full text-white px-6 py-3 block shadow-xl hover:text-white hover:bg-indigo-900">
                + Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      filterBy: {
        category: ''
      },
      sortBy: {
        name: 'title'
      }
    }
  },
  created() {
    if (this.products?.length == 0) {
      this.fetchAllProduct()
    }
  },
  computed: {
    ...mapGetters(['products']),
    showCategories() {
      return Array.from(new Set(this.products.map(data => data.category)))
    },
    filteredProducts() {
      let products = this.products
      if (this.filterBy.category != '') {
        products = products.filter(data => {
          return data.category == this.filterBy.category
        })
      }
      products = products.sort((a, b) => {
        if (this.sortBy.name == 'title' || this.sortBy.name == 'category') {
          const sortA = a[this.sortBy.name].toLowerCase(), sortB = b[this.sortBy.name].toLowerCase()
          if (sortA < sortB) return -1
          if (sortA > sortB) return 1
          return 0
        } else if (this.sortBy.name == 'price') {
          return a.price - b.price
        }
      })
      return products
    }
  },
  methods: {
    ...mapActions(['fetchAllProduct', 'addProductToCart']),
    handleAddToCart(data) {
      this.addProductToCart(data)
    }
  }
}
</script>