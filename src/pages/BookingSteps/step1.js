import React, { useState} from 'react';
import { Container,Grid, Box, Typography, Button } from '@mui/material';

export default function Step1(){
    return (
        <div>
            <Box className='flightlist'>
                <Box className='flightlist_item'>
                    <Box className='fdetails_inner'>
                        <Box className='toprow' style={{ display : 'flex', justifyContent : 'space-between' }}>
                            <Box className='mainplace'>
                                <Box className='place' style={{ display : 'flex', alignItems : 'center', columnGap : 8 }}>
                                    <Typography style={{ fontWeight : '600', fontSize : 17 }}>{'New Delhi'}</Typography>
                                    <Typography style={{ fontWeight : '600', fontSize : 17 }}>{'Chennai'}</Typography>
                                </Box>
                                <Box className='flightfeature' style={{ display : 'flex', alignItems : 'center', columnGap : 4 }}>
                                    <Typography style={{ fontSize : 10 }}>{'Economy'}</Typography>
                                    {'>'}
                                    <Typography className='' style={{ fontSize : 10 , textTransform : 'uppercase' }}>{'Saver'}</Typography>
                                </Box>
                            </Box>
                            <Box className='card_action' style={{ textAlign : 'right' }}>
                                <Button className='viewfare'>{'View Fare Rules'}</Button>
                                <Button className='cancelfee'>{'Cancellation Fees Apply'}</Button>
                                <Typography style={{ fontSize : 10, marginTop : 5 }}>{'Economy, Free Meal, Refundable'}</Typography>
                            </Box>
                        </Box>
                        <Box className='journeydetail bottom' style={{ display : 'flex', columnGap : 10, marginTop : 20, justifyContent: 'space-between' }}>
                            <Box className='leftcol' style={{ display : 'flex', columnGap : 10, justifyContent : 'space-between', width : '78%' }}>
                                <Box className='brand' style={{ width : 60 }}>
                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight'  style={{ width : 30 }}/>
                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                </Box>
                                <Box className='time_place first'>
                                    <Typography className='jsdate' style={{ fontSize : 10 }}>{'Wed Jun 01 2022'}</Typography>
                                    <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>ND 20:40</Typography>
                                    <Typography className='jplace_text'>Netaji Subhash Chandra Bose International Airport</Typography>
                                </Box>
                                <Box className='hours'>
                                    <Typography className='hrs hours_border' style={{fontSize : 18, fontWeight : '600'}}>4h 40m</Typography>
                                    <Typography style={{ fontSize : 10 }}>{'Flight Duration'}</Typography>
                                </Box>
                                <Box className='time_place'>
                                    <Typography className='jsdate'  style={{ fontSize : 10 }}>{'Thu Jun 02 2022'}</Typography>
                                    <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>MAS 4:00</Typography>
                                    <Typography className='jplace_text'>Netaji Subhash Chandra Bose International Airport</Typography>
                                </Box>
                            </Box>
                            <Box className='checkin_col' style={{ display : 'flex', columnGap : 10, justifyContent: 'space-between', width : '22%' }}>
                                <Box className='checkin'>
                                    <Typography className='title' style={{fontSize : 12, fontWeight : '300' }}>Check-in</Typography>
                                    <Typography style={{fontSize : 10,  fontWeight : '200'}}>15 kgs{'\n'} {'\n'}  {'(1 peace only)'}</Typography>
                                </Box>
                                <Box className='checkin checkout'>
                                    <Typography className='title' style={{fontSize : 12, fontWeight : '300' }}>Check-out</Typography>
                                    <Typography style={{fontSize : 10,  fontWeight : '200'}}>7 kgs{'\n'}  {'(1 peace only)'}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className='flightlist_item'>
                    <Box className='fdetails_inner'>
                        <Box className='toprow' style={{ display : 'flex', justifyContent : 'space-between' }}>
                            <Box className='mainplace'>
                                <Box className='place' style={{ display : 'flex', alignItems : 'center', columnGap : 8 }}>
                                    <Typography style={{ fontWeight : '600', fontSize : 17 }}>{'New Delhi'}</Typography>
                                    <Typography style={{ fontWeight : '600', fontSize : 17 }}>{'Chennai'}</Typography>
                                </Box>
                                <Box className='flightfeature' style={{ display : 'flex', alignItems : 'center', columnGap : 4 }}>
                                    <Typography style={{ fontSize : 10 }}>{'Economy'}</Typography>
                                    {'>'}
                                    <Typography className='' style={{ fontSize : 10 , textTransform : 'uppercase' }}>{'Saver'}</Typography>
                                </Box>
                            </Box>
                            <Box className='card_action' style={{ textAlign : 'right' }}>
                                <Button className='viewfare'>{'View Fare Rules'}</Button>
                                <Button className='cancelfee'>{'Cancellation Fees Apply'}</Button>
                                <Typography style={{ fontSize : 10, marginTop : 5 }}>{'Economy, Free Meal, Refundable'}</Typography>
                            </Box>
                        </Box>
                        <Box className='journeydetail bottom' style={{ display : 'flex', columnGap : 10, marginTop : 20, justifyContent: 'space-between' }}>
                            <Box className='leftcol' style={{ display : 'flex', columnGap : 10, justifyContent : 'space-between', width : '78%' }}>
                                <Box className='brand' style={{ width : 60 }}>
                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight'  style={{ width : 30 }}/>
                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                </Box>
                                <Box className='time_place first'>
                                    <Typography className='jsdate' style={{ fontSize : 10 }}>{'Wed Jun 01 2022'}</Typography>
                                    <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>ND 20:40</Typography>
                                    <Typography className='jplace_text'>Netaji Subhash Chandra Bose International Airport</Typography>
                                </Box>
                                <Box className='hours'>
                                    <Typography className='hrs hours_border' style={{fontSize : 18, fontWeight : '600'}}>4h 40m</Typography>
                                    <Typography style={{ fontSize : 10 }}>{'Flight Duration'}</Typography>
                                </Box>
                                <Box className='time_place'>
                                    <Typography className='jsdate'  style={{ fontSize : 10 }}>{'Thu Jun 02 2022'}</Typography>
                                    <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>MAS 4:00</Typography>
                                    <Typography className='jplace_text'>Netaji Subhash Chandra Bose International Airport</Typography>
                                </Box>
                            </Box>
                            <Box className='checkin_col' style={{ display : 'flex', columnGap : 10, justifyContent: 'space-between', width : '22%' }}>
                                <Box className='checkin'>
                                    <Typography className='title' style={{fontSize : 12, fontWeight : '300' }}>Check-in</Typography>
                                    <Typography style={{fontSize : 10,  fontWeight : '200'}}>15 kgs{'\n'} {'\n'}  {'(1 peace only)'}</Typography>
                                </Box>
                                <Box className='checkin checkout'>
                                    <Typography className='title' style={{fontSize : 12, fontWeight : '300' }}>Check-out</Typography>
                                    <Typography style={{fontSize : 10,  fontWeight : '200'}}>7 kgs{'\n'}  {'(1 peace only)'}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}



