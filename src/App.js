import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import ReactMapGL from "react-map-gl"
import ReactModal from "react-modal"
import Gallery from "react-grid-gallery"
import { scaleDown as MenuContainer } from "react-burger-menu"
import styled from "@emotion/styled"
import Hexagon from "react-hexagon"
import avatar from "./assets/avatar.jpg"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

import HomeMarker from "./components/HomeMarker"
import CountryMarker from "./components/CountryMarker"
import CityMarker from "./components/CityMarker"
import LandMarkMarker from "./components/LandMarkMarker"
import LastViewButton from "./components/LastViewButton"
import "./App.css"

const mapboxKey =
  "pk.eyJ1Ijoic2ViYXN0aWFua3VycCIsImEiOiJjandwZWZ1emkxOHR1NDhwOG1lM2pmeHVmIn0.fHuAftP7b6uRy1UfWieSPQ"

const GET_MAPMARKERS_VISITED = gql`
  query CountriesCitiesLandmarks {
    countries {
      id
      country
      visited
      latitude
      longitude
    }
    cities {
      id
      city
      visited
      latitude
      longitude
    }
    landMarks {
      id
      landmark
      latitude
      longitude
    }
  }
`

const GET_LANDMARKS_PHOTOS = gql`
  query landmarkImages($id: ID!) {
    landMark(id: $id) {
      id
      photos {
        id
        filename
        url
      }
    }
  }
`

function App() {
  const ButtonContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
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
    display: flex !important ;
    flex-direction: column;
    flex-grow: 
    align-items: center;
    min-height: 100vh;
    background-color: #232C43;
  `

  const HexagonImg = styled(Hexagon)`
    align-self: center;
    width: 75%;
    height: auto;
  `
  const InnerMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 40px;
    min-height: 500px;
  `
  const OpenAboutMeModal = styled.button`
    all: unset;
    cursor: pointer;
  `

  const CloseDrawerButton = styled.button`
    all: unset;
    cursor: pointer;
    padding: 20px;
    background-color: #ffffff;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
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

  const [visible, setVisible] = useState("")

  const [aboutMeModalVisible, setAboutMeModalVisible] = useState(false)

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
      <MenuContainer
        isOpen={drawer}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        disableOverlayClick={() => showDrawer(false)}>
        <Menu>
          <HexagonImg
            style={{ stroke: "#8367C7" }}
            backgroundImage={avatar}
            backgroundScale={1.05}
          />
          <InnerMenu>
            <OpenAboutMeModal onClick={() => setAboutMeModalVisible(true)}>
              About Me{" "}
            </OpenAboutMeModal>
            <CloseDrawerButton
              onClick={() => {
                showDrawer(false)
              }}>
              Close Drawer
            </CloseDrawerButton>
          </InnerMenu>
        </Menu>
      </MenuContainer>
      <main id="page-wrap">
        <ReactModal
          isOpen={aboutMeModalVisible}
          onRequestClose={() => setAboutMeModalVisible(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.4)"
            },
            content: {
              backgroundColor: "#232C43",
              borderRadius: "30px",
              border: "none"
            }
          }}></ReactModal>
        <ReactModal
          isOpen={visible !== ""}
          onRequestClose={() => setVisible("")}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.4)"
            },
            content: {
              color: "lightsteelblue"
            }
          }}>
          <Query query={GET_LANDMARKS_PHOTOS} variables={{ id: "rec2Y5NhpDE3j0xUM" }}>
            {({ loading, error, data }) => {
              if (loading) return "Loading..."
              if (error) return `Error! ${error.message}`
              const images = data.landMark.photos.map(photo => ({
                src: photo.url,
                thumbnail: photo.url,
                caption: photo.filename,
                thumbnailWidth: 320,
                thumbnailHeight: 174
              }))
              return (
                <Gallery
                  images={images}
                  enableImageSelection={false}
                  showLightboxThumbnails={true}
                  backdropClosesModal={true}
                />
              )
            }}
          </Query>
        </ReactModal>
        {visible !== "" ? null : (
          <ButtonContainer>
            <LastViewButton
              zoom={viewport.zoom}
              onClick={setViewport}
              latitude={viewport.latitude}
              longitude={viewport.longitude}
            />
          </ButtonContainer>
        )}
        <Query query={GET_MAPMARKERS_VISITED}>
          {({ loading, error, data }) => {
            if (loading) return "Loading..."
            if (error) return `Error! ${error.message}`
            return (
              <ReactMapGL
                {...viewport}
                mapStyle={"mapbox://styles/sebastiankurp/cjxsbmb5f79rd1cp6511l5aii?optimize=true"}
                mapboxApiAccessToken={mapboxKey}
                onViewportChange={viewport => {
                  setViewport(viewport)
                }}>
                <HomeMarker />
                {data.countries.map(countryMarker => {
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
                {data.cities.map(cityMarker => {
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
                {data.landMarks.map(landmark => {
                  return (
                    <LandMarkMarker
                      zoom={viewport.zoom}
                      latitude={landmark.latitude}
                      longitude={landmark.longitude}
                      landmark={landmark.landmark}
                      onClick={() => setVisible(landmark.id)}
                    />
                  )
                })}
              </ReactMapGL>
            )
          }}
        </Query>
      </main>
    </div>
  )
}

export default App
