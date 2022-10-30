import React , {Component} from 'react';
import Form from 'aio-form-react';
export default class FormInterface extends Component{
  render(){
    return (
      <Form 
        {...{
          inlineLabel:true,
          labelStyle:{width:80,justifyContent:'end'},
          inputStyle:{height:30},
          rowStyle:{marginBottom:16},
          submitText:'ثبت'
        }} 
        {...this.props}
      />
    )
  }
}