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

<style>
.error {
  color: rgb(190, 32, 32);
  font-size: 12px;
  margin-bottom: 2px;
}
.modal-content {
  background-color: rgb(34, 33, 33) !important;
  border-color: #6366f1 !important;
}
.modal-content:hover {
  box-shadow: #6365f1a8 0px 5px 17px 0px;
}
.modal-body {
  background-color: #0b0f19 !important;
}
.modal-header {
  border-bottom: 0px !important;
}
.modal-footer {
  border-top: 0px !important;
}

.group {
  position: relative;
  margin-bottom: 25px;
}

.my-input,
.my-input:focus {
  font-size: 18px;
  color: #999;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 320px;
  background: transparent;
  border: none;
  outline-width: 0;
  border-bottom: 1px solid #757575;
}

/* LABEL ======================================= */
.my-label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
.my-input:focus ~ .my-label,
.my-input:valid ~ .my-label {
  top: -10px;
  font-size: 14px;
  color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  max-width: 400px;
}
.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
.my-input:focus ~ .bar:before,
.my-input:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active state */
.my-input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}
option {
  background-color: rgb(34, 33, 33) !important;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 400px;
    background: transparent !important;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 400px;
    background: transparent !important;
  }
}
@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 400px;
    background: transparent !important;
  }
}

@media screen and (min-width: 591px) {
  .my-input,
  .my-input:focus {
    width: 400px;
  }
} ;
</style>