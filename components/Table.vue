<template>
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
              class="btn btn-primary btn-small float-right"
              :to="{ name: addUrlName }"
            >
              Añadir
            </nuxt-link>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="item in items" :key="item.id">
          <td
            v-for="h in headers"
            :key="h.value"
            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
          >
            <div class="flex items-center">
              <div class="text-sm leading-5 font-medium text-gray-900">
                {{ item[h.value] }}
              </div>
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
          >
            <!-- <nuxt-link
              :to="`/patients/${patient.id}/edit`"
              class="text-indigo-600 hover:text-indigo-900"
            > -->
            Editar
            <!-- </nuxt-link> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
    addUrlName: {
      type: String,
      required: true,
    },
  },
});
</script>
