<template>
  <nav class="flex fixed top-0 w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
    <div class="flex fixed right-5 items-center">
      <button 
        @click="logout"
        class="flex-1 items-center p-3 font-medium mr-2 text-center bg-red-500 hover:bg-red-700 focus:outline-none focus:bg-red-700">
        <span class="text-white uppercase">Logout</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { clearToken, clearMe } from '../../utils/auth'

export default {
  name: 'Navbar',
  computed: {},
  methods: {
    logout() {
      clearToken()
      clearMe()
      window.location.reload()
    }
  }
}
</script>