import { useState, useEffect } from 'react';
import { useDeleteMutation, useListMutation } from '../../slices/teamsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [getTeams] = useListMutation();
  const [deleteTeams] = useDeleteMutation();
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    (async () => {
      await getTeam();
    })();
  }, []);

  async function getTeam()
  {
    const list = await getTeams().unwrap();
    setTeams(list)
  }

  const deleteTeam = async (id) => {
    try {
      const res = await deleteTeams({ id: id }).unwrap();
      toast.success('Team deleted successfully');
      await getTeam();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <h1>Teams</h1>
        <LinkContainer to="/admin/teams/create">
          <Button variant='dark'>Create new team</Button>
        </LinkContainer>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Team size</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              teams.length > 0 && teams.map((team, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{team.name}</td>
                    <td>{team?.user?.length ?? 0}</td>
                    <td>
                      <LinkContainer to={'/admin/team/' + team._id + '/edit'}><Button variant='info'>Edit</Button></LinkContainer>
                      <Button variant='danger' className='ms-2' onClick={() => deleteTeam(team._id)}>Delete</Button>
                      <LinkContainer to={'/admin/team/' + team._id + '/members'}><Button variant='dark' className='ms-2'>View members</Button></LinkContainer>
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

export default AdminDashboard;
