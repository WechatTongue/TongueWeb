import React from 'react';
import { connect } from 'dva';

class CategoryPage extends React.Component {
  render(){
    const { categories } = this.props.category;
    return (
      <div>
        {this.renderCategory(categories)}
      </div>
    );
  }

  renderCategory(categories){
    let divs = [];
    let that = this;
    categories.forEach(function (data) {
      divs.push(
        <div key={data.id}>
          <p>
            {data.nodeName}
          </p>
          {that.renderChildren(data.children)}
        </div>
      );
    });
    return divs;
  }

    renderChildren(children){
      if(children==null||children.length==0){
        return (<span/>)
      }
      let child =[];
      children.forEach((data)=>{
        child.push(
          <p key={data.id}>
            {data.nodeName}
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
