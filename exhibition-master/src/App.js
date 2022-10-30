import React,{Component} from "react";
import RSA from 'react-super-app';
import RVD from 'react-virtual-dom';
import {Icon} from '@mdi/react';
import SabteBazdidKonande from './pages/sabte-bazdid-konande/sabte-bazdid-konande';
import ModiriateBazdidKonandegan from './pages/modiriate-bazdid-konandegan/modiriate-bazdid-konandegan';
import {mdiFile,mdiHistory,mdiAccount,mdiClose,mdiCheckCircleOutline} from '@mdi/js';
import AppContext from './app-context';
import apis from "./apis";
import AIOService from 'aio-service';
import AIODate from "aio-date";
import AIOButton from 'aio-button';
import RKS from 'react-keycloak-spa';
import "./index.css";
export default class App extends Component{
  render(){
    return (
      <RKS
        config={{
          url: "https://iam.burux.com/auth",
          realm: "master",
          clientId: "exhibition"
        }}
        component={Exhibition}
      />
    )
  }
} 
class Exhibition extends Component {
  constructor(props){
    super(props);
    let {keycloak} = this.props;
    let access = false
    let roles = keycloak.tokenParsed.roles
    access = roles.indexOf('operator') !== -1  || roles.indexOf('admin') !== -1
    let client_id;
    if(roles.indexOf('burux') !== -1){
      client_id = 1
    } 
    else if(roles.indexOf('aria') !== -1){
      client_id = 2
    } 
    else if(roles.indexOf('paydar') !== -1){
      client_id = 3
    }
    this.state = {
      access,
      client_id,
      name:keycloak.tokenParsed.name,
      username:keycloak.tokenParsed.username,
      token: keycloak.token,
      logout:keycloak.logout,
      services:AIOService({
        getState:()=>this.state,
        apis
      }),
      user:{name:'کوروش شجاعی'},
      confirm:false,
      activityZonesDictionary:[
        {value:'C',text:'بازرگانی'},
        {value:'G',text:'سازمان دولتی'},
        {value:'CO',text:'پیمانکار'},
        {value:'P',text:'تولید کننده'},
        {value:'S',text:'پخش کننده'},
        {value:'E',text:'الکتریکی'},
        {value:'T',text:'ابزار فروشی'},
        {value: undefined, text:'-'},
      ]
    }
  }
  setConfirm({type,text,subtext}){
    let path,color;
    if(type === 'success'){
      path = mdiCheckCircleOutline;
      color = 'green';
    }
    else if(type === 'error'){
      path = mdiClose;
      color = 'red';
    }
    let body = (
      <RVD
        layout={{
          column:[
            {size:36},
            {html:<Icon path={path} size={3}/>,style:{color},align:'vh'},
            {size:12},
            {html:text,style:{color},align:'vh'},
            {size:12},
            {html:subtext,align:'vh',className:'size10'}
          ]
        }}
      />
    )
    this.state.setConfirm({text:body,style:{background:'#fff',height:'fit-content'},buttons:[{text:'بستن'}]})
  }
  getContext(){
    return {
      ...this.state,
      confirm:({type,text,subtext})=>{
        this.setConfirm({type,text,subtext})
      }
    }
  }
  render(){
    let {name,logout, access} = this.state;
    if(access === false){
      return 'شما دسترسی به این اپلیکیشن ندارید'
    }
    return (
      <AppContext.Provider value={this.getContext()}>
        <RSA
          navs={[
            {text:'ثبت بازدید کننده',id:'0',icon:(active)=><Icon path={mdiFile} size={1}/>},
            {text:'مدیریت بازدید کنندگان',id:'1',icon:(active)=><Icon path={mdiHistory} size={1}/>}
          ]}
          body={({navId,touch})=>{
            if(touch){
              if(navId === '0'){return <SabteBazdidKonande touch={true}/>}
              if(navId === '1'){return <ModiriateBazdidKonandegan touch={true}/>}
            }
            else{
              if(navId === '0'){return <SabteBazdidKonande/>}
              if(navId === '1'){return <ModiriateBazdidKonandegan/>}
            }
          }}
          header={()=>(
            <RVD
              layout={{
                gap:3,
                row:[
                  {html:<DateAndTime/>},
                  {html:(
                    <AIOButton
                      type='select'
                      before={<Icon path={mdiAccount} size={0.9}/>}
                      style={{background:'none'}}
                      options={[
                        {text:'خروج از سیستم',value:'logout'}
                      ]}
                      text={name}
                      onChange={(value)=>{
                        if(value === 'logout'){logout()}
                      }}
                    />
                  )}
                ]
              }}
            />
          )}
          getActions={(obj)=>this.setState(obj)}
        />
      </AppContext.Provider> 
    );
  }
}


class DateAndTime extends Component{
  constructor(props){
    super(props);
    this.state = {value:this.getToday()}
    setInterval(()=>this.setState({value:this.getToday()}),60000)
  }
  getToday(){
    let date = AIODate();
    let months = date.getMonths('jalali');
    let [y,mo,d,h,mi] = date.getToday('jalali');
    h = h.toString();
    mi = mi.toString();
    if(h.length === 1){h = '0' + h}
    if(mi.length === 1){mi = '0' + mi}
    let {weekDay} = date.getWeekDay([y,mo,d],'jalali')
    //return `${weekDay} ${d} ${months[mo - 1]} ${y} ${h}:${mi}`;
    return (
      <RVD
        layout={{
          childsAttrs:{className:'time-box'},
          childsProps:{align:'v'},
          row:[
            {html:weekDay},
            {html:d},
            {html:months[mo - 1]},
            {html:y},
            {html:h + ':' + mi}
          ]
        }}
      />
    )
    //return `${y}/${mo}/${d} ${h}:${mi}`;
  }
  render(){
    let {value} = this.state;
    return (
      value      
    )
  }
}
