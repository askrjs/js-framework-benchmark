import type { ActionSpec } from "../benchmark-types";

export function ActionButton({ id, label, onClick }: ActionSpec) {
  return (
    <div class="col-sm-6 smallpad">
      <button id={id} class="btn btn-primary btn-block" type="button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
