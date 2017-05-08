import React from 'react';





class Polygon extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <g transform ={this.getTransform()} fill={this.props.fillColour} stroke={this.props.strokeColour} strokeWidth={this.props.strokeWidth} fill={this.props.fillColour}>
            <polygon points={this.getVertices().join(' ')} > </polygon>
      </g>
    )
  }

  getTransform() {
    let xtranslate = this.props.x + this.props.xoffset * this.props.randomizer;
    let ytranslate = this.props.y + this.props.yoffset * this.props.randomizer;
    let tr = `translate(${xtranslate - this.props.scale * xtranslate} ${ytranslate -this.props.scale * ytranslate}) scale(${this.props.scale}) rotate(${this.getRotation()} ${this.props.x} ${this.props.y})`;''
    return tr;
  }

  getRotation(){
    let r = 180 - (this.props.sides-2) * 180/this.props.sides;
    let ret = 0;
    if(this.props.sides%2 == 0){
      ret =  r/2 + Number(this.props.rotation);
    } else {
      ret =  r + Number(this.props.rotation);
    }
    return ret;
  }
  /**
 * [Regular Polygon Vertices Generator - bl.ocks.org](http://bl.ocks.org/fabiovalse/8543484) 
 /* GIVEN x and y (the center coordinates), the radius and the number of polygon sides RETURNS AN ARRAY OF VERTICE COORDINATES */
	getVertices() {
		var crd = [];
		/* 1 SIDE CASE */
		if (this.props.sides == 1)
		return [[this.props.x, this.props.y]];

		/* > 1 SIDE CASEs */
		for (var i = 0; i < this.props.sides; i++) {
			crd.push([(this.props.x + (Math.sin(2 * Math.PI * i / this.props.sides) * this.props.radius)), (this.props.y - (Math.cos(2 * Math.PI * i / this.props.sides) * this.props.radius))]);
		}
		return crd;
	}

}


Polygon.defaultProps = {
  x:100,
  y:100,
  xpos: 0,
  ypos: 0,
  sides: 6,
  rotation:0,
  radius: 75,
  randomizer: 1,
  xoffset:0,
  yoffset:0,
  scale: 1,
  strokeColour :'#000',
  strokeWidth :1,
  fillColour : '#fff'
}

export default Polygon;
