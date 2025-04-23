
## 📁 Archivo: `expensesStore.js`

Este archivo define un *store* usando [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) con middleware para:

* Persistencia (`persist`)
* Suscripciones por selector (`subscribeWithSelector`)
* Almacenamiento en `AsyncStorage` (ideal para apps en React Native)

---

## 📌 Estructura General

```js
export const useExpensesStore = create(
  persist(
    subscribeWithSelector((set, get) => ({ ...storeDefinition })),
    { name: "expenses-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);
```

### 🧠 Middleware Utilizados

* `persist`: guarda automáticamente los datos en `AsyncStorage`.
* `subscribeWithSelector`: permite suscribirse a cambios de partes específicas del estado para ejecutar efectos secundarios.

---

## ✅ Estado Inicial

### Hidratación

```js
_hasHydrated: false
setHasHydrated: (state) => ...
```

Marca cuando el estado ha sido hidratado desde el almacenamiento persistente.

---

## 💸 Gastos (`expenses`)

```js
expenses: []
addExpense(newExpense)
updateExpense(newObject)
setExpenses(newExpenses)
removeExpense(idExpense)
cleanExpensesState()
```

Maneja una lista de objetos de gasto. Cada objeto puede contener campos como `id`, `valor`, `descripción`, `categoryId`, `paymentMethodId`, etc.

---

## 🔄 Relación de gastos (`expensesWithRelations`)

```js
expensesWithRelations: []
setExpensesWithRelations()
getExpensesWithRelations()
```

Genera una versión enriquecida de los gastos, vinculándolos con su categoría y método de pago correspondientes.

> ⚠️ Esta función se ejecuta automáticamente cada vez que se actualizan `expenses`, `categories` o `paymentMethods` gracias a las suscripciones al final del archivo.

---

## 🗂️ Categorías (`categories`)

```js
categories: [
  { id: ..., name: "Sin categoría", color: "#f25c00" }
]
addCategory(newCategory)
updateCategory(newObject)
disableCategory(idCategory)
removeCategory(idCategory)
```

Permite agregar, actualizar, deshabilitar o eliminar categorías de gasto. `disableCategory` no está implementado correctamente (ver más abajo).

---

## 💳 Métodos de pago (`paymentMethods`)

```js
paymentMethods: [
  { id: ..., name: "Sin especificar", color: "#4897d8" }
]
addPaymentMethod(newPaymentMethod)
updatePaymentMethod(newObject)
removePaymentMethod(idPaymentMethod)
```

Manejo de los métodos de pago disponibles para los gastos.

---

## 🧼 Limpieza total (`cleanAllData`)

```js
cleanAllData()
```

Restaura `expenses`, `categories` y `paymentMethods` a un estado inicial básico con valores por defecto.

---

## 🧾 Modal para actualizar/crear gasto

```js
modalUpdateCreateExpense: { show: false }
setModalUpdateCreateExpense(newState)
```

Controla la visibilidad y contenido del modal para editar o crear un gasto.

---

## 🔁 Suscripciones automáticas

```js
useExpensesStore.subscribe(state => state.expenses, ...)
useExpensesStore.subscribe(state => state.categories, ...)
useExpensesStore.subscribe(state => state.paymentMethods, ...)
```

Cada vez que se modifica `expenses`, `categories` o `paymentMethods`, se actualiza `expensesWithRelations` automáticamente.

---

## ⚠️ Posibles Mejoras o Errores

* `disableCategory(idCategory)`:

  ```js
  const categoryFind = state.categories.find((category) => category.id !== idCategory)
  ```

  Este `find` está mal usado, deberías usar `category.id === idCategory`.

  Luego, reemplazar la categoría original por su versión `disabled`, no concatenarla como hiciste:

  ```js
  const updatedCategories = state.categories.map(category =>
    category.id === idCategory ? { ...category, disabled: true } : category
  );
  return { categories: updatedCategories };
  ```

---

¿Te gustaría que esta documentación te la genere como archivo `README.md` o integrada como comentarios dentro del código fuente?

## ⚠️ Posibles mejoras y observaciones

1. **`disableCategory`** :

* Tiene un bug que agrega arrays anidados.
* Requiere corregir el filtrado y reemplazo adecuado.

2. **Optimización** :

* Podrías usar `immer` para manejar el estado de manera más segura con estructuras complejas.

3. **Tipos** :

* Agregar interfaces para `Expense`, `Category`, y `PaymentMethod` mejoraría claridad y mantenibilidad.
