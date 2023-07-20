import { Empty, Spin } from 'antd'
import { useContext, useEffect, useState } from 'react'
import TabHeader from './TabHeader'
import FolderFileListItem from './FolderFileListItem'
import { Upload } from 'antd'
import { InboxOutlined, FolderAddOutlined } from '@ant-design/icons';
import { FilesContext } from '../../../contexts/Files'
import OutlinedButton from '../../elements/common/OutlinedButton'
import FileDetails from './components/FileDetails'

function MyFiles() {
  const { files, setActiveDir, fetchingFiles, activeDirFiles, setActiveDirFiles, selectedFile, setSelectedFile } = useContext(FilesContext)
  const [ paths, setPaths ] = useState([]);
  // const [ activeDirFiles, setActiveDirFiles ] = useState([]);
  const [ rootFiles, setRootFiles ] = useState([]);

  useEffect(() => {
    // setFolders(fs);
    console.log(fetchingFiles)
    if(files) {
      // console.log(files)
      const rf = files.filter(f => f.parent.name === 'root');
      setRootFiles(rf)
      return
    }
    setRootFiles([])
  }, [files, activeDirFiles, fetchingFiles]);

  useEffect(() => {
    // console.log(paths);
    if(paths.length > 0){
      const activePath = paths[paths.length - 1];
      // console.log(activePath)
      // getFiles({
      //   variables: {
      //     dir: activePath.id
      //   }
      // })
      const actDir = files.filter(f => f.parent.id === activePath.id);
      // setActiveDirFiles(actDir);
    }
  }, [paths, files]);



  const onClickRootFolder = folder => {
    if(folder.type !== 'folder') return;
    setActiveDir(folder)
    setPaths([
      {
        name: folder.name,
        id: folder.id
      }
    ]);
  }

  const onClickItem = folder => {
    // Open File options
    if(folder.type !== 'folder') return;
    setActiveDir(folder)
    const pths = paths
    pths.push(
      {
        name: folder.name,
        id: folder.id
      }
    );
    // console.log(pths)
    setPaths(pths);
    // refetchActiveDir();
  }

  const refetchActiveDir = () => {
    if(paths.length > 0){
      const activePath = paths[paths.length - 2];
      // const actDir = activeDirFiles.filter(f => f.parent.id === activePath.id);
      // console.log(activePath)
      setActiveDir(activePath)
      // setActiveDirFiles(actDir);
    }
  }

  const resetActiveDir = index => {
    if(index >= paths.length || index >= paths.length - 1 || index < 0 || paths.length === 1){
      return;
    }    
    const newPaths = paths.slice(0, paths.length - index - 1);
    setPaths(newPaths);
    refetchActiveDir();
  }

  const handleFileDrop = (e) => {
    setSelectedFile(e.file)
  }

  const activeDirContent = (
    <>
      <div className='ml-2 my-5 mb-20'>
      {activeDirFiles
          .map(folder => (
            <FolderFileListItem
              item={folder}
              key={folder.id}
              isListItem
              onClick={() => onClickItem(folder)}
              />
          ))}
      </div>
      {activeDirFiles.length < 1 && <Empty description='There no items yet' className='align-middle mt-16'/>}
    </>
  )

  return (
  <div className='h-full flex col-span-2'>
    <FileDetails />
    <div className='w-[20%] h-full overflow-hidden overflow-y-auto pb-[10rem] border-r-2 mr-6'>
      <TabHeader header title='My Folders'/>
      {/* Folders */}
      <div className='ml-2'>
        {rootFiles.length < 1 &&
          <OutlinedButton className='mx-5 mt-5 text-[20px]'>
            <FolderAddOutlined size={20}/>
            
          </OutlinedButton>
        }
        {rootFiles
        .map(folder => (
          <FolderFileListItem 
            item={folder}
            key={folder.id}
            onClick={() => onClickRootFolder(folder)}
            />
        ))}
      </div>
    </div>
    <div className='flex-1 h-full overflow-y-auto overflow-x-hidden'>
      <TabHeader 
        title='My Files' 
        path={paths} 
        reset={resetActiveDir} 
        backHome={() => {
          setPaths([])
          setActiveDir(null)
          setActiveDirFiles([])
        }}
        />
      
        {fetchingFiles ? 
        <Spin tip='Fetching..' size='large' className='my-20 ml-[45%]'></Spin>
        : activeDirContent}
      <Upload.Dragger height={'30vh'} type='drag' listType='picture-card' style={{ marginTop: 20 }} onChange={handleFileDrop}>
        <p className="ant-upload-drag-icon">
        <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload
        </p>
      </Upload.Dragger>
    </div>
  </div>
  )
}

export default MyFiles