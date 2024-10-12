import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailTodoMutation, useUpdateTodoMutation } from '../../slices/todoApiSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const EditTodo = () => {
    const { id } = useParams();
    const [update, { isLoading }] = useUpdateTodoMutation();
    const navigate = useNavigate();
    const [detail] = useDetailTodoMutation();
    const [todo, setTodo] = useState({});
    useEffect(() => {
        (async () => {
            setTodo(await detail(id).unwrap())
        })();
    }, [id]);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await update(Object.fromEntries(new FormData(e.currentTarget))).unwrap();
            toast.success('Todo added successfully');
            navigate('/member/todos');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h1>Edit</h1>
                <LinkContainer to={'/member/todos'}>
                    <Button variant='dark'>Back</Button>
                </LinkContainer>
            </div>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='titlw'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            defaultValue={todo.title}
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='task'>
                        <Form.Label>Task</Form.Label>
                        <Form.Control as={"textarea"}
                            name='task'
                            required
                            defaultValue={todo.task}
                        ></Form.Control>
                    </Form.Group>
                    <input type="hidden" name='id' value={todo._id} />
                    <Button type='submit' variant='primary' className='mt-3'>
                        Save
                    </Button>
                    {isLoading && <Loader />}
                </Form>
            </FormContainer>
        </>
    );
};

export default EditTodo;
