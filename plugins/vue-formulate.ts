import Vue from "vue";
// @ts-ignore
import VueFormulate from "@braid/vue-formulate";
// @ts-ignore
import { es } from "@braid/vue-formulate-i18n";

Vue.use(VueFormulate, {
  plugins: [es],
  locale: "es",
  classes: {
    outer: "mb-4",
    input(context: any) {
      switch (context.classification) {
        case "button":
          return "px-4 py-2 rounded bg-teal-500 text-white font-bold hover:bg-teal-600";

        default:
          return "border border-gray-400 rounded px-3 py-2 leading-none focus:border-teal-500 outline-none border-box w-full mb-1";
      }
    },
    label: "block text-gray-700 text-sm font-bold mb-2",
    help: "text-xs mb-1 text-gray-600",
    error: "text-red-700 text-xs mb-1",
  },
});
