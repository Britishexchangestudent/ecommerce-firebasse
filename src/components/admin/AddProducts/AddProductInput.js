import React from "react";

function AddProductInput({ title, type, name, value, onChange }) {
  return (
    <div className="sm:col-span-6">
      <p className="block text-sm font-medium">{title}</p>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="add-product-input"
      />
    </div>
  );
}

export default AddProductInput;
