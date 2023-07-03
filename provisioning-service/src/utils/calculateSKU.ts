const calculateSKU = (id: number, categoryId: number): number => {
  const sku = `${id}${categoryId}`;
  console.log(id, categoryId);
  return parseInt(sku);
};

export { calculateSKU };
