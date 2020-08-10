<template>
  <div class="w-full">
    <div class="-my-2 py-2 max-w-sm">
      <FormulateForm v-model="biopsy" :schema="schema" @submit="updatePatient" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import findIndex from "lodash/findIndex";
import biopsySchema from "@/components/forms/biopsy";
import biopsyById from "@/graphql/queries/getBiopsyById.gql";

export default Vue.extend({
  data() {
    return {
      biopsy: {}
    };
  },
  computed: {
    schema() {
      return biopsySchema("Editar biopsia");
    }
  },
  apollo: {
    biopsy: {
      query: biopsyById,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  methods: {
    updatePatient() {
      //this.$apollo
      //.mutate({
      //mutation: updatePatientMutation,
      //variables: {
      //id: this.$route.params.id,
      //patient: this.patient,
      //},
      // eslint-disable-next-line camelcase
      //update: (store, { data: { update_patients } }) => {
      //const data: any = store.readQuery({ query: patientsQuery });
      //const index = findIndex(data.patients, {
      //id: this.$route.params.id,
      //});
      // Vue.set(data.patients, index, update_patients.returning);
      //data.patients[index] = update_patients.returning;
      //store.writeQuery({ query: patientsQuery, data });
      //},
      //})
      //.then(() => {
      //this.$router.push({ name: "patients" });
      //});
    }
  },
  head() {
    return {
      title: "Editar biopsia"
    };
  }
});
</script>
