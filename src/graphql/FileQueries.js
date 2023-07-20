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
        updated_at
        size
        # hash
        # versions
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
  LOAD_DASHBOARD: gql`
    query loadDashboardData {
    loadDashboardData{
      filesOverview{
        docs{
          name
          size
          files
        }
        images{
          name
          size
          files
        }
        videos{
          name
          size
          files
        }
      }
      folders{
        name
        files
      }
      recents{
        name
        size
        # hash
        # versions
        parent{
          name
        }
        created_at
        updated_at
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
        updated_at
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
  UPLOAD_FILE: gql`
    mutation uploadFile ($parent: String, $fileMeta: UploadFileInput!){
      uploadFile(parent: $parent, fileMeta: $fileMeta){
        status{
          code
          success
        }
        message
        payload
        errors{
          type
          error
        }
      }
    }
  `,
  GET_UPLOAD_LINK: gql`
    query getUploadLink($type: String!) {
      getFileUploadLink(type: $type)
    }
  `,
  GET_FILE_DETAILS: gql`
    query getFileDetails($fileId: String!){
      getFileDetails(fileId: $fileId){
        id
        name
        parent{
          id
          name
        }
        type
        format
        path
        hash
        size
        owner{
          id
          email
          name{
            first
            last
          }
        }
        versions{
          versionNumber
          timestamp
          hash
          path
          size
        }
        updated_at
        created_at
      }
    }   
  `,
  UPDATE_FILE: gql`
    mutation updateFile($update: UpdateFileInput!){
      updateFile(update: $update){
        status{
          code
          success
        }
        message
        payload
        errors{
          type
          error
        }
      }
    }
  `,
  GET_FILE_HASH: gql`
    query getFileHash($fileId: String!){
      getFileHash(fileId: $fileId){
        id
        hash
        fileId
        created_at
        updated_at
      }
    }
  `
}