"use client";

import { fetchBlockFields } from "@/app/actions/actions";
import React, { useEffect, useState } from "react";
import BlockForm from "./BlockForm";
import BlockSummary from "./BlockSummary";
import { createClient } from "@/utils/supabase/client";

function StageBlock({
  blockId,
  blockName,
  isFilled,
}: {
  blockId: string;
  blockName: string;
  isFilled: boolean;
}) {
  const [fields, setFields] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(!isFilled);

  useEffect(() => {
    async function loadFields() {
      if (isFilled) {
        const fetchedFields = await fetchBlockFields(blockId);
        setFields(fetchedFields);
      }
    }
    loadFields();
  }, [isFilled, blockId]);

  const handleSave = async (updatedFields: any) => {
    const supabase = createClient();
    // Сохранение данных в Supabase
    await Promise.all(
      updatedFields.map(async (field: any) => {
        await supabase
          .from("block_fields")
          .update({ value: field.value })
          .eq("id", field.id);
      }),
    ); // Обновляем статус блока
    await supabase
      .from("stage_blocks")
      .update({ is_filled: true })
      .eq("id", blockId);

    setIsEditing(false);
  };

  return (
    <div>
      <h3>{blockName}</h3>
      {isEditing ? (
        <BlockForm fields={fields} onSave={handleSave} />
      ) : (
        <BlockSummary fields={fields} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}

export default StageBlock;
