import { createIsland, state } from "@askrjs/askr";

import { buildData } from "./benchmark-data";
import type { ActionSpec, RowData } from "./benchmark-types";
import { BenchmarkHeader } from "./components/benchmark-header";
import { renderKeyedTable } from "./components/keyed-table";

function App() {
  const dataState = state<RowData[]>([]);
  const selectedState = state<number | null>(null);
  const renderTickState = state(0);

  dataState();
  selectedState();
  renderTickState();

  function replaceData(count: number) {
    const nextRows = buildData(count);
    dataState.set([]);
    selectedState.set(null);
    queueMicrotask(() => {
      dataState.set(nextRows);
    });
  }

  function run() {
    replaceData(1000);
  }

  function runLots() {
    replaceData(10000);
  }

  function add() {
    dataState.set((rows) => rows.concat(buildData(1000)));
  }

  function update() {
    dataState.set((rows) =>
      rows.map((item, index) => (index % 10 === 0 ? { ...item, label: item.label + " !!!" } : item))
    );
    queueMicrotask(() => {
      renderTickState.set((value) => value + 1);
    });
  }

  function clear() {
    dataState.set([]);
    selectedState.set(null);
  }

  function swapRows() {
    dataState.set((rows) => {
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
    dataState.set((rows) => rows.filter((item) => item.id !== id));
    selectedState.set((selected) => (selected === id ? null : selected));
  }

  function select(id: number) {
    const previous = selectedState();
    if (previous === id) {
      return;
    }
    selectedState.set(id);
    dataState.set((rows) => rows.map((item) => (item.id === id || item.id === previous ? { ...item } : item)));
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
      {renderKeyedTable(dataState, selectedState, select, remove)}
      <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
    </div>
  );
}

createIsland({ root: "main", component: App as never });
