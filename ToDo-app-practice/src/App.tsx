import { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dateAdded: Date;
  deadline?: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [editDeadline, setEditDeadline] = useState<string>('');

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false,
        dateAdded: new Date(),
        deadline: deadline || undefined,
      }]);
      setInput('');
      setDeadline('');
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

  const startEditing = (id: number, text: string, deadline: string) => {
    setEditingId(id);
    setEditText(text);
    setEditDeadline(deadline || '');
  };

  const updateTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText, deadline: editDeadline || todo.deadline } : todo
    ));
    setEditingId(null);
    setEditText('');
    setEditDeadline('');
  };

  return (
    <div className="App">
      <h1>Todo リスト</h1>
      <div className="input-container">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="新しいTodoを入力"
        />
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
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
                <input
                  type="date"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id)}>完了</button>
                <button onClick={() => setEditingId(null)}>キャンセル</button>
              </div>
            ) : (
              <>
                <span
                  className="todo-text"
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
                <span style={{ marginLeft: '10px', fontStyle: 'italic', fontSize: '14px' }}>
                  {todo.dateAdded.toLocaleDateString()} {/* Display the date */}
                </span>
                {todo.deadline && (
                  <span style={{ marginLeft: '10px', fontSize: '14px', color: 'red' }}>
                    {todo.deadline}
                  </span>
                )}
                <button className="edit-button" onClick={() => startEditing(todo.id, todo.text, todo.deadline || '')}>編集</button>
                <button className="delete-button" onClick={() => deleteTodo(todo.id)}>削除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;