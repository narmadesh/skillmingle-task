import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDeleteDocumentMutation, useListDocumentsMutation } from '../../slices/documentApiSlice';

const MemberDashboard = () => {
  const [getDocuments] = useListDocumentsMutation();
  const [deleteDocuments] = useDeleteDocumentMutation();
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    (async () => {
      await getDocument();
    })();
  }, []);

  async function getDocument()
  {
    const list = await getDocuments().unwrap();
    setDocuments(list)
  }

  const deleteDocument = async (id) => {
    try {
      const res = await deleteDocuments({ id: id }).unwrap();
      toast.success('Document deleted successfully');
      await getDocument();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <h1>Documents</h1>
        <LinkContainer to="/member/documents/create">
          <Button variant='dark'>Create new document</Button>
        </LinkContainer>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>File</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              documents.length > 0 && documents.map((document, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{document.name}</td>
                    <td><a href={document?.file} target='_blank'>{document?.file?.replace('uploads/','')}</a></td>
                    <td>
                      <Button variant='danger' className='ms-2' onClick={() => deleteDocument(document._id)}>Delete</Button>
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

export default MemberDashboard;
