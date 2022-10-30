import React,{Component} from 'react';
import RVD from 'react-virtual-dom';
import Table from './../../components/table/table';
import {Icon} from '@mdi/react';
import {mdiDotsHorizontal} from '@mdi/js';
import AIOButton from 'aio-button';
import BazdidKonandeForm from './../../components/bazdid-konande-form/bazdid-konande-form';
import AppContext from './../../app-context';
export default class SabteBazdidKonande extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      activityZones:[
        {value:'C',text:'بازرگانی'},
        {value:'G',text:'سازمان دولتی'},
        {value:'CO',text:'پیمانکار'},
        {value:'P',text:'تولید کننده'},
        {value:'S',text:'پخش کننده'},
        {value:'E',text:'الکتریکی'},
        {value:'T',text:'ابزار فروشی'}
      ],
      estelamModel:{},
      estelam:false,
      loading:false,
      statusDic:{
        '0':{text:'ثبت اطلاعات',color:'#FFA826'},
        '1':{text:'در انتظار مذاکره',color:'#108ABE'},
        '2':{text:'در حال مذاکره',color:'#A13196'},
        '3':{text:'پایان مذاکره',color:'#107C10'},
        '4':{text:'انصراف از مذاکره', color:'#A4262C'}
      }
    }
  }
  async componentDidMount(){
    let {services} = this.context;
    let bazdid_konandegan = await services({type:'bazdid_konandegan'})
    this.setState({bazdid_konandegan})
  }
  bazdid_konandegan_table_layout(){
    let {touch,addPopup} = this.context;
    if(touch){return this.bazdid_konandegan_table_layout_touch()}
    let {bazdid_konandegan,statusDic} = this.state;
    this.order = 0
    return {
      flex:1,
      column:[
        {flex:1,show:!bazdid_konandegan,className:'margin-0-24',html:('در حال بارگزاری')},
        {flex:1,show:!!bazdid_konandegan && !bazdid_konandegan.length,className:'margin-0-24',html:('موردی پیدا نشد')},
        {
          flex:1,show:!!bazdid_konandegan && !!bazdid_konandegan.length,
          className:'margin-0-24',
          html:(
            <Table
              templates={{
                activityZone: (row) =>{
                  let {activityZones} = this.state
                  try{
                    return activityZones.find((x)=>{
                      return x.value === row.activityZone
                    }).text
                  }
                  catch(err){
                    return ''
                  }
                },
                rownumber: (row, detail)=>{
                  this.order++
                  return this.order
                },
                details:(row)=>{
                  return (
                    <AIOButton
                      style={{fontFamily:'inherit'}}
                      className='button-1'
                      type='button'
                      text={<Icon path={mdiDotsHorizontal} size={0.8}/>}
                      onClick={()=>{
                        addPopup({
                          content:()=>{
                            return (
                              <BazdidKonandeForm 
                                type='edit'
                                style={{height:'100%'}}
                                model={row}
                                onSubmit={(model)=>this.setState({sabtPopup:false,bazdid_konandegan:model})}
                              />
                            )
                          },
                          title:'ویرایش بازدید کننده'
                        })
                      }}
                    />
                  )
                },
                status:(row)=>{
                  let {text = '',color = ''} = statusDic[row.status] || {};
                  return <div style={{color,background:color + '20',fontSize:10,padding:'0 3px',borderRadius:3}}>{text}</div>
                }
              }}
              model={bazdid_konandegan}
              columns={[
                {title: '#', width:40, template:'rownumber' },
                {title:'نام',field:'row.firstname',titleJustify:false},
                {title:'نام خانوادگی',field:'row.lastname',titleJustify:false},
                {title:'شماره همراه',field:'row.mobile',titleJustify:false},
                {title:'شهر',field:'row.city',titleJustify:false},
                {title:'زمان ثبت',field:'row.date',justify:true},
                {title:'حوزه فعالیت',field:'row.activityZone',titleJustify:false, template: 'activityZone'},
                {title:'وضعیت',template:'status',titleJustify:false,template:'status'},
                {title:'مذاکره کننده',field:'row.name_mozakere_konande',titleJustify:false},
                {title:'',template:'details'}
              ]}
            />
          )
        }
      ]
    }
  }
  bazdid_konandegan_table_layout_touch(){
    let {bazdid_konandegan,statusDic} = this.state;
    return {
      flex:1,
      column:[
        {flex:1,show:!bazdid_konandegan,className:'margin-0-24',html:('در حال بارگزاری')},
        {flex:1,show:!!bazdid_konandegan && !bazdid_konandegan.length,className:'margin-0-24',html:('موردی پیدا نشد')},
        {
          flex:1,show:!!bazdid_konandegan && !!bazdid_konandegan.length,
          html:(
            <Table
              templates={{
                details:(row)=>{
                  return (
                    <AIOButton
                      style={{fontFamily:'inherit'}}
                      className='button-1'
                      type='button'
                      text={<Icon path={mdiDotsHorizontal} size={0.8}/>}
                    />
                  )
                },
                name:(row)=>row.firstname + ' ' + row.lastname,
                status:(row)=>{
                  let {text = '',color = ''} = statusDic[row.status] || {};
                  return <div style={{color,background:color + '20',fontSize:10,padding:'0 3px',borderRadius:3}}>{text}</div>
                }
              }}
              rowHeight={48}
              model={bazdid_konandegan}
              showHeader={false}
              columns={[
                {title:'',template:'name',titleJustify:false,subtext:'row.city + " - " + row.activityZone'},
                {title:'',template:'status',justify:true,subtext:'row.date',width:110},
                {title:'',field:'row.mobile',titleJustify:false,width:80},
                {title:'',template:'details',width:60}
              ]}
            />
          )
        }
      ]
    }
  }
  render(){
    return (
      <>
        <RVD
          layout={{
            column:[
              this.bazdid_konandegan_table_layout()
            ]
          }}
        />
      </>
    )
  }
}

