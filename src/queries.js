import { gql } from "apollo-boost"

export const GET_MAPMARKERS_VISITED = gql`
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

export const GET_LANDMARKS_PHOTOS = gql`
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
