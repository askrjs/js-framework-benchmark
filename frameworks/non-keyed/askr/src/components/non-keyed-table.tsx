import type { State } from "@askrjs/askr";

import type { RowData } from "../benchmark-types";
import { NonKeyedRow } from "./non-keyed-row";

interface NonKeyedTableProps {
  rows: State<RowData[]>;
  selectedId: State<number | null>;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

export function NonKeyedTable({ rows, selectedId, onSelect, onRemove }: NonKeyedTableProps) {
  return (
    <table class="table table-hover table-striped test-data">
      <tbody>
        {rows().map((item) => (
          <NonKeyedRow
            item={item}
            isSelected={selectedId() === item.id}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </tbody>
    </table>
  );
}
