<template>
  <div>
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="modal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <transition
              enter-active-class="ease-out duration-300"
              enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="ease-in duration-200"
              leave-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
              <div 
                v-if="modal" 
                class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" 
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="p-3">
                  <div class="flex flex-col overflow-auto mb-8">
                    <div
                      v-for="(cartContain, index) in carts" :key="index" 
                      class="flex items-center justify-between p-2 text-sm border-b border-gray-700">
                      <div class="flex-1">
                        <div class="text-black font-semibold">
                          {{ cartContain.title }}
                        </div>
                        <div class="text-black font-thin">
                          {{ cartContain.weight * cartContain.qty + ' g' }}
                        </div>
                        <div class="text-black font-semibold mt-2">
                          {{ 'Rp '+ cartContain.priceFormat }}
                        </div>
                      </div>
                      <div class="text-red-400">x {{ cartContain.qty }}</div>
                    </div>
                    <div class="flex text-black text-lg p-2">
                      <div class="flex-1">
                        <span class="mt-2 font-semibold">Subtotal: </span>
                      </div>
                      <span class="font-bold">Rp {{ subtotal.format }}</span>
                    </div>
                    <div class="flex text-black text-lg p-2">
                      <div class="relative inline-block w-full text-gray-700">
                        <select 
                          v-model="courier"
                          class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border appearance-none focus:shadow-outline"
                          placeholder="Pilih Kurir">
                          <option value="" selected>Pilih Kurir</option>
                          <option value="jne">JNE</option>
                          <option value="pos">POS</option>
                          <option value="tiki">TIKI</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                        </div>
                      </div>
                    </div>
                    <div class="flex text-black text-lg p-2">
                      <div class="relative inline-block w-full text-gray-700">
                        <select 
                          @change="onChangeProvince"
                          v-model="province"
                          class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border appearance-none focus:shadow-outline"
                          placeholder="Pilih Provinsi">
                          <option value="" selected>Pilih Provinsi</option>
                          <option v-for="(province, index) in deliveryProvince" :key="index" :value="province.province_id">{{ province.province }}</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                        </div>
                      </div>
                    </div>
                    <div v-if="deliveryCity.length > 0" class="flex text-black text-lg p-2">
                      <div class="relative inline-block w-full text-gray-700">
                        <select
                          @change="onChangeCity"
                          v-model="city"
                          class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border appearance-none focus:shadow-outline"
                          placeholder="Pilih Kota/Kabupaten">
                          <option value="" selected>Pilih Kota/Kabupaten</option>
                          <option v-for="(city, index) in deliveryCity" :key="index" :value="city.city_id">{{ city.city_name }}</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    @click="onClickCancel"
                    class="mt-5 text-sm font-semibold bg-red-600 w-full text-white px-6 py-3 shadow-xl hover:text-white hover:bg-red-800">
                    Batal
                  </button>
                </div>
              </div>
            </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PaymentModal',
  props: {
    modal: Boolean,
    carts: Array,
    subtotal: Object,
    deliveryProvince: Array
  },
  data () {
    return {
      province: '',
      city: '',
      courier: ''
    }
  },
  computed: {
    ...mapGetters(['deliveryCity', 'deliveryService'])
  },
  methods: {
    ...mapActions(['getDeliveryCity', 'getDeliveryService']),
    onClickCancel() {
      this.courier = ''
      this.province = ''
      this.city = ''
      this.$store.commit('setDeliveryProvince', [])
      this.$store.commit('setDeliveryCity', [])
      this.$emit('onClickCancel', false)
    },
    onChangeProvince() {
      if (this.province == '') {
        this.$store.commit('setDeliveryCity', [])
      } else {
        this.getDeliveryCity(this.province)
      }
    },
    onChangeCity() {
      let payload = {
        origin: this.carts[0].seller.city_id,
        destination: this.city,
        courier: this.courier
      }
      let weightTotal = 0
      this.carts.map(val => {
        weightTotal += val.weight * val.qty
      })
      payload.weight = weightTotal
      this.getDeliveryService(payload)
    }
  }
}
</script>
