import { Empty } from 'antd'
import { useEffect, useState } from 'react'
import TabHeader from './TabHeader'
import FolderListItem from './FolderListItem'

const fs = [
  {
    id: 'item1',
    name: 'Stuff',
    type: 'folder',
    parentId: 'root'
  },
  {
    id: 'item2',
    name: 'Home stuff',
    type: 'folder',
    parentId: 'item1'  
  },
  {
    id: 'item3',
    name: 'Home records',
    type: 'file', 
    parentId: 'item1'         
  },
  {
    id: 'item4',
    name: 'Work',
    type: 'folder',
    parentId: 'root'
  },
  {
    id: 'item5',
    name: 'Work stuff',
    type: 'folder',
    parentId: 'item2'   
  },
  {
    id: 'item6',
    name: 'Customers',
    type: 'folder',
    parentId: 'item4',
  },
  {
    id: 'item7',
    name: 'Records',
    type: 'file',
    parentId: 'item6'
  },
  {
    id: 'item8',
    name: 'Games',
    type: 'folder',
    parentId: 'root',
  },
  {
    id: 'item9',
    name: 'Game stuff',
    type: 'folder',
    parentId: 'item8'    
  },
]

function MyFiles() {
  const [ folders, setFolders ] = useState(fs)
  const [ paths, setPaths ] = useState([]);
  const [ activeDir, setActiveDir ] = useState([]);
  const [ rootFiles, setRootFiles ] = useState([]);

  useEffect(() => {
    setFolders(fs);
    const rf = fs.filter(f => f.parentId === 'root');
    setRootFiles(rf)
  }, []);

  useEffect(() => {
    // console.log(paths);
    if(paths.length > 0){
      const activePath = paths[paths.length - 1];
      const actDir = folders.filter(f => f.parentId === activePath.id);
      setActiveDir(actDir);
    }
  }, [paths, folders]);

  const onClickRootFolder = folder => {
    setPaths([
      {
        name: folder.name,
        id: folder.id
      }
    ]);
  }

  const onClickItem = folder => {
    const pths = paths
    pths.push(
      {
        name: folder.name,
        id: folder.id
      }
    );
    // console.log(pths)
    setPaths(pths);
    refetchActiveDir();
  }

  const refetchActiveDir = () => {
    if(paths.length > 0){
      const activePath = paths[paths.length - 1];
      const actDir = folders.filter(f => f.parentId === activePath.id);
      setActiveDir(actDir);
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

  return (
  <div className='h-full flex col-span-2'>
    <div className='w-[20%] h-full overflow-hidden overflow-y-auto pb-[10rem] border-r-2 mr-6'>
      <TabHeader header title='My Folders'/>
      {/* Folders */}
      <div className='ml-2'>
        {rootFiles
        .map(folder => (
          <FolderListItem 
            name={folder.name}
            key={folder.id}
            onClick={() => onClickRootFolder(folder)}
            />
        ))}
      </div>
    </div>
    <div className='flex-1 h-full overflow-y-auto overflow-x-hidden'>
      <TabHeader title='My Files' path={paths} reset={resetActiveDir}/>
      <div className='ml-2'>
        {activeDir
        .map(folder => (
          <FolderListItem 
            name={folder.name}
            key={folder.id}
            onClick={() => onClickItem(folder)}
            />
        ))}
      </div>
      {activeDir.length < 1 && <Empty description='There no items yet' className='align-middle mt-16'/>}
    </div>
  </div>
  )
}

export default MyFiles