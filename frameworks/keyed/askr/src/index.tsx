import { selector, state } from "@askrjs/askr";
import { createIsland } from "@askrjs/askr/boot";

import { buildData } from "./benchmark-data";
import type { ActionSpec, RowData } from "./benchmark-types";
import { BenchmarkHeader } from "./components/benchmark-header";
import { KeyedTable } from "./components/keyed-table";

function App() {
  const [data, setData] = state<RowData[]>([]);
  const [selected, setSelected] = state<number | null>(null);
  const isSelected = selector(selected);

  function run() {
    setData(buildData(1000));
    setSelected(null);
  }

  function runLots() {
    setData(buildData(10000));
    setSelected(null);
  }

  function add() {
    setData((rows) => rows.concat(buildData(1000)));
  }

  function update() {
    setData((rows) =>
      rows.map((item, index) => (index % 10 === 0 ? { ...item, label: item.label + " !!!" } : item))
    );
  }

  function clear() {
    setData([]);
    setSelected(null);
  }

  function swapRows() {
    setData((rows) => {
      if (rows.length > 998) {
        const copy = rows.slice();
        const tmp = copy[1];
        copy[1] = copy[998];
        copy[998] = tmp;
        return copy;
      }
      return rows;
    });
  }

  function remove(id: number) {
    setData((rows) => rows.filter((item) => item.id !== id));
    setSelected((current) => (current === id ? null : current));
  }

  function select(id: number) {
    if (selected() === id) {
      return;
    }
    setSelected(id);
  }

  const actions: ActionSpec[] = [
    { id: "run", label: "Create 1,000 rows", onClick: run },
    { id: "runlots", label: "Create 10,000 rows", onClick: runLots },
    { id: "add", label: "Append 1,000 rows", onClick: add },
    { id: "update", label: "Update every 10th row", onClick: update },
    { id: "clear", label: "Clear", onClick: clear },
    { id: "swaprows", label: "Swap Rows", onClick: swapRows },
  ];

  return (
    <div class="container">
      <div class="jumbotron">
        <div class="row">
          <BenchmarkHeader title="Askr-keyed" actions={actions} />
        </div>
      </div>
      <KeyedTable rows={data} isSelected={isSelected} onSelect={select} onRemove={remove} />
      <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
    </div>
  );
}

createIsland({ root: "main", component: App as never });
