import axios from "axios"

export default {
    namespaced: true,
    state: {
        contacts: {
            loading: false,
            errorMsg: null,
            contactsList: [],
        },
        contactById: {
            contact: {}
        },
    },
    mutations: {
        GET_CONTACTS_REQUEST: function (state) {
            state.contacts.loading = true
        },
        GET_CONTACTS_SUCCESS: function (state, payload) {
            state.contacts.loading = false
            state.contacts.contactsList = payload.contactsList
        },
        GET_CONTACTS_FAILED: function (state, payload) {
            state.contacts.loading = false
            state.contacts.errorMsg = payload.error
        },
        // GET_CONTACT_BY_ID: function (state, payload) {

        //     state.contactById = payload.data
        // }
    },
    actions: {
        getContacts: async function ({ commit }) {
            try {
                commit("GET_CONTACTS_REQUEST");
                let url = `http://127.0.0.1:8000/api/contacts`;
                let response = await axios.get(url);
                commit("GET_CONTACTS_SUCCESS", { contactsList: response.data.data })
                commit("GET_CONTACTS_FAILED", { error: "" })
            } catch (error) {
                commit("GET_CONTACTS_FAILED", { error: error })
            }
        },
        // getContactsById: async function ({ commit }, payload) {
        //     commit("GET_CONTACT_BY_ID", { id: payload.id })
        // }
    }
}