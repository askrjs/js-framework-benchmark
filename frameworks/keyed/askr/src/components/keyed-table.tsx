import { For, type State } from "@askrjs/askr";

import { KeyedRow } from "./keyed-row";
import type { RowData } from "../benchmark-types";

interface KeyedTableProps {
  rows: State<RowData[]>;
  isSelected: (id: number) => boolean;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

export function KeyedTable({ rows, isSelected, onSelect, onRemove }: KeyedTableProps) {
  return (
    <table class="table table-hover table-striped test-data">
      <tbody>
        {For(
          () => rows(),
          (item) => item.id,
          (item) => <KeyedRow item={item} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} />
        )}
      </tbody>
    </table>
  );
}

