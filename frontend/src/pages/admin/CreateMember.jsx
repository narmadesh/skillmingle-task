import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateMemberMutation } from '../../slices/memberApiSlice';

const CreateMember = () => {
    const {id} = useParams();
    const [create, { isLoading }] = useCreateMemberMutation();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await create((Object.fromEntries(new FormData(e.currentTarget)))).unwrap();
            toast.success('Member added successfully');
            navigate('/admin/team/'+id+'/members');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h1>Create new member</h1>
                <LinkContainer to={'/admin/team/'+id+'/members'}>
                    <Button variant='dark'>Back</Button>
                </LinkContainer>
            </div>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            name='name'
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-3'>
                        Save
                    </Button>
                    <input type="hidden" name="team" value={id} />
                    <input type="hidden" name="role" value='member' />
                    {isLoading && <Loader />}
                </Form>
            </FormContainer>
        </>
    );
};

export default CreateMember;
