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

export { apiProduct }