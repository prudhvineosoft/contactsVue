<template>
  <div
    class="modal fade"
    id="showContact"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-for="contact of contacts.contactsList" :key="contact.id">
            <div v-if="contact.id == id">
              <div class="row">
                <div class="col-md-12 d-flex justify-content-around">
                  <img
                    :src="contact.image_path"
                    class="my_image mb-3"
                    alt="image"
                  />
                </div>
                <div class="col-md-12">
                  <ul class="list-group">
                    <li class="list-group-item">Name : {{ contact.name }}</li>
                    <li class="list-group-item">Email : {{ contact.email }}</li>
                    <li class="list-group-item">
                      Mobile : {{ contact.mobile }}
                    </li>
                    <li class="list-group-item">
                      Company : {{ contact.company }}
                    </li>
                    <li class="list-group-item">Type : {{ contact.type }}</li>
                    <li class="list-group-item">Title : {{ contact.title }}</li>
                    <li class="list-group-item">
                      Created on :
                      {{ moment(contact.created_at).format("DD /MM  /YYYY") }}
                    </li>
                    <li class="list-group-item">
                      Updated on :
                      {{ moment(contact.updated_at).format("DD /MM  /YYYY") }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            id="close"
          >
            Close
          </button>
          <button type="submit" form="newContact" class="btn btn-primary">
            Add Contact
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "ShowContact",
  data: function () {
    return {
      data: null,
    };
  },
  props: {
    id: { type: Number, required: true },
  },
  computed: mapGetters({
    contacts: "getContactsState",
  }),
  created: function () {
    this.moment = moment;
  },
};
</script>

<style lang="scss" scoped>
</style>