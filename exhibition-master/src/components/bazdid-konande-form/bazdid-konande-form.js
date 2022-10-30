import React, { Component } from 'react';
import Form from './../form/form';
import RVD from 'react-virtual-dom';
import { Icon } from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';
import AppContext from './../../app-context';
export default class SabtForm extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { 
      model: props.model,mozakere_konandegan:[],
      prevModel:JSON.stringify(props.model),
      cities:[]
    }
  }
  async onSubmit(model){
    let {mozakere_konandegan} = this.state;
    let {services,confirm} = this.context;
    let {onSubmit,type} = this.props;
    let res = await services({ type: 'sabte_bazdid_konande', parameter: {model,type, mozakere_konandegan} })
    if(res === true){
      confirm({
        text:'ثبت اطلاعات با موفقیت انجام شد',
        subtext:'جهت ویرایش و مشاهده وضعیت به منوی تاریخچه مراجعه نمائید',
        type:'success'
      })
    }
    else{
      confirm({
        text:'اطلاعات ثبت نشد',
        subtext:res,
        type:'error'
      })
    }
    if(res === true){
      let newModel = await services({type:'bazdid_konandegan'})
      onSubmit(newModel);
    }
  }
  async componentDidMount(){
    let {services} = this.context;
    await this.updateMozakereKonandegan();
    this.hazfeMozakereKonande();
    let cities = await services({type:'cities'});
    this.setState({cities})
  }
  hazfeMozakereKonande(){
    let {model,mozakere_konandegan} = this.state;
    if(!model.mozakere_konande){return}
    if(mozakere_konandegan.filter((o)=>o.id === model.mozakere_konande).length !== 0){return}
    model.mozakere_konande = undefined
    this.setState({model})
  }
  async updateMozakereKonandegan(){
    let {services} = this.context;
    let {model} = this.state;
    let {city,activityZone} = model;
    let mozakere_konandegan = await services({type:'mozakere_konandegan',parameter:{city,activityZone}});
    this.state.mozakere_konandegan = mozakere_konandegan
    this.setState({mozakere_konandegan})
  }
  async changeDynamics(key,value){
    let {model} = this.state;
    model[key] = value;
    this.setState({model});
    await this.updateMozakereKonandegan();
    this.hazfeMozakereKonande()
  }
  render() {
    let str = JSON.stringify(this.props.model);
    if(str !== this.state.prevModel){
      setTimeout(()=>this.setState({model:this.props.model,prevModel:str}),0)
    }
    let { mozakere_konandegan,cities,model } = this.state;
    let {type,onChange,style} = this.props;
    let {activityZonesDictionary} = this.context
    return (
      <>
        <Form
          lang={'fa'}
          style={style}
          model={model}
          submitText={type === 'add'?'ثبت بازدید کننده':'ویرایش بازدید کننده'}
          data={{cities,activityZonesDictionary,mozakere_konandegan:[{name:'انتخاب نشده',value:''}].concat(mozakere_konandegan) }}
          onSubmit={type === 'search'?undefined:(model) => this.onSubmit(model)}
          onChange={(model) => {
            if(type === 'search'){onChange(model)}
            else{this.setState({ model })}
          }}
          inputs={[
            { type: 'text', field: 'model.firstname', label: 'نام', rowKey: '1', validations:type !== 'search'? [['required']]:undefined },
            { type: 'text', field: 'model.lastname', label: 'نام خانوادگی', rowKey: '1', validations:type !== 'search'? [['required']]:undefined },
            { type: 'text', field: 'model.mobile', label: 'شماره همراه', rowKey: '1' , validations:type !== 'search'? [['required']]:undefined},

            { type: 'select', field: 'model.activityZone', label: 'حوزه فعالیت', rowKey: '2',
            onChange:(value)=>this.changeDynamics('activityZone',value),options:'props.data.activityZonesDictionary', validations:type !== 'search'? [['required']]:undefined },
            { type: 'text', field: 'model.company', label: 'شرکت/فروشگاه', rowKey: '2' },
            { type: 'text', field: 'model.position', label: 'سمت', rowKey: '2',show:type !== 'search'},
            { type: 'html', html:()=> '', rowKey: '2',show:type === 'search'},
            
            { 
              type: 'select', field: 'model.city', label: 'شهر', rowKey: '3',options:'props.data.cities',
              optionText:'option',optionValue:'option', validations:type !== 'search'? [['required']]:undefined,
              onChange:(value)=>this.changeDynamics('city',value) 
            },
            { type: 'text', field: 'model.phone', label: 'شماره ثابت', rowKey: '3' },
            { type: 'text', field: 'model.cardCode', label: 'کارت کد', rowKey: '3',disabled:true,show:'!!model.cardCode'},
            { type: 'html', html:()=> '', rowKey: '3',show:'!model.cardCode'},

            {type:'select', field:'model.gender', label:'جنسیت', rowKey:'4' ,show:type !== 'search', options:[{text:'مرد', value:'M'}, {text:'زن', value:'F'}]},
            { type: 'checkbox', field: 'model.catalog', label: 'ارسال کاتالوگ', rowKey: '4',show:type !== 'search', inputStyle:{border:'none', background:'none'}},
            { type: 'html', html:()=> '', rowKey: '4'},

            { type: 'textarea', field: 'model.address', label: 'آدرس', rowKey: '5',show:type !== 'search' },


            { 
              type: 'select',show:type !== 'search', 
              text:'!model.mozakere_konande?"انتخاب نشده":undefined',
              field: 'model.mozakere_konande', 
              label: 'مذاکره کننده', 
              options: 'props.data.mozakere_konandegan', 
              optionText: 'option.name', 
              optionValue: 'option.id', 
              optionStyle:{padding:'3px 12px',borderBottom:'1px solid #ddd'},
              optionBefore:(option)=>{
                if(option.name === 'انتخاب نشده'){return }
                let {src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseCbdq0ve298LECUfkHjjsE6pWOA5hv-9Yy-T0Pw&s'} = option;
                return <img src={src} width={28} height={28} style={{borderRadius:'100%',border:'2px solid #eee'}}/>
              },
              optionAfter:(option)=>{
                return <div style={{padding: '0px 12px',borderRadius: 30,background: 'dodgerblue',color: '#fff'
              }}>{option.city}</div>
              }
            },

            {show:type !== 'search', type:'html',html:()=>{
              let {visitCard = {}} = model;
              return (
                <div style={{display:'flex'}}>
                  <label className='color108ABE size14 bold' style={{cursor:'pointer',display:'flex'}}>
                  <input style={{display:'none'}} type='file' onChange={(e)=>{
                    model.visitCard = e.target.files[0]
                    this.setState({model})
                  }}/>
                  درج تصویر کارت ویزیت
                </label>
                <div style={{background:'dodgerblue',margin:'0 12px',color:'#fff',display:model.visitCard?'flex':'none',alignItems:'center'}}>
                  <div style={{width:12}}></div>
                  {visitCard.name}
                  <div style={{width:12}}></div>
                  <Icon path={mdiClose} size={0.8} style={{cursor:'pointer'}} onClick={(e)=>{
                  model.visitCard = undefined
                  this.setState({model})
                }}/>
                </div>
                </div>
              )
            },label:'کارت ویزیت'}
          ]}
        />
      </>
    )
  }
}