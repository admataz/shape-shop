import React from 'react';
import ReactDom from 'react-dom';
import Polygon from './js/components/Polygon';
import style from './style/main.scss';


const d = document.getElementById('app');
const colours = [
  '#000',
  '#fff',
  '#E86C4E',
  '#666',
  '#FFE074',
  '#71A166',
  '#667FCC'
];

const defaultShape = {
  x: 110,
  y: 110,
  radius:100,
  sides: 6,
  scale: 1,
  strokeWidth: 6
}

let userSelection = [];


function compileSelection(){
  const selection={};

  let strokeEl = document.querySelector('input[name=select-border]:checked');
  let fillEl = document.querySelector('input[name=select-fill]:checked');
  selection.strokeColour = '#000';
  selection.fillColour = '#fff';
  if(strokeEl){
    selection.strokeColour = strokeEl.value;
  }
  if(fillEl){
    selection.fillColour = fillEl.value;
  }
  selection.sides = document.getElementById('sides-slider').value;
  selection.strokeWidth = document.getElementById('stroke-slider').value;
  selection.scale = document.getElementById('scale-slider').value;
  selection.rotation = document.getElementById('rotation-slider').value;
  
  return Object.assign({}, defaultShape, selection);
}


function handleAddItem(){
  let s = compileSelection();
  userSelection = [...userSelection, s];
  ReactDom.render(App(s), d);
}

function handleRangeChange(e){
  let s = compileSelection();
  ReactDom.render(App(s), d);;
}



const App = function(props){

  return (
    <div>
      <div id="leftCol" className="controls">
      <div className="shapeControls">
        <label>Sides: <input id="sides-slider" type="range" min="2" max="8" step="1" defaultValue="6" onChange={handleRangeChange}/></label>
        <label>Border: <input id="stroke-slider" type="range" min="0.5" max="15" step="0.1" defaultValue="6" onChange={handleRangeChange}/></label>
        <label>Size: <input id="scale-slider" type="range" min="0.1" max="2" step="0.1" defaultValue="1" onChange={handleRangeChange}/></label>
        <label>Rotation: <input id="rotation-slider" type="range" min="0" max="360" step="1" defaultValue="0" onChange={handleRangeChange}/></label>
      </div>

      <div className="colourControls">
        <div className="label">Boder Colour:</div>
         <div>{ colours.map((c, i)=> <label style={{backgroundColor:c}} key={i}><input type="radio" name="select-border" value={c}  onClick={handleRangeChange} /></label> )}</div>
        <div className="label">Fill Colour:</div> 
        <div>{ colours.map((c, i)=> <label style={{backgroundColor:c}} key={i}><input type="radio" name="select-fill"  value={c} onClick={handleRangeChange} /></label> )}</div>
      </div>

      <div className="buyButtons">
        <button onClick={handleAddItem}>Add to Collection</button>
      </div>
      </div>

      <div id="mainCol" >
      <div className="shapePreview">
        <svg>{ React.createElement(Polygon,props) }</svg>
      </div>
      </div>

      

      

      <div id="rightCol">
      <div className="usersCollection">
        {
          userSelection.map((mprops, i) => {
            return <div key={i} className="userItem"><svg>
                {
                  React.createElement(Polygon, mprops)
                }
              </svg></div>
          })
        }
      </div>

      </div>
    </div>


  );

}




if (d) {
  ReactDom.render(App(defaultShape), d);
}
