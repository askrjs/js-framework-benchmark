import type { ActionSpec } from "../benchmark-types";
import { ActionButtons } from "./action-buttons";

interface BenchmarkHeaderProps {
  title: string;
  actions: readonly ActionSpec[];
}

export function BenchmarkHeader({ title, actions }: BenchmarkHeaderProps) {
  return (
    <>
      <div class="col-md-6">
        <h1>{title}</h1>
      </div>
      <div class="col-md-6">
        <ActionButtons actions={actions} />
      </div>
    </>
  );
}
