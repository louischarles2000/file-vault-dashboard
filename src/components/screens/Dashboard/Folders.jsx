import {} from 'react'
import Heading from '../../elements/common/Heading'
import LinkButton from '../../elements/common/LinkButton'
import FolderCard from '../../elements/common/FolderCard'

const folders = [
    {
      name: 'Projects',
      files: 12,
      bg: 'bg-blue-100'
    },
    {
      name: 'Reviews',
      files: 11,
      bg: 'bg-purple-100'
    },
    {
      name: 'Accounts',
      files: 30,
      bg: 'bg-gray-100'
    },
    {
      name: 'Images',
      files: 130,
      bg: 'bg-pink-100'
    },
  ]

function Folders() {
  return (
    <div>
    <div className='flex flex-row justify-between mr-6'>
      <Heading>Folders</Heading>
      <LinkButton title='See More'/>
    </div>
    <div className='flex flex-row gap-4 my-4'>
      {folders.map(folder => (
        <FolderCard className={folder.bg} name={folder.name} files={folder.files} key={folder.name}/>
      ))}
    </div>
    </div>
  )
}

export default Folders