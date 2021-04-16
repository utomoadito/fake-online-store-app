<template>
  <div class="w-full min-h-screen bg-black flex justify-center items-center">
    <div class="flex items-center justify-center">
      <div class="container max-w-full mx-auto py-24 px-6">
        <div class="font-sans bg-white shadow-2xl pb-6">
          <div class="max-w-xs mx-auto px-6">
            <div class="relative flex flex-wrap">
              <div class="w-full relative">
                <div class="mt-6">
                  <form class="mt-8">
                    <div class="mx-auto max-w-lg">
                      <div class="py-2">
                        <form @submit.prevent="login">
                          <div class="mb-3">
                            <label class="block text-medium font-semibold text-gray-500" for="username">Email</label>
                            <input 
                              class="w-full p-2 text-gray-700 focus:border-b-3 border-indigo-500 outline-none shadow-md" 
                              type="email" name="email" v-model="email" @keyup.prevent="isEmail" required>
                            <span v-if="errMsgEmail" class="font-bold text-red-500">{{ errMsgEmail }}*</span>
                          </div>
                          <div class="mb-3">
                            <label class="block text-medium font-semibold text-gray-500" for="password">Password</label>
                            <div class="relative">
                              <input 
                                class="w-full p-2 text-gray-700 focus:border-b-3 border-indigo-500 outline-none shadow-md" 
                                name="password" type="password" v-model="password" @keyup.prevent="isPassword" required>
                              <!-- <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-lg leading-5 text-indigo-700">
                                <i @click="toggle" :class="show ? 'fas fa-eye' : 'fas fa-eye-slash '"></i>
                              </div> -->
                              <span v-if="errMsgPassword" class="font-bold text-red-500">{{ errMsgPassword }}*</span>
                            </div>
                          </div>
                          <div>          
                            <button
                                type="submit"
                                class="mt-3 text-sm font-semibold 
                                bg-blue-700 w-full text-white
                                px-6 py-3 block shadow-xl hover:text-white hover:bg-indigo-900"
                                :class="formValid ? '' : 'disabled:opacity-50'"
                                :disabled="formValid ? false : true"
                            >
                              <!-- <i v-if="loading" class="fas fa-spinner animate-spin mr-1"></i> -->
                              <span>Login</span>
                            </button>
                          </div>       
                        </form>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginProcess, saveToken, saveMe } from '../utils/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      errMsgEmail: '',
      errMsgPassword: '',
      formValid: false,
      // loading: true
    }
  },
  methods: {
    isEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) { //eslint-disable-line
        this.errMsgEmail = ''
        this.formValid = true
      } else {
        this.errMsgEmail = 'Masukkan email yang valid'
        this.formValid = false
      }
    },
    isPassword() {
      if (this.password.length >= 8) {
        this.errMsgPassword = ''
        this.formValid = true
      } else {
        this.errMsgPassword = 'Password minimal harus memiliki 8 karakter'
        this.formValid = false
      }
    },
    login() {
      // this.loading = true
      if (this.formValid) {
        const payload = {
          email: this.email,
          password: this.password
        }
        loginProcess(payload).then(response => {
          saveToken(response.token)
          saveMe(response)
          // this.loading = false
          window.location.reload()
        })
      }
    }
  }
}
</script>
