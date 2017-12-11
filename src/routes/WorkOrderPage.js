//单个WorkOrder
import React from 'react';
import { connect } from 'dva';
import { Timeline, Icon ,Card,Input,Button,Form,Modal} from 'antd';
import { Cascader } from 'antd';
import {formatTime} from "../utils/format";
const FormItem = Form.Item;

function getOptions(categories){
  let options = [];
  categories.forEach(function (category) {
    let children = [];
    if(category.children&&category.children!=null&&category.children.length!=0) {
      category.children.forEach(function (child) {
          children.push({
            value: child.id,
            label: child.nodeName
          });
        }
      );
    }
    options.push({
      value:category.id,
      label:category.nodeName,
      children:children
    });
    }
  );
  return options;
}
function onChange(value) {
  console.log(value);
}

const DescriptionForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="新增回复"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="回复内容">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class WorkOrderPage extends React.Component{
  state = { visible: false,};

  renderPhotos(photos,categories){
    let that = this;

    if(photos==null||photos.length==0){
      return (<span/>)
    }
    let photoWall =[];
    photos.forEach((photo)=>{
      let photoCategory = "选择分类";
      if (photo.category&&photo.category!=null){
          photoCategory = photo.category.nodeName;
          if(photo.category.children&&photo.category.children!=null){
            photoCategory+=" / "+photo.category.children.nodeName;
          }
      }
      photoWall.push(
        <div>
          <img src = {`http://www.ufengtech.xyz${photo.url.substring(5)}`} style={{marginRight: '10px',marginTop:'5px'}} key={photo.id} />
          <Cascader options={getOptions(categories)} onChange={onChange} placeholder={photoCategory} />
        </div>
      )
    });
    return photoWall;

  }

  renderWorkOrder({description,time}){
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={1}>
        <div>
          <span color="blue">{formatTime(time)}</span><br/>
          {description}<br/>
       </div>
     </Timeline.Item>
    )
  }

  renderInquiry(data,categories){
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={data.sequenceId}>
        <div>
          <span color="blue">{data.time}</span><br/>
          {data.description}<br/>
          {this.renderPhotos(data.photos,categories)}
        </div>
      </Timeline.Item>
    )
  }

  renderDiagnostic(data){
    return (
      <Timeline.Item dot={<Icon type="medicine-box" style={{fontSize: '16px'}}/>} color="green" key={data.sequenceId}>
        {data.description}
      </Timeline.Item>
    )
  }

  renderSequence(sequences,categories){
    let chats =[];
    const that = this;
    sequences.forEach(function(data) {
      if(data.type=="inquiry"){
        chats.push(that.renderInquiry(data,categories))
      }else{
        chats.push(that.renderDiagnostic(data,categories))
      }
    });
    return chats;
  }

  onSubmit(){
    console.log("submit",this.state);
    let { dispatch } = this.props;
    let { description,date,time} = this.state.fields;
    let { workOrderId } = this.props.workOrder;
    dispatch({
      type:'workOrder/addChat',
      payload:{
        workOrderId:workOrderId,
        description:description,
        sequenceId:1,
        time:`${date}T${time}`,
        type:"diagnostic"
      }
    })
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleModalCancel = () => {
    this.setState({ visible: false });
  }

  handleModalCreate = () => {
    const form = this.form;
    const that = this;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // let { dispatch } =that.props;
      // dispatch({
      //   type:'category/update',
      //   payload:{
      //     id:that.state.updateId,
      //     name:values.name
      //   }
      // });
      console.log(values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  render(){
    const { description, time, chats} =this.props.workOrder;
    const { categories } = this.props.category;
    console.log(categories);

    return (
      <div style={{padding:'20px'}}>
        <DescriptionForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleModalCancel}
          onCreate={this.handleModalCreate}
        />
        <Timeline>
          {this.renderWorkOrder({description,time,categories})}
          {this.renderSequence(chats,categories)}
        </Timeline>
        <Button onClick={this.showModal.bind(this)}>新增回复</Button>
    </div>
    );
  }
}

function mapStateToProps({workOrder,category}) {
  return {workOrder,category};
}

export default connect(mapStateToProps)(WorkOrderPage);
