import React, { useState, useEffect } from "react"
import { Query } from "react-apollo"
import ReactMapGL from "react-map-gl"
import ReactModal from "react-modal"
import { RingLoader } from "react-spinners"
import withSizes from "react-sizes"
import Gallery from "react-grid-gallery"
import styled from "@emotion/styled"

import HomeMarker from "./components/HomeMarker"
import CountryMarker from "./components/CountryMarker"
import CityMarker from "./components/CityMarker"
import LandMarkMarker from "./components/LandMarkMarker"
import LastViewButton from "./components/LastViewButton"
import TravelStories from "./components/TravelStories"
import AboutMeSideBar from "./components/AboutMeSideBar"

import { GET_MAPMARKERS_VISITED, GET_LANDMARKS_PHOTOS } from "./queries"

const mapboxKey = process.env.REACT_APP_MAPBOX_KEY

const App = ({ isMobile }) => {
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

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 0,
    longitude: 0,
    zoom: 1,
    pitch: 0
  })

  const [visible, setVisible] = useState("")

  const [aboutMeModalVisible, setAboutMeModalVisible] = useState(false)

  const [drawer, showDrawer] = useState(true)

  useEffect(() => {
    let timeoutId = null
    const resizeListener = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => setViewport({ height: window.innerHeight, width: window.innerWidth, ...viewport }),
        150
      )
    }
    window.addEventListener("resize", resizeListener)
    return () => {
      window.removeEventListener("resize", resizeListener)
    }
  }, [viewport])

  return (
    <div className="App" id="outer-container">
      {drawer ? null : (
        <DrawerButton onClick={() => showDrawer(!drawer)}>
          <img
            src="https://img.icons8.com/material-sharp/24/000000/menu.png"
            alt="Hamburger Menu Icon"
          />
        </DrawerButton>
      )}
      <AboutMeSideBar openDrawer={drawer} setDrawerOpen={showDrawer} />
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
              zIndex: 101,
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
          <>
            <ButtonContainer>
              <LastViewButton
                zoom={viewport.zoom}
                onClick={setViewport}
                latitude={viewport.latitude}
                longitude={viewport.longitude}
              />
            </ButtonContainer>
            {viewport.zoom > 3 && isMobile ? null : <TravelStories />}
          </>
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

const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 500
})

export default withSizes(mapSizesToProps)(App)
