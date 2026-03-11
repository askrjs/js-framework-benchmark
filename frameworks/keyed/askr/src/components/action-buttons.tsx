import type { ActionSpec } from "../benchmark-types";
import { ActionButton } from "./action-button";

interface ActionButtonsProps {
  actions: readonly ActionSpec[];
}

export function ActionButtons({ actions }: ActionButtonsProps) {
  return (
    <div class="row">
      {actions.map((action) => (
        <ActionButton id={action.id} label={action.label} onClick={action.onClick} />
      ))}
    </div>
  );
}
