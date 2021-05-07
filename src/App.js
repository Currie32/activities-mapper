import React from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { geolocated } from "react-geolocated";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  useLocation
} from "react-router-dom";
import buyMeACoffee from './buyMeACoffee.png';

require('dotenv').config()


const THEME = createMuiTheme({
  typography: {
    fontFamily: [
      'Mulish',
      'sans-serif'
    ].join(',')
  }
});
const StyledBuyMeACoffee = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 150px;
`;

const MenuTabs = withStyles({
  flexContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5px',
  },
  indicator: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
})(Tabs);
const MenuTab = withStyles(theme => ({
  root: {
    minWidth: '60px',
    margin: '0px 3px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgb(170, 170, 170)',
    borderRadius: '5px',
    '&$selected': {
      color: 'rgba(0, 168, 96, 1)',
      border: '1px solid rgba(0, 168, 96, 1)',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    '&:hover': {
      color: 'rgba(0, 192, 110, 1)',
      border: '1px solid rgba(0, 192, 110, 1)',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);


const StyledMenu = styled.div`
  display: flex;
  margin: 20px auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  @media (max-width: 860px) {
    margin: 60px auto;
  }
  @media (max-width: 650px) {
    width: 90%;
  }
`;
const StyledForm = styled.div`
  display: block;
  font-size: 13px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
  text-align: center;
  a {
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
    color: rgb(0, 44, 25);
    background-color: rgba(250, 250, 250, 0.85);
    padding: 5px 5px;
  };
  @media (max-width: 650px) {
    font-size: 11px;
    left: 80px;
  }
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    background: 'rgba(250, 250, 250, 0.90)'
  },
}));


function ActivitiesInLondon(props) {

  let location = useLocation();

  const classes = useStyles();

  const [type, setType] = React.useState('Activity')
  const getType = (event, newType) => {if (newType) {setType(newType)}}
  const [activity, setActivity] = React.useState("bouldering")
  const [foodOrDrink, setFoodOrDrink] = React.useState('korean restaurant')

  const [latitude, setLatitude] = React.useState("51.5078033")
  const [longitude, setLongitude] = React.useState("-0.1312857")

  React.useEffect(() => {

    if (location.pathname.includes('lat') && location.pathname.includes('long')) {
      setLatitude(/lat=([0-9\.\-]+)/.exec(location.pathname)[1])
      setLongitude(/long=([0-9\.\-]+)/.exec(location.pathname)[1])
    }
    else if (props.coords) {
      setLatitude(props.coords.latitude)
      setLongitude(props.coords.longitude)
    }
    else {
      setLatitude('51.5078033')
      setLongitude('-0.1312857')
    }
    if (location.pathname.includes('activity')) {
      setType('Activity')
      setActivity(/activity=([a-z+]+)/.exec(location.pathname)[1].replace('+', ' '))
    }
    if (location.pathname.includes('foodordrink')) {
      setType('FoodOrDrink')
      setFoodOrDrink(/FoodOrDrink=([a-z+]+)/.exec(location.pathname)[1].replace('+', ' '))
    }

  }, [location.pathname, props.coords])


  return (
    <ThemeProvider theme={THEME}>
      <Grid container>
        <Grid item xs={12}>
          <a target="_blank" rel="noreferrer" href="https://www.buymeacoffee.com/Currie32" onClick={() => {firebase.analytics().logEvent('Buy Me a Coffee, Maybe?')}}>
            <StyledBuyMeACoffee src={buyMeACoffee} />
          </a>
          <StyledMenu>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">{type === 'Activity'? 'Select Activity' : 'Select Food or Drink'}</InputLabel>
              {type === 'Activity' && <Select
                native
                value={activity}
                onChange={(event) => {setActivity(event.target.value); firebase.analytics().logEvent(event.target.value)}}
                label="Select Activity"
                id="grouped-native-select"
              >
                <optgroup label="A">
                  <option value={'amusement park'}>Amusement Park</option>
                  <option value={'aquarium'}>Aquarium</option>
                  <option value={'arcade'}>Arcade</option>
                  <option value={'archery'}>Archery</option>
                  <option value={'ax throwing'}>Ax Throwing</option>
                </optgroup>
                <optgroup label="B">
                  <option value={'basketball court'}>Basketball</option>
                  <option value={'batting cages'}>Batting Cages</option>
                  <option value={'board game cafe'}>Board Game Cafe</option>
                  <option value={'botanical gardens'}>Botanical Gardens</option>
                  <option value={'bouldering'}>Bouldering</option>
                  <option value={'bowling'}>Bowling</option>
                </optgroup>
                <optgroup label="C">
                  <option value={'canoeing'}>Canoeing</option>
                  <option value={'cinema'}>Cinema</option>
                  <option value={'cooking class'}>Cooking Class</option>
                  <option value={'croquet'}>Croquet</option>
                  <option value={'curling'}>Curling</option>
                </optgroup>
                <optgroup label="D">
                  <option value={'dance class'}>Dance Class</option>
                  <option value={'darts'}>Darts</option>
                  <option value={'dining in the dark'}>Dining in the Dark</option>
                  <option value={'disc golf'}>Disc Golf</option>
                  <option value={'drive in cinema'}>Drive in Cinema</option>
                  <option value={'driving range'}>Driving Range</option>
                </optgroup>
                <optgroup label="E">
                  <option value={'escape room'}>Escape Room</option>
                </optgroup>
                <optgroup label="F">
                  <option value={'fencing'}>Fencing</option>
                  <option value={'fishing'}>Fishing</option>
                  <option value={'food market'}>Food Market</option>
                  <option value={'foot golf'}>Foot Golf</option>
                </optgroup>
                <optgroup label="G">
                  <option value={'gallery'}>Gallery</option>
                  <option value={'go karting'}>Go Karting</option>
                  <option value={'golf'}>Golf</option>
                  <option value={'graffiti workshop'}>Graffiti Workshop</option>
                </optgroup>
                <optgroup label="H">
                  <option value={'horseback riding'}>Horseback Riding</option>
                </optgroup>
                <optgroup label="I">
                  <option value={'ice skating'}>Ice Skating</option>
                  <option value={'improv'}>Improv</option>
                </optgroup>
                <optgroup label="J">
                  <option value={'jazz bar'}>Jazz Bar</option>
                </optgroup>
                <optgroup label="K">
                  <option value={'kayaking'}>Kayaking</option>
                </optgroup>
                <optgroup label="L">
                  <option value={'laser tag'}>Laser Tag</option>
                  <option value={'lawn bowls'}>Lawn Bowls</option>
                  <option value={'lido'}>Lido</option>
                  <option value={'live music'}>Live Music</option>
                </optgroup>
                <optgroup label="M">
                  <option value={'maze'}>Maze</option>
                  <option value={'mini golf'}>Mini Golf</option>
                  <option value={'museum'}>Museum</option>
                </optgroup>
                <optgroup label="O">
                  <option value={'observatory'}>Observatory</option>
                  <option value={'outdoor cinema'}>Outdoor Cinema</option>
                </optgroup>
                <optgroup label="P">
                  <option value={'paint ball'}>Paint Ball</option>
                  <option value={'paint and sip'}>Paint and Sip</option>
                  <option value={'piano bar'}>Piano Bar</option>
                  <option value={'picnic grounds'}>Picnic Grounds</option>
                  <option value={'ping pong'}>Ping Pong</option>
                  <option value={'pop up cinema'}>Pop Up Cinema</option>
                  <option value={'pottery class'}>Pottery Class</option>
                </optgroup>
                <optgroup label="R">
                  <option value={'roller disco'}>Roller Disco</option>
                  <option value={'rowing'}>Rowing</option>
                </optgroup>
                <optgroup label="S">
                  <option value={'sailing'}>Sailing</option>
                  <option value={'scenic walk'}>Scenic Walk</option>
                  <option value={'shuffle board'}>Shuffle Board</option>
                  <option value={'skiing'}>Skiing</option>
                  <option value={'sky diving'}>Sky Diving</option>
                  <option value={'stand up comedy'}>Stand Up Comedy</option>
                  <option value={'stand up paddle boarding'}>Stand Up Paddle Boarding</option>
                  <option value={'swimming'}>Swimming</option>
                  <option value={'swing dancing'}>Swing Dancing</option>
                </optgroup>
                <optgroup label="T">
                  <option value={'tango'}>Tango</option>
                  <option value={'trampoline park'}>Trampoline Park</option>
                  <option value={'tennis court'}>Tennis</option>
                  <option value={'treasure hunt'}>Treasure Hunt</option>
                  <option value={'tree top trekking'}>Tree Top Trekking</option>
                </optgroup>
                <optgroup label="V">
                  <option value={'velodrome'}>Velodrome</option>
                  <option value={'virtual reality experiences'}>Virtual Reality Experiences</option>
                </optgroup>
                <optgroup label="Z">
                  <option value={'zip lining'}>Zip Lining</option>
                  <option value={'zoo'}>Zoo</option>
                  <option value={'zorbing'}>Zorbing</option>
                </optgroup>
              </Select>}
              {type === 'FoodOrDrink' && <Select
                native
                value={foodOrDrink}
                onChange={(event) => {setFoodOrDrink(event.target.value); firebase.analytics().logEvent(event.target.value)}}
                label="Select Food or Drink"
                id="grouped-native-select-fd">
                <optgroup label="A">
                  <option value={'argentinian restaurant'}>Argentinian</option>
                </optgroup>
                <optgroup label="B">
                  <option value={'bagel'}>Bagel</option>
                  <option value={'bakery'}>Bakery</option>
                  <option value={'bánh mì'}>Bánh Mì</option>
                  <option value={'bao'}>Bao</option>
                  <option value={'bar'}>Bar</option>
                  <option value={'barbeque restaurant'}>Barbeque</option>
                  <option value={'brasserie'}>Brasserie</option>
                  <option value={'brazilian restaurant'}>Brazilian</option>
                  <option value={'brewery'}>Brewery</option>
                  <option value={'brunch'}>Brunch</option>
                  <option value={'buffet restaurant'}>Buffet</option>
                  <option value={'burger'}>Burger</option>
                  <option value={'burrito'}>Burrito</option>
                </optgroup>
                <optgroup label="C">
                  <option value={'cajun restaurant'}>Cajun</option>
                  <option value={'caribbean restaurant'}>Caribbean</option>
                  <option value={'cheese'}>Cheese</option>
                  <option value={'chinese restaurant'}>Chinese</option>
                  <option value={'cocktail'}>Cocktail</option>
                  <option value={'coffee'}>Coffee</option>
                  <option value={'cupcake'}>Cupcake</option>
                  <option value={'curry house'}>Curry</option>
                </optgroup>
                <optgroup label="D">
                  <option value={'dim sum'}>Dim Sum</option>
                  <option value={'diner'}>Diner</option>
                  <option value={'doughnut'}>Doughnut</option>
                  <option value={'dumplings'}>Dumplings</option>
                </optgroup>
                <optgroup label="E">
                  <option value={'ethiopian restaurant'}>Ethiopian</option>
                </optgroup>
                <optgroup label="F">
                  <option value={'falafel'}>Falafel</option>
                  <option value={'fish and chips'}>Fish and Chips</option>
                  <option value={'french restaurant'}>French</option>
                  <option value={'fried chicken'}>Fried Chicken</option>
                </optgroup>
                <optgroup label="G">
                  <option value={'gastropub'}>Gastropub </option>
                  <option value={'gelato'}>Gelato</option>
                  <option value={'greasy spoon'}>Greasy Spoon</option>
                  <option value={'greek restaurant'}>Greek</option>
                </optgroup>
                <optgroup label="H">
                  <option value={'hot dog'}>Hot Dog</option>
                  <option value={'hot pot'}>Hot Pot</option>
                  <option value={'hungarian restaurant'}>Hungarian</option>
                </optgroup>
                <optgroup label="I">
                  <option value={'ice cream'}>Ice Cream</option>
                  <option value={'indian restaurant'}>Indian</option>
                  <option value={'italian restaurant'}>Italian</option>
                  <option value={'israeli restaurant'}>Israeli</option>
                </optgroup>
                <optgroup label="J">
                  <option value={'japanese restaurant'}>Japanese</option>
                  <option value={'jerk chicken'}>Jerk Chicken</option>
                </optgroup>
                <optgroup label="K">
                  <option value={'kombucha'}>Kombucha</option>
                  <option value={'korean restaurant'}>Korean</option>
                  <option value={'kosher restaurant'}>Kosher</option>
                </optgroup>
                <optgroup label="K">
                  <option value={'lebanese restaurant'}>Lebanese</option>
                </optgroup>
                <optgroup label="M">
                  <option value={'malaysian restaurant'}>Malaysian</option>
                  <option value={'matcha'}>Matcha</option>
                  <option value={'mexican restaurant'}>Mexican</option>
                  <option value={'milkshake'}>Milkshake</option>
                  <option value={'momos'}>Momos</option>
                  <option value={'mongolian restaurant'}>Mongolian</option>
                  <option value={'moroccan restaurant'}>Moroccan</option>
                </optgroup>
                <optgroup label="N">
                  <option value={'nepalese restaurant'}>Nepalese</option>
                </optgroup>
                <optgroup label="O">
                  <option value={'oyster bar'}>Oysters</option>
                </optgroup>
                <optgroup label="P">
                  <option value={'pasta'}>Pasta</option>
                  <option value={'pastry'}>Pastry</option>
                  <option value={'patio bar'}>Patio Bar</option>
                  <option value={'peruvian restaurant'}>Peruvian</option>
                  <option value={'phở'}>Phở</option>
                  <option value={'poke bowl'}>Poke Bowl</option>
                  <option value={'polish restaurant'}>Polish</option>
                  <option value={'pop up restaurant'}>Pop Up</option>
                  <option value={'portuguese restaurant'}>Portuguese</option>
                  <option value={'poutine'}>Poutine</option>
                  <option value={'pizza'}>Pizza</option>
                  <option value={'pub'}>Pub</option>
                </optgroup>
                <optgroup label="R">
                  <option value={'ramen'}>Ramen</option>
                  <option value={'roof top bar'}>Roof Top Bar</option>
                  <option value={'russian restaurant'}>Russian</option>
                </optgroup>
                <optgroup label="S">
                  <option value={'sandwich shop'}>Sandwich</option>
                  <option value={'seafood restaurant'}>Seafood</option>
                  <option value={'spanish restaurant'}>Spanish</option>
                  <option value={'sri lankan restaurant'}>Sri Lankan</option>
                  <option value={'sushi restaurant'}>Sushi</option>
                  <option value={'steakhouse'}>Steak</option>
                </optgroup>
                <optgroup label="T">
                  <option value={'tacos'}>Tacos</option>
                  <option value={'tapas'}>Tapas</option>
                  <option value={'tea'}>Tea</option>
                  <option value={'teppanyaki grill'}>Teppanyaki Grill</option>
                  <option value={'thai restaurant'}>Thai</option>
                  <option value={'turkish restaurant'}>Turkish</option>
                </optgroup>
                <optgroup label="V">
                  <option value={'vegan restaurant'}>Vegan</option>
                  <option value={'vegetarian restaurant'}>Vegetarian</option>
                  <option value={'vietnamese restaurant'}>Vietnamese</option>
                </optgroup>
                <optgroup label="W">
                  <option value={'wine bar'}>Wine Bar</option>
                </optgroup>
                <optgroup label="Y">
                  <option value={'yum cha'}>Yum Cha</option>
                </optgroup>
              </Select>}
            </FormControl>
            <div>
              <MenuTabs value={type} onChange={getType}>
                <MenuTab value={'Activity'} label={<DirectionsRunIcon style={{fontSize: '32px', padding: '5px 3px'}} />}/>
                <MenuTab value={'FoodOrDrink'} label={<FastfoodIcon style={{fontSize: '32px', padding: '5px 3px'}} />} />
              </MenuTabs>
            </div>
          </StyledMenu>
          <iframe
            title="A Map for Activities"
            width="100%"
            height={window.innerHeight}
            loading='lazy'
            style={{border: 0}}
            src={
              `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${type === 'Activity' ? activity : foodOrDrink}`
              + "+&zoom=11&center="
              + latitude
              + ","
              + longitude
            }>
          </iframe>
          <StyledForm>
            <div style={{marginBottom: '5px'}} onClick={() => {firebase.analytics().logEvent('Form Click')}}>
              <a target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSfTEjZ_lbZEXMMJ1Ts6BxtAVF567x6UY0XmSxPNV7E-gjJXjA/viewform?usp=sf_link">Want to add something?</a>
            </div>
            <div onClick={() => {firebase.analytics().logEvent('Github Click')}}>
              <a target="_blank" rel="noreferrer" href="https://github.com/Currie32/activities-mapper">Or see the code?</a>
            </div>
          </StyledForm>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000
})(ActivitiesInLondon);
