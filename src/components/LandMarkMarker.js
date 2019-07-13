import React, { useState } from "react"
import styled from "@emotion/styled"
import { Marker, Popup } from "react-map-gl"

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

export default LandMarkMarker
