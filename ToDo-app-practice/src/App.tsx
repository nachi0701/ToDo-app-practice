import { useState } from 'react'
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dateAdded: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
 
  const addTodo = () => {
    if (input.trim() !=='') {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false,
        dateAdded: new Date()
      }]);
      setInput('');
    }
  };
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo 
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: number, text:string) => {
    setEditingId(id);
    setEditText(text);
  };

  const updateTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text:editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="App">
      <h1>Todo リスト</h1>
      <div>
        <input
         value={input}
         onChange={(e) => setInput(e.target.value)}
         placeholder="新しいTodoを入力"
        />
        <button onClick={addTodo}>追加</button>
        </div>
        <ul>
          {todos.map((todo: Todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <div>
                  <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => updateTodo(todo.id)}>完了</button>
                  <button onClick={() => setEditingId(null)}>キャンセル</button>
                </div>
              ) : (
                <>
              <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                fontSize: '18px',
                padding: '10px',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <span style={{ marginLeft: '10px', fontStyle: 'italic', fontSize: '14px'}}>
                {todo.dateAdded.toLocaleDateString()}{/* Display the date */}
              </span>
              <button onClick={() => startEditing(todo.id, todo.text)}>編集</button>
              <button onClick={() => deleteTodo(todo.id)}>削除</button>
            </>
           )}
            </li>
          ))}
        </ul>
      </div>
  );
}

export default App