// AddProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    const handleAddProduct = () => {
        // Validate that required fields are not empty
        if (!name || !category || !price) {
            setError('Name, category, and price are required fields.');
            return;
        }

        // Prepare the data to be sent in the request
        const productData = {
            name,
            description,
            category: { name: category },  // Send category as an object with name field
            price,
        };

        // Send a POST request to add the product
        axios.post('http://localhost:8000/products/', productData)
            .then(response => {
                console.log('Product added successfully:', response.data);
                // Optionally, you can fetch the updated product list
                // to refresh the UI after adding a new product
            })
            .catch(error => {
                console.error('Error adding product:', error);
                setError('An error occurred while adding the product.');
            });
    };

    useEffect(() => {
        // Fetch categories for dropdown
        axios.get('http://localhost:8000/categories/')
            .then(response => {
                // Assuming the response.data is an array of categories
                // Adjust this based on your actual API response
                setCategories(response.data);
                // Set the default category value if not already set
                if (!category && response.data.length > 0) {
                    setCategory(response.data[0].name);  // Assuming 'name' is the category field
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, [category]); // Add category to dependencies to prevent unnecessary re-renders

    return (
        <div>
            <h2>Add Product</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <label>
                Category:
                {/* Render the categories dropdown */}
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Price:
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default AddProduct;
