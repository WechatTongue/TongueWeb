import React from 'react';
import { connect } from 'dva';
import { Modal,Button } from 'antd';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;

function showDeleteConfirm(e) {
  //console.log(e);
  //console.log(e.target);
  let that = this;
  that.setState({
      ...that.state,
    deleteId:e.target.getAttribute("value")
  });
  confirm({
    title: 'Are you sure delete '+e.target.getAttribute("name")+'?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log(that.state);
      let { dispatch } =that.props;
      dispatch({
        type:'category/delete',
        payload:{
          id:that.state.deleteId
        }
      });
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}



const Create1Form = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="新增分类"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="类名">
            {getFieldDecorator('name', {
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

const Create2Form = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="新增分类"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="类名">
            {getFieldDecorator('name', {
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

const UpdateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="修改分类"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="类名">
            {getFieldDecorator('name', {
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



class CategoryPage extends React.Component {
  state = { Create1Modalvisible: false,Create2Modalvisible:false ,UpdateModalvisible:false ,DeleteModalvisible: false}


  render(){
    const { categories } = this.props.category;
    return (
      <div>
        <Button onClick={this.showCreate1Modal}>新增分类</Button>
        <Create1Form
          ref={this.saveFormRef}
          visible={this.state.Create1Modalvisible}
          onCancel={this.handleCreate1ModalCancel}
          onCreate={this.handleCreate1ModalCreate}
        />
        <Create2Form
          ref={this.saveFormRef}
          visible={this.state.Create2Modalvisible}
          onCancel={this.handleCreate2ModalCancel}
          onCreate={this.handleCreate2ModalCreate}
        />
        <UpdateForm
          ref={this.saveFormRef}
          visible={this.state.UpdateModalvisible}
          onCancel={this.handleUpdateModalCancel}
          onCreate={this.handleUpdateModalCreate}
        />
        {this.renderCategory(categories)}
      </div>
    );
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  showCreate1Modal = () => {
    this.setState({
      Create1Modalvisible: true,
    });
  }

  showCreate2Modal = () => {
    this.setState({
      Create2Modalvisible: true,
    });
  }

  showUpdateModal = (e) => {
    this.setState({
      UpdateModalvisible: true,
      updateId:e.target.getAttribute("value")
    });
    console.log(e.target.getAttribute("value"));
  }

  showDeleteModal = () => {
    this.setState({
      DeleteModalvisible: true,
    });
  }

  handleCreate1ModalCancel = () => {
    this.setState({ Create1Modalvisible: false });
  }

  handleCreate2ModalCancel = () => {
    this.setState({ Create2Modalvisible: false });
  }

  handleUpdateModalCancel = () => {
    this.setState({ UpdateModalvisible: false });
  }

  handleCreate1ModalCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ Create1Modalvisible: false });
    });
  }

  handleCreate2ModalCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ Create2Modalvisible: false });
    });
  }

  handleUpdateModalCreate = () => {
    const form = this.form;
    const that = this;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let { dispatch } =that.props;
      dispatch({
        type:'category/update',
        payload:{
          id:that.state.updateId,
          name:values.name
        }
      });
      form.resetFields();
      this.setState({ UpdateModalvisible: false });
    });
  }


  renderCategory(categories){
    let divs = [];
    let that = this;
    categories.forEach(function (data) {
      divs.push(
        <div key={data.id}>
          <p>
            {data.nodeName}
            <Button onClick={that.showCreate2Modal}>新增分类</Button>
            <Button onClick={that.showUpdateModal}>修改分类</Button>
          </p>
          {that.renderChildren(data.children)}
        </div>
      );
    });
    return divs;
  }

    renderChildren(children){
      let that = this;
      if(children==null||children.length==0){
        return (<span/>)
      }
      let child =[];
      children.forEach((data)=>{
        child.push(
          <p key={data.id}>
            {data.nodeName}
            <Button value={data.id} name={data.nodeName} onClick={that.showUpdateModal.bind(this)}>修改分类</Button>
            <Button value={data.id} name={data.nodeName} onClick={showDeleteConfirm.bind(this)}>删除分类</Button>
          </p>
        )
      });
      return child;
    }
}


function mapStateToProps({category}) {
  return {category};
}

export default connect(mapStateToProps)(CategoryPage);
