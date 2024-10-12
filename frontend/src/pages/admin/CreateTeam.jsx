import { useCreateMutation } from '../../slices/teamsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
    const [create, { isLoading }] = useCreateMutation();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await create((Object.fromEntries(new FormData(e.currentTarget)))).unwrap();
            toast.success('Team created successfully')
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h1>Create new team</h1>
                <LinkContainer to="/admin/dashboard">
                    <Button variant='dark'>Back</Button>
                </LinkContainer>
            </div>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-2'>
                        <Form.Label>Team name</Form.Label>
                        <Form.Control type='text' name='name' required />
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-3'>
                        Save
                    </Button>

                    {isLoading && <Loader />}
                </Form>
            </FormContainer>
        </>
    );
};

export default CreateTeam;
