import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useDeleteMemberMutation } from '../../slices/memberApiSlice';
import { useDetailMutation } from '../../slices/teamsApiSlice';

const TeamMembers = () => {
  const { id } = useParams();
  const [deleteMembers] = useDeleteMemberMutation();
  const [detail] = useDetailMutation();
  const [team, setTeam] = useState({});
  useEffect(() => {
    (async () => {
      setTeam(await detail(id).unwrap())
    })();
  }, []);

  const deleteMember = async (id) => {
    try {
      const res = await deleteMembers({ id: id }).unwrap();
      toast.success('Member deleted successfully');
      await getMember();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <h1>Members</h1>
        <LinkContainer to={"/admin/members/" + id + "/create"}>
          <Button variant='dark'>Add new member</Button>
        </LinkContainer>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              team?.users?.length > 0 && team?.users?.map((member, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>
                      <LinkContainer to={'/admin/members/' + member._id + '/edit'}><Button variant='info'>Edit</Button></LinkContainer>
                      <Button variant='danger' className='ms-2' onClick={() => deleteMember(member._id)}>Delete</Button>
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

export default TeamMembers;
