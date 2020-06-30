<template>
  <div class="w-full max-h-full max-w-xs mx-auto">
    <h1 class="app-brand text-gray-700 text-center text-5xl">Pathologic</h1>

    <FormulateForm
      :schema="schema"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "login",
  data() {
    return {
      schema: [
        {
          type: "email",
          label: "Email",
          placeholder: "john.doe@gmail.com",
          validation: "required|email",
        },
        { type: "password", label: "Contraseña", validation: "required" },
        { type: "submit", label: "Entrar" },
      ],
    };
  },
});
</script>
