<template>
  <div class="w-full">
    <div class="-my-2 py-2 max-w-sm">
      <FormulateForm v-model="biopsy" :schema="schema" @submit="createBiopsy" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import biopsySchema from "@/components/forms/biopsy";

export default Vue.extend({
  data() {
    return {
      biopsy: { service: "oncology" },
      schema: biopsySchema("Añadir biopsia"),
    };
  },
  methods: {
    createBiopsy() {
      console.log(this.biopsy);
    },
  },
  head: {
    title: "Añadir Biopsia",
  },
});
</script>
