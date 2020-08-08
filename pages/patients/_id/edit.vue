<template>
  <div class="w-full">
    <FormulateForm
      v-if="!$apollo.loading"
      v-model="patient"
      :schema="schema"
      @submit="updatePatient"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import omit from "lodash/omit";
import findIndex from "lodash/findIndex";
import municipalitiesQuery from "@/graphql/municipalities.query.gql";
import patientById from "@/graphql/patientById.query.gql";
import patientsQuery from "@/graphql/patients.query.gql";
import updatePatientMutation from "@/graphql/updatePatient.mutation.gql";
import patientSchema from "@/components/forms/patient";

export default Vue.extend({
  data() {
    return {
      patient: {},
      municipalities: [],
    };
  },
  computed: {
    schema() {
      return patientSchema(
        "Editar paciente",
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
    patient: {
      query: patientById,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update: (data) => omit(data.patients[0], "__typename"),
    },
  },
  methods: {
    updatePatient() {
      this.$apollo
        .mutate({
          mutation: updatePatientMutation,
          variables: {
            id: this.$route.params.id,
            patient: this.patient,
          },
          // eslint-disable-next-line camelcase
          update: (store, { data: { update_patients } }) => {
            const data: any = store.readQuery({ query: patientsQuery });
            const index = findIndex(data.patients, {
              id: this.$route.params.id,
            });

            // Vue.set(data.patients, index, update_patients.returning);
            data.patients[index] = update_patients.returning;

            store.writeQuery({ query: patientsQuery, data });
          },
        })
        .then(() => {
          this.$router.push({ name: "patients" });
        });
    },
    deletePatient() {
      console.log("Delete");
    },
  },
  head() {
    return {
      title: "Editar Paciente",
    };
  },
});
</script>
