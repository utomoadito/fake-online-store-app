import { createStore } from 'vuex'
import product from './product'
import cart from './cart'

export const store = createStore({
    modules: {
        product,
        cart
    }
})