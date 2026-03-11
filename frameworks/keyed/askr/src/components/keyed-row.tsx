import type { RowData } from "../benchmark-types";

function renderLabelCell(item: RowData, onSelect: (id: number) => void) {
  return {
    type: "td",
    props: { class: "col-md-4" },
    children: [
      {
        type: "a",
        props: {
          onClick: (event: MouseEvent) => {
            event.preventDefault();
            onSelect(item.id);
          },
        },
        children: [item.label],
      },
    ],
  };
}

function renderRemoveCell(item: RowData, onRemove: (id: number) => void) {
  return {
    type: "td",
    props: { class: "col-md-1" },
    children: [
      {
        type: "a",
        props: {
          onClick: (event: MouseEvent) => {
            event.preventDefault();
            onRemove(item.id);
          },
        },
        children: [
          {
            type: "span",
            props: {
              class: "glyphicon glyphicon-remove",
              "aria-hidden": "true",
            },
            children: [],
          },
        ],
      },
    ],
  };
}

export function renderKeyedRow(
  item: RowData,
  selected: boolean,
  onSelect: (id: number) => void,
  onRemove: (id: number) => void
) {
  return {
    type: "tr",
    props: {
      class: selected ? "danger" : "",
    },
    children: [
      {
        type: "td",
        props: { class: "col-md-1" },
        children: [String(item.id)],
      },
      renderLabelCell(item, onSelect),
      renderRemoveCell(item, onRemove),
      {
        type: "td",
        props: { class: "col-md-6" },
        children: [],
      },
    ],
  };
}
