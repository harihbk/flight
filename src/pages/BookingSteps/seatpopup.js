import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import colors from "./colors"
import cloneDeep from 'lodash/cloneDeep';


import "antd/dist/antd.css";
import { Row, Col, Divider } from 'antd';
import { parsePath } from 'history';

function Emptycol(){
  return (
    <>
    <Col><Button variant="outlined" style={{ visibility : 'hidden' }}> NO  </Button> </Col>
    </>
  )
}

export default function MaxWidthDialog(props) {
  let { _open , _setOpen , _currentrow , _selectflightdetail , _currflightdetial ,_rowid , seatbookingreturntoparentfn , _currentrowdata} = props


  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xl');
  const [ listprice , setListprice ] = React.useState([])
  const [ temporary , setTemporary ] = React.useState([])
  const [ indexset , setIndexset ] = React.useState(0)
  const [ prevrow , setPrevrow ] = React.useState([])

  
  React.useEffect(()=>{
    var ind
    let _currflightdetials = [..._currflightdetial]
    console.log(_currflightdetials);
    console.log(_rowid);
    
    for (const key in _currflightdetials) {
      if (Object.hasOwnProperty.call(_currflightdetials, key)) {
        const element = Object.keys(_currflightdetials[key]);
        if(element == _rowid){
          ind = key
        }
      }
    }
    console.log(ind);

    let allocateseat = [..._currflightdetials[ind][_rowid]]
    setTemporary(allocateseat)
  },[])

  


  React.useEffect(()=>{ 
  let unique = [...new Set(_currentrow?.sInfo?.map(v=>v.amount))].sort()
  let ListPrice = []
  unique.map((p,i) => {
    var color = colors[i]
    let obj = {
      amount : p,
      color  : color
    }
    ListPrice.push(obj)
    _currentrow.sInfo.map(ele => {
      let elementPrice = ele.amount
      if(elementPrice == p){
        ele.color = color
      }
    })
  })

  setListprice(ListPrice) // List color amount

  console.log('==============================');
  console.log(_currentrow);

  },[_currentrow])



  const handleClickOpen = () => {
    _setOpen(true);
  };

  const handleClose = () => {
    setIndexset(0);
    setTemporary([]);
    _setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const getRowCol = (r,c) => {
  var currd = _currentrow?.sInfo;
  r = r+1
  c = c+1
   let getIndex =  currd?.findIndex(val=> ( val.seatPosition.row == r && val.seatPosition.column == c ) )
   let rt = getIndex == -1 ? <Emptycol /> : seatselect(getIndex)

   function seatselect(ind){
   let curr = currd?.[ind]
  
   let seats = temporary.map(e=>e.seat).filter(n=>n)

    switch (curr?.isBooked) {
      case false:
        return <Button  variant="outlined" style={{ backgroundColor:  ( seats.includes(curr.code) ? '#127100' : curr.color )  }} onClick={()=>seatselection(curr)}>{curr.seatNo}</Button>
      case true:
        return <Button color="error" variant="contained" style={{ cursor : 'not-allowed' }}>{curr.seatNo}</Button>
    }
    return <Emptycol />
   }
   return rt
  }

  function seatselection(row){

 //   let temp = [...temporary]
    let temp = cloneDeep(temporary);

    console.log(_currentrowdata);
 console.log(temp);
    let code = row.code;
    let indx = temp.findIndex(a => a.seat == row.code)


    let _currdindx = _currentrow?.sInfo.findIndex(a=>a.code == temp[indexset]['seat']);

    let amt = _currentrow?.sInfo[_currdindx]?.amount
   let idx = listprice.findIndex(d=>d.amount == amt)
   console.log(row);
   if(_currentrow?.sInfo[_currdindx]){
     
    _currentrow.sInfo[_currdindx].color =  listprice[idx]?.color
   }

   console.log(indx);

    if(indx == -1){
      row.color = "#c8ee90"
      temp[indexset]['seat'] = row.code
     // temp[indexset]['key'] = row.code
      temp[indexset]['fees'] = row.amount
      temp[indexset]['deparr'] = _currentrowdata
     // temp[indexset]['label'] = 
      // if(temp[indexset]['seat'] == row.code){
      //  temp[indexset]['seat'] = "";
      //  temp[indexset]['fees'] = "";
      // } else {

      // }
      
      setTemporary(temp)
    } 
    if(indx == '0'){

      //row.color = "#c8ee90"
      temp[indexset]['seat'] = ''
      temp[indexset]['fees'] = ''
      temp[indexset]['deparr'] = ''
      setTemporary(temp)

    }
  }

  const temporarySeta = (a,i) => {
    setIndexset(i)
  }

  const onProcess = () => {
    let temp = cloneDeep(temporary);
    seatbookingreturntoparentfn(temp)
    _setOpen(false);
  }



  return (
    <React.Fragment>
     
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={_open}
        onClose={handleClose}

        className={'seatpopup_wrapper'}
      >
        <DialogTitle> </DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          {/* <Box
            noValidate
            component="form"
            // sx={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   m: 'auto',
            //   width: 'fit-content',
            // }}
          > */}

    <Grid container  className='seatbooking_popup' justifyContent={'center'} >
       <Grid item md={2} className='leftcol_seat' style={{ paddingRight : 10 }}> 
          <Box>
            <Typography style={{ fontSize : 20, fontWeight : 500, marginBottom : 10 }}>Select Seats</Typography>  
            <Box style={{ paddingBottom : 10, paddingTop: 10, 'border-top' : '1px dashed #ccc', 'border-bottom' : '1px dashed #ccc' }}>
              <Typography>{ _selectflightdetail?.da?.code }-{ _selectflightdetail?.aa?.code }</Typography>
              <Typography style={{ fontSize : 14 }}>{_selectflightdetail?.fD?.aI?.name}  </Typography>
              <Typography style={{ fontSize : 14 }}>{_selectflightdetail?.fD?.aI?.code}-{_selectflightdetail?.fD?.fN}</Typography>
            </Box>
          </Box> 
          <Box style={{ marginBottom : 10 }}>
            <table style={{ width : '100%', textAlign : 'left', marginBottom : 10, marginTop : 10 }}> 
              <thead>
                <tr>
                  <th>Passanger</th>
                  <th>Seat</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>

               {temporary.length > 0 && temporary.map((a,i)=>(
                  <>
                    <tr onClick={()=>temporarySeta(a,i)} style = {{ background : indexset == i ? 'antiquewhite' : '' }}>
                      <td className='p-5'>{a?.passanger}-{a.key}</td>
                      <td className='p-5'>{a?.seat}</td>
                      <td className='p-5'>{a?.fees}</td>
                    </tr>
                  </>
               ))}
              </tbody>
            </table>
            <Button variant="contained" fullWidth={true} className='color_primary' onClick={()=>onProcess()}>Process</Button>
          </Box>
        </Grid>

       <Grid item md={8} justifyContent={'center'}  className='middlecol_seat' style={{ 'border-right' : '1px solid #e4e4e4' , 'border-left' : '1px solid #e4e4e4', paddingLeft : 10, paddingRight : 10 }}> 
            <Box sx={{ flexGrow: 1, justifyContent : 'center' }}  >
              {[...Array(_currentrow?.sData?.row)].map((row, i) =>(
                <>
                  <Row justifyContent={'center'}> 
                      {[...Array(_currentrow?.sData?.column)].map((col, ii) =>(<> { getRowCol(i,ii)  } </>)  )}  
                  </Row>      
                </>
                ))}  
            </Box> 
       </Grid>

       <Grid item md={2}  className='rightcol_seat' style={{ paddingLeft : 10 }}> 
           <Box>
              <Typography  style={{ fontSize : 20, fontWeight : 500, marginBottom : 10 }}>Flight Orientation</Typography>
              <Box style={{ paddingBottom : 10, paddingTop: 10, 'border-top' : '1px dashed #ccc', 'border-bottom' : '1px dashed #ccc' }}>
                  <Typography style={{ marginBottom : 10 }}>Seat Status</Typography>
                  <Box>
                    <Button variant="outlined" color="success">Selected</Button>
                  </Box>
                  <Box mt={1}>
                    <Button color="error" variant="outlined" style={{ width : 100}}>Booked</Button>
                  </Box>
              </Box> 
              <Box style={{ marginTop : 10 }}> 
                <Typography style={{ marginBottom : 10 }}>Seat Fees</Typography>
                { listprice.length > 0 && 
                  listprice.map(data => (

                    <Box style={{ width : 100 , height:50 , alignItem : 'center' }}> 
                      <Box style={{ display:'flex' }}>
                        <Paper component="div" style={{ width : 20 , height : 20 , marginRight : 8 ,backgroundColor : data.color }} />  
                        <Typography>{ data.amount }</Typography>
                      </Box>

                    </Box>
                  ))
                }
              </Box>
           </Box>
       </Grid>
       
    </Grid>


   



          
          {/* </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
