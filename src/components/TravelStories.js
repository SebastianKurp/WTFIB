import React, { useState } from "react"
import Stories from "react-insta-stories"
import styled from "@emotion/styled"
import ReactModal from "react-modal"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"
import instagramAvatar from "../assets/instagramAvatar.jpg"

const GET_STORIES_NAME_AND_TITLE = gql`
  query Stories {
    stories {
      id
      name
      storyCover {
        id
        url
        filename
      }
    }
  }
`
const GET_STORY = gql`
  query Story($id: ID!) {
    story(id: $id) {
      id
      attachments {
        id
        filename
        url
      }
    }
  }
`

const TravelStories = () => {
  const [showStoryModal, toggleStoryModal] = useState(false)
  const [showStories, toggleStories] = useState(true)
  const [selectedStoryId, selectStoryId] = useState("recJnF96eVbg4JRMr")
  const StoryContainer = styled.div`
    display: flex;
    justify-content: space-around;
    position: absolute;
    right: 50%;
  `
  const StoriesOuterCircle = styled.button`
    border-color: none;
    border-radius: 50%;
    background: #f09433; 
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
    display: flex;
    justify-content: center;
    align-content: center;
    width: 70px;
    height: 70px;
    z-index: 1;
    cursor: pointer;
    :hover: opacity: .7;
    :active: opacity: .7;
    :focus: opacity: .7;
  `
  const StoryHeader = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50%;
  `

  return (
    <>
      <ReactModal
        isOpen={showStoryModal}
        onRequestClose={() => toggleStoryModal(false)}
        style={{
          content: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#000000",
            zIndex: 1000
          }
        }}>
        <>
          <Query query={GET_STORY} variables={{ id: selectedStoryId }}>
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error.message}`
              const storyData = data.story.attachments.map(media => ({
                url: media.url,
                type: media.filename.includes(".mp4") ? "video" : "image",
                header: {
                  heading: "@SebbyKurps",
                  subheading: "Follow on Instagram",
                  profileImage: instagramAvatar
                }
              }))
              return (
                <>
                  <Stories stories={storyData} defaultInterval={1500} width={432} height={650} />
                </>
              )
            }}
          </Query>
        </>
      </ReactModal>
      <StoryContainer>
        <Query query={GET_STORIES_NAME_AND_TITLE}>
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error! ${error.message}`
            return data.stories.map(story => (
              <StoriesOuterCircle
                onClick={() => {
                  selectStoryId(story.id)
                  toggleStoryModal(true)
                }}>
                <StoryHeader src={story.storyCover[0].url} />
              </StoriesOuterCircle>
            ))
          }}
        </Query>
      </StoryContainer>
    </>
  )
}

export default TravelStories
