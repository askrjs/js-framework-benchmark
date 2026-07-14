import type { RowData } from "../benchmark-types";

interface KeyedRowProps {
  item: RowData;
  isSelected: (id: number) => boolean;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

export function KeyedRow({ item, isSelected, onSelect, onRemove }: KeyedRowProps) {
  function handleSelect(event: MouseEvent) {
    event.preventDefault();
    onSelect(item.id);
  }

  function handleRemove(event: MouseEvent) {
    event.preventDefault();
    onRemove(item.id);
  }

  return (
    <tr class={() => (isSelected(item.id) ? "danger" : "")}>
      <td class="col-md-1">{() => item.id}</td>
      <td class="col-md-4">
        <a onClick={handleSelect}>
          {() => item.label}
        </a>
      </td>
      <td class="col-md-1">
        <a onClick={handleRemove}>
          <span class="glyphicon glyphicon-remove" aria-hidden="true" />
        </a>
      </td>
      <td class="col-md-6" />
    </tr>
  );
}
