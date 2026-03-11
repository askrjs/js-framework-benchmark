import type { RowData } from "../benchmark-types";

interface NonKeyedRowProps {
  item: RowData;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

export function NonKeyedRow({ item, isSelected, onSelect, onRemove }: NonKeyedRowProps) {
  return (
    <tr class={isSelected ? "danger" : ""}>
      <td class="col-md-1">{item.id}</td>
      <td class="col-md-4">
        <a
          onClick={(event: MouseEvent) => {
            event.preventDefault();
            onSelect(item.id);
          }}
        >
          {item.label}
        </a>
      </td>
      <td class="col-md-1">
        <a
          onClick={(event: MouseEvent) => {
            event.preventDefault();
            onRemove(item.id);
          }}
        >
          <span class="glyphicon glyphicon-remove" aria-hidden="true" />
        </a>
      </td>
      <td class="col-md-6" />
    </tr>
  );
}
