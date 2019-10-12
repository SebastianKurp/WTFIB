import React, { useState } from "react"
import styled from "@emotion/styled"
import { Marker, Popup } from "react-map-gl"

const CountryMarker = ({ zoom, latitude, longitude, country, visited, onClick }) => {
  const CountryMarkerOuterCircle = styled.button`
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

  const CountryMarkerInnerCircle = styled.div`
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
          <CountryMarkerOuterCircle
            onMouseOver={() => setPopUpVisible(true)}
            onMouseLeave={() => setPopUpVisible(false)}
            onClick={() => {
              onClick({
                width: window.innerWidth,
                height: window.innerHeight,
                zoom: 4,
                latitude,
                longitude
              })
            }}>
            <CountryMarkerInnerCircle />
          </CountryMarkerOuterCircle>
        </Marker>
      </>
    )
  } else {
    return null
  }
}

export default CountryMarker
