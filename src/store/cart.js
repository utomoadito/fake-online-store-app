const state = () => ({
    carts: []
})

const getters = {
    carts: state => state.carts
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
    }
}

export default { state, getters, actions, mutations }