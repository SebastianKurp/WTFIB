import React, { useState } from "react"
import Stories from "react-insta-stories"
import styled from "@emotion/styled"
import ReactModal from "react-modal"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

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
      name
      startDate
      endDate
      storyCover {
        id
        filename
        url
      }
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
    margin-left: 40%;
    margin-right: auto;
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
    object-fit: contain;
  `

  const ShowStoriesButton = styled.button`
    display: inline-block;
    cursor: pointer;
    color: #666666;
    font-family: Arial;
    font-size: 10px;
    font-weight: bold;
    padding: 3px 12px;
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    z-index: 1;
  `

  const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height:100%;
  `

  return (
    <>
      <ReactModal
        isOpen={showStoryModal}
        onRequestClose={() => {
          toggleStoryModal(false)
          toggleStories(true)
        }}
        style={{
          content: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#111111",
            zIndex: 1000,
            borderRadius: "20px"
          }
        }}>
        <>
          <Query query={GET_STORY} variables={{ id: selectedStoryId }}>
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error.message}`
              const nameOfTrip = data.story.name
              const storyCover = data.story.storyCover[0].url
              const startDate = data.story.startDate
              const endDate = data.story.endDate
              const storyData = data.story.attachments.map(media => ({
                url: media.url,
                duration: 10000,
                type: media.filename.includes(".mp4") ? "video" : "image",
                header: {
                  heading: nameOfTrip,
                  subheading: `${startDate} - ${endDate}`,
                  profileImage: storyCover
                }
              }))
              return (
                <>
                  <Stories
                    stories={storyData}
                    defaultInterval={1500}
                    width={"100%"}
                    height={"100%"}
                  />
                </>
              )
            }}
          </Query>
        </>
      </ReactModal>
      {showStories ? (
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
                    toggleStories(false)
                  }}>
                  <StoryHeader src={story.storyCover[0].url} />
                </StoriesOuterCircle>
              ))
            }}
          </Query>
          <StoriesOuterCircle
            onClick={() => {
              toggleStories(false)
            }}>
            <Center>
              <span>Hide Stories</span>
            </Center>
          </StoriesOuterCircle>
        </StoryContainer>
      ) : showStoryModal ? null : (
        <StoryContainer>
          <ShowStoriesButton onClick={() => toggleStories(true)}>Show Stories</ShowStoriesButton>
        </StoryContainer>
      )}
    </>
  )
}

export default TravelStories
