import axios from "axios";

export default {
    namespaced: true,
    state: {
        updatedData: '',
        error_msg: ""
    },
    mutations: {
        UPDATE_SUCCESS: function (state, payload) {
            state.updatedData = payload.data
        },
        UPDATE_FAIL: function (state, payload) {
            state.error_msg = ""
            state.error_msg = payload.error
        }
    },
    actions: {
        update_data: async function ({ commit }, payload) {
            try {
                let url = `http://127.0.0.1:8000/api/contacts/${payload.id}`;
                let response = await axios.put(url, payload.formData);
                commit("UPDATE_SUCCESS", { data: response.data })
            } catch (error) {
                commit("UPDATE_FAIL", { error: error })
            }
        }
    }
}