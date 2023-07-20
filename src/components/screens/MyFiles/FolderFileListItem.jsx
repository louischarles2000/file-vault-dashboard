/* eslint-disable react/prop-types */
import{ useContext } from 'react'
import { FaFolder } from 'react-icons/fa'
import { 
  BsFillFileEarmarkTextFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkImageFill,
  BsFileEarmarkSpreadsheetFill,
  BsFillCameraVideoFill,
} from 'react-icons/bs'
import { _convertBits, _formatDate, truncateText } from '../../../Utils/functions';
import { Popover } from 'antd';
import { FilesContext } from '../../../contexts/Files';
// import { BiSolidFileDoc, BiSolidFilePng, BiSolidFileJpg } from 'react-icons/bi'
// import { SiJpeg } from 'react-icons/si'

function FolderFileListItem(props) {
  const { setFileId } = useContext(FilesContext);
  const FileFormatIcon = () => {
    // return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
    switch(props.item.format.split('/')[1]){
      case 'png':
        // return <BiSolidFilePng color='#555' size={18}/>;
        return <BsFileEarmarkImageFill color='#555' size={18}/>;
      case 'jpeg':
        // return <BiSolidFileJpg color='#555' size={18}/>;
        return <BsFileEarmarkImageFill color='#555' size={18}/>;
      case 'jpg':
        // return <BiSolidFileJpg color='#555' size={18}/>;
        return <BsFileEarmarkImageFill color='#555' size={18}/>;
      // case 'jpeg':
      //   return <SiJpeg color='#555' size={18}/>;
      case 'docx':
        // return <BiSolidFileDoc color='#555' size={18}/>;
        return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
      case 'sheet':
        // return <BiSolidFileDoc color='#555' size={18}/>;
        return <BsFileEarmarkSpreadsheetFill color='#555' size={18}/>;
      case 'pdf':
        return <BsFileEarmarkPdfFill color='#555' size={18}/>;
      case 'mp4':
        return <BsFillCameraVideoFill color='#555' size={18}/>;
        // return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
      default:
        return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
    }
  }

  const handleClick = () => {
    if(props.item.type === "file"){
      const id = props.item.id ? props.item.id : props.item._id;
      console.log('Clicked:', id)
      setFileId(id);
      return
    }
    props.onClick();
  }

  return (
    <div 
      onDoubleClick={handleClick}
      className='flex justify-between cursor-pointer px-2 py-1 hover:bg-slate-200 items-center'>
      <div
        onClick={handleClick}
        // onDoubleClick={props.onClick}
        className='flex flex-row items-start gap-2 cursor-pointer pl-2 py-1 hover:bg-slate-200'>
        {props.item.type === 'folder' ? 
          <FaFolder color='#80df9a' size={18}/> :
          <FileFormatIcon />
        }
        <Popover placement='right' title={props.item.name} className=''>
          <p className='font-bold text-[#555]'>{truncateText(props.item.name)}</p>
        </Popover>
      </div>
      {props.isListItem && 
        <p className='text-[#555] font-light text-xs text-left'>Type: {truncateText(props.item.format)}</p>
      }
      {props.isListItem && 
        <p className='text-[#555] font-light text-xs text-left'>Size: {_convertBits(props.item.size)}</p>
      }
      {props.isListItem && 
        <p className='text-[#555] font-light text-xs'>Last Modified: {_formatDate(props.item.updated_at)}</p>
      }
    </div>
  )
}

export default FolderFileListItem