import "./App.css";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState, useEffect } from "react";
const url = "https://restcountries.com/v3.1/all";
function App() {
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const response = await fetch(url);
      const finalResponse = await response.json();
      setTours(finalResponse);
      setSearchList(finalResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
    if (event.target.value.trim()) {
      const newList = tours.filter((item) =>
        item.name.official
          .toLowerCase()
          .includes(event.target.value.trim().toLowerCase())
      );
      setSearchList(newList);
    } else {
      setSearchList(tours);
    }
  };
  return (
    <div className="App">
      <TextField
        id="outlined-basic"
        label="Search by name"
        variant="outlined"
        value={searchText}
        onChange={handleSearchText}
      />
      {searchList.length}
      <div sx={{ maxwidth: 345 }} className="tour-container">
        {searchList.map((item) => (
          <div className="tour-container-items" key={item.fifa}>
            <div className="tour-container-image">
              <img src={item.flags.png} alt="" width="150px" height="100px" />
            </div>
            <div className="tour-container-items-details">
              <div className="tour-container-items-details-name">
                {item.name.official}
              </div>
              <div> capital:{item.capital}</div>
              <div>population:{item.population}</div>
              <div>Region{item.region}</div>
              <div>{item.landlocked ? "landlocked" : "Not a landlocked"}</div>
              <div className="tour-container-items-details-map">
                <LocationOnIcon />
                <a href={item.maps.googleMaps} target="blank">
                  Google Map
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
