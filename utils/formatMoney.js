export const formatMoney = (valueString) => {
    let numero = parseFloat(valueString);
    let formatoCLP = numero.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    });
    return formatoCLP.replace('CLP', '').trim().replace(/^\$/, '$');
};
