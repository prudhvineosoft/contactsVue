import { createStore } from 'vuex'
import getContactsModule from './modules/getContacts.module'
import deleteModule from './modules/delete.module'
import postContactModule from './modules/postContact.module'
import changeDataModule from './modules/changeData.module'


export default createStore({
  state: {
    contactsState: getContactsModule.state,
    deleteState: deleteModule.state,
    postedState: postContactModule.state,
    changedState: changeDataModule.state
  },
  getters: {
    getContactsState: function (state) {
      return state.contactsState.contacts
    },
    getDeleteState: function (state) {
      return state.deleteState
    },
    getPostedState: function (state) {
      return state.postedState
    },
    getChangeState: function (state) {
      return state.changedState
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    getContactsModule,
    deleteModule,
    postContactModule,
    changeDataModule
  }
})
