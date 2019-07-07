import React, { useState } from "react"
import { Helmet } from "react-helmet"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import styled from "@emotion/styled"
import "./App.css"

const mapboxKey = process.env.REACT_APP_MAPBOX_KEY

const Tokyo = {
  coords: [35.68536, 139.753372]
}

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
          closeButton={true}
          closeOnClick={false}
          onClose={() => setPopUpVisible(false)}
          anchor="top">
          <Popover>
            <PopoverTitle>Home(Chicago)</PopoverTitle>
          </Popover>
        </Popup>
      )}
      <Marker latitude={homeLatitude} longitude={homeLongitude} offsetLeft={-20} offsetTop={-10}>
        <HomeMarkerOuterCircle onClick={() => setPopUpVisible(true)}>
          <HomeMarkerInnerCircle />
        </HomeMarkerOuterCircle>
      </Marker>
    </>
  )
}

const GlobalMapMarker = ({ latitude, longitude, onClick }) => {
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

  return (
    <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
      <GlobalMapMarkerOuterCircle
        onClick={() =>
          onClick({
            width: window.innerWidth,
            height: window.innerHeight,
            zoom: 11,
            latitude,
            longitude
          })
        }>
        <GlobalMapMarkerInnerCircle />
      </GlobalMapMarkerOuterCircle>
    </Marker>
  )
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
        <GlobalMapMarker
          latitude={Tokyo.coords[0]}
          longitude={Tokyo.coords[1]}
          onClick={setViewport}
        />
      </ReactMapGL>
    </div>
  )
}

export default App
