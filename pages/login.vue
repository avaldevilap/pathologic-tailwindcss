<template>
  <div class="w-full max-w-xs mx-auto">
    <h1 class="app-brand text-gray-700 text-center text-5xl">Pathologic</h1>

    <FormulateForm
      v-model="credentials"
      :schema="schema"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit="login"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "login",
  data() {
    return {
      credentials: {},
      schema: [
        {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "john.doe@gmail.com",
          validation: "required|email",
        },
        {
          type: "password",
          name: "password",
          label: "Contraseña",
          validation: "required",
        },
        {
          component: "div",
          class: "flex justify-end items-center",
          children: [
            { type: "submit", label: "Entrar", "outer-class": "mb-0" },
          ],
        },
      ],
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", { data: this.credentials });
      } catch (err) {
        console.log(err);
      }
    },
  },
  head() {
    return {
      title: "Pathologic",
    };
  },
});
</script>
