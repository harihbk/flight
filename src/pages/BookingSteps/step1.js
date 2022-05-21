import React from 'react';
import Header from '../../components/header';
import { Container,Grid, Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Sidemenu from '../../components/Sidemenu/Sidemenu';

export default function step1() {
  return (
    <div>
        <Header headerDark={false}  />
        <Box className='bgshape bgcolor' style={{backgroundColor: '#21325d', height : 400}}>
            <Box className='bgimg' style={{ backgroundImage : '../../../assets/line.png' }}></Box>
        </Box>

        <Box className='bookingStep' style={{ marginTop : 70 }}>
            <Container maxWidth='lg' >
                <Grid container spacing={1}>
                    <Grid item md={9}>
                        {/* <Sidemenu /> */}
                    </Grid>
                    <Grid item md={3}>
                        <Sidemenu />
                    </Grid>
                </Grid>
            </Container>
        </Box>

    </div>
  )
}
