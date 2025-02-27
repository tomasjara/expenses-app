export const formatMoney = (valueString) => {
  let numero = parseFloat(valueString);

  if (numero < 0) {
    const numberResult = numero * -1;
    let formatoCLP = numberResult.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
    return "-" + formatoCLP.replace("CLP", "").trim().replace(/^\$/, "$");
  }

  let formatoCLP = numero.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });
  return formatoCLP.replace("CLP", "").trim().replace(/^\$/, "$");
};
