<template>
  <div class="w-full">
    <div class="-my-2 py-2 max-w-sm">
      <FormulateForm
        v-model="patient"
        :schema="schema"
        @submit="createPatient"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import municipalitiesQuery from "@/graphql/municipalities.query.gql";
import createPatientMutation from "@/graphql/createPatient.mutation.gql";
import patientsQuery from "@/graphql/patients.query.gql";
import patientSchema from "@/components/forms/patient";

export default Vue.extend({
  data() {
    return {
      patient: { municipality_id: 3206 },
      municipalities: [],
    };
  },
  computed: {
    schema() {
      return patientSchema(
        "Añadir paciente",
        this.municipalities.map((m: any) => ({
          value: m.code,
          label: `${m.name}, ${m.province.name}`,
        }))
      );
    },
  },
  apollo: {
    municipalities: {
      query: municipalitiesQuery,
    },
  },
  methods: {
    createPatient() {
      this.$apollo
        .mutate({
          mutation: createPatientMutation,
          variables: { patient: this.patient },
          // eslint-disable-next-line camelcase
          update: (store, { data: { insert_patients_one } }) => {
            const data: any = store.readQuery({ query: patientsQuery });

            data.patients.push(insert_patients_one);

            store.writeQuery({ query: insert_patients_one, data });
          },
        })
        .then(() => {
          this.$router.push({ name: "patients" });
        });
    },
  },
  head() {
    return {
      title: "Añadir Paciente",
    };
  },
});
</script>
