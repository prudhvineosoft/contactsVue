<template>
  <div
    class="modal fade"
    id="exampleModal"
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
          <div class="container d-flex justify-content-center">
            <form
              class="mt-3"
              @submit.prevent="submitForm()"
              ref="contactForm"
              id="newContact"
            >
              <div class="group">
                <input
                  v-model="formData.name"
                  v-bind:onkeyup="update()"
                  class="my-input"
                  type="text"
                />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="my-label">Name</label>
                <p class="text-center error" v-if="v$.name.$error">
                  {{ v$.name.$errors[0].$message }}
                </p>
              </div>
              <div class="group">
                <input v-model="formData.email" class="my-input" type="email" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="my-label" type="email">Email</label>
                <p class="text-center error" v-if="v$.email.$error">
                  {{ v$.email.$errors[0].$message }}
                </p>
              </div>
              <div class="group">
                <input
                  v-model="formData.mobile"
                  class="my-input"
                  type="number"
                />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="my-label">Mobile</label>
                <p class="text-center error" v-if="v$.mobile.$error">
                  {{ v$.mobile.$errors[0].$message }}
                </p>
                <div class="text-center error" v-if="data.postdData.error">
                  <div v-for="my_error of data.postdData.error" :key="my_error">
                    <p
                      v-if="my_error[0] == 'The mobile has already been taken.'"
                    >
                      {{ my_error[0] }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="group">
                <input
                  v-model="formData.company"
                  class="my-input"
                  type="text"
                />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="my-label">Company</label>
                <p class="text-center error" v-if="v$.company.$error">
                  {{ v$.company.$errors[0].$message }}
                </p>
              </div>
              <div class="group">
                <select
                  v-model="formData.type"
                  v-bind:onclick="onChange()"
                  class="my-input"
                  name="cars"
                  id="cars"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="Relative">Relative</option>
                  <option value="Friend">Friend</option>
                  <option value="Close Friend">Close Friend</option>
                  <option value="Colleague">Colleague</option>
                  <option value="10th Friend">10th Friend</option>
                  <option value="Diploma Friend">Diploma Friend</option>
                  <option value="B.tech friend">B.tech friend</option>
                </select>
                <label class="my-label">Type</label>
                <p class="text-center error" v-if="v$.type.$error">
                  {{ v$.type.$errors[0].$message }}
                </p>
              </div>
              <div class="group">
                <input v-model="formData.title" class="my-input" type="text" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="my-label">Title</label>
                <p class="text-center error" v-if="v$.title.$error">
                  {{ v$.title.$errors[0].$message }}
                </p>
                <div class="text-center error" v-if="data.postdData.error">
                  <div
                    v-for="my_errors of data.postdData.error"
                    :key="my_errors"
                  >
                    <p
                      v-if="my_errors[0] == 'The title has already been taken.'"
                    >
                      {{ my_errors[0] }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="group">
                <input
                  v-model="formData.image_path"
                  class="my-input"
                  type="text"
                />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="my-label">Image URL</label>
                <p class="text-center error" v-if="v$.image_path.$error">
                  {{ v$.image_path.$errors[0].$message }}
                </p>
              </div>
            </form>
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
import useValidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { mapGetters } from "vuex";
export default {
  name: "NewContact",
  setup() {
    const formData = reactive({
      name: "",
      email: "",
      mobile: "",
      company: "",
      type: "",
      title: "",
      image_path: "",
    });
    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        mobile: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        company: { required },
        type: { required },
        title: { required },
        image_path: { required },
      };
    });
    const v$ = useValidate(rules, formData);
    return { formData, v$ };
  },
  methods: {
    submitForm: async function () {
      this.v$.$validate();
      if (!this.v$.$error) {
        await this.$store.dispatch("postContactModule/post_data", {
          formData: this.formData,
        });
        await this.$store.dispatch("getContactsModule/getContacts");
        if (!this.data.postdData.err) {
          this.$refs.contactForm.reset();
          document.getElementById("close").click();
        }
      } else {
        console.log("all fields are requred");
      }
    },
    update: function () {
      this.formData.title = this.formData.name + "  ( ";
    },
    onChange: function () {
      this.formData.title += this.formData.type + " )";
    },
  },
  computed: mapGetters({
    data: "getPostedState",
  }),
};
</script>

<style></style>
