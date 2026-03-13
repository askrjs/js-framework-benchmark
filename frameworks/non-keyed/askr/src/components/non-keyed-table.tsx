import { type State } from "@askrjs/askr";

import type { RowData } from "../benchmark-types";
import { NonKeyedRow } from "./non-keyed-row";

interface NonKeyedTableProps {
  rows: State<RowData[]>;
  isSelected: (id: number) => boolean;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

export function NonKeyedTable({ rows, isSelected, onSelect, onRemove }: NonKeyedTableProps) {
  return (
    <table class="table table-hover table-striped test-data">
      <tbody>
        {rows().map((item) => (
          <NonKeyedRow item={item} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} />
        ))}
      </tbody>
    </table>
  );
}
