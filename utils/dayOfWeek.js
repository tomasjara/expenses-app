const DAYS_NORMAL = {
  0: "Lunes",
  1: "Martes",
  2: "Miércoles",
  3: "Jueves",
  4: "Viernes",
  5: "Sábado",
  6: "Domingo",
};

const DAYS_SMALL = {
  0: "Lun",
  1: "Mar",
  2: "Mié",
  3: "Jue",
  4: "Vie",
  5: "Sáb",
  6: "Dom",
};

export const dayOfWeek = (type = "normal", number) => {
  if (type === "normal") return DAYS_NORMAL[number];
  if (type === "small") return DAYS_SMALL[number];
  return "";
};
