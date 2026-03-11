import { For, type State } from "@askrjs/askr";

import { renderKeyedRow } from "./keyed-row";
import type { RowData } from "../benchmark-types";

export function renderKeyedTable(
  rows: State<RowData[]>,
  selectedId: State<number | null>,
  onSelect: (id: number) => void,
  onRemove: (id: number) => void
) {
  return {
    type: "table",
    props: { class: "table table-hover table-striped test-data" },
    children: [
      {
        type: "tbody",
        props: {},
        children: [
          For(
            () => rows(),
            (item) => item.id,
            (item) => renderKeyedRow(item, selectedId() === item.id, onSelect, onRemove)
          ),
        ],
      },
    ],
  };
}
