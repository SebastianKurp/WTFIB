import React, { useState } from "react"
import { Helmet } from "react-helmet"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import styled from "@emotion/styled"
import "./App.css"

const mapboxKey = process.env.REACT_APP_MAPBOX_KEY

const CountryMarkers = [
  {
    country: "Tokyo",
    visited: "Summer 2019",
    latitude: 35.68536,
    longitude: 139.753372
  }
]

//zoom, latitude, longitude, city
const JapanTrip = [
  {
    latitude: 35.68536,
    longitude: 139.753372,
    city: "Tokyo"
  },
  {
    zoom: 10,
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

const LandMarks = [
  {
    latitude: 35.662,
    longitude: 139.7038,
    landmark: "Shibuya"
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

const CountryMapMarker = ({ zoom, latitude, longitude, country, visited, onClick }) => {
  const CountryMapMarkerOuterCircle = styled.button`
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

  const CountryMapMarkerInnerCircle = styled.div`
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
          <CountryMapMarkerOuterCircle
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
            <CountryMapMarkerInnerCircle />
          </CountryMapMarkerOuterCircle>
        </Marker>
      </>
    )
  } else {
    return null
  }
}

const CityMarker = ({ zoom, latitude, longitude, city, onClick, setZoom }) => {
  const CityMarkerOuterCircle = styled.button`
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

  const CityMarkerInnerCircle = styled.div`
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
  if (zoom > 3 && zoom < 12) {
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
          <CityMarkerOuterCircle
            onMouseOver={() => setPopUpVisible(true)}
            onMouseLeave={() => setPopUpVisible(false)}
            onClick={() =>
              onClick({
                width: window.innerWidth,
                height: window.innerHeight,
                zoom: setZoom,
                latitude,
                longitude
              })
            }>
            <CityMarkerInnerCircle />
          </CityMarkerOuterCircle>
        </Marker>
      </>
    )
  } else {
    return null
  }
}

const LandMarkMarker = ({ zoom, latitude, longitude, landmark, onClick }) => {
  const LandMarkMarkerOuterCircle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #3bceac;
    padding: 0;
    cursor: pointer;
    border: none;
    z-index: 0;
  `

  const LandMarkMarkerInnerCircle = styled.div`
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
  if (zoom > 10) {
    return (
      <>
        {popUpVisible && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            offsetLeft={10}
            offsetTop={20}
            closeButton={false}
            closeOnClick={true}
            onClose={() => setPopUpVisible(false)}
            anchor="top">
            <Popover>
              <PopoverInfo>{landmark}</PopoverInfo>
            </Popover>
          </Popup>
        )}
        <Marker latitude={latitude} longitude={longitude} offsetLeft={0} offsetTop={0}>
          <LandMarkMarkerOuterCircle
            onMouseOver={() => setPopUpVisible(true)}
            onMouseLeave={() => setPopUpVisible(false)}
            onClick={() => onClick}>
            <LandMarkMarkerInnerCircle />
          </LandMarkMarkerOuterCircle>
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
        {CountryMarkers.map(countryMarker => {
          return (
            <CountryMapMarker
              zoom={viewport.zoom}
              latitude={countryMarker.latitude}
              longitude={countryMarker.longitude}
              country={countryMarker.country}
              visited={countryMarker.visited}
              onClick={setViewport}
            />
          )
        })}
        {JapanTrip.map(cityMarker => {
          return (
            <CityMarker
              zoom={viewport.zoom}
              latitude={cityMarker.latitude}
              longitude={cityMarker.longitude}
              city={cityMarker.city}
              onClick={setViewport}
              setZoom={cityMarker.zoom != null ? cityMarker.zoom : 11}
            />
          )
        })}
        {LandMarks.map(landmark => {
          return (
            <LandMarkMarker
              zoom={viewport.zoom}
              latitude={landmark.latitude}
              longitude={landmark.longitude}
              landmark={landmark.landmark}
              onClick={console.log("meme")}
            />
          )
        })}
      </ReactMapGL>
    </div>
  )
}

export default App
