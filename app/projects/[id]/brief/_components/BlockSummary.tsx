import React from 'react'

function BlockSummary({
  fields,
  onEdit,
}: {
  fields: any[];
  onEdit: () => void;
}) {
  return (
    <div>
      {fields.map((field) => (
        <div key={field.id}>
          <strong>{field.field_name}:</strong> {field.value || "—"}
        </div>
      ))}
      <button onClick={onEdit}>Редактировать</button>
    </div>
  );
}

export default BlockSummary