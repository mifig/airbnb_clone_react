import { useEffect, useState } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import './App.scss';
import './Search.scss';
import Flat from './Flat';
import FlatMarker from './FlatMarker';

const API_URL = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWlndWVsbGV3YWdvbiIsImEiOiJjano0NTQzMmEwOXRxM29xdHFnbjd2cjY2In0.kOdg3YWbyO5QXFMvNaWB9w'
});

function App() {
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState([2.3522, 48.8566]);
  const [filterText, setFilterText] = useState('');

  
  useEffect(() => {
    fetch(API_URL)
    .then((data) => data.json())
      .then((json) => setFlats(json));
    }, []);
    
    const handleFlatSelect = (id) => {
      const clickedFlat = flats.find((flat) => flat.id === id );
      setSelectedFlat(clickedFlat);
    };
    
    const handleFilter = (event) => {
      const {value} = event.currentTarget;
      setFilterText(value);
    };
  
    const filteredFlats = flats.filter(flat => {
      return flat.name.match(new RegExp(filterText, "i"));
    });
  
  return (
    <div className="app container mt-5">
      <div className='main'>
        <input className='search' onChange={handleFilter}></input>
        <div className='flats'>
          {filteredFlats.map(({id, ...props}) => {
            return <Flat key={id} id={id} {...props} onSelect={handleFlatSelect}  selected={ selectedFlat.id === id } />
          })}
        </div>
      </div>

      <div className="map">
        <Map  zoom={[14]}
              center={selectedFlat}
              containerStyle={{ height: "100vh", width: "100%"}}
              style="mapbox://styles/mapbox/streets-v8"
              >
          {filteredFlats.map(({id, price, lat, lng}) => {
            return(
              <Marker key={id} 
                      coordinates={[lng, lat]} 
                      anchor="bottom">
                <FlatMarker price={price} selected={ selectedFlat.id === id } />
              </Marker>
            )
          })}
        </Map>
      </div>
    </div>
  );
}

export default App;
