import { type State } from "@askrjs/askr";
import { For } from "@askrjs/askr/control";

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
        <For each={() => rows()} by={(item) => item.id}>
          {(item) => <KeyedRow item={item} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} />}
        </For>
      </tbody>
    </table>
  );
}

