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
import { RingLoader } from "react-spinners"

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
      latitude
      longitude
    }
    cities {
      id
      city
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
  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  `

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
    border-color: #8367c7;
    padding-top: 10px;
    border-style: solid;
    border-left-width: 0px;
    border-right-width: 5px;
    background-color: #232C43;
    overflow-y: hidden;
  `

  const HexagonImg = styled(Hexagon)`
    align-self: center;
    width: 75%;
    height: auto;
  `
  const AboutMeParagraph = styled.p`
    padding-left: 5%;
    padding-right: 5%;
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    font-family: "Montserrat", sans-serif;
    color: #d6e5e3;
  `
  const Hey = styled.span`
    font-size: 30px;
    font-weight: 20px;
  `
  const Name = styled.span`
    padding-left: 2px;
    font-size: 24px;
    font-weight: 20px;
    color: #8367c7;
  `
  const DraftbitLink = styled.a`
    text-decoration: none;
    color: #5a45ff;
    :hover:color: #5a45ff;
    :active: color: #5a45ff;
    :focus: color: #5a45ff;
  `

  const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 5%;
    padding-right: 5%;
  `
  const Icon = styled.a`
    margin-left: 5px;
    :hover {
      opacity: 0.7;
    }
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

  const [drawer, showDrawer] = useState(true)

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
        <title>Sebastian Kupriel-WTFIB </title>
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
            backgroundScale={1.1}
          />
          <AboutMeParagraph>
            <Hey>Hi, </Hey> <br />
            I'm <Name>Sebastian Kurpiel</Name>. Unsplash featured photographer with a million views,
            and a traveller waiting for an excuse to hop on a plane. People kept asking me "Where
            did you take that?" or "I want to go there!", so I decided to GeoTag my photos to make
            it easier for you to find the spots! <br />
            When I'm not traveling, you can find me working on
            <DraftbitLink href="https://www.draftbit.com" target="_blank"> draftbit </DraftbitLink>. A tool giving
            people the power to create apps mobile apps with zero code!
            <br />
            Feel free to check out my github or follow me on Twitter!
          </AboutMeParagraph>
          <IconContainer>
            <Icon href="https://www.github.com/sebastianKurp" target="_blank">
              <img src="https://img.icons8.com/nolan/48/000000/github.png" alt="github logo" />
            </Icon>
            <Icon href="https://twitter.com/sebbykurps" target="_blank">
              <img src="https://img.icons8.com/nolan/48/000000/twitter.png" alt="twitter logo" />
            </Icon>
            <Icon href="https://unsplash.com/sebbykurps" target="_blank">
              <img src="https://img.icons8.com/nolan/48/000000/unsplash.png" alt="unsplash logo" />
            </Icon>
            <Icon href="https://www.linkedin.com/in/sebastiankurpiel">
              <img src="https://img.icons8.com/nolan/48/000000/linkedin.png" alt="linkedin logo" />
            </Icon>
          </IconContainer>
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
          <Query query={GET_LANDMARKS_PHOTOS} variables={{ id: visible }}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <LoadingContainer>
                    <RingLoader sizeUnit={"px"} size={120} color={"#8367C7"} loading={true} />
                  </LoadingContainer>
                )
              if (error) return `Error! ${error.message}`
              const images = data.landMark.photos.map(photo => ({
                src: photo.url,
                thumbnail: photo.url,
                caption: photo.filename,
                thumbnailWidth: 250,
                thumbnailHeight: 200
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
            if (loading)
              return (
                <LoadingContainer>
                  <RingLoader sizeUnit={"px"} size={120} color={"#8367C7"} loading={true} />
                </LoadingContainer>
              )
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
