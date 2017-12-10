import React from 'react';
import { connect } from 'dva';
import { Modal,Button } from 'antd';
import { Form, Input } from 'antd';

import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

const FormItem = Form.Item;
const confirm = Modal.confirm;

function showDeleteConfirm(e) {
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
    console.log(categories);
    return (
      <div>
        <Button>新增分类</Button>
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
        <Tree
          // checkable
          // onExpand={this.onExpand}
          // expandedKeys={this.state.expandedKeys}
          // autoExpandParent={this.state.autoExpandParent}
          // onCheck={this.onCheck}
          // checkedKeys={this.state.checkedKeys}
          // onSelect={this.onSelect}
          // selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(categories)}
        </Tree>
      </div>
    );
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.nodeName} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.nodeName} key={item.id} dataRef={item}/>;
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  showCreate2Modal = () => {
    this.setState({
      Create2Modalvisible: true,
      addId:e.target.getAttribute("value")
    });
  }

  showUpdateModal = (e) => {
    this.setState({
      UpdateModalvisible: true,
      updateId:e.target.getAttribute("value")
    });
  }

  showDeleteModal = () => {
    this.setState({
      DeleteModalvisible: true,
    });
  }

  handleCreate2ModalCancel = () => {
    this.setState({ Create2Modalvisible: false });
  }

  handleUpdateModalCancel = () => {
    this.setState({ UpdateModalvisible: false });
  }

  handleCreate2ModalCreate = () => {
    console.log("create2");
    const form = this.form;
    const that = this;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let { dispatch } =that.props;
      dispatch({
        type:'category/add2',
        payload:{
          id:that.state.addId,
          name:values.name
        }
      });
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
      if(data.children==null||data.children.length==0){

      }
      divs.push(
        <div key={data.id}>
          <p>
            {data.nodeName}
            <Button value={data.id} name={data.nodeName} onClick={that.showCreate2Modal}>新增分类</Button>
            <Button value={data.id} name={data.nodeName} onClick={that.showUpdateModal}>修改分类</Button>
            {((item)=>{
              console.log(item);
              if((!item.children)||(item.children===null)||(item.children.length===0)){
                return(
                  <Button>删除分类</Button>
                )
              }
            })(data)}
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
