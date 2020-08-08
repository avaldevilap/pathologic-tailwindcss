import Vue from "vue";
// @ts-ignore
import VueFormulate from "@braid/vue-formulate";
// @ts-ignore
import { es } from "@braid/vue-formulate-i18n";

interface VueFormulateContext {
  hasValue: boolean;
  isGrouped: boolean;
  classification: "text" | "group" | "select" | "box" | "button";
}

Vue.use(VueFormulate, {
  plugins: [es],
  locale: "es",
  classes: {
    outer: ({ classification }: VueFormulateContext) => {
      switch (classification) {
        case "box":
          return "mb-1";
        case "button":
          return "";
        default:
          return "mb-4";
      }
    },
    wrapper: ({ classification }: VueFormulateContext) => {
      switch (classification) {
        case "box":
          return "inline-flex items-center";
        case "group":
          return "";

        default:
          return "";
      }
    },
    element: ({ classification }: VueFormulateContext) => {
      switch (classification) {
        case "box":
          return "";

        default:
          return "mt-2";
      }
    },
    input(context: any) {
      const base = " block w-full sm:text-sm sm:leading-5";

      switch (context.classification) {
        case "button":
          return "btn btn-primary";
        case "submit":
          return "btn btn-primary";
        case "group":
          return "";
        case "box":
          return "form-radio text-teal-500";
        case "select":
          return "form-select" + base;
        case "textarea":
          return "form-textarea" + base;

        default:
          return "form-input" + base;
      }
    },
    label({ classification }: VueFormulateContext) {
      const base = "block text-sm leading-5 font-medium text-gray-700";

      switch (classification) {
        case "box":
          return "ml-2 " + base;
        default:
          return base;
      }
    },
    help: "text-xs mb-1 text-gray-600",
    error: "text-red-700 text-xs mb-1",
  },
});
