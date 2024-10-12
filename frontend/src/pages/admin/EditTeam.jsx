import { useCreateMutation, useDetailMutation, useUpdateMutation } from '../../slices/teamsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditTeam = (props) => {
    const { id } = useParams();
    const [update, { isLoading }] = useUpdateMutation();
    const [detail] = useDetailMutation();
    const [team,setTeam] = useState({});
    useEffect(() => {
        (async () => {
          setTeam(await detail(id).unwrap())
        })();
      }, [id]);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await update((Object.fromEntries(new FormData(e.currentTarget)))).unwrap();
            toast.success('Team updated successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h1>Edit team</h1>
                <LinkContainer to="/admin/dashboard">
                    <Button variant='dark'>Back</Button>
                </LinkContainer>
            </div>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-2'>
                        <Form.Label>Team name</Form.Label>
                        <Form.Control type='text' name='name' defaultValue={team.name} required />
                    </Form.Group>
                    <input type="hidden" value={id} name='id' />
                    <Button type='submit' variant='primary' className='mt-3'>
                        Update
                    </Button>

                    {isLoading && <Loader />}
                </Form>
            </FormContainer>
        </>
    );
};

export default EditTeam;
