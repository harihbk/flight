import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import background from "./assets/backimage.jpeg";


const useStyles = makeStyles((theme) => ({
  hotel : {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  },
  _padding : {
    padding : '5px'
  },
  rootpadding : {
    padding : '10px'
  },
  background : {
    backgroundImage: `url(${background})`,
    backgroundPosition : 'center',
    backgroundSize : 'cover',
    backgroundRepeat : 'no-repeat',
  //  width: '100vw',
  //  height: '100vh'


  }

}));

function App() {
  const classes = useStyles();

  return (
    <>
    <div className={classes.background}>

    <Grid  container direction="row"  justifyContent="flex-start" alignItems="flex-start" className={classes.rootpadding}>
        <Grid container justifyContent="space-between" xs="5">
          <Grid style={{ display:'flex' }}>
              <Typography><img src={require('./assets/logo.jpeg')}></img></Typography>
              
          </Grid>

          <Grid>
            Flight
          </Grid>

          <Grid className={classes.hotel}>
            <Grid className={classes._padding}>
              <img src={require('./assets/hotel.png')} width={30} height={30}/>
              </Grid>
              <Grid>
              Hotels
              </Grid>
          </Grid>


          <Grid >
            Holidays
          </Grid>
        </Grid>

        <Grid container xs="3"></Grid>

        <Grid container xs="3" justifyContent="space-between">
            <Grid direction="column">
              <Grid>df</Grid>
              <Grid>df</Grid>
               
            </Grid>
            <Grid >
              Flight
            </Grid>
        </Grid>
       


        
      </Grid>
      
    </div>
</>
    
  );
}

export default App;
