import logo from "./logo.svg";
import "./App.css";
import { Flex, Button, Input, Space } from "antd";

import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckSquare } from "react-icons/bs";

import useLocalStorage from 'use-local-storage';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [isDisplayAllTasks, setIsDisplayAllTasks] = useState(false);
  const [allTodos, setAllTodos] = useLocalStorage('toDoList', []);
  const [newTittle, setNewTittle] = useState("");
  const [completedToDos, setCompletedToDos] = useLocalStorage('completedToDos', []);
  const [allTasks, setAllTasks] = useLocalStorage('allTasks', []);


  const handleAddToDo = () => {
    let newToDoItem = {
      title: newTittle,
    };

    let updateToDoArr = [...allTodos];
    updateToDoArr.push(newToDoItem);
    setAllTodos(updateToDoArr);
    setNewTittle("");

  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setAllTodos(reducedTodo);
  };


  const handleCompleteTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filterItem = {
      ...allTodos[index], completedOn: completedOn
    }

    let updatedCompletedArr = [...completedToDos];
    updatedCompletedArr.push(filterItem);
    setCompletedToDos(updatedCompletedArr);
    handleDeleteTodo(index);
    // console.log(filterItem.completedOn);

  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodo = [...completedToDos];
    reducedCompletedTodo.splice(index, 1);
    setCompletedToDos(reducedCompletedTodo);
  }


  const handleAllTasks = () => {
    let updateAllTasks = [...allTodos, ...completedToDos];
    setAllTasks(updateAllTasks);
  }

  useEffect(() => {

    handleAllTasks();
  }, []);



  return (
    <div className="App">
      <h1>#todo</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <div>
          <Flex gap="small" wrap="wrap">
            <Button className={`btnA secondaryBtn ${isDisplayAllTasks === true && "active"
              }`} onClick={() => {
                setIsDisplayAllTasks(true);
                setIsCompleteScreen(false);
                handleAllTasks();
              }


              }>All</Button>


            <Button
              className={`btnA secondaryBtn ${(isCompleteScreen === false && isDisplayAllTasks === false) && "active"
                }`}
              onClick={() => {
                setIsDisplayAllTasks(false);
                setIsCompleteScreen(false);
              }}
            >
              Active
            </Button>


            <Button
              className={`btnA secondaryBtn ${isCompleteScreen === true && "active"
                }`}
              onClick={() => {
                setIsCompleteScreen(true);
                setIsDisplayAllTasks(false);
              }}
            >
              Completed
            </Button>


          </Flex>
        </div>
        <br />
        <div>
          <Input
            size="large"
            maxLength={255}
            allowClear
            value={newTittle}
            onChange={(val) => setNewTittle(val.target.value)}
            placeholder="Job To Do"
            onPressEnter={handleAddToDo}
            disabled={(isCompleteScreen === false && isDisplayAllTasks === true) || (isCompleteScreen === true && isDisplayAllTasks === false)}
          />
        </div>

        <br />
        <Button type="primary"
          className="btnA"
          onClick={handleAddToDo}
          disabled={(isCompleteScreen === false && isDisplayAllTasks === true) || (isCompleteScreen === true && isDisplayAllTasks === false)}
        >
          Add
        </Button>
        <br />
        <div className="todo-list">
          {/* completedTask */}
          {(isCompleteScreen === false && isDisplayAllTasks === false) && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                </div>
                <div>
                  <AiOutlineDelete className="icon"
                    title="Delete?"
                    onClick={() => handleDeleteTodo(index)} />

                  <BsCheckSquare className="check-icon"
                    onClick={() => handleCompleteTodo(index)}
                    title="Complete?" />
                </div>
              </div>
            );
          })}


          {(isCompleteScreen === true && isDisplayAllTasks === false) && completedToDos.map((item, index) => {
            return (
              <div className="todo-list-item completedTask" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className="icon"
                    title="Delete?"
                    onClick={() => handleDeleteCompletedTodo(index)} />


                </div>
              </div>
            );
          })}


          {(isCompleteScreen === false && isDisplayAllTasks === true) && allTasks.map((item, index) => {
            return (
              <div className={`todo-list-item ${item.completedOn !== null && "completedTask"
                } `} key={index}>

                <div>
                  <h3>{item.title}</h3>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                {/* <div>
                  <AiOutlineDelete className="icon"
                    title="Delete?"
                    onClick={() => handleDeleteCompletedTodo(index)} />


                </div> */}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
