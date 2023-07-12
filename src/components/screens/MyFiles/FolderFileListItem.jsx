/* eslint-disable react/prop-types */
import{} from 'react'
import { FaFolder } from 'react-icons/fa'
import { BsFillFileEarmarkTextFill, BsFileEarmarkPdfFill, BsFileEarmarkImageFill, BsFileEarmarkSpreadsheetFill } from 'react-icons/bs'
// import { BiSolidFileDoc, BiSolidFilePng, BiSolidFileJpg } from 'react-icons/bi'
// import { SiJpeg } from 'react-icons/si'

function FolderFileListItem(props) {
  const FileFormatIcon = () => {
    // return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
    switch(props.item.format){
      case 'png':
        // return <BiSolidFilePng color='#555' size={18}/>;
        return <BsFileEarmarkImageFill color='#555' size={18}/>;
      case 'jpg':
        // return <BiSolidFileJpg color='#555' size={18}/>;
        return <BsFileEarmarkImageFill color='#555' size={18}/>;
      // case 'jpeg':
      //   return <SiJpeg color='#555' size={18}/>;
      case 'doc':
        // return <BiSolidFileDoc color='#555' size={18}/>;
        return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
      case 'sheet':
        // return <BiSolidFileDoc color='#555' size={18}/>;
        return <BsFileEarmarkSpreadsheetFill color='#555' size={18}/>;
      case 'pdf':
        return <BsFileEarmarkPdfFill color='#555' size={18}/>;
        // return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
      default:
        return <BsFillFileEarmarkTextFill color='#555' size={18}/>;
    }
  }
  return (
    <div 
      onDoubleClick={props.onClick}
      className='flex justify-between cursor-pointer px-2 py-1 hover:bg-slate-200 items-center'>
      <div
        onClick={props.onClick}
        // onDoubleClick={props.onClick}
        className='flex flex-row items-start gap-2 cursor-pointer pl-2 py-1 hover:bg-slate-200'>
        {props.item.type === 'folder' ? 
          <FaFolder color='#80df9a' size={18}/> :
          <FileFormatIcon />
        }
        <p className='font-bold text-[#555]'>{props.item.name}</p>
      </div>
      {props.isListItem && 
        <p className='text-[#555] font-light text-xs text-left'>Type: {props.item.format}</p>
      }
      {props.isListItem && 
        <p className='text-[#555] font-light text-xs text-left'>Size: {props.item.size} B</p>
      }
      {props.isListItem && 
        <p className='text-[#555] font-light text-xs'>Last Modified: {props.item.lastMod}</p>
      }
    </div>
  )
}

export default FolderFileListItem