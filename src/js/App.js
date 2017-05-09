import React from 'react';
import Polygon from './components/Polygon';





class App extends React.Component {

  constructor(props){
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.state = {
      currentShape: Object.assign({}, props.defaultShape), 
      userSelection: []
    };
  }

  handleAddItem(){
  let s = this.compileSelection();
  this.setState({userSelection: [s, ...this.state.userSelection]});
}

handleRangeChange(e){
  let s = this.compileSelection();
  this.setState({currentShape: s})
}

  compileSelection(){
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
    
    return Object.assign({}, this.state.currentShape, selection);
  }

  render(){

    return (
      <div>
        <div id="leftCol" className="controls">
        <div className="shapeControls">
          <label>Sides: <input id="sides-slider" type="range" min="2" max="8" step="1" defaultValue="6" onChange={this.handleRangeChange}/></label>
          <label>Border: <input id="stroke-slider" type="range" min="0.5" max="15" step="0.1" defaultValue="6" onChange={this.handleRangeChange}/></label>
          <label>Size: <input id="scale-slider" type="range" min="0.1" max="2" step="0.1" defaultValue="1" onChange={this.handleRangeChange}/></label>
          <label>Rotation: <input id="rotation-slider" type="range" min="0" max="360" step="1" defaultValue="0" onChange={this.handleRangeChange}/></label>
        </div>

        <div className="colourControls">
          <div className="label">Boder Colour:</div>
          <div>{ this.props.colours.map((c, i)=> <label style={{backgroundColor:c}} key={i}><input type="radio" name="select-border" value={c}  onClick={this.handleRangeChange} /></label> )}</div>
          <div className="label">Fill Colour:</div> 
          <div>{ this.props.colours.map((c, i)=> <label style={{backgroundColor:c}} key={i}><input type="radio" name="select-fill"  value={c} onClick={this.handleRangeChange} /></label> )}</div>
        </div>

        <div className="buyButtons">
          <button onClick={this.handleAddItem}>Add to Collection</button>
        </div>
        </div>

        <div id="mainCol" >
        <div className="shapePreview">
          <svg>{ React.createElement(Polygon, this.state.currentShape) }</svg>
        </div>
        </div>

        

        

        <div id="rightCol">
        <div className="usersCollection">
          {
            this.state.userSelection.map((mprops, i) => {
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
}

export default App;