/* eslint-disable react/prop-types */
import { Checkbox } from 'antd'
import {} from 'react'

function CardContentListItem({ name, label, image, details, selected, onClick }) {
	const mainClass = 'flex flex-col justify-between items-center mb-2 border p-1 pr-2 rounded-sm cursor-pointer hover:border-[#80df9a] transition-all';

  return (
    <div 
			onClick={onClick}
			className={selected ? 
				'flex flex-col justify-between items-center mb-2 border p-1 pr-2 rounded-sm cursor-pointer hover:border-[#80df9a] transition-all ' + 
				' border-[#80df9a]' :
				mainClass
			}
		>
      <div className='flex flex-row w-full justify-between items-center'>
				<img src={image} alt={name} className='h-[3rem] w-[3rem] mr-4'/>
				<div className='flex flex-col'>
					<h3 className='text-sm text-left'>{label}</h3>
					<p className='text-[12px] p-0 text-left text-[#555] font-light'>{details}</p>
				</div>
				<Checkbox checked={selected}/>
			</div>
    </div>
  )
}

export default CardContentListItem