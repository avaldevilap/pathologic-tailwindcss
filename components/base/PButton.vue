<template>
  <nuxt-link :to="to">
    <button class="btn btn-primary" v-bind="$attrs" v-on="$listeners">
      <span>
        <slot>{{ label }}</slot>
      </span>
    </button>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: "",
    },
    to: {
      type: [Object, String],
      default: "",
    },
  },
});
</script>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded inline-flex items-center;
}
.btn-primary {
  @apply bg-teal-500 text-white;
}
.btn-primary:hover {
  @apply bg-teal-600;
}
</style>
