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


import "antd/dist/antd.css";
import { Row, Col, Divider } from 'antd';

function Emptycol(){
  return (
    <>
    <Col><Button variant="outlined" style={{ visibility : 'hidden' }}> NO  </Button> </Col>
    </>
  )
}

export default function MaxWidthDialog(props) {
  let { _open , _setOpen , _currentrow , _selectflightdetail , _currflightdetial ,_rowid } = props


  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xl');
  const [ listprice , setListprice ] = React.useState([])
  const [ temporary , setTemporary ] = React.useState([])
  const [ indexset , setIndexset ] = React.useState(0)
  const [ prevrow , setPrevrow ] = React.useState('')


  React.useEffect(()=>{
    var ind
    for (const key in _currflightdetial) {
      if (Object.hasOwnProperty.call(_currflightdetial, key)) {
        const element = Object.keys(_currflightdetial[key]);
        if(element == _rowid){
          ind = key
        }
      }
    }
    let allocateseat = _currflightdetial[ind][_rowid]
    setTemporary(allocateseat)
  },[_currflightdetial])

  


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

    //  console.log(_currentrow.sInfo);
// console.log(temporary);

  },[_currentrow])



  const handleClickOpen = () => {
    _setOpen(true);
  };

  const handleClose = () => {
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
   console.log(currd);
   console.log(ind);

    switch (curr?.isBooked) {
      case false:
        return <Button  variant="outlined" style={{ backgroundColor: curr.color}} onClick={()=>seatselection(curr)}>{curr.seatNo}</Button>
      case true:
        return <Button color="error" variant="contained" style={{ cursor : 'not-allowed' }}>{curr.seatNo}</Button>
    }
    return <Emptycol />
   }
   return rt
  }

  function seatselection(row){

    let temp = [...temporary]
    let code = row.code;
    let indx = temp.findIndex(a => a.seat == row.code)
    if(indx == -1){
      row.color = "#c8ee90"
      temp[indexset]['seat'] = row.code
      temp[indexset]['fees'] = row.amount
      setTemporary(temp)
    } 
    let temp1 = [...temporary]

   let seat =  temp1[indexset].seat
   let _currdindx = _currentrow?.sInfo.findIndex(a=>a.code == seat)
   if(_currdindx != -1){
    console.log(_currdindx);
   }
   

  }

  const temporarySeta = (a,i) => {
    setIndexset(i)
    // console.log(i);
    // console.log(a);
  }



  return (
    <React.Fragment>
     
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={_open}
        onClose={handleClose}
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

    <Box style={{ display: 'flex' , justifyContent : "space-around"  }}>
       <Box> 
          <Box>
            <Typography>Select Seats</Typography>  
            <Typography>{_selectflightdetail?.fD?.aI?.name} { _selectflightdetail?.da?.code }-{ _selectflightdetail?.aa?.code } </Typography>
            <Typography>{_selectflightdetail?.fD?.aI?.code}-{_selectflightdetail?.fD?.fN}</Typography>
          </Box> 
          <Box>
            <table>
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
                      <td>{a?.passanger}-{a.key}</td>
                      <td>{a?.seat}</td>
                      <td>{a?.fees}</td>
                    </tr>
                  </>
               ))}
              </tbody>
            </table>
            <Button variant="outlined">Process</Button>
          </Box>
        </Box>



       <Box> 
            <Box sx={{ flexGrow: 1 }}  >
              {[...Array(_currentrow?.sData?.row)].map((row, i) =>(
                <>
                <Row> 
                    {[...Array(_currentrow?.sData?.column)].map((col, ii) =>(<> { getRowCol(i,ii)  } </>)  )}  
                  </Row>      
                </>
                ))}  
            </Box> 
       </Box>
       <Box> 
           <Box>
              <Box>
                Flight Orientation
              </Box>
              <Box>
                  <Typography>Seat Status</Typography>
                  <Box>
                    <Button variant="outlined" color="success">Selected</Button>
                  </Box>
                  <Box mt={1}>
                    <Button color="error" variant="outlined" style={{ width : 100}}>Booked</Button>
                  </Box>
              </Box>
              <Divider/>
              <Box>
                <Typography>Seat Fees</Typography>
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
       </Box>
       
    </Box>


   



          
          {/* </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
