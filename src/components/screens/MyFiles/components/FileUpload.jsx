/* eslint-disable react/prop-types */
import { Button, Modal, Progress } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FilesContext } from '../../../../contexts/Files'
import { useLazyQuery, useMutation } from '@apollo/client';
import { fileQueries } from '../../../../graphql/FileQueries';
import axios from "axios"
import { _getFileHash } from '../../../../Utils/functions';
// import crypto from "crypto"

function FileUpload(props) {
  const { selectedFile, setSelectedFile, activeDir, setActiveDirFiles, setFiles, setFileId, fileId } = useContext(FilesContext);
  const [ progress, setProgress ] = useState(0);
  const [ uploading, setUploading ] = useState(false);

  const [ getUploadLink, { loading: fetchingLink } ] = useLazyQuery(fileQueries.GET_UPLOAD_LINK);

  const [ updateFile, { loading: updating } ] = useMutation(fileQueries.UPDATE_FILE, {
    onCompleted: _data => {
      console.log(_data);
      if(!_data.updateFile.errors){
        setSelectedFile(null);
        setFileId(_data.updateFile.payload.file.id ? _data.updateFile.payload.file.id : _data.updateFile.payload.file._id);
        return;
      }
    },
    onError: _err => {
      console.log({..._err})
    }
  })
  const [ uploadFile, { loading } ] = useMutation(fileQueries.UPLOAD_FILE, {
    onCompleted: data => {
      console.log(data);
      if(!data.uploadFile.errors){
        if(activeDir){
          if(data.uploadFile.payload.files) setActiveDirFiles(data.uploadFile.payload.files);
          setSelectedFile(null);
          return;
        }
        if(data.uploadFile.payload.files) setFiles(data.uploadFile.payload.files)
        setSelectedFile(null);
        return;
      }

    },
    onError: err => {
      console.log({...err})
    },
    
  });

  useEffect(() => {
    console.log(props.fileType)
    console.log(selectedFile)
    if(props.fileType && props.fileType !== selectedFile.type){
      setTimeout(() => {
        setSelectedFile(null);
      }, 3000)
    }
    setProgress(0);
  }, [])

  const handleCancel = () => {
    console.log('CANCELLING')
    setSelectedFile(null)
  }

  const handleOk = async () => {
    setUploading(true);
    setProgress(0);
    try {
      const res = await getUploadLink({
        variables: {
          type: selectedFile.type
        }
      });
      if(!res || !res.data.getFileUploadLink) return;
      const link = res.data.getFileUploadLink; 

      axios.put(link, selectedFile, { 
        headers: {
        "Content-Type": selectedFile.type,
        // "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        }
      })
      .then(r => {
        console.log(r);
        const filePath = link.split('?')[0];
        console.log(filePath);

        // Create file hash
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = () => {
          const buffer = reader.result;
          crypto.subtle.digest("SHA-256", buffer)
          .then(_hash => {
            const hash = Array.from(new Uint8Array(_hash))
              .map((byte) => byte.toString(16).padStart(2, '0'))
              .join('');

            
            setUploading(false);

            if(props.isUpdate) {
              updateFile({
                variables: {
                  update: {
                    fileId,
                    newHash: hash,
                    newPath: filePath,
                    newSize: selectedFile.size,
                  }
                }
              });
              return
            }

            uploadFile({
              variables: {
                parent: activeDir ? activeDir.id : null,
                fileMeta: {
                  name: selectedFile.name,
                  format: selectedFile.type,
                  lastModified: selectedFile.lastModified,
                  size: selectedFile.size,
                  path: filePath,
                  hash,
                }
              }
            });
          })
        }
      })
      .catch(err => {
        console.log(err)
        setUploading(false)
      });

      } catch (error) {
        setUploading(false)
        console.log({...error})
      }
  };

  // if(props.isUpdate) {
  //   return (
  //     <div className='bg-[red]'>
  //       {selectedFile && 
  //       <>
  //       <p>{selectedFile && selectedFile.name}</p>
  //       <Button>Upload</Button>
  //       </>
  //       }
  //     </div>
  //   )
  // }

  return (
    <>
    <Modal
      open={selectedFile} 
      onCancel={handleCancel}
      onOk={handleOk}
      title={props.isUpdate ? "Upload new file version" : "File Upload"}
      closable
      width={400}
      okText={loading || uploading || updating ? ( uploading ? 'Uploading...' : 'Saving...' ) : "Upload"}
      okType='dashed'
      okButtonProps={{
        loading: loading || uploading,
        disabled: props.fileType && props.fileType !== selectedFile.type
        // disabled: true
      }}
      // className='w-[800px] bg-slate-800'
      >
      {props.fileType && props.fileType !== selectedFile.type && <p className='font-thin text-center text-[13px] text-red-600'>The chosen file's format does not match the selected file, the update WILL be cancelled!</p>}
      {fetchingLink && <p className='font-thin text-center text-[13px] text-lime-600'>Fetching secure upload link...</p>}
       <p>{selectedFile && selectedFile.name}</p>
       {progress > 0 &&
       <Progress
          percent={progress}
          type='line'
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />}
       {/* <p>{uploadLink}</p> */}
    </Modal>
    </>
  )
}

export default FileUpload