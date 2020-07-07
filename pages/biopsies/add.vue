<template>
  <div class="w-full">
    <div class="-my-2 py-2 max-w-sm">
      <FormulateForm v-model="biopsy" :schema="schema" @submit="createBiopsy" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import municipalitiesQuery from "@/graphql/municipalities.query.gql";
// import createPatientMutation from "@/graphql/createPatient.mutation.gql";
// import patientsQuery from "@/graphql/patients.query.gql";

export default Vue.extend({
  data() {
    return {
      biopsy: { service_id: "oncology" },
      schema: [
        {
          component: "h3",
          class: "text-2xl text-gray-800 mb-4",
          children: "Añadir biopsia",
        },
        { type: "text", name: "number", label: "\u2116 de biopsia" },
        { type: "text", name: "sample", label: "Muestra" },
        {
          type: "date",
          name: "entry_date",
          label: "Fecha de entrada",
          "input-class": ["text-gray-600"],
        },
        {
          type: "date",
          name: "microscopic_date",
          label: "Fecha de estudio microscópico",
          "input-class": ["text-gray-600"],
        },
        {
          type: "date",
          name: "macroscopic_date",
          label: "Fecha de estudio macroscópico",
          "input-class": ["text-gray-600"],
        },
        {
          type: "select",
          name: "service_id",
          label: "Servicio",
          options: { oncology: "Oncología" },
          "input-class": ["text-gray-600"],
        },
        {
          type: "textarea",
          name: "clinical_diagnosis",
          label: "Diagnóstico clínico",
        },
        {
          type: "textarea",
          name: "macroscopic_description",
          label: "Descripción macroscópica",
        },
        {
          type: "textarea",
          name: "microscopic_description",
          label: "Descripción microscópica",
        },
        {
          type: "textarea",
          name: "anatomopathological_report",
          label: "Reporte anatomopatológico",
        },
        { type: "submit", label: "Añadir", "outer-class": ["float-right"] },
      ],
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
