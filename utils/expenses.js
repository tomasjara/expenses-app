export const formatExpensesForCalc = (expenses) => {
  return expenses.map((expense) => ({
    ...expense,
    value: Number(expense.value),
  }));
};