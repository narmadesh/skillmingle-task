import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateDocumentMutation } from '../../slices/documentApiSlice';

const CreateDocument = () => {
    const [create, { isLoading }] = useCreateDocumentMutation();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await create(new FormData(e.currentTarget)).unwrap();
            toast.success('Document added successfully');
            navigate('/member/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h1>Add new document</h1>
                <LinkContainer to={'/member/dashboard'}>
                    <Button variant='dark'>Back</Button>
                </LinkContainer>
            </div>
            <FormContainer>
                <Form encType='multipart/form-data' onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='name'
                            name='name'
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='file'>
                        <Form.Label>File</Form.Label>
                        <Form.Control
                            type='file'
                            name='file'
                            required
                        ></Form.Control>
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

export default CreateDocument;
