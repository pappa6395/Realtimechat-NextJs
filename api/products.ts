// ✅ Client-side code (remove "use server")
export type Product = {
    id: string; // Unique ID for product
    price: number;
    quantity: number;
    category?: string; // Optional field
};

// LocalStorage Key
const STORAGE_KEY = "products";

// Helper function to get products from LocalStorage
const getProducts = (): Product[] => {
    if (typeof window === "undefined") return [];
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
};

// Function to save products back to LocalStorage
const saveProducts = (products: Product[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Create Product
export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    
    const products = getProducts();
    const newProduct: Product = { id: crypto.randomUUID(), ...product };
    products.push(newProduct);
    saveProducts(products);
    console.log("Product added:", newProduct);
    return newProduct;
};

// Read All Products
export const getAllProducts = async (): Promise<Product[]> => getProducts();


// Update Product
export const updateProduct = async (id: string, updatedFields: Partial<Omit<Product, "id">>): Promise<Product | null> => {
    let products = getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        saveProducts(products);
        return products[index];
    }
    return null;
};

//Delete Product
export const deleteProduct = async (id: string): Promise<boolean> => {
    let products = getProducts();
    const filteredProducts = products.filter((p) => p.id !== id);

    if (filteredProducts.length !== products.length) {
        saveProducts(filteredProducts);
        return true;
    }

    return false;
};