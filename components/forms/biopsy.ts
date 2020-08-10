export default (title: string, options?: {}) => {
  return [
    {
      component: "h3",
      class: "title",
      children: title
    },
    {
      component: "div",
      class: "max-w-sm mt-4 bg-white p-5 rounded shadow",
      children: [
        { type: "text", name: "number", label: "\u2116 de biopsia" },
        { type: "text", name: "sample", label: "Muestra" },
        { type: "select", name: "patient_id", label: "Paciente", options },
        {
          type: "date",
          name: "entry_date",
          label: "Fecha de entrada",
          "input-class": ["text-gray-600"]
        },
        {
          type: "date",
          name: "microscopic_date",
          label: "Fecha de estudio microscópico",
          "input-class": ["text-gray-600"]
        },
        {
          type: "date",
          name: "macroscopic_date",
          label: "Fecha de estudio macroscópico",
          "input-class": ["text-gray-600"]
        },
        {
          type: "select",
          name: "service",
          label: "Servicio",
          options: { oncology: "Oncología" },
          "input-class": ["text-gray-600"]
        },
        {
          type: "textarea",
          name: "clinical_diagnosis",
          label: "Diagnóstico clínico"
        },
        {
          type: "textarea",
          name: "macroscopic_description",
          label: "Descripción macroscópica"
        },
        {
          type: "textarea",
          name: "microscopic_description",
          label: "Descripción microscópica"
        },
        {
          type: "textarea",
          name: "anatomopathological_report",
          label: "Reporte anatomopatológico"
        },
        {
          component: "div",
          class: "flex justify-end mt-8",
          children: [{ type: "submit", label: "Guardar" }]
        }
      ]
    }
  ];
};
