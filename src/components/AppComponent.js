import React from "react";
import ContainerComponent from "./ContainerComponent";
import InputAddComponent from "./InputAddComponent";
import InputSearchComponent from "./InputSearchComponent";

class App extends React.Component {
    state = {
        todos: [],
        searchInputValue: '',
        isSearchInvisible: false,
        subItems: {},
    };
    checkChangeInput = (e) => {
        this.setState({searchInputValue: e.target.value})
    };
    showSearchComponent = (e) => {
        this.setState(state => ({
            isSearchInvisible: !state.isSearchInvisible
        }));
    };
    addToDoInState = (item) => {
        this.setState(state => ({todos: [...state.todos, item]}));
    };
    deleteToDoState = (item) => {
        this.setState(state => ({todos: [...state.todos].filter(param => item !== param.id)}))
    };
    deleteSubItemsState = (id, parentId) => {
        const arr = {
            ...this.state.subItems,
            [parentId]: this.state.subItems[parentId].filter(item => id !== item.id)
        };
        this.setState({subItems: arr});
    };
    editToDoItem = item => {
        this.setState(state => ({
            todos: state.todos.map(param => param.id === item.id ? {...item} : param)
        }));
    };
    editSubItem = (item, parentId) => {
        const arr = {
            ...this.state.subItems,
            [parentId]: this.state.subItems[parentId].map(param => {
                return param.id === item.id ? {...item} : param;
            })
        };
        this.setState({subItems: arr});
    };
    addSubItem = (id, item) => {
        this.setState(state => ({
                subItems: {
                    ...state.subItems,
                    [id]: [
                        ...state.subItems[id] || [],
                        item
                    ]
                }
            }
        ));
    };
    // TODO: деструктурировать props и state
    render() {
        return (
            <div className='main-container-app'>
                <div className='main-title'>ToDo</div>
                <InputAddComponent addTodo={this.addToDoInState} fullSize />
                <InputSearchComponent
                    handleChange={this.checkChangeInput}
                    searchInputValue={this.state.searchInputValue}
                    isVisible={this.state.isSearchInvisible}
                    showSearchComponent={this.showSearchComponent}
                />
                <ContainerComponent
                    searchInputValue={this.state.searchInputValue}
                    todos={this.state.todos}
                    deleteToDo={this.deleteToDoState}
                    editSubItem={this.editSubItem}
                    deleteSubItemsState={this.deleteSubItemsState}
                    editToDo={this.editToDoItem}
                    addSubItem={this.addSubItem}
                    subTodos={this.state.subItems}
                />
            </div>
        );
    }
}

export default App;