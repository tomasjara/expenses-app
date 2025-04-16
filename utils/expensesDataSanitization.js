// Funcion temporal

export const expensesDataSanitization = (expenses) => {
  return expenses.map((expense) => {
    const { category, paymentMethod, ...rest } = expense;
    return rest; 
  });
};
