<template>
  <div>
    <h1 class="title">Biopsias</h1>

    <Table :items-count="count" :items="biopsies" :headers="headers" url-name="biopsies" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import biopsiesQuery from "@/graphql/biopsies.query.gql";

const limit = 6;

export default Vue.extend({
  data() {
    return {
      count: 0,
      biopsies: [],
      headers: [
        { text: "\u2116", value: "number" },
        { text: "Muestra", value: "sample" },
        { text: "Fecha de entrada", value: "entry_date" },
        { text: "Paciente", value: "patient.full_name" }
      ]
    };
  },
  computed: {
    offset() {
      const page = parseInt(this.$route.query.page, 10);
      return page ? (page - 1) * limit : 0;
    }
  },
  apollo: {
    biopsies: {
      query: biopsiesQuery,
      variables() {
        return {
          limit,
          offset: this.offset
        };
      },
      update(data) {
        this.count = data.biopsies_aggregate.aggregate.count;
        return data.biopsies;
      }
    }
  },
  methods: {
    pagination(): () => {} {
      return () =>
        this.$apollo.queries.biopsies.setVariables({
          limit,
          offset: this.offset
        });
    }
  },
  head: {
    title: "Biopsias"
  }
});
</script>
