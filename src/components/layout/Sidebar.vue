<template>
  <div class="flex flex-col fixed h-full text-white duration-200 p-2 gap-y-4 bg-gray-800 lg:w-1/6">
    <div class="inline-flex font-semibold gap-2 items-center border-b border-gray-500 p-4">
      <h1>Fake Online Store App</h1>
    </div>
    <div class="flex flex-col overflow-auto">
      <div v-if="carts.length <= 0" class="text-center">
        <span>Keranjang Belanja Kosong</span>  
      </div>
      <div v-else>
        <div
          v-for="(cartContain, index) in carts" :key="index" 
          class="flex items-center justify-between p-2 text-sm border-b border-gray-700">
          <div class="flex-1">
            <div class="text-gray-100 font-semibold">
              {{ cartContain.title.substring(0,18)+'...' }}
            </div>
            <div class="text-white font-thin">
              {{ '$ '+ cartContain.price }}
            </div>
          </div>
          <div class="text-red-400">x {{ cartContain.qty }}</div>
          <button 
            @click="handleRemoveFromCart(cartContain)" 
            class="items-center p-1 font-medium ml-2 text-sm bg-red-500 hover:bg-red-700 focus:outline-none">
            - 
          </button>
        </div>
        <button class="mt-3 text-sm font-semibold bg-blue-600 w-full text-white px-6 py-3 block shadow-xl hover:text-white hover:bg-blue-800">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(['carts'])
  },
  methods: {
    ...mapActions(['removeProductFromCart']),
    handleRemoveFromCart(data) {
      this.removeProductFromCart(data)
    }
  }
}
</script>