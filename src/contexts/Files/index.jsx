
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const FilesContext = createContext();

function FilesContextProvider(props) {
  const [ files, setFiles ] = useState(null);
  return (
    <FilesContext.Provider value={{
      files, setFiles,
    }}>
      {props.children}
    </FilesContext.Provider>
  )
}

export default FilesContextProvider