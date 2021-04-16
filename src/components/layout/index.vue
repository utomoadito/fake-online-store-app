<template>
  <div class="relative h-full w-full bg-gray-100 flex flex-row sm:overflow-auto">
    <sidebar />
    <div class="flex-1 w-full min-h-screen bg-gray-100 duration-200 lg:ml-64">
      <navbar />
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      isOpen: true
    }
  },
  methods: {}
}
</script>