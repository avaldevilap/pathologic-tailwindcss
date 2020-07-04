import Vue from "vue";
// @ts-ignore
import VueFormulate from "@braid/vue-formulate";
// @ts-ignore
import { es } from "@braid/vue-formulate-i18n";

interface VueFormulateContext {
  hasValue: boolean;
  isGrouped: boolean;
  classification: "text" | "group" | "select" | "box";
}

Vue.use(VueFormulate, {
  plugins: [es],
  locale: "es",
  classes: {
    outer: ({ isGrouped }: VueFormulateContext) => {
      return isGrouped ? "mb-1" : "mb-4";
    },
    wrapper: ({ classification }: VueFormulateContext) => {
      switch (classification) {
        case "box":
          return "flex";

        default:
          return "";
      }
    },
    element: ({ classification, hasValue }: VueFormulateContext) => {
      switch (classification) {
        case "group":
          return "mt-2";
        case "select":
          return !hasValue ? "text-gray-500 font-light" : "";

        default:
          return "";
      }
    },
    input(context: any) {
      switch (context.classification) {
        case "button":
          return "px-4 py-2 rounded bg-teal-500 text-white font-bold hover:bg-teal-600";
        case "group":
          return "";
        case "box":
          return "sr-only";

        default:
          return "border border-gray-400 rounded px-3 py-2 leading-none focus:border-teal-500 outline-none border-box w-full mb-1";
      }
    },
    decorator: ({ hasValue }: VueFormulateContext) => {
      let base = "border rounded inline-block w-4 h-4 mr-2";
      if (hasValue) {
        base += " bg-teal-600";
      }
      return base;
    },
    label: "block text-gray-700 text-sm font-bold mb-2",
    help: "text-xs mb-1 text-gray-600",
    error: "text-red-700 text-xs mb-1",
  },
});
