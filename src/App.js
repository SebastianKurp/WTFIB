import React, { useState } from "react"
import { Helmet } from "react-helmet"
import ReactMapGL, { Marker } from "react-map-gl"
import styled from "@emotion/styled"
import "./App.css"

const Tokyo = {
  coords: [35.68536, 139.753372]
}

const MapMarkerOuterCircle = styled.button`
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

const MapMarkerInnerCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #2a2a2a;
`

const MapMarker = ({ latitude, longitude, onClick }) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <MapMarkerOuterCircle
        onClick={() =>
          onClick({
            width: window.innerWidth,
            height: window.innerHeight,
            zoom: 10,
            latitude,
            longitude
          })
        }>
        <MapMarkerInnerCircle />
      </MapMarkerOuterCircle>
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
        mapboxApiAccessToken="pk.eyJ1Ijoic2ViYXN0aWFua3VycCIsImEiOiJjandwZWZ1emkxOHR1NDhwOG1lM2pmeHVmIn0.fHuAftP7b6uRy1UfWieSPQ"
        onViewportChange={viewport => setViewport(viewport)}>
        <MapMarker latitude={Tokyo.coords[0]} longitude={Tokyo.coords[1]} onClick={setViewport} />
      </ReactMapGL>
    </div>
  )
}

export default App
