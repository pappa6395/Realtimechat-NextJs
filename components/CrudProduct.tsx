"use client"

import React, { useEffect, useState } from "react";
import { addProduct, updateProduct, deleteProduct, Product } from "@/api/products";

const CrudProduct: React.FC = () => {

    
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Fetch products from localStorage on component mount
  useEffect(() => {
    const fetchProducts = () => {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("products");
        if (storedData) {
          const parsedData: Product[] = JSON.parse(storedData);
          setAllProducts(parsedData);
        }
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const newProduct = await addProduct({ price: 500, quantity: 2, category: "Electronics" });
    setAllProducts(allProducts); // Refresh list
    console.log("Added Product:", newProduct);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };

  const handleUpdateProduct = async (id: string) => {
    const updatedProduct = await updateProduct(id, { price: 600, quantity: 3 });
    if (updatedProduct) {
      setAllProducts(allProducts);
      console.log("Updated Product:", updatedProduct);
    }
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };

  const handleDeleteProduct = async (id: string) => {
    if (await deleteProduct(id)) {
      setAllProducts(allProducts);
      console.log("Deleted Product:", id);
    }
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Product Manager</h2>
      <button onClick={handleAddProduct} className="px-4 py-2 bg-blue-500 text-white rounded">Add Product</button>
      <ul className="mt-4">
        {allProducts.map((product) => (
          <li key={product.id} className="border-b p-2">
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Category:</strong> {product.category || "None"}</p>
            <button onClick={() => handleUpdateProduct(product.id)} className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">Update</button>
            <button onClick={() => handleDeleteProduct(product.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudProduct;
