import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDeleteTodoMutation, useListTodoMutation } from '../../slices/todoApiSlice';

const TodoList = () => {
  const [getTodos] = useListTodoMutation();
  const [deleteTodos] = useDeleteTodoMutation();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    (async () => {
      await getTodo();
    })();
  }, []);

  async function getTodo() {
    const list = await getTodos().unwrap();
    setTodos(list)
  }

  const deleteTodo = async (id) => {
    try {
      const res = await deleteTodos({ id: id }).unwrap();
      toast.success('Todo deleted successfully');
      await getTodo();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <h1>Todos</h1>
        <LinkContainer to="/member/todos/create">
          <Button variant='dark'>Create new todo</Button>
        </LinkContainer>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Task</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              todos.length > 0 && todos.map((todo, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{todo.title}</td>
                    <td>{todo.task}</td>
                    <td>
                      <LinkContainer to={'/member/todos/' + todo._id + '/edit'}><Button variant='info'>Edit</Button></LinkContainer>
                      <Button variant='danger' className='ms-2' onClick={() => deleteTodo(todo._id)}>Delete</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoList;
