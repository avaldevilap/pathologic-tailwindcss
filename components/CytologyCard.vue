<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div
      class="border border-gray-400 lg:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal"
    >
      <div class="mb-8">
        <p class="text-sm text-gray-600 flex items-center">
          {{ cytology.entry_date }}
        </p>
        <div class="text-gray-900 font-bold text-xl mb-2">
          {{ cytology.sample }}
        </div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="flex items-center">
        <img
          class="w-10 h-10 rounded-full mr-4"
          src="/img/jonathan.jpg"
          alt="Avatar of Jonathan Reinink"
        />
        <div class="text-sm">
          <p class="text-gray-900 leading-none">Jonathan Reinink</p>
          <p class="text-gray-600">Aug 18</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    cytology: {
      type: Object,
      required: true,
    },
  },
});
</script>
