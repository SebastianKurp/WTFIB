import React, { useState } from "react"
import styled from "@emotion/styled"
import { Marker, Popup } from "react-map-gl"

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

export default CityMarker
