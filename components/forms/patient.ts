export default (title: string, options: {}) => {
  return [{
    component: "h3",
    class: "title",
    children: title,
  },
  {
    component: "div",
    class: "max-w-sm mt-4 bg-white p-5 rounded shadow",
    children: [
      {
        type: "number",
        label: "No de identidad",
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
        name: "gender",
        options: {
          male: "Masculino",
          female: "Femenino",
        },
      },
      { type: "textarea", label: "Dirección", name: "address" },
      {
        type: "select",
        label: "Municipio",
        name: "municipality_id",
        options,
      },
      {
        component: "div",
        class: "flex justify-end mt-8",
        children: [{ type: "submit", label: "Guardar" }],
      },
    ],
  },];
};