export const generateBookCode = () => {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4); // 4 karakter berbasis waktu
  const randomStr = Math.random().toString(36).toUpperCase().substring(2, 6); // 4 karakter acak
  return `BK-${timestamp}-${randomStr}`; // Contoh hasil: BK-K8X2-9F4D
};
