import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'

let todoItems=[];
todoItems.push({index: 1, value: "to do all hometasks for React/Angular course" , done:false });
todoItems.push({index: 2, value: "make peace in a whole world", done:false });
todoItems.push({index: 3, value: "to  be ellected as President of the USA" , done: false });
todoItems.push({index: 4, value: "to catch an unicorn behind the horn and become a ASP.NET idol" , done:false });


class TodoApp extends Component {
  constructor(props){
    super(props);
    this.state = {todoItems : todoItems}
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markToDoDone = this.markToDoDone.bind(this);
  }
  addItem(todoItem){
    todoItems.unshift({
      index: todoItems.length+1,
      value: todoItem.newItemValue, 
      done:false
    });
    this.setState({todoItems : todoItems});
  }
  removeItem(ItemIndex){
    todoItems.splice(ItemIndex,1);
    this.setState({todoItems : todoItems});
  }
  markToDoDone(ItemIndex){
    let task=todoItems[ItemIndex];
    todoItems.splice(ItemIndex,1);
    task.done =! task.done;
    task.done ? todoItems.push(task) : todoItems.unshift(task);
    this.setState({todoItems : todoItems});
  }
  render(){
    return(
      <div id = "main">
      <ToDoHeader />
      <TodoList items = {this.props.initItmes} 
                initItmes={todoItems}
                removeItem={this.removeItem}
                markToDoDone={this.markToDoDone}/>
      <ToDoForm addItem = {this.addItem}/>
      </div>
    );
  }
}

class ToDoHeader extends Component{
  render(){
    return <h1>Illuha,you have some tasks to be done!!</h1>
  }
}
class ToDoForm extends Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event){
    event.preventDefault();
    let newItemValue = this.refs.itemName.value;
    
    if(newItemValue){
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }

  componentDidMount(){
    this.refs.itemName.focus();
  }

  render(){
    return(
      // take class name from Bulma CSS
      <form ref ="form" onSubmit={this.onSubmit} className="form-inline"> 
        <input type = "text" ref="itemName" placeholder = "add new task..." className="form-control"/>
        <button type = "submit" className="button is-danger">Add</button>
      </form>
    );
  }
}
class TodoList extends Component{
  render(){
    let items = this.props.items.map((item,index) => {
      return(
        <TodoListItem key = {index}
                      index = {index}
                      item={item}
                      removeItem={this.props.removeItem}
                      markToDoDone = {this.props.markToDoDone}
        />
      );
    }); 
    return(
      <ul className="list-group">{items}</ul>
    );
  }
}

class TodoListItem extends Component{
  constructor(props){
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  onClickClose(){
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone(){
    let index = parseInt(this.props.index);
    this.props.markToDoDone(index);
  }
  render(){
    let todoClass = this.props.item.done ? "done" : "undone";
    return(
      <li className ="list-group-item">
      <div className={todoClass}>
        <span className = "glyphicon glyphicon-ok icon" aria-hidden = "true" onClick={this.onClickDone}></span>
        {this.props.item.value}
        <button type = "button" className="close" onClick={this.onClickClose}>&times;</button>
      </div>
      </li>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp initItmes={todoItems}/>
      </div>
    );
  }
}

export default App;
