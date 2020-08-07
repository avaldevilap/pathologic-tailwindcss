<template>
  <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <nuxt-link
      class="fixed bottom-0 right-0 mr-4 mb-4 flex items-center btn btn-primary shadow-lg lg:invisible"
      :to="{ name: `${urlName}-add` }"
    >
      <svg class="fill-current w-4 h-4" viewBox="0 0 20 20">
        <path
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        />
      </svg>
      <span class="ml-1">Añadir</span>
    </nuxt-link>
    <div
      class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.value"
              class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header.text }}
            </th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-100">
              <nuxt-link
                class="invisible btn btn-primary btn-small float-right lg:visible"
                :to="{ name: `${urlName}-add` }"
              >
                Añadir
              </nuxt-link>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, index) in items" :key="item.id">
            <td
              v-for="h in headers"
              :key="h.value"
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
            >
              <div class="flex items-center">
                <div class="text-sm leading-5 font-medium text-gray-900">
                  {{ map(items, property(h.value))[index] }}
                </div>
              </div>
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
            >
              <nuxt-link
                :to="`/${urlName}/${item.id}/edit`"
                class="text-teal-600 hover:text-teal-900"
              >
                Editar
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center items-center my-2">
        <button
          :class="{ 'btn-disabled': prevDisabled }"
          class="btn btn-secondary mr-5"
          :disabled="prevDisabled"
          @click="onPrev"
        >
          Anterior
        </button>
        <button
          :class="{ 'btn-disabled': nextDisabled }"
          class="btn btn-secondary"
          :disabled="nextDisabled"
          @click="onNext"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import map from "lodash/map";
import property from "lodash/property";

export default Vue.extend({
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    urlName: {
      type: String,
      required: true,
    },
    prevDisabled: {
      type: [Boolean, Number],
      default: false,
    },
    nextDisabled: {
      type: [Boolean, Number],
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    map,
    property,
    onPrev(): void {
      const page = parseInt(this.$route.query.page, 10);
      this.$router.push({ query: { page: page - 1 } });
      this.$emit("on-change");
    },
    onNext(): void {
      const page = parseInt(this.$route.query.page, 10);
      this.$router.push({ query: { page: page + 1 } });
      this.$emit("on-change");
    },
  },
});
</script>
