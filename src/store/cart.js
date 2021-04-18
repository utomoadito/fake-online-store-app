import numeral from 'numeral'
import { apiRajaOngkir } from '../utils/api'

const state = () => ({
    carts: [],
    subtotal: {
        count: 0,
        format: ''
    },
    total: 0,
    deliveryProvince: []
})

const getters = {
    carts: state => state.carts,
    subtotal: state => state.subtotal,
    total: state => state.total,
    deliveryProvince: state => state.deliveryProvince
}

const actions = {
    addProductToCart({ commit, getters }, payload) {
        const sameProduct = getters.carts.filter(item => {
            return item.id == payload.id
        })

        if (sameProduct.length <= 0) {
            payload.qty = 1
            commit('setCarts', payload)
        } else {
            payload.qty += 1
            commit('setItemQtyInCart', payload)
        }
    },
    removeProductFromCart({ commit }, payload) {
        payload.qty -= 1
        commit('setItemQtyInCart', payload)
    },
    countSubtotal({ commit, getters }) {
        let total = 0
        getters.carts.map(item => {
            const totalPerItem = item.price * item.qty
            total += totalPerItem
        })
        const format = numeral(total).format('0,0')
        commit('setCountSubtotal', { total, format })
    },
    fetchAllDeliveryProvince({ commit }) {
        apiRajaOngkir.get('province').then(res => {
            commit('setDeliveryProvince', res.results)
        })
    }
}

const mutations = {
    setCarts: (state, payload) => {
        state.carts.push(payload)
    },
    setItemQtyInCart: (state, payload) => {
        state.carts.forEach((item, index) => {
            if (item.id == payload.id) {
                if (state.carts[index].qty <= 0) {
                    state.carts.splice(index, 1)
                } else {
                    state.carts[index].qty = payload.qty
                }
            }
        })
    },
    setCountSubtotal: (state, val) => {
        state.subtotal.number = val.total
        state.subtotal.format = val.format
    },
    setDeliveryProvince: (state, payload) => {
        state.deliveryProvince = payload
    }
}

export default { state, getters, actions, mutations }