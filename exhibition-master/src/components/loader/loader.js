import React,{Component} from 'react';
import "./index.css";
export default class Loader extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:'spin1',
    }
  }
  spin1(){
    var {size = 50,thickness = 4,fill = '#000',duration = 1} = this.props;
    return (
      <div style={{
        width:size,height:size,
        borderTop: `${thickness}px solid ${fill}`,
        borderRight: `${thickness}px solid transparent`,
        borderRadius:'100%',
        webkitAnimation: `${duration}s rotate linear infinite`,
        animation: `${duration}s rotate linear infinite`,
      }}/>
    )
  }
  spin2(){
    var {size = 50,thickness = 4,fill = '#000', empty = '#ddd',duration = 1,style} = this.props;
    return (
      <div style={{
        width:size,height:size,
        borderStyle:'solid',
        borderWidth:thickness,
        borderColor:empty,
        borderTopColor: fill,
        borderRadius:'100%',
        webkitAnimation: `${duration}s rotate linear infinite`,
        animation: `${duration}s rotate linear infinite`,
        ...style
      }}/>
    )
  }
  spin3(){
    var {size = 50,thickness = 4,fill = '#000', empty='#ddd',duration = 1,style} = this.props;
    return (
      <div style={{
        width:size,height:size,
        border: `${thickness}px solid ${empty}`,
        borderStyle:'solid',
        borderWidth:thickness,
        borderColor:empty,
        borderTopColor: fill,
        borderBottomColor: fill,
        borderRadius:'100%',
        webkitAnimation: `${duration}s rotate linear infinite`,
        animation: `${duration}s rotate linear infinite`,
        ...style
      }}/>
    )
  }
  getMultiSpin(count,style){
    var {thickness = 5,gap = 3,fill = '#000',duration = 3} = this.props;
    let colors = Array.isArray(fill)?fill:[fill]
    var getStyle1 = ()=>{
      return {
        borderRadius:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:`calc(100% - ${thickness * 2 + gap * 2}px)`,
        height:`calc(100% - ${thickness * 2 + gap * 2}px)`,
        left:gap/2 + thickness / 2,
        top:gap/2 + thickness / 2,
        borderColor:colors[count] || colors[0],
        borderTopColor:'transparent',
        borderLeftColor:'transparent',
        borderBottomColor:'transparent',
        //webkitAnimation: `${duration}s spin linear infinite`,
        animation: `${duration}s rotate linear infinite`,
        borderWidth:`${thickness}px`,
        borderStyle:'solid',
      }
    }
    return (
      <div class="multi-spinner" style={getStyle1()}>
        {count - 1 > 0 && this.getMultiSpin(count - 1,style)}
      </div>
    )
  }
  multiSpin(){
    var {count = 3,size = 80,style} = this.props;
    return (
      <div style={{
        width:size,height:size,position:'relative',overflow: 'hidden',...style
      }}>
        {this.getMultiSpin(count)}
      </div>
    )
  }
  dots1(){
    var {gap = 2,thickness = 12,fill = '#000',duration = 1,count = 3} = this.props;
    let delay = duration / count
    let colors = Array.isArray(fill)?fill:[fill]
    let getStyle = (s)=>{
      return {
        width:thickness,
        height:thickness,
        borderRadius:'100%',
        webkitAnimation: `${duration}s grow ease-in-out infinite${s}`,
        animation: `${duration}s grow ease-in-out infinite ${s}s`,
      }
    }
    return (
      <div style={{
        display:'flex',justifyContent:'center',alignItems:'center',height:thickness
      }}>
        {
          new Array(count).fill(0).map((o,i)=>{
            return (
              <>
                {i !== 0 && <div style={{width:gap}}></div>}
                <div className="dot-loader" style={{...getStyle(i * delay),background:colors[i] || colors[0]}}/> 
              </>
            )
          })
        }
        
      </div>
    )
  }
  dots2(){
    var {count = 8,size = 60,thickness = 4,borderRadius = 20,fill = '#000',duration = 0.8} = this.props;
    let colors = Array.isArray(fill)?fill:[fill]
    let angle = 360 / count;
    let inDuration = duration / count;
    let Thickness = Array.isArray(thickness)?thickness:[thickness,thickness];
    let getStyle1 = (i)=>{
      return {
        width:'100%',height:'100%',left:0,top:0,position:'absolute',display:'flex',alignItems:'center',
        transform:`rotate(${i * angle}deg)`,
        
      }
    }
    let getStyle2 = (i)=>{
      let color = colors[i%colors.length];
      return {
        width:Thickness[0],height:Thickness[1],background:color,borderRadius:borderRadius + 'px',
        webkitAnimation: `${duration}s opaque ease-in-out infinite both ${i * inDuration}s`,
        animation: `${duration}s opaque ease-in-out infinite both ${i * inDuration}s`,
      }
    }
    let items = [];
    for(let i = 0; i < count; i++){
      items.push(
        <div key={i} style={{...getStyle1(i)}}>
          <div style={getStyle2(i)}></div>
        </div>
      )
    }
    return (
      <div style={{position:'relative',width:size,height:size,display:'flex',alignItems:'center'}}>{items}</div>
    )
  }
  dots3(){
    var {size = 100,thickness = 20,borderRadius = 20,fill = '#000',duration = 3} = this.props;
    let colors = Array.isArray(fill)?fill:[fill]
    var getStyle1 = (i)=>{
      return {
        width:thickness,height:thickness,position:'absolute',background:colors[i % colors.length],borderRadius:borderRadius + 'px',margin:thickness / -2,
        webkitAnimation: `${duration}s mesh ease-in-out infinite ${duration / -2}s`,
        animation: `${duration}s mesh ease-in-out infinite ${duration / -2}s`,
      }
    }
    return (
      <div class="mesh-loader" style={{overflow:'hidden',width:size,height:size,display:'flex',position:'relative',alignItems:'center',justifyContent:'center'}}>
              <div class="set-one">
                <div class="circle" style={getStyle1(0)}/>
                <div class="circle" style={{...getStyle1(2),animationDelay:'0s',webkitAnimationDelay:'0s'}} />
              </div>
              <div class="set-two" style={{transform:'rotate(90deg)'}}>
                <div class="circle" style={getStyle1(1)} />
                <div class="circle" style={{...getStyle1(3),animationDelay:'0s',webkitAnimationDelay:'0s'}} />
              </div>
            </div>
    )
  }
  cubes1(){
    var {size = 60,delays = [0.2,0.3,0.4,0.1,0.2,0.3,0,0.1,0.2],borderRadius = 0,fill = '#000',duration = 1.3,gap = 0} = this.props;
    let colors = Array.isArray(fill)?fill:[fill]
    let getStyle1 = (i)=>{
      return {
        width: `calc(33% - ${gap}px)`,height: `calc(33% - ${gap}px)`,background:colors[i % colors.length],float:'left',borderRadius:borderRadius + 'px',margin:gap / 2,
        animation: `scale ${duration}s infinite ease-in-out`,
        animationDelay:delays[i % delays.length] + 's'
      }
    }
    var items = [];
    for(var i = 0; i < 9; i++){
      items.push(<div key={i} style={getStyle1(i)}></div>)
    }
    return (
      <div class="cubes" style={{width:size,height:size}}>
        {items}
      </div>
    )
  }
  cubes2(){
    var {count = 5,size,thickness = [7,30],delay = 0.1,borderRadius = 0,fill = '#000',duration = 1.3,gap = 3} = this.props;
    let colors = Array.isArray(fill)?fill:[fill]
    let Thickness = Array.isArray(thickness)?thickness:[thickness,thickness];
    let getStyle1 = (i)=>{
      return {
        width:Thickness[0],height:Thickness[1],background:colors[i % colors.length],margin:`0 ${gap/2}px`,
        animation: `${duration}s scaleY infinite ease-in-out ${i * delay}s`,
        borderRadius:borderRadius + 'px'
      }
    }
    let items = [];
    for(var i = 0; i < count; i++){
      items.push(<div key={i} style={getStyle1(i)}></div>)
    }
    return (
      <div className="rect" style={{width:size,display:'flex',alignItems:'center',justifyContent:'center'}}>
        {items}
      </div>
    )
  }
  getSameCenterCircles({count,thickness,gap,colors}){
    var getStyle1 = (i)=>{
      var offset = (((i * 2 + 1)) * gap) + ((i + 1) * 2 * thickness);
      return { 
        border:`${thickness}px solid ${colors[i] || colors[0]}`,
        position:'absolute',
        width:`calc(100% - ${offset}px)`,
        height:`calc(100% - ${offset}px)`,
        borderRadius:'100%', 
      }
    }
    var circles = [];
    for(let i = 0; i < count; i++){
      circles.push(<div key={i} className="line line1" style={getStyle1(i)}></div>)
    }
    return circles;
  }
  orbit(){
    var {count = 2,size = 70,thickness = 3,gap = 3,colors=['orange']} = this.props;
    var circles = this.getSameCenterCircles({count,thickness,gap,colors});
    var radius = count * (thickness + gap);
    return (
          <div style={{
            width:size,height:size,
            position:'relative',display:'flex',alignItems:'center',justifyContent:'center'
          }}>
            {circles}
            <div style={{
              width:'100%',position:'absolute',height:'100%',left:0,top:0,display:'flex',alignItems:'center',justifyContent:'space-between',
              animation:`1s rotate infinite linear`
            }}>
              <div style={{width:radius,height:radius,background:colors[2] || colors[0],borderRadius:'100%'}}></div>
              <div style={{width:radius,height:radius,background:colors[3] || colors[0],borderRadius:'100%'}}></div>
              
            </div>
        </div>
  
  
    )
  }
  puls(){
    var {size = 30,thickness = 1,duration = 0.5,colors = ['#be65e2']} = this.props;
    var getStyle1 = (i)=>{
      let color = colors[i] || colors[0];
      let style = {
        width:'100%',height:'100%',display:'block',border:`${thickness}px solid ${color}`,
        position:'absolute',top: 0,left: 0,borderRadius: '50%',boxSizing: 'border-box',
      }
      if(i === 0){
        style.transform = 'scale(1)';
        style.opacity = 1;
        style.webkitAnimation = `spinner-1--before ${duration}s linear infinite`;
        style.animation = `spinner-1--before ${duration}s linear infinite`;
      }
      else {
        style.transform = 'scale(0)';
        style.opacity = 0;
        style.webkitAnimation = `spinner-1--after ${duration}s linear infinite`;
        style.animation = `spinner-1--after ${duration}s linear infinite`;
      }
      return style;
    }
    return (
      <div className='spinonediv-1' style={{width:size,height:size,borderRadius:'100%',position:'absolute'}}>
        <div style={getStyle1(0)}></div>
        <div style={getStyle1(1)}></div>
      </div>
    )
  }
  puls1(){
    var {size = 50,duration = 1,colors = ['#000']} = this.props;
    let getStyle1 = (i)=>{
      let animation = `ball-scale-multiple ${duration}s 0s linear infinite`
      let style = {
        background:colors[i] || colors[0],
        borderRadius:'100%',position:'absolute',
        width:'100%',height:'100%',
        webkitAnimation: animation,
        animation:animation
      }
      if(i === 1){
        style.webkitAnimationDelay = '-0.4s';
        style.animationDelay = '-0.4s';
      }
      else if(i === 2){
        style.webkitAnimationDelay = '-0.2s';
        style.animationDelay = '-0.2s';
      }
      return style
    }
    return (
        <div style={{
          width:size,height:size,display:'flex',
          alignItems:'center',justifyContent:'cennter',position:'relative'
        }}>
          <div style={getStyle1(0)}></div>
          <div style={getStyle1(1)}></div>
          <div style={getStyle1(2)}></div>
        </div>
      
    )
  }

  render() {return this[this.props.name]()}
}
