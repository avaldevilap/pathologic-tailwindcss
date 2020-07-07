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

export default Vue.extend({
  data() {
    return {
      patient: { municipality_id: 3206 },
      municipalities: [],
    };
  },
  computed: {
    schema() {
      return [
        {
          component: "h3",
          class: "text-2xl text-gray-700 mb-4",
          children: "Añadir paciente",
        },
        {
          type: "number",
          label: "\u2116 de identidad",
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
        { type: "submit", label: "Añadir", "outer-class": ["float-right"] },
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
  head: {
    title: "Añadir Paciente",
  },
});
</script>
