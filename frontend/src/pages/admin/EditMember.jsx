import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailMemberMutation, useUpdateMemberMutation } from '../../slices/memberApiSlice';
import { useEffect, useState } from 'react';

const EditMember = () => {
    const { id } = useParams();
    const [update, { isLoading }] = useUpdateMemberMutation();
    const [detail] = useDetailMemberMutation();
    const [member, setMember] = useState({});
    useEffect(() => {
        (async () => {
            setMember(await detail(id).unwrap())
        })();
    }, [id]);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await update((Object.fromEntries(new FormData(e.currentTarget)))).unwrap();
            toast.success('Member updated successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h1>Edit member</h1>
                <LinkContainer to={'/admin/team/' + member?.teams && member?.teams?.length > 0 ? member?.teams[0] : '' + '/members'}>
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
                            defaultValue={member.name}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            defaultValue={member.email}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                        ></Form.Control>
                    </Form.Group>
                    <input type="hidden" name="id" value={id} />
                    <Button type='submit' variant='primary' className='mt-3'>
                        Save
                    </Button>
                    {isLoading && <Loader />}
                </Form>
            </FormContainer>
        </>
    );
};

export default EditMember;
