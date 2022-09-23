import axios from "axios";

export default {
    namespaced: true,
    state: {
        errorMsg: "",
        deletedContent: {},
        updatedData: '',
        error_msg: ""
    },
    mutations: {
        DELETE_SUCCESS: function (state, payload) {
            state.deletedContent = payload.content
        },
        DELETE_FAIL: function (state, payload) {
            state.errorMsg = payload.error
        },

        UPDATE_SUCCESS: function (state, payload) {
            state.updatedData = payload.data
        },
        UPDATE_FAIL: function (state, payload) {
            state.error_msg = ""
            state.error_msg = payload.error
        }
    },
    actions: {
        deleteContact: async function ({ commit }, payload) {
            try {
                let url = `http://127.0.0.1:8000/api/contacts/${payload.id}`;
                let response = await axios.delete(url)
                commit("DELETE_SUCCESS", { content: response.data })
            } catch (error) {
                commit("DELETE_FAIL", { error: error })
            }
        },

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