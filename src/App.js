import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import TodoItem from './component/Todoitem';
import tick from './img/tick.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem:'',
      todoItems:
        [
          { title: 'Mua bim bim', isComplete: true },
          { title: 'Đi đá bóng' },
          { title: 'Đi đổ xăng' }
        ]
    }

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  onItemClick(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)]

      });
    };
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text || text.trim() === '') {
        return;
      }
      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems
        ]
      });
    }

  }

  onChange(event){
    this.setState({
      newItem: event.target.value
    });
  }

  render() {
    const { todoItems, newItem } = this.state;
    if (todoItems.length > 0) {
      return (
        <div className="App">
          <div className="Header">
            <img src={tick} width={32} height={32} />
            <input type="text"
             placeholder="Add a new item"
             value={newItem}
             onChange = {this.onChange}
              onKeyUp={this.onKeyUp} />
          </div>
          {
            todoItems.map((item, index) =>
              <TodoItem key={index} item={item} onClick={this.onItemClick(item)} />)
          }

        </div>
      );
    } else {
      return (
        <div className="App">
          Nothing here
        </div>
      );
    }

  }
}

export default App;
