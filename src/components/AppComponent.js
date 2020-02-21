import React from "react";
import ContainerComponent from "./ContainerComponent";
import InputAddComponent from "./InputAddComponent";
import InputSearchComponent from "./InputSearchComponent";
import {connect} from 'react-redux'
import {
  addToDoInState,
  deleteToDoState,
  editToDoItem,
  addSubItem,
  deleteSubItemsState,
  editSubItem,
} from '../actions/appAction'

class App extends React.Component {
  state = {
    searchInputValue: '',
    isSearchInvisible: false,
  };
  checkChangeInput = (e) => {
    this.setState({searchInputValue: e.target.value})
  };
  showSearchComponent = (e) => {
    this.setState(state => ({
      isSearchInvisible: !state.isSearchInvisible
    }));
  };
  // addToDoInState = (item) => {
  //     this.setState(state => ({todos: [...state.todos, item]}));
  // };
  // deleteToDoState = (item) => {
  //     this.setState(state => ({todos: [...state.todos].filter(param => item !== param.id)}))
  // };
  // deleteSubItemsState = (id, parentId) => {
  //     const arr = {
  //         ...this.state.subItems,
  //         [parentId]: this.state.subItems[parentId].filter(item => id !== item.id)
  //     };
  //     this.setState({subItems: arr});
  // };
  // editToDoItem = item => {
  //     this.setState(state => ({
  //         todos: state.todos.map(param => param.id === item.id ? {...item} : param)
  //     }));
  // };
  // editSubItem = (item, parentId) => {
  //     const arr = {
  //         ...this.state.subItems,
  //         [parentId]: this.state.subItems[parentId].map(param => {
  //             return param.id === item.id ? {...item} : param;
  //         })
  //     };
  //     this.setState({subItems: arr});
  // };
  // addSubItem = (id, item) => {
  //     this.setState(state => ({
  //             subItems: {
  //                 ...state.subItems,
  //                 [id]: [
  //                     ...state.subItems[id] || [],
  //                     item
  //                 ]
  //             }
  //         }
  //     ));
  // };
  // TODO: деструктурировать props и state
  render() {
    console.log(this.props);
    const {
      todos,
      addToDoInState,
      deleteToDoState,
      editSubItem,
      deleteSubItemsState,
      editToDoItem,
      addSubItem,
      subItems
    } = this.props;
    return (
      <div className='main-container-app'>
        <div className='main-title'>ToDo</div>
        <InputAddComponent addTodo={addToDoInState} fullSize/>
        <InputSearchComponent
          handleChange={this.checkChangeInput}
          searchInputValue={this.state.searchInputValue}
          isVisible={this.state.isSearchInvisible}
          showSearchComponent={this.showSearchComponent}
        />
        <ContainerComponent
          searchInputValue={this.state.searchInputValue}
          todos={todos}
          deleteToDo={deleteToDoState}
          editSubItem={editSubItem}
          deleteSubItemsState={deleteSubItemsState}
          editToDo={editToDoItem}
          addSubItem={addSubItem}
          subTodos={subItems}
        />
      </div>
    );
  }
}


const mapStateToProps = store => {
  console.log(store)
  const {
    dataReducer: {
      todos = [
        // onEdit: false,
        // inputValue: '123',
        // id: null,
        // checked: false,
        // isSubInputVisible: false,
      ],
      searchInputValue = '',
      isSearchInvisible = false,
      subItems = [
        // onEdit: false,
        // inputValue: '321',
        // id: null,
        // checked: false,
        // isSubInputVisible: false
      ]
    },
  } = store;

  return {
    todos,
    subItems,
    searchInputValue,
    isSearchInvisible
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToDoInState: item => dispatch(addToDoInState(item)),
    deleteToDoState: item => dispatch(deleteToDoState(item)),
    editToDoItem: item => dispatch(editToDoItem(item)),
    addSubItem: (id, item) => dispatch(addSubItem(id, item)),
    deleteSubItemsState: (id, parentId) => dispatch(deleteSubItemsState(id, parentId)),
    editSubItem: (item, parentId) => dispatch(editSubItem(item, parentId)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

// export default App;
