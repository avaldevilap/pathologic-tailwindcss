<template>
  <div :data-type="context.type" class="mt-2 relative">
    <input
      type="text"
      v-model="context.model"
      v-bind="context.attributes"
      autocomplete="off"
      @keydown.enter.prevent="context.model = selection.label"
      @keydown.down.prevent="increment"
      @keydown.up.prevent="decrement"
      @blur="context.blurHandler"
    />

    <div v-if="!$apollo.loading" class="absolute mt-1 w-full rounded-md bg-white shadow-lg">
      <ul
        v-if="patients.length"
        class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-patients"
      >
        <li
          v-for="(option, index) in patients"
          :key="option.value"
          v-text="option.label"
          :data-is-selected="selection && selection.value === option.value"
          role="option"
          class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
          @mouseenter="selectedIndex = index"
          @click="context.model = selection.label"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";

export default Vue.extend({
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedIndex: 0,
      patients: []
    };
  },
  watch: {
    model() {
      this.selectedIndex = 0;
    }
  },
  computed: {
    model() {
      return this.context.model;
    },
    selection() {
      if (this.patients[this.selectedIndex]) {
        return this.patients[this.selectedIndex];
      }
      return false;
    }
  },
  methods: {
    increment() {
      const length = this.patients.length;
      if (this.selectedIndex + 1 < length) {
        this.selectedIndex++;
      } else {
        this.selectedIndex = 0;
      }
    },
    decrement() {
      const length = this.patients.length;
      if (this.selectedIndex - 1 >= 0) {
        this.selectedIndex--;
      } else {
        this.selectedIndex = length - 1;
      }
    }
  },
  apollo: {
    patients: {
      query: gql`
        query PatientsAutocomplete($search: String) {
          patients(where: { _or: [{ first_name: { _ilike: $search } }, { last_name: { _ilike: $search } }] }) {
            value: id
            label: full_name
          }
        }
      `,
      variables() {
        //if (this.search !== "") {
        return {
          search: `%${this.model}%`
        };
        //}
        //return "";
      }
    }
  }
});
</script>
