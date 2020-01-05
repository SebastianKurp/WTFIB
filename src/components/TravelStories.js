import React, { useState } from "react"
import Stories from "react-insta-stories"
import styled from "@emotion/styled"
import ReactModal from "react-modal"

const stories = [
  {
    url: "https://picsum.photos/1080/1920",
    seeMore: ({ close }) => <div style={{ width: "100%", height: "100%" }}>Hello</div>,
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 5h ago",
      profileImage: "https://picsum.photos/1000/1000"
    }
  },
  {
    url:
      "https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN",
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 32m ago",
      profileImage: "https://picsum.photos/1080/1920"
    }
  },
  {
    url:
      "https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg",
    header: {
      heading: "mohitk05/react-insta-stories",
      subheading: "Posted 32m ago",
      profileImage: "https://avatars0.githubusercontent.com/u/24852829?s=400&v=4"
    }
  },
  {
    url: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    type: "video",
    duration: 1000
  },
  {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    type: "video",
    seeMore: ({ close }) => <div style={{ width: "100%", height: "100%" }}>Hello</div>
  },
  {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: "video"
  },
  "https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
]

const TravelStories = () => {
  const [showStoryModal, toggleStoryModal] = useState(false)
  const StoriesOuterCircle = styled.button`
    all: unset;
    display: flex;
    width: 60 px;
    height: 60px;
    position: absolute;
    right: 50%;
    top: 0;
    z-index: 10;
    cursor: pointer;
    :hover: opacity: .7;
    :active: opacity: .7;
    :focus: opacity: .7;
  `
  const StoryHeader = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 60px;
    z-index: 10;
  `
  return (
    <>
      <ReactModal isOpen={showStoryModal} onRequestClose={() => toggleStoryModal(false)}>
        <div />
      </ReactModal>
      <StoriesOuterCircle onClick={() => toggleStoryModal(false)}>
        <StoryHeader src="https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80" />
      </StoriesOuterCircle>
    </>
  )
}

export default TravelStories
