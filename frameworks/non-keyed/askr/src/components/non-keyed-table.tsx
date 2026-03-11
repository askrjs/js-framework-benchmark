import type { State } from "@askrjs/askr";

import type { RowData } from "../benchmark-types";
import { NonKeyedRow } from "./non-keyed-row";

export function renderNonKeyedTable(
  rows: State<RowData[]>,
  selectedId: State<number | null>,
  onSelect: (id: number) => void,
  onRemove: (id: number) => void
) {
  return (
    <table class="table table-hover table-striped test-data">
      <tbody>
        {rows().map((item) => (
          <NonKeyedRow
            item={item}
            selected={selectedId() === item.id}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </tbody>
    </table>
  );
}
