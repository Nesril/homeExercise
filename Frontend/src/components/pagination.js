import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

const Paginations = ({ EventsPerPage, totalEvents, paginate }) => {
  const [page, setPage] = React.useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEvents / EventsPerPage); i++) {
    pageNumbers.push(i);
  }
  
    const handleChange = (event, value) => {
        setPage(value);
        paginate(value)
    };
    console.log(page,EventsPerPage);

  
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px",color:"white"}}>
        <Pagination count={pageNumbers.length}  page={page} onChange={handleChange} color="primary" />
    </div>
  );
};

export default Paginations;