import { getDate } from "./functions";

export const fs = [
  {
    id: 'root',
    name: 'root',
    type: 'folder',
    format: 'folder',
    parentId: 'fs',
    lastMod: getDate(),
    size: '1 GB'
  },
  {
    id: 'item1',
    name: 'Stuff',
    type: 'folder',
    format: 'folder',
    parentId: 'root',
    lastMod: getDate(),
    size: '450 KB'
  },
  {
    id: 'item2',
    name: 'Home stuff',
    type: 'folder',
    parentId: 'item1',
    format: 'folder',
    lastMod: getDate(),
    size: '183 KB'
  },
  {
    id: 'item3',
    name: 'Home records',
    type: 'file',
    format: 'doc',
    parentId: 'item1'   ,
    lastMod: getDate(),
    size: '88 KB'      
  },
  {
    id: 'item4',
    name: 'Work',
    type: 'folder',
    format: 'folder',
    parentId: 'root',
    lastMod: getDate(),
    size: '193 KB'
  },
  {
    id: 'item5',
    name: 'Work stuff',
    type: 'folder',
    format: 'folder',
    parentId: 'item2',
    lastMod: getDate(),
    size: '110 KB'   
  },
  {
    id: 'item6',
    name: 'Customers',
    type: 'folder',
    format: 'folder',
    parentId: 'item4',
    lastMod: getDate(),
    size: '191 KB'
  },
  {
    id: 'item7',
    name: 'Records',
    type: 'file',
    format: 'pdf',
    parentId: 'item6',
    lastMod: getDate(),
    size: '190 KB'
  },
  {
    id: 'item8',
    name: 'Games',
    type: 'folder',
    format: 'folder',
    parentId: 'root',
    lastMod: getDate(),
    size: '60 KB'
  },
  {
    id: 'item9',
    name: 'Game stuff',
    type: 'folder',
    format: 'folder',
    parentId: 'item8',
    lastMod: getDate(),
    size: '130 KB'    
  },
  {
    id: 'item10',
    name: 'Game Records',
    type: 'file',
    format: 'sheet',
    parentId: 'item8',
    lastMod: getDate(),
    size: '90 KB'    
  },
]
