import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import ReactModal from "react-modal"
import Gallery from "react-grid-gallery"
import { scaleDown as Menu } from "react-burger-menu"
import styled from "@emotion/styled"
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
            onClick={() => onClick(true)}>
            <LandMarkMarkerInnerCircle />
          </LandMarkMarkerOuterCircle>
        </Marker>
      </>
    )
  } else {
    return null
  }
}

const LastViewButton = ({ zoom, latitude, longitude, onClick }) => {
  const LastViewButton = styled.button`
    -moz-box-shadow: inset 0px 1px 0px 0px #ffffff;
    -webkit-box-shadow: inset 0px 1px 0px 0px #ffffff;
    box-shadow: inset 0px 1px 0px 0px #ffffff;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0.05, #f9f9f9),
      color-stop(1, #e9e9e9)
    );
    background: -moz-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);
    background: -webkit-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);
    background: -o-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);
    background: -ms-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);
    background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f9f9f9', endColorstr='#e9e9e9',GradientType=0);
    background-color: #f9f9f9;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    display: inline-block;
    cursor: pointer;
    color: #666666;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;

    &:hover {
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0.05, #e9e9e9),
        color-stop(1, #f9f9f9)
      );
      background: -moz-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);
      background: -webkit-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);
      background: -o-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);
      background: -ms-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);
      background: linear-gradient(to bottom, #e9e9e9 5%, #f9f9f9 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e9e9e9', endColorstr='#f9f9f9',GradientType=0);
      background-color: #e9e9e9;
    }
  `

  if (zoom > 3 && zoom < 7) {
    return (
      <LastViewButton
        onClick={() =>
          onClick({
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: 0,
            longitude: 0,
            zoom: 1,
            pitch: 0
          })
        }>
        World View
      </LastViewButton>
    )
  }
  if (zoom > 7) {
    return (
      <LastViewButton
        onClick={() =>
          onClick({
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: latitude,
            longitude: longitude,
            zoom: 4,
            pitch: 0
          })
        }>
        City View
      </LastViewButton>
    )
  } else {
    return null
  }
}
function App() {
  const ButtonContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
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
  const [visible, setVisible] = useState(false) //swap to false in prod

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
      <Menu isOpen={false} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
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
      </Menu>
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
