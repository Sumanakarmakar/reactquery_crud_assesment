import { Box, Typography } from '@mui/material'
import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
    <>

        {/* <footer className='footer'> */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '70vh',
        }}>
            <Box component='footer' className='footer'>
                <Typography>
                    Copyright <CopyrightIcon fontSize='small'/> 2024 | All Rights Reserved
                </Typography>
            </Box>
            </Box>
        {/* </footer> */}

    </>
  )
}

export default Footer