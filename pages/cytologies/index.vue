<template>
  <div>
    <h1 class="title">Citologías</h1>

    <Table :items="items" :headers="headers" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      headers: [
        { text: "\u2116", value: "number" },
        { text: "Muestra", value: "sample" },
        { text: "Paciente", value: "patient.full_name" },
        { text: "Fecha de entrada", value: "entry_date" },
      ],
      items: [
        {
          id: "d8b9886c-de9f-4399-846c-b54b6c051851",
          patient: { full_name: "Alejandro Valdevila" },
          number: "6195",
          sample: "Piel",
          entry_date: "2019-10-21",
          date_of_diagnosis: "2019-10-21",
          service: "Oncología",
        },
      ],
    };
  },
  head: {
    title: "Citologías",
  },
});
</script>
