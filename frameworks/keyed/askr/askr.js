// Example JFB wrapper (drop into js-framework-benchmark/frameworks/...)

// If you load the IIFE bundle (via <script>), it exposes `window.askrBenchmark`.
// If you use an ESM build, import the module and read exported `mountBenchmark`.

function isIIFE() {
  return typeof window !== 'undefined' && !!window.askrBenchmark;
}

function getMountFromGlobal() {
  const wb = window.askrBenchmark;
  if (!wb) throw new Error('askrBenchmark not found on window (did you load dist/benchmark.iife.js?)');
  return wb.mountBenchmark || (wb.default && wb.default.mountBenchmark);
}

// Example API the harness can call
export function createAskrAdapter(root) {
  const mountFn = isIIFE() ? getMountFromGlobal() : null;

  // If using ESM in the harness, you can do:
  // import { mountBenchmark } from 'path/to/dist/benchmark.js'

  if (!mountFn) {
    console.warn('[askr] askrBenchmark global not found; ensure you loaded dist/benchmark.iife.js');
  }

  const mounted = mountFn ? mountFn(root) : null;

  return {
    setRows(rows) {
      if (mounted && typeof mounted.setRows === 'function') {
        mounted.setRows(rows);
      } else {
        // fallback: naive DOM mutation (not recommended for proper benchmarking)
        const tbody = root.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        for (const r of rows) {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${r.id}</td><td><a href="#">${r.label}</a></td>`;
          tbody.appendChild(tr);
        }
      }
    },
    setSelected(id) {
      if (mounted && typeof mounted.setSelected === 'function') {
        mounted.setSelected(id);
      }
    },
    getBuildHash() {
      return (window.askrBenchmark && window.askrBenchmark.__buildHash__) || 'unknown';
    },
    cleanup() {
      if (mounted && mounted.cleanup) mounted.cleanup();
    },
  };
}

export default createAskrAdapter;