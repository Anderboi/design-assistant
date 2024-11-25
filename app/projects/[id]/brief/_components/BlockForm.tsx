'use client'
import React, { useState } from 'react'

function BlockForm({
  fields,
  onSave,
}: {
  fields: any[];
  onSave: (fields: any[]) => void;
}) {
  const [updatedFields, setUpdatedFields] = useState(fields);

  const handleChange = (id: string, value: string) => {
    setUpdatedFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    );
  };
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(updatedFields);
      }}
    >
      {updatedFields.map((field) => (
        <div key={field.id}>
          <label>{field.field_name}</label>
          <input
            type="text"
            value={field.value || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Сохранить</button>
    </form>
  );
}

export default BlockForm