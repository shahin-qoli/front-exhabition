import React,{Component} from 'react';
import RVD from 'react-virtual-dom';
import Form from './../../components/form/form';
import Table from './../../components/table/table';
import AIOButton from 'aio-button';
import Loader from './../../components/loader/loader';
import BazdidKonandeForm from './../../components/bazdid-konande-form/bazdid-konande-form';
import AppContext from './../../app-context';
export default class SabteBazdidKonande extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      estelamModel:{},
      estelam:false,
      loading:false,
      confirm:false,
    }
  }

  splitter_layout(title){
    let {touch} = this.context;
    return {
      size:48,gap:12,className:'padding-0-24',
      row:[
        {html:title,className:`color108ABE ${touch?'size12':'size18'}`,align:'v'},
        {flex:1,html:<div className='bg108ABE' style={{height:2,width:'100%',opacity:0.3}}></div>,align:'v'}
      ]
    }
  }
  estelam_form_layout(){
    let {addPopup} = this.context;
    let {estelamModel,estelam = [],loading} = this.state;
    let sabtDisabled = loading || estelam.length !== 0;
    let estelamDisabled = !estelamModel.firstname && !estelamModel.lastname && !estelamModel.mobile
    return {
      column:[
        this.splitter_layout('استعلام و ثبت بازدید کننده'),
        {
          html:(
            <BazdidKonandeForm
              model={estelamModel}
              type='search'
              onChange={(estelamModel)=>this.setState({estelamModel})}
            />
          )
        },
        {size:12},
        {
          html:(
            <div style={{display:'flex',flex:1}} className='padding-0-24'>
              <button 
                disabled={sabtDisabled} className='button-1' style={{padding:'0 24px'}}
                onClick={()=>{
                  addPopup({
                    content:()=>{
                      return (
                        <BazdidKonandeForm 
                          type='add'
                          style={{height:'100%'}}
                          model={{...estelamModel}}
                          onSubmit={(res)=>{
                            if(res){this.reset()}
                          }}
                        />
                      )
                    },
                    title:'ثبت بازدید کننده',
                  })
                }}
              >
                {loading?<Loader {...{name:'dots1',gap:2,thickness:6,fill:'#000',duration:1,count:3}}/>:'ثبت'}
              </button>
              <div style={{width:6}}></div>
              <button 
                disabled={estelamDisabled}
                className='button-1' style={{padding:'0 24px'}}
                onClick={()=>this.getEstelam()}
              >
                {'استعلام'}
              </button>
              
            </div>
          )
        }
      ]
    }
  }
  async getEstelam(){
    let {estelamModel} = this.state;
    let {services} = this.context;
    this.setState({loading:true})
    let estelam = await services({type:'estelam',parameter:estelamModel});
    this.setState({estelam,loading:false})
  }
  estelam_layout(){
    let {touch,addPopup} = this.context;
    if(touch){return this.estelam_layout_touch()}
    let {estelam} = this.state;
    return {
      flex:1,
      column:[
        this.splitter_layout('نتیجه استعلام'),
        {
          flex:1,show:!!estelam && !estelam.length,
          className:'margin-0-24',
          html:('موردی پیدا نشد')
        },
        {
          flex:1,show:!!estelam && !!estelam.length,
          className:'margin-0-24',
          html:(
            <Table
              templates={{
                register:(row)=>{
                  return (
                    <AIOButton
                      style={{fontFamily:'inherit'}}
                      className='button-1'
                      type='button'
                      text='ثبت'
                      onClick={()=>{
                        addPopup({
                          content:()=>{
                            return (
                              <BazdidKonandeForm 
                                type='add'
                                style={{height:'100%'}}
                                model={row}
                                onSubmit={(res)=>{
                                  if(res){this.reset()}
                                }}
                              />
                            )
                          },
                          title:'ثبت بازدید کننده',
                        })
                      }}
                    />
                  )
                },
                activityZone:(row) => {
                  let {activityZonesDictionary} = this.context
                  let res = activityZonesDictionary.find((o) => {
                    return o.value === row.activityZone
                  })
                  return res.text
                }
              }}
              model={estelam}
              columns={[
                {title:'نام',field:'row.firstname',titleJustify:false},
                {title:'نام خانوادگی',field:'row.lastname',titleJustify:false},
                {title:'شماره همراه',field:'row.mobile',titleJustify:false},
                {title:'شهر',field:'row.city',titleJustify:false},
                {title:'کارت کد',field:'row.cardCode',justify:true},
                {title:'حوزه فعالیت',field:'row.activityZone',titleJustify:false, template:'activityZone'},
                {title:'',template:'register'}
              ]}
            />
          )
        }
      ]
    }
  }
  estelam_layout_touch(){
    let {estelam} = this.state;
    let {addPopup} = this.context;
    return {
      flex:1,
      column:[
        this.splitter_layout('نتیجه استعلام'),
        {
          flex:1,show:!!estelam && !estelam.length,
          className:'margin-0-24',
          html:('موردی پیدا نشد')
        },
        {
          flex:1,show:!!estelam && !!estelam.length,
          html:(
            <Table
              rowHeight={48}
              templates={{
                name:(row)=>{
                  return row.firstname + ' ' + row.lastname
                },
                register:(row)=>{
                  return (
                    <AIOButton
                      style={{fontFamily:'inherit'}}
                      className='button-1'
                      type='button'
                      text='ثبت'
                      onClick={()=>{
                        addPopup({
                          content:()=>{
                            return (
                              <BazdidKonandeForm 
                                type='add'
                                model={row}
                                onSubmit={(res)=>{
                                  if(res){this.reset()}
                                }}
                              />
                            )
                          },
                          title:'ثبت بازدید کننده',
                        })
                      }}
                    />
                  )
                }
              }}
              showHeader={false}
              model={estelam}
              columns={[
                {title:'',titleJustify:false,template:'name',subtext:'row.city + " - " + row.activityZone',minWidth:110},
                {title:'',field:'row.mobile',titleJustify:false,subtext:'row.cardCode',width:110},
                {title:'',template:'register',width:60}
              ]}
            />
          )
        }
      ]
    }
  }
  reset(){
    let {removePopup} = this.context;
    this.setState({
      estelam:false,
      estelamModel:{
        firstname:'',
        lastname:'',
        mobile:'',
        activityZone:'',
        company:'',
        city:'',
        phone:'',
      },
    })
    removePopup();
  }
  render(){
    return (
      <>
        <RVD
          layout={{
            column:[
              this.estelam_form_layout(),
              {size:12},
              this.estelam_layout()
            ]
          }}
        />
      </>
    )
  }
}
