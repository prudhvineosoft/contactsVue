<template>
  <div class="home">
    <contacts-component />
  </div>
</template>

<script>
import ContactsComponent from "@/components/ContactsComponent.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: { ContactsComponent },
};
</script>
