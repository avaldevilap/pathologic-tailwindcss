<template>
  <div>
    <h1 class="title">Necropsias</h1>

    <Table
      :items="necropsies"
      :headers="headers"
      add-url-name="necropsies-add"
      @on-prev="prev"
      @on-next="next"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import getNecropsies from "@/graphql/queries/getNecropsies.gql";

const pageSize = 6;

export default Vue.extend({
  data() {
    return {
      page: 0,
      necropsies: [],
      headers: [
        { text: "\u2116", value: "number" },
        { text: "Fecha de admisión", value: "date_of_admission" },
        { text: "Paciente", value: "patient.full_name" },
      ],
    };
  },
  apollo: {
    necropsies: {
      query: getNecropsies,
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
      this.$apollo.queries.necropsies.fetchMore({
        variables: {
          limit: pageSize,
          offset: this.page,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          return [...previousResult.necropsies, ...fetchMoreResult.necropsies];
        },
      });
    },
    next(): void {
      this.page++;
      this.$apollo.queries.necropsies.fetchMore({
        variables: {
          limit: pageSize,
          offset: this.page,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          return [...previousResult.necropsies, ...fetchMoreResult.necropsies];
        },
      });
    },
  },
  head: {
    title: "Necropsias",
  },
});
</script>
