export interface RowData {
  id: number;
  label: string;
}

export interface ActionSpec {
  id: string;
  label: string;
  onClick: () => void;
}
