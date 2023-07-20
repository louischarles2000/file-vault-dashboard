import React, { useContext, useState, useEffect } from 'react'
import { Alert, Button, Descriptions, Divider, Modal, Popover, Spin, Upload } from 'antd'
import { FilesContext } from '../../../../contexts/Files'
import { useLazyQuery } from '@apollo/client';
import { fileQueries } from '../../../../graphql/FileQueries';
import { _convertBits, _formatDate } from '../../../../Utils/functions';
import FilePreviewer from 'react-file-previewer';
import MainButton from '../../../elements/common/MainButton';
import { AiOutlineDownload } from 'react-icons/ai'
import FileUpload from './FileUpload';
import axios from 'axios';

function FileDetails() {
  const { fileId, setFileId, selectedFile, setSelectedFile } = useContext(FilesContext);
  const [ details, setDetails ] = useState(null);
  // const [ simLoading, setSimLoading ] = useState(true);
  const [ downloadError, setDownloadError ] = useState(null);
  const [ downloading, setDownloading ] = useState(false);
  const [ verifying, setVerifying ] = useState(true);
  const [ hash, setHash ] = useState(null);
  const [ fetchedHash, setFetchedHash ] = useState(null);

  const dox = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const [ getFileDetails, { loading } ] = useLazyQuery(fileQueries.GET_FILE_DETAILS, {
    onCompleted: data => {
      setDetails(data.getFileDetails);
      getFileHash({
        variables: {
          fileId
        }
      });
    },
    onError: console.log,
    pollInterval: selectedFile ? 1000 : undefined,
  });

  const [ getFileHash, { loading: gettingHash } ] = useLazyQuery(fileQueries.GET_FILE_HASH, {
    onCompleted: _data => {
      console.log(_data.getFileHash);
      setHash(_data.getFileHash);
    },
    pollInterval: 1000
  })

  useEffect(() => {
    setVerifying(true);
    // setFileCorrupt(false);
    // setFileVerified(true);

    if(fileId){
      getFileDetails({
        variables: {
          fileId,
        }
      });
    }
    // setTimeout(() => {
    //   setSimLoading(false)
    // }, 6000);
  }, [fileId, getFileDetails, selectedFile]);

  useEffect(() => {
    if(details && hash) {
      console.log('Hash:', hash)
      calculateFileHash(details.path)
      .then(hexHash => {
        setFetchedHash(hexHash)
        setVerifying(false);
        console.log('Hex Hash:', hexHash)
        // const match = hexHash === hash.hash;
        // setFileVerified(match);
        // if(!match)setFileCorrupt(true);
      })
      .catch(console.log);
    }
  }, [hash, details])

  const calculateFileHash = async (fileUrl) => {
    const response = await fetch(fileUrl);
    const buffer = await response.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleCancel = () => {
    setFileId(null);
  }

  
  const handleFileChange = async (e) => {
    // const _file = e.target.files[0];
    const _file = await e.file.originFileObj;
    console.log(_file)
    setSelectedFile(_file);
  }
  const handleDownload = async (fileUrl, fileName) => {
    setDownloading(true)
    console.log("Link:", fileUrl);
    console.log("File Name:", fileName);
    try {
      const response = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'blob', // Set the response type to 'blob'
      });
  
      // Create a temporary anchor element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
  
      // Trigger the download by clicking the anchor element
      link.click();
  
      // Clean up the temporary anchor element
      link.parentNode.removeChild(link);
      setDownloading(false);
    } catch (error) {
      console.error('Error downloading file:', error);
      setDownloading(false);
      setDownloadError(error);
    }
  };

  const handleMainDownload = () => {
    handleDownload(details.path, details.name);
  }

  const verifiedCont = (
    <div>
      <p className='text-[orange] text-[12px]'>File hash is synchronized with the hash stored in the Blockchain.</p>
      <h1 className='text-[green] font-bold text-[20px]'>File is Verified!</h1>
    </div>
  )

  const corruptCont = (
    <div>
      <p className='text-[orange] text-[12px]'>File hash does not match the hash stored in the Blockchain.</p>
      <h1 className='text-[red] font-bold text-[20px]'>This File has been Corrupted!</h1>
    </div>   
  )

  return (
    <Modal 
      open={fileId} 
      onCancel={handleCancel}
      onOk={handleCancel}
      title={<p className='text-center'>{details ? details.name : 'Fetching details...'}</p>}
      closable
      width={1000}
      okText="Ok"
      okType='dashed'
      okButtonProps={{
        // loading: loading,
      }}
      >
      {loading && 
      <Spin size='large' className='mx-auto m-20 ml-[45%]'/>
      }
      {(details && !loading) && 
      <div className='flex flex-row w-full justify-between gap-0'>
        <div className='pr-10'>
          <div className='bg-slate-0 h-[100px] w-[100px] rounded-md border-[1px]'>
            <FilePreviewer 
                file={{
                    // data: "<base64 string>",
                    url: details.path,
                    mimeType: details.format,
                    name: details.name, // for download,
                }}
                hideControls={true}
            />
          </div>
          <div className='w-full my-3'>
            <Popover title={details.owner.email} placement='bottomLeft'>
              <p className='text-[#757575]'>Uploaded by: <b>{details.owner.name.first} {details.owner.name.last}</b></p>
            </Popover>
            <Popover title={details.format} placement='bottomLeft'>
              <p className='text-[#757575]'>Type: <b>{details.format === dox ? 'Docx' : details.format.split('/')[1]}</b></p>
            </Popover>
              <p className='text-[#757575]'>Size: <b>{_convertBits(details.size)}</b></p>
              <p className='text-[#757575]'>Last modified: <b>{_formatDate(details.updated_at)}</b></p>
              <p className='text-[#757575]'>Uploaded on: <b>{_formatDate(details.created_at)}</b></p>
          </div>
          {selectedFile && <FileUpload isUpdate fileType={details.format}/>}
          {downloadError && <Alert type='error' description="Network error, try again." closable showIcon className='mb-5'/>}
          <div className='flex flex-row gap-4'>
            <MainButton onClick={handleMainDownload} loading={downloading}>
              <AiOutlineDownload size={20}/>
              Download
            </MainButton>
            <Upload onChange={handleFileChange} showUploadList={false} >
              <Button>Upload new version</Button>
            </Upload>
          </div>
        </div> 
        <div className='flex-1 bg-slate-200 pl-5 pt-5 max-h-[400px] overflow-y-auto'>
          <h5 className='font-bold'>File Integrity verification:</h5>
          {verifying || !fetchedHash ?
          <div className='flex flex-row gap-2 items-center justify-center my-[30px]'>
            <Spin size='small' />
            <p>{(gettingHash) ? 'Fetching file Hash from Blockchain...' : 'Checking file integrity...'}</p>
          </div>
          :
          fetchedHash && hash.hash === fetchedHash ? verifiedCont : corruptCont
          }
          <Divider />
          <h5 className='font-bold mt-5'>Approved Verions:</h5>
          {details.versions.length > 0 ? (
            details.versions.map((version, i) => (
              <div key={version.hash} className='flex flex-row justify-between content-center items-center'>
                <p className='text-[12px]'> {' -> '}Version: {version.versionNumber}{' >'} Ended on: {_formatDate(version.timestamp)} {' >'} Size: {_convertBits(version.size)}</p>
                <Button 
                  type='link' 
                  onClick={() => {
                    const _name_parts = details.name.split('.');
                    const name = _name_parts[0] + ' Version ' + version.versionNumber + '.' + _name_parts[1];
                    handleDownload(version.path, name);
                  }}
                  >Download version</Button>
              </div>
            ))
          ) : 
          <p className='text-[12px]'>There are no other previous verions of this file.</p>
          }
        </div>
      </div>
      }
    </Modal>
  )
}

export default FileDetails
