export const isValidValue = (value, type) => {
  if (type === "password" && value.length < 8) return 0;
  if (
    type === "email" &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  )
    return 0;

  if (!value.replace(/[ \t]+/g, " ")) return 0;
  return 1;
};
