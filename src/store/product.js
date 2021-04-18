import { apiProduct } from '../utils/api'
import { usdToIdr } from '../utils/format'
import numeral from 'numeral'

const state = () => ({
    products: []
})

const getters = {
    products: state => state.products
}

const actions = {
    fetchAllProduct({ commit }) {
        apiProduct.get('products').then(res => {
            let productsData = []
            res.map(data => {
                data.price = usdToIdr(data.price)
                data.priceFormat = numeral(data.price).format('0,0')
                data.weight = 1000.0
                data.seller = {
                    "id": 1,
                    "name": "Sri Rejeki",
                    "province_id": 5,
                    "city_id": 419
                }
                productsData.push(data)
            })
            commit('setProducts', productsData)
        })
    }
}

const mutations = {
    setProducts: (state, products) => {
        state.products = products
    }
}

export default { state, getters, actions, mutations }