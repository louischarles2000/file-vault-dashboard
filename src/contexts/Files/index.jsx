
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'
import { fs } from '../../Utils/dummy';
import { AuthContext } from '../Auth';
import { useLazyQuery } from '@apollo/client';
import { fileQueries } from '../../graphql/FileQueries';

export const FilesContext = createContext();

function FilesContextProvider(props) {
  const { auth } = useContext(AuthContext);
  const [ files, setFiles ] = useState([]);
  const [ creatingFolder, setCreatingFolder ] = useState(false);
  const [ fetchingFiles, setFetchingFiles ] = useState(false);
  const [ activeDir, setActiveDir ] = useState(null);
  const [ activeDirFiles, setActiveDirFiles ] = useState([]);

  const [ getFiles, {  refetch } ] = useLazyQuery(fileQueries.GET_FILES, {
    variables: {
      dir: activeDir ? activeDir.id : null
    },
    onCompleted: data => {
      setFetchingFiles(false);
      if(data){
        // console.log(data)
        if(activeDir){
          // console.log("***********************")
          // console.log(data)
          // console.log("***********************")
          setActiveDirFiles(data.getFiles);
          return;
        }
        setFiles(data.getFiles);
        setActiveDirFiles([]);
      }
    },
    onError: err => {
      setFetchingFiles(false);
      console.log(err)
    }
  })
  // useEffect(() => {
  //   setFetchingFiles(loading);
  // }, [loading])

  useEffect(() => {
    if(auth){
      setFetchingFiles(true);
      getFiles();
    }
  }, [auth, getFiles]);

  useEffect(() => {
    if(activeDir){
      console.log(activeDir)
      setFetchingFiles(true);
      refetch();
    }
  }, [activeDir, refetch]);

  return (
    <FilesContext.Provider value={{
      files, setFiles,
      activeDir, setActiveDir,
      creatingFolder, setCreatingFolder,
      fetchingFiles, getFiles,
      activeDirFiles, setActiveDirFiles,
    }}>
      {props.children}
    </FilesContext.Provider>
  )
}

export default FilesContextProvider