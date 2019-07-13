import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import ReactMapGL from "react-map-gl"
import ReactModal from "react-modal"
import Gallery from "react-grid-gallery"
import { scaleDown as MenuContainer } from "react-burger-menu"
import styled from "@emotion/styled"

import HomeMarker from "./components/HomeMarker"
import CountryMarker from "./components/CountryMarker"
import CityMarker from "./components/CityMarker"
import LandMarkMarker from "./components/LandMarkMarker"
import LastViewButton from "./components/LastViewButton"

import "./App.css"

const mapboxKey = process.env.REACT_APP_MAPBOX_KEY

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: "Boats (Jeshu John - designerspics.com)"
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212
  }
]

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

function App() {
  const ButtonContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
  `

  const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
    left: 43%;
    width: 200px;
    z-index: 100;
  `
  const DrawerButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    left: 20px;
    z-index: 100;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `

  const Menu = styled.div`
    display: flex;
    flex-direction: row;

    background-color: aqua;
  `
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 0, //swap to 0 in prod
    longitude: 0, //swap to 0 in prod
    zoom: 1,
    pitch: 0
  })

  //35.662,
  //     longitude: 139.7038,

  //ModalVisiblity
  const [visible, setVisible] = useState(false)
  const [drawer, showDrawer] = useState(false)

  useEffect(() => {
    document.addEventListener("touchstart", function() {}, true)
    // window.addEventListener(
    //   "resize",
    //   setViewport({ ...viewport, height: window.innerHeight, width: window.innerWidth })
    // )
  })

  return (
    <div className="App" id="outer-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>WTFIB</title>
      </Helmet>
      {drawer ? null : (
        <DrawerButton onClick={() => showDrawer(!drawer)}>
          <img
            src="https://img.icons8.com/material-sharp/24/000000/menu.png"
            alt="Hamburger Menu Icon"
          />
        </DrawerButton>
      )}
      <MenuContainer isOpen={drawer} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <span>TEST</span>
        <button
          onClick={() => {
            showDrawer(false)
          }}>
          test button
        </button>
      </MenuContainer>
      <main id="page-wrap">
        <ReactModal
          isOpen={visible}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.4)"
            },
            content: {
              color: "lightsteelblue"
            }
          }}>
          <Gallery
            images={IMAGES}
            enableImageSelection={false}
            showLightboxThumbnails={true}
            backdropClosesModal={true}
          />
          ,
        </ReactModal>
        {visible ? null : (
          <ButtonContainer>
            <LastViewButton
              zoom={viewport.zoom}
              onClick={setViewport}
              latitude={viewport.latitude}
              longitude={viewport.longitude}
            />
          </ButtonContainer>
        )}
        <ReactMapGL
          {...viewport}
          mapStyle={"mapbox://styles/sebastiankurp/cjxsbmb5f79rd1cp6511l5aii?optimize=true"}
          mapboxApiAccessToken={mapboxKey}
          onViewportChange={viewport => setViewport(viewport)}>
          <HomeMarker />
          {CountryMarkers.map(countryMarker => {
            return (
              <CountryMarker
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
                onClick={setVisible}
              />
            )
          })}
        </ReactMapGL>
      </main>
    </div>
  )
}

export default App
