import React, { useEffect, useState } from "react"
import { scaleDown as MenuContainer } from "react-burger-menu"
import Hexagon from "react-hexagon"
import styled from "@emotion/styled"
import { avatar, unsplashedIcon, githubIcon, linkedinIcon, twitterIcon, devto } from "../assets/images"

const Menu = styled.div`
display: flex !important ;
flex-direction: column;
flex-grow: 
align-items: center;
min-height: calc(100vh - 16px);
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

const AboutMeSideBar = ({ openDrawer, setDrawerOpen }) => {
    const [numberOfViews, setNumberOfViews] = useState("6,019,661")

    useEffect(() => {
        const unsplashAPI = process.env.REACT_APP_UNSPLASHAPI_KEY;
        fetch(`https://api.unsplash.com/users/sebbykurps/statistics/?client_id=${unsplashAPI}`)
            .then(response => response.json())
            .then(data => setNumberOfViews(`${data.views.total}`.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')));
    })

    return (
        <MenuContainer
            isOpen={openDrawer}
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
            disableOverlayClick={() => setDrawerOpen(false)}>
            <Menu>
                <HexagonImg
                    style={{ stroke: "#8367C7" }}
                    backgroundImage={avatar}
                    backgroundScale={1.1}
                />
                <AboutMeParagraph>
                    <Hey>Hi, </Hey> <br />
            I'm <Name>Sebastian Kurpiel</Name>. Unsplash featured photographer with {numberOfViews} views,
            and a traveller waiting for an excuse to hop on a plane. People kept asking me "Where
            did you take that?" or "I want to go there!", so I decided to GeoTag my photos to make
            it easier for you to find the spots! <br />
            When I'm not traveling, you can find me working on
            <DraftbitLink href="https://www.draftbit.com" target="_blank">
                        {" "}
              draftbit{" "}
                    </DraftbitLink>
            . A tool giving people the power to create apps mobile apps with zero code!
            <br />
            Feel free to check out my github or follow me on Twitter!
          </AboutMeParagraph>
                <IconContainer>
                    <Icon href="https://www.github.com/sebastianKurp" target="_blank">
                        <img src={githubIcon} alt="github logo" />
                    </Icon>
                    <Icon href="https://twitter.com/sebbykurps" target="_blank">
                        <img src={twitterIcon} alt="twitter logo" />
                    </Icon>
                    <Icon href="https://unsplash.com/sebbykurps" target="_blank">
                        <img src={unsplashedIcon} alt="unsplash logo" />
                    </Icon>
                    <Icon href="https://www.linkedin.com/in/sebastiankurpiel">
                        <img src={linkedinIcon} alt="linkedin logo" />
                    </Icon>
                    <Icon href="https://dev.to/sebastiankurp">
                        <img height="36" width="36" src={devto} alt="devTo logo" />
                    </Icon>
                </IconContainer>
            </Menu>
        </MenuContainer>
    )
};


export default AboutMeSideBar
