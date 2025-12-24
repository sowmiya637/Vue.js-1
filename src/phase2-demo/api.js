export async function fetchProducts() {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 }
  ];
}
