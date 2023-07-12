import { gql } from "@apollo/client";

export const fileQueries = {
  GET_FILES: gql`
    query getFiles($dir: String){
      getFiles(dir: $dir){
        id
        name
        type
        format
        path
        created_at
        size
        parent{
          id
          name
        }
        owner{
          id
        }
      }
    }
  `,
  CREATE_FOLDER: gql`
    mutation createFolder($folder: FolderInput) {
      createFolder(folder: $folder){
        id
        name
        type
        format
        path
        created_at
        size
        parent{
          id
          name
        }
        owner{
          id
        }
      }
    }
  
  `
}