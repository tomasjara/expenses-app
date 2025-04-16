export const EXPENSES_DATA = {
  // Dar 2 alternativas borrar la cuenta y todas las transacciones o eliminar la cuenta de la lista pero mantener las transacciones con el registro de esa cuenta
  paymentMethods: [
    {
      id: "f739c40d-3545-40e4-aaf7-83b875c122bb",
      name: "Principal",
      description: "Change data",
      color: "",
    },
  ],
  // Eliminar la categoria, todos ira a la categoria 'Otros' (categoria vacia o una asignada automaticamente)
  catagories: [
    {
      id: "18a9a02a-fc75-4766-a7f2-2359267a69a0",
      name: "Otro",
      description: "",
      color: "",
    },
  ],
  expenses: [
    {
      id: "15c2ac88-3764-4a67-a8e6-34e0ca1fa11c",
      value: "",
      description: "",
      categoryId: '',
      paymentmethodId: '',
      category: null,
      paymentMethod: null ,
      creationDate: "",
      paymentDate: "",
      lastModificationDate: "",
    },
  ],
};