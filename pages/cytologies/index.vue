<template>
  <div>
    <h1 class="title">Citologías</h1>

    <Table :items="items" :headers="headers" add-url-name="cytologies-add" @on-prev="prev" @on-next="next" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import getCytologies from "@/graphql/queries/getCytologies.gql";

const pageSize = 6;

export default Vue.extend({
  data() {
    return {
      page: 0,
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
  apollo: {
    cytologies: {
      query: getCytologies,
      variables() {
        return {
          limit: pageSize,
          offset: this.page * pageSize,
        };
      },
    },
  },
  methods: {
    prev(): void {
      this.page--;
      this.$apollo.queries.cytologies.fetchMore({
        variables: {
          limit: pageSize,
          offset: this.page,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          return [...previousResult.cytologies, ...fetchMoreResult.cytologies];
        },
      });
    },
    next(): void {
      this.page++;
      this.$apollo.queries.cytologies.fetchMore({
        variables: {
          limit: pageSize,
          offset: this.page,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          return [...previousResult.cytologies, ...fetchMoreResult.cytologies];
        },
      });
    },
  },
  head: {
    title: "Citologías",
  },
});
</script>
