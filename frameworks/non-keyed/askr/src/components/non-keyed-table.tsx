import { type State } from "@askrjs/askr";
import { For } from "@askrjs/askr/control";

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
        <For each={() => rows()} byIndex>
          {(item) => <NonKeyedRow item={item} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} />}
        </For>
      </tbody>
    </table>
  );
}
