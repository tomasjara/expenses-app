export interface Expense {
  id: string;
  categoryId: string;
  creationDate: string; // ISO 8601 date
  lastModificationDate: string; // ISO 8601 date
  paymentDate: string; // ISO 8601 date
  paymentMethodId: string;
  value: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description?: string;
  disabled?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  color: string;
  description?: string;
}

const expensesWithRelations_MOCK = [
  {
    value: "15000",
    description: "descripión de prueba",
    id: "7777e2a8-6008-4454-9c1f-51c435f57c33",
    paymentDate: "2025-04-23T01:24:06.369Z",
    creationDate: "2025-04-23T01:24:10.853Z",
    lastModificationDate: "2025-04-23T01:41:54.908Z",
    paymentMethodId: "f739c40d-3545-40e4-aaf7-83b875c122bb",
    categoryId: "18a9a02a-fc75-4766-a7f2-2359267a69a0",
    category: {
      id: "18a9a02a-fc75-4766-a7f2-2359267a69a0",
      name: "Sin categoría",
      color: "#f25c00",
    },
    paymentMethod: {
      id: "f739c40d-3545-40e4-aaf7-83b875c122bb",
      name: "Sin especificar",
      description: "",
      color: "#4897d8",
    },
  },
  {
    value: "500000000000000",
    description: "descripión de prueba",
    id: "266aeeac-b5c0-43d7-945b-35fa33c71f22",
    paymentDate: "2025-04-23T01:24:11.838Z",
    creationDate: "2025-04-23T01:24:17.754Z",
    lastModificationDate: "2025-04-23T01:42:08.275Z",
    paymentMethodId: "f739c40d-3545-40e4-aaf7-83b875c122bb",
    categoryId: "dc7861e0-51e7-4c74-af11-c68163d609b1",
    category: {
      id: "dc7861e0-51e7-4c74-af11-c68163d609b1",
      name: "Hdjd7hct7x7tx8ycy8c8yc8y 8hv8yc8yc",
      description: "",
      color: "#486b00",
      disabled: false,
    },
    paymentMethod: {
      id: "f739c40d-3545-40e4-aaf7-83b875c122bb",
      name: "Sin especificar",
      description: "",
      color: "#4897d8",
    },
  },
];
