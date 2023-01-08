import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Typography, Grid } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';


function TripSkeleton() {
    return (
        <>
            <Box style={{ background: '#fff', borderRadius: 10, marginTop: 20, elevation: 2, padding: 15 }}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Typography className='depart_place' style={{ marginBottom: 0 }}><Skeleton />  </Typography>
                        <Box component={'div'} className="flight_timerow">
                            <Box className='time'>
                                <div className='icons'>
                                    <Skeleton height={30} />
                                </div>
                                <Typography className='start_time timeText'> <Skeleton style={{ width: 60 }} /> </Typography>
                                <ArrowRightAlt className='miniArrow' />
                                <Typography className='end_time timeText'> <Skeleton style={{ width: 60 }} /></Typography>
                            </Box>
                            <Box className='price'>
                                {/* ₹  {flight?.totalPriceList[0]?.totalamount}  */}
                            </Box>
                        </Box>
                        <Typography className='details_text'> <Skeleton width={100} /> </Typography>
                    </Grid>
                    <Grid item md={4} >
                        <Typography className='retun_place' style={{ marginBottom: 0 }}> <Skeleton /> </Typography>
                        <Box component={'div'} className="flight_timerow">
                            <Box className='time'>
                                <div className='icons'>
                                    <Skeleton height={30} />
                                </div>
                                <Typography className='start_time timeText'>
                                    <Skeleton style={{ width: 60 }} />
                                </Typography>
                                <ArrowRightAlt className='miniArrow' />
                                <Typography className='end_time timeText' ><Skeleton style={{ width: 60 }} /></Typography>
                            </Box>
                            <Box className='price'>
                                {/* ₹ {flight?.frmt[1]?.dept_obj?.name}  */}
                            </Box>
                        </Box>
                        <Typography className='details_text'><Skeleton width={100} /></Typography>
                    </Grid>
                    <Grid item md={4} >
                        <Typography className='total_price'><Skeleton /></Typography>
                        <Typography className='details_text'><Skeleton /></Typography>
                        <Skeleton style={{ height: 37 }} />
                    </Grid>
                </Grid>
            </Box>

            <Box className='flightlist_wrap' style={{ background: '#fff', borderRadius: 10, marginTop: 20, elevation: 2 }}>
                <Box className='chooseFlightSect' style={{ padding: 10, marginTop: 0, borderBottomWidth: 1, borderColor: '#ccc', borderBottomStyle: 'solid' }}>
                    <Typography className='journerydate journey_start' component={'div'}>
                        <Skeleton width={200} />
                        <ArrowRightAlt className='miniArrow dark' />
                        <Skeleton width={200} />
                    </Typography>
                    <Box component={'div'} className='tablehead'>
                        <Typography>Departure</Typography>
                        <Typography>Duration</Typography>
                        <Typography>Arrival</Typography>
                        <Typography>Price</Typography>
                        <Typography className='check'></Typography>
                    </Box>
                </Box>


                <Box className='' style={{ padding: 10 }}>
                    {/* <Skeleton /> */}
                    <Grid container >
                        <Grid Item md={3} style={{ paddingRight: 15 }}>
                            <Skeleton style={{ height: 40 }} />
                            <Skeleton />
                            <Skeleton />
                        </Grid>
                        <Grid Item md={2} style={{ paddingRight: 15 }}>
                            <Skeleton />
                            <Skeleton />
                        </Grid>
                        <Grid Item md={2} style={{ paddingRight: 15 }}>
                            <Skeleton />
                            <Skeleton />
                        </Grid>
                        <Grid Item md={2} style={{ paddingRight: 15 }}>
                            <Skeleton />
                            <Skeleton />
                        </Grid>
                        <Grid Item md={3} style={{ paddingRight: 15 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </Grid>
                    </Grid>
                </Box>

            </Box>

            <Box className='' style={{ background: '#fff', borderRadius: 10, marginTop: 20, elevation: 2, padding: 10, marginBlock : 10 }}>
                {/* <Skeleton /> */}
                <Grid container >
                    <Grid Item md={3} style={{ paddingRight: 15 }}>
                        <Skeleton style={{ height: 40 }} />
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={2} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={2} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={2} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={3} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                </Grid>
            </Box>

            <Box className='' style={{ background: '#fff', borderRadius: 10, marginTop: 20, elevation: 2, padding: 10, marginBlock : 10 }}>
                {/* <Skeleton /> */}
                <Grid container >
                    <Grid Item md={3} style={{ paddingRight: 15 }}>
                        <Skeleton style={{ height: 40 }} />
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={2} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={2} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={2} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                    <Grid Item md={3} style={{ paddingRight: 15 }}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default TripSkeleton
