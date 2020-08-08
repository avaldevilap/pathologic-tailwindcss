<template>
  <div>
    <h1 class="title">Pacientes</h1>

    <Table
      :items-count="count"
      :items="patients"
      :headers="headers"
      url-name="patients"
      :prev-disabled="offset === 0"
      :next-disabled="offset + 6 >= count"
      @on-change="pagination"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import patientsQuery from "@/graphql/patients.query.gql";

const limit = 6;

export default Vue.extend({
  data() {
    return {
      patients: [],
      count: 0,
      headers: [
        { text: "Nombre", value: "full_name" },
        { text: "\u2116 de identidad", value: "identifier" },
        { text: "Fecha de nacimiento", value: "birthdate" },
        { text: "Dirección", value: "address" },
        { text: "Municipio", value: "municipality.name" },
      ],
    };
  },
  computed: {
    pages() {
      return this.count / limit;
    },
    offset() {
      const page = parseInt(this.$route.query.page, 10);
      return page ? (page - 1) * limit : 0;
    },
    offsetLast() {
      const offset = 6 * this.pages - limit;
      if (offset >= 0) return offset;
      return 0;
    },
  },
  apollo: {
    patients: {
      query: patientsQuery,
      variables() {
        return {
          limit,
          offset: this.offset,
        };
      },
      update(data) {
        this.count = data.patients_aggregate.aggregate.count;
        return data.patients;
      },
    },
  },
  methods: {
    pagination(): () => {} {
      return () =>
        this.$apollo.queries.patients.setVariables({
          limit,
          offset: this.offset,
        });
    },
  },
  head() {
    return { title: "Pacientes" };
  },
});
</script>
