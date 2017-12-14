//单个WorkOrder
import React from 'react';
import { connect } from 'dva';
import { Timeline, Icon ,Card,Input,Button,Form,Modal} from 'antd';
import { Cascader } from 'antd';
import {formatTime} from "../utils/format";
const FormItem = Form.Item;

function getOptions(categories,photoId){
  let options = [];
  categories.forEach(function (category) {
    let children = [];
    if(category.children&&category.children!=null&&category.children.length!=0) {
      category.children.forEach(function (child) {
          children.push({
            photoId:photoId,
            value: child.id,
            label: child.nodeName
          });
        }
      );
    }
    options.push({
      photoId:photoId,
      value:category.id,
      label:category.nodeName,
      children:children
    });
    }
  );
  return options;
}
function onChange(value,options) {
  let that = this;
  let { workOrderId } =this.props.workOrder;
  console.log("onChange","value",value,"options",options);
  console.log(options[options.length-1]);
  let { dispatch } =that.props;
  dispatch({
    type:'workOrder/updatePhotoCategory',
    payload:{
      id:options[options.length-1].photoId,
      categoryId:options[options.length-1].value,
      workOrderId:workOrderId
    }
  });

}

const CollectionCreateForm = Form.create()(
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
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入回复内容!' }],
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
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    let { workOrderId } =this.props.workOrder;
    console.log(workOrderId);
    const form = this.form;
    const that = this;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let { dispatch } =that.props;
      dispatch({
        type:'workOrder/addChat',
        payload:{
          workOrderId:workOrderId,
          description:values.content,
          type:"diagnostic",
          photos: []
        }
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  getPhotoCategory(categoryId,categories) {
    console.log("categoryId", categoryId);
    if (categoryId == 1) {
      return "选择分类";
    }
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      let photoCategory = category.nodeName;
      if (category.id == categoryId) {
        return photoCategory;
      }
      if (category.children && category.children != null && category.children.length != 0) {
        for (let j = 0; j < category.children.length; j++) {
          let child = category.children[j];
          if (child.id == categoryId) {
            console.log("ok");
            photoCategory += " / " + child.nodeName;
            return photoCategory;
          }
        }
      }
    }
    return "选择分类";
  }


  renderPhotos(photos,categories){
    let that = this;

    if(photos==null||photos.length==0){
      return (<span/>)
    }
    let photoWall =[];
    photos.forEach((photo)=>{
      let photoCategory = this.getPhotoCategory(photo.categoryId,categories);
      photoWall.push(
        <div>
          <img src = {`http://www.ufengtech.xyz${photo.url.substring(5)}`} style={{marginRight: '10px',marginTop:'5px'}} key={photo.id} />
          <Cascader title={photo.id} options={getOptions(categories,photo.id)} onChange={onChange.bind(this)} placeholder={photoCategory} />
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

  saveFormRef = (form) => {
    this.form = form;
  }

  render(){
    const { description, time, chats} =this.props.workOrder;
    const { categories } = this.props.category;
    console.log("chats",chats);

    return (
      <div style={{padding:'20px'}}>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
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
