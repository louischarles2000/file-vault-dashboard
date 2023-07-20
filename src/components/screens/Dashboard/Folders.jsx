/* eslint-disable react/prop-types */
import {} from 'react'
import Heading from '../../elements/common/Heading'
import LinkButton from '../../elements/common/LinkButton'
import FolderCard from '../../elements/common/FolderCard'

function Folders(props) {
  return (
    <div>
    <div className='flex flex-row justify-between mr-6'>
      <Heading>Folders</Heading>
      <LinkButton title='See More'/>
  </div>
    <div className='flex flex-row gap-4 my-4'>
      {props.folders.map(folder => (
        <FolderCard className={folder.bg} name={folder.name} files={folder.files} key={folder.name}/>
      ))}
    </div>
    </div>
  )
}

export default Folders