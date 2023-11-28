// AddCategory.js
import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');

    const handleAddCategory = () => {
        axios.post('http://localhost:8000/categories/', {
            name,
        })
        .then(response => {
            console.log('Category added successfully:', response.data);
            // Optionally, you can update the UI to include the new category
        })
        .catch(error => console.error('Error adding category:', error));
    };

    return (
        <div>
            <h2>Add Category</h2>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <button onClick={handleAddCategory}>Add Category</button>
        </div>
    );
};

export default AddCategory;
