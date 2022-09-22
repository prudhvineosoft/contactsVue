<template>
  <div v-if="contacts.loading">
    <spinner-component />
  </div>
  <div class="container">
    <div v-if="contacts.errorMsg" class="row text-center">
      <h1 class="h1 text-danger">{{ contacts.errorMsg }}</h1>
    </div>

    <new-contact />
    <show-contact :id="this.myId" />
    <edit-contact ref="editcontact" :id="this.myId2" />
    <pre>{{ data }}</pre>
    <div class="row">
      <div
        class="col-lg-6"
        v-for="contact of contacts.contactsList"
        :key="contact.id"
      >
        <div class="card my-3 p-3 mx-auto" style="max-width: 850px">
          <div class="row g-0 align-items-center">
            <div class="col-md-5 my-auto">
              <img :src="contact.image_path" class="my_image" alt="..." />
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <div class="row">
                  <ul class="list-group">
                    <li class="list-group-item">
                      Name : <span class="fw-bold">{{ contact.title }}</span>
                    </li>
                    <li class="list-group-item">
                      Mobile : <span class="fw-bold">{{ contact.mobile }}</span>
                    </li>
                    <li class="list-group-item">
                      Email :
                      <span class="">{{ contact.email }}</span>
                    </li>
                  </ul>
                </div>
                <div class="row m-0 mt-2 py-3 d-flex justify-content-around">
                  <button
                    type="button"
                    @click="showContact(contact.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#showContact"
                    class="btn btn-outline-info col-2 py-2"
                  >
                    <i class="fa fa-eye fa-1x"></i>
                  </button>
                  <button
                    type="button"
                    @click="editContact(contact.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#EditContact"
                    class="btn btn-outline-warning col-2 py-2"
                  >
                    <i class="fa fa-pen fa-1x"></i>
                  </button>
                  <button
                    to="/"
                    @click="deleteContact(contact.id)"
                    class="btn btn-outline-danger col-2 py-2"
                  >
                    <i class="fa fa-trash fa-1x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditContact from "./EditContact.vue";
import NewContact from "./NewContact.vue";
import ShowContact from "./ShowContact.vue";

import SpinnerComponent from "./SpinnerComponent.vue";
export default {
  components: { SpinnerComponent, NewContact, ShowContact, EditContact },
  name: "ContactsComponent",
  data: function () {
    return {
      myId: "",
      myId2: "",
    };
  },
  computed: mapGetters({
    contacts: "getContactsState",
  }),
  created: function () {
    this.$store.dispatch("getContactsModule/getContacts");
  },
  methods: {
    deleteContact: async function (id) {
      await this.$store.dispatch("deleteModule/deleteContact", { id: id });
      this.$store.dispatch("getContactsModule/getContacts");
    },
    showContact: function (id) {
      this.myId = id;
    },
    editContact: function (id) {
      this.myId2 = id;
      this.$refs.editcontact.fromParent(this.myId2);
    },
  },
};
</script>

<style >
</style>