import React, { useState } from "react"
import { Helmet } from "react-helmet"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import styled from "@emotion/styled"
import "./App.css"

const mapboxKey = process.env.REACT_APP_MAPBOX_KEY

const Tokyo = {
  coords: [35.68536, 139.753372]
}
//zoom, latitude, longitude, city
const JapanTrip = [
  {
    latitude: 35.68536,
    longitude: 139.753372,
    city: "Tokyo"
  },
  {
    latitude: 35.3606,
    longitude: 138.7274,
    city: "Fujisan"
  },
  {
    latitude: 34.6937,
    longitude: 135.5023,
    city: "Osaka"
  },
  {
    latitude: 34.3853,
    longitude: 132.4553,
    city: "Hiroshima"
  },
  {
    latitude: 35.0116,
    longitude: 135.7681,
    city: "Kyoto"
  }
]

const HomeMarker = () => {
  const HomeMarkerOuterCircle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #2484c6;
    padding: 0;
    cursor: pointer;
    border: none;
    z-index: 0;
  `

  const HomeMarkerInnerCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #2a2a2a;
  `

  const Popover = styled.div`
    display: flex;
    flex-direction: column;
  `

  const PopoverTitle = styled.span``

  const [popUpVisible, setPopUpVisible] = useState(false)

  const homeLatitude = 41.881832
  const homeLongitude = -87.623177
  return (
    <>
      {popUpVisible && (
        <Popup
          latitude={homeLatitude}
          longitude={homeLongitude}
          offsetLeft={-10}
          offsetTop={10}
          closeButton={false}
          closeOnClick={true}
          onClose={() => setPopUpVisible(false)}
          anchor="top">
          <Popover>
            <PopoverTitle>Home(Chicago)</PopoverTitle>
          </Popover>
        </Popup>
      )}
      <Marker latitude={homeLatitude} longitude={homeLongitude} offsetLeft={-20} offsetTop={-10}>
        <HomeMarkerOuterCircle
          onMouseOver={() => setPopUpVisible(true)}
          onMouseLeave={() => setPopUpVisible(false)}>
          <HomeMarkerInnerCircle />
        </HomeMarkerOuterCircle>
      </Marker>
    </>
  )
}

const GlobalMapMarker = ({ zoom, latitude, longitude, country, visited, onClick }) => {
  const GlobalMapMarkerOuterCircle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #dd4b39;
    padding: 0;
    cursor: pointer;
    border: none;
    z-index: 0;
  `

  const GlobalMapMarkerInnerCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #2a2a2a;
  `

  const Popover = styled.div`
    display: flex;
    flex-direction: column;
  `

  const PopoverInfo = styled.span``
  const [popUpVisible, setPopUpVisible] = useState(false)
  console.log(zoom)
  if (zoom < 3) {
    return (
      <>
        {popUpVisible && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-10}
            offsetTop={10}
            closeButton={false}
            closeOnClick={true}
            onClose={() => setPopUpVisible(false)}
            anchor="top">
            <Popover>
              <PopoverInfo>
                {country}, {visited}
              </PopoverInfo>
            </Popover>
          </Popup>
        )}
        <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
          <GlobalMapMarkerOuterCircle
            onMouseOver={() => setPopUpVisible(true)}
            onMouseLeave={() => setPopUpVisible(false)}
            onClick={() =>
              onClick({
                width: window.innerWidth,
                height: window.innerHeight,
                zoom: 4,
                latitude,
                longitude
              })
            }>
            <GlobalMapMarkerInnerCircle />
          </GlobalMapMarkerOuterCircle>
        </Marker>
      </>
    )
  } else {
    return null
  }
}

const CityMarkers = ({ zoom, latitude, longitude, city, onClick }) => {
  const CityMarkersOuterCircle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #ffd23f;
    padding: 0;
    cursor: pointer;
    border: none;
    z-index: 0;
  `

  const CityMarkersInnerCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #2a2a2a;
  `

  const Popover = styled.div`
    display: flex;
    flex-direction: column;
  `

  const PopoverInfo = styled.span``
  const [popUpVisible, setPopUpVisible] = useState(false)
  if (zoom > 3 && zoom <= 11) {
    return (
      <>
        {popUpVisible && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-10}
            offsetTop={10}
            closeButton={false}
            closeOnClick={true}
            onClose={() => setPopUpVisible(false)}
            anchor="top">
            <Popover>
              <PopoverInfo>{city}</PopoverInfo>
            </Popover>
          </Popup>
        )}
        <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
          <CityMarkersOuterCircle
            onMouseOver={() => setPopUpVisible(true)}
            onMouseLeave={() => setPopUpVisible(false)}
            onClick={() =>
              onClick({
                width: window.innerWidth,
                height: window.innerHeight,
                zoom: 11,
                latitude,
                longitude
              })
            }>
            <CityMarkersInnerCircle />
          </CityMarkersOuterCircle>
        </Marker>
      </>
    )
  } else {
    return null
  }
}

function App() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 0,
    longitude: 0,
    zoom: 1,
    pitch: 0
  })
  console.log("JapanTrip", JapanTrip)
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>WTFIB</title>
      </Helmet>
      <ReactMapGL
        {...viewport}
        mapStyle={"mapbox://styles/sebastiankurp/cjxsbmb5f79rd1cp6511l5aii"}
        mapboxApiAccessToken={mapboxKey}
        onViewportChange={viewport => setViewport(viewport)}>
        <HomeMarker />
        <GlobalMapMarker
          zoom={viewport.zoom}
          latitude={Tokyo.coords[0]}
          longitude={Tokyo.coords[1]}
          onClick={setViewport}
          country={"Japan"}
          visited={"Summer 2019"}
        />
        {JapanTrip.map(cityMarker => {
          return (
            <CityMarkers
              zoom={viewport.zoom}
              latitude={cityMarker.latitude}
              longitude={cityMarker.longitude}
              city={cityMarker.city}
              onClick={() => console.log("temp")}
            />
          )
        })}
      </ReactMapGL>
    </div>
  )
}

export default App
