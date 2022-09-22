import axios from "axios";

export default {
    namespaced: true,
    state: {
        postdData: '',
        error_msg: ""
    },
    mutations: {
        POST_SUCCESS: function (state, payload) {
            state.postdData = payload.data
        },
        POST_FAIL: function (state, payload) {
            state.error_msg = ""
            state.error_msg = payload.error
        }
    },
    actions: {
        post_data: async function ({ commit }, payload) {
            try {
                let url = `http://127.0.0.1:8000/api/contacts`;
                let response = await axios.post(url, payload.formData);
                commit("POST_SUCCESS", { data: response.data })
            } catch (error) {
                commit("POST_FAIL", { error: error })
            }
        }
    }
}