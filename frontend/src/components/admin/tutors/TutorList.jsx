// TutorList.jsx
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Button } from '@mui/material';
import { adminAxiosInstance as axios } from  '../../../api/axios'

const TutorList = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axios.get('/admintutor/approved-tutors/');
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const handleBlockUnblock = async (id, currentStatus) => {
    try {
      await axios.patch(`/admintutor/tutors/${id}/`, { is_active: !currentStatus });
      fetchTutors();
    } catch (error) {
      console.error('Error updating tutor status:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Serial No.', width: 100 },
    {
      field: 'profile_pic',
      headerName: 'Profile',
      width: 100,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.email} />
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'joined_at',
      headerName: 'Joined At',
      width: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color={params.row.is_active ? 'secondary' : 'primary'}
            onClick={() => handleBlockUnblock(params.row.id, params.row.is_active)}
          >
            {params.row.is_active ? 'Block' : 'Unblock'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {/* Implement view details logic */}}
          >
            View Details
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tutors}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default TutorList;