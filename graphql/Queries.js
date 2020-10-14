import gql from 'graphql-tag'

export const GetRecipes = gql` query GetRecipes($page: Int!, $pageSize: Int!) { 
  listRecipes(input: {page: $page, includePremiumPreview: true, pageSize: $pageSize})  { 
   recipes {
       isMembersOnly 
       id
       title
       description
       rating
       modifiedAt
       slug
       nutrition {
       values {
         carbs
         fat
         protein
         calories
         fiber
         }
         percentages{
          carbs
          fat
          protein
         }
       }
       __typename
       images{
         hz
         vt
         brightness
         
       }
       nutrition {
           values {
               __typename
           }
           __typename
           }  
       }
      totalSize
      nextPage
   }
 }`

export const GetMemberMealPlans = gql` query  
   GetMemberMealPlans {
    memberMealplans(perPage: 100, page: 1) {
      id
      title 
      __typename
    }
  }`

  export const createUser = gql`
   mutation createUser($input: UserInput!) {
    createUser(user:$input){
      token  
    }
  }`