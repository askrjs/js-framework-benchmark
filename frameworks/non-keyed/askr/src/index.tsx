import { createIsland, state } from '@askrjs/askr';

const adjectives = ["pretty","large","big","small","tall","short","long","handsome","plain","quaint","clean","elegant","easy","angry","crazy","helpful","mushy","odd","unsightly","adorable","important","inexpensive","cheap","expensive","fancy"];
const colours = ["red","yellow","blue","green","pink","brown","purple","brown","white","black","orange"];
const nouns = ["table","chair","house","bbq","desk","car","pony","cookie","sandwich","burger","pizza","mouse","keyboard"];
let nextId = 1;
const rand = max => Math.round(Math.random()*1000)%max;

function buildData(count=1000){
  const data = [];
  for(let i=0;i<count;i++) data.push({id: nextId++, label: `${adjectives[rand(adjectives.length)]} ${colours[rand(colours.length)]} ${nouns[rand(nouns.length)]}`});
  return data;
}

function Row({item, onSelect, onRemove, selected}: {
  item: { id: number; label: string };
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
  selected: number | null;
}){
  return (
    <tr class={selected===item.id? 'danger':''}>
      <td class="col-md-1">{item.id}</td>
      <td class="col-md-4"><a onClick={(e)=>{e.preventDefault();onSelect(item.id);}}>{item.label}</a></td>
      <td class="col-md-1"><a onClick={(e)=>{e.preventDefault();onRemove(item.id);}}><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
      <td class="col-md-6"></td>
    </tr>
  )
}

function App(){
  const data = state([]);
  const selected = state(null);

  const run = () => data.set(buildData(1000));
  const runLots = () => data.set(buildData(10000));
  const add = () => data.set(d=>d.concat(buildData(1000)));
  const update = () => data.set(d=>d.map((it,i)=> i%10===0 ? {...it, label: it.label + ' !!!'} : it));
  const clear = () => { data.set([]); selected.set(null); };
  const swapRows = () => data.set(d=>{
    if(d.length>998){ const copy = d.slice(); const tmp = copy[1]; copy[1] = copy[998]; copy[998] = tmp; return copy; }
    return d;
  });
  const remove = (id)=> data.set(d=>d.filter(it=>it.id!==id));
  const select = (id)=> selected.set(id);

  return (
    <div class="container">
      <div class="jumbotron">
        <div class="row">
          <div class="col-md-6"><h1>Askr (non-keyed)</h1></div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-sm-6 smallpad"><button id="run" class="btn btn-primary btn-block" type="button" onClick={run}>Create 1,000 rows</button></div>
              <div class="col-sm-6 smallpad"><button id="runlots" class="btn btn-primary btn-block" type="button" onClick={runLots}>Create 10,000 rows</button></div>
              <div class="col-sm-6 smallpad"><button id="add" class="btn btn-primary btn-block" type="button" onClick={add}>Append 1,000 rows</button></div>
              <div class="col-sm-6 smallpad"><button id="update" class="btn btn-primary btn-block" type="button" onClick={update}>Update every 10th row</button></div>
              <div class="col-sm-6 smallpad"><button id="clear" class="btn btn-primary btn-block" type="button" onClick={clear}>Clear</button></div>
              <div class="col-sm-6 smallpad"><button id="swaprows" class="btn btn-primary btn-block" type="button" onClick={swapRows}>Swap Rows</button></div>
            </div>
          </div>
        </div>
      </div>

      <table class="table table-hover table-striped test-data">
        <tbody id="tbody">
          {data().map(item => <Row item={item} onSelect={select} onRemove={remove} selected={selected()} />)}
        </tbody>
      </table>
      <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
    </div>
  );
}

createIsland({ root: document.getElementById('main'), component: App });