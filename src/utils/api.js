import axios from 'axios'

const apiProduct = (function () {
    function processRequest(request) {
		return new Promise((resolve, reject) => {
			request.then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.response)
            })
		})
	}

	function mergeEndpoint(endpoint) {
		return process.env.VUE_APP_FAKE_API + endpoint
	}

    function get(endpoint) {
		return processRequest(
			axios.get(mergeEndpoint(endpoint), {})
		)
	}

    return { get }

})()

const apiRajaOngkir = (function () {
	// const headers = {
	// 	key: process.env.VUE_APP_RAJAONGKIR_API_KEY
	// }

    function processRequest(request) {
		return new Promise((resolve, reject) => {
			request.then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.response)
            })
		})
	}

	function mergeEndpoint(endpoint) {
		return process.env.VUE_APP_RAJAONGKIR_API + endpoint
	}

    function get(endpoint) {
		return processRequest(
			axios.get(mergeEndpoint(endpoint), {
				headers: {
					'key': process.env.VUE_APP_RAJAONGKIR_API_KEY,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
		)
	}

    return { get }

})()

export { apiProduct, apiRajaOngkir }