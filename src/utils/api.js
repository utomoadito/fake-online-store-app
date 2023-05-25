import axios from 'axios'
// import request from 'request'

const apiProduct = (() => {
    const processRequest = (request) => {
		return new Promise((resolve, reject) => {
			request.then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.response)
            })
		})
	}

	const http = axios.create({
		baseURL: process.env.VUE_APP_FAKE_API
	})

    const get = (endpoint) => {
		return processRequest(
			http.get(endpoint)
		)
	}

    return { get }

})()

const apiRajaOngkir = (() => {
    const processRequest = (request) => {
		return new Promise((resolve, reject) => {
			request.then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.response)
            })
		})
	}

	// This endpoint API refer to localhost server that already handle Rajaongkir API
	// Because Rajaongkir API doesn't allow fetch their API from client side / front-end and using AJAX
	const http = axios.create({
		baseURL: 'http://localhost:8000/rajaongkir/'
	})

    const get = (endpoint) => {
		return processRequest(
			http.get(endpoint)
		)
	}

    // const get = () => {
	// 	return new Promise((resolve, reject) => { //eslint-disable-line
	// 		const options = {
	// 			method: 'GET',
	// 			url: 'https://api.rajaongkir.com/starter/province',
	// 			headers: {key: '1520799914d6529c7afebfb14e55abaa', 'Access-Control-Allow-Origin' : 'http://localhost/'}
	// 		}
	// 		request(options, function (error, response, body) {//eslint-disable-line
	// 			if (error) throw new Error(error)
	// 			resolve(body)
	// 		})
	// 	})
	// }

	const post = (endpoint, payload) => {
		return processRequest(
			http.post(endpoint, payload)
		)
	}

    return { get, post }

})()

export { apiProduct, apiRajaOngkir }