<template>
  <div>
    <h1 class="title">Biopsias</h1>

    <Table :items="biopsies" :headers="headers" add-url-name="biopsies-add" @on-prev="prev" @on-next="next" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import biopsiesQuery from "@/graphql/biopsies.query.gql";

const pageSize = 6;

export default Vue.extend({
  data() {
    return {
      page: 0,
      biopsies: [],
      headers: [
        { text: "\u2116", value: "number" },
        { text: "Muestra", value: "sample" },
        { text: "Fecha de entrada", value: "entry_date" },
        { text: "Paciente", value: "patient.full_name" },
      ],
    };
  },
  apollo: {
    biopsies: {
      query: biopsiesQuery,
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
      this.$apollo.queries.biopsies.fetchMore({
        variables: {
          limit: pageSize,
          offset: this.page,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          return [...previousResult.biopsies, ...fetchMoreResult.biopsies];
        },
      });
    },
    next(): void {
      this.page++;
      this.$apollo.queries.biopsies.fetchMore({
        variables: {
          limit: pageSize,
          offset: this.page,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          return [...previousResult.biopsies, ...fetchMoreResult.biopsies];
        },
      });
    },
  },
  head: {
    title: "Biopsias",
  },
});
</script>
