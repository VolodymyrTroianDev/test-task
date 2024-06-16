export const getItem = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (e) {
    return null;
  }
};

export const setItem = (key: string, item: unknown) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
