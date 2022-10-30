import React,{Component} from 'react';
import RVD from 'react-virtual-dom';
import {Icon} from '@mdi/react';
import {mdiClose} from '@mdi/js';
import './index.css';
export default class Confirm extends Component{
    constructor(props){
      super(props);
      this.state = {activeTabIndex:0}
    }
    header_layout(){
      let {onClose,title} = this.props;
      if(!title){return false}
      return {
        size:48,className:'superapp-popup-header',
        row:[
          {flex:1,html:title,align:'v',className:'superapp-popup-title'},
          {size:48,html:<Icon path={mdiClose} size={0.8}/>,align:'vh',attrs:{onClick:()=>onClose()}}
        ]
      }
    }
    body_layout(){
      let {text} = this.props;
      return {flex:1,html:text,scroll:'v'}
    }
    footer_layout(){
      let {onClose,onSubmit,closeText = 'No',submitText = 'Yes'} = this.props;
      return {
        gap:12,
        size:48,
        align:'v',
        style:{padding:'0 12px'},
        row:[
          {flex:1},
          {html:<button className='superapp-popup-footer-button' onClick={()=>onClose()}>{closeText}</button>},
          {show:!!onSubmit,html:<button className='superapp-popup-footer-button' onClick={()=>onSubmit()}>{submitText}</button>},
          {flex:1}
        ]
      }
    }
    render(){
      let {style = {width:400,height:300}} = this.props;
      return (  
        <div className='superapp-popup-container'>
          <RVD layout={{className:'superapp-poppup',style:{flex:'none',...style},column:[this.header_layout(),this.body_layout(),this.footer_layout()]}}/>  
        </div>
      )
    }
  }