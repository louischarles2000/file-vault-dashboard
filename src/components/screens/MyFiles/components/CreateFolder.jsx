import React, { useContext, useEffect, useState } from 'react'
import { FilesContext } from '../../../../contexts/Files'
import { Modal } from 'antd';
import CustomInput from '../../../elements/common/CustomInput';
import { useMutation } from '@apollo/client';
import { fileQueries } from '../../../../graphql/FileQueries';

function NewFolder() {
  const { 
    creatingFolder, setCreatingFolder, 
    activeDir, files, 
    setFiles, activeDirFiles, 
    setActiveDirFiles 
  } = useContext(FilesContext);
  const [ name, setName ] = useState('');
  const [ error, setError ] = useState('');
  const [ currentFolders, setCurrentFolders ] = useState([]);

  const [ createFolder, { loading } ] = useMutation(fileQueries.CREATE_FOLDER, {
    onCompleted: data => {
      if(data){
        handleCancel()
        if(activeDir){
          setActiveDirFiles(data.createFolder);
          return
        }
        setFiles(data.createFolder);
        // handleCancel()
      }
    },
    onError: err => {
      console.log(err)
      setError('Folder creation failed, try again')
    }
  })

  useEffect(() => {
    setName(false);
    setError(null);
  }, [creatingFolder])

  useEffect(() => {
    // console.log(activeDir.id)
    const _folders = [];
    if(activeDir){
      if(activeDirFiles){
        activeDirFiles.forEach(file => {
          // console.log(file.parent.id)
          if(file.type === 'folder' && file.parent.id === activeDir.id){
            console.log(file.name)
            _folders.push(file.name);
          }
        });
      } 
    }
    files.forEach(file => {
      // console.log(file.parent.id)
      if(file.type === 'folder' ){
        console.log(file.name)
        _folders.push(file.name);
      }
    });
    setCurrentFolders(_folders);
  }, [activeDir, files, activeDirFiles])

  const handleCancel = () => {
    // e.preventDefault();
    setName('');
    console.log('Closed modal')
    setError(null);
    setCreatingFolder(false);
  }

  const handelTextChange = (e) => {
    e.preventDefault()
    setName(e.target.value);
  }

  const handleOk = () => {
    // console.log(activeDir.id)
    createFolder({
      variables: {
        folder: {
          name,
          parent: activeDir ? activeDir.id : null
        }
      }
    })
  }

  return (
    <Modal 
      open={creatingFolder} 
      onCancel={handleCancel}
      onOk={handleOk}
      title="New folder"
      closable
      width={400}
      okText="Create Folder"
      okType='dashed'
      okButtonProps={{
        disabled: name === '' || currentFolders.includes(name),
        loading: loading,
      }}
      // className='w-[800px] bg-slate-800'
      >
      <div className=' '>
        {currentFolders.includes(name) &&
        <p className='text-[orange] text-[12px] font-light'>A folder with this name is already available in this directory.</p>
        }
        <CustomInput placeholder={'Folder name'} onChange={handelTextChange}/>
        <p className='text-[orange] text-[12px] font-light'>{error}</p>
      </div>
      {/* <Footer>
        <MainButton>Create Folder</MainButton>
      </Footer> */}
    </Modal>
  )
}

export default NewFolder