import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" , isclear: false, isEditing: false},
    { id: 1, content: "코딩 공부하기" , isclear: false, isEditing: false},
    { id: 2, content: "잠 자기" , isclear: false, isEditing: false},
  ]);

  return (
    <div className="todo-container">
      <Header></Header>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function Header(){
  return(
    <>
      <h1>나만의 Todo App 만들기</h1>
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue, isclear: false , isEditing: false};
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList}/>
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <li>
  <div className="todo-content">
    <input
      type="checkbox"
      checked={todo.isclear}
      onChange={() => {
        setTodoList((prev) =>
          prev.map((el) =>
            el.id === todo.id ? { ...el, isclear: !el.isclear } : el
          )
        );
      }}
    />
    {!todo.isEditing ? (
      <span className="todo-text" style={{ textDecoration: todo.isclear ? "line-through" : "none" }}>
        {todo.content}
      </span>
    ) : (
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    )}
  </div>

  <div className="todo-buttons">
    {!todo.isEditing ? (
      <button
        className="button-edit"
        onClick={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, isEditing: true } : el
            )
          );
        }}
      >
        수정
      </button>
    ) : (
      <button
        className="button-edit"
        onClick={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id
                ? { ...el, content: inputValue, isEditing: false }
                : el
            )
          );
        }}
      >
        완료
      </button>
    )}
    <button
      className="button-delete"
      onClick={() => {
        setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
      }}
    >
      삭제
    </button>
  </div>
</li>

  );
}

export default App;
