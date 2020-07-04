<template>
  <div class="w-full">
    <div class="-my-2 py-2 max-w-sm">
      <FormulateForm
        v-model="patient"
        :schema="schema"
        @submit="updatePatient"
      />
    </div>
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

export default Vue.extend({
  data() {
    return {
      patient: {},
      municipalities: [],
    };
  },
  computed: {
    schema() {
      return [
        {
          component: "h3",
          class: "text-2xl text-gray-700 mb-4",
          children: "Editar paciente",
        },
        {
          type: "number",
          label: "No de identidad",
          name: "identifier",
          validation: "max:11,length|min:11,length",
        },
        {
          component: "div",
          class: "flex",
          children: [
            {
              type: "text",
              label: "Nombre",
              name: "first_name",
              "outer-class": ["w-1/2 mr-1"],
            },
            {
              type: "text",
              label: "Apellidos",
              name: "last_name",
              "outer-class": ["w-1/2 ml-1"],
            },
          ],
        },
        { type: "date", label: "Fecha de nacimiento", name: "birthdate" },
        {
          type: "radio",
          label: "Sexo",
          name: "gender_id",
          options: {
            male: "Masculino",
            female: "Femenino",
          },
          "element-class": ["flex"],
        },
        { type: "textarea", label: "Dirección", name: "address" },
        {
          type: "select",
          label: "Municipio",
          name: "municipality_id",
          // @ts-ignore
          options: this.mOptions,
        },
        { type: "submit", label: "Guardar", "outer-class": ["float-right"] },
      ];
    },
    mOptions(): {} {
      if (this.$apollo.loading) {
        return {};
      }

      return this.municipalities.map((m: any) => ({
        value: m.code,
        label: `${m.name}, ${m.province.name}`,
      }));
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
});
</script>
