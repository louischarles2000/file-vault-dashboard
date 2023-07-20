import { useContext, useEffect } from 'react'
// import { ImFilesEmpty } from 'react-icons/im'
import Overview from './Overview'
import Folders from './Folders'
import Recents from './Recents'
// import StorageGraph from './StorageGraph'
import FilePreview from './FilePreview'
import DashboardSkel from '../../elements/skeletons/DashboardSkel'
import { useQuery } from '@apollo/client'
import { fileQueries } from '../../../graphql/FileQueries'
import { Alert } from 'antd'
import { FilesContext } from '../../../contexts/Files'

function Dashboard() {
  const { setLoadingDashboard } = useContext(FilesContext);
  const { data, error, loading } = useQuery(fileQueries.LOAD_DASHBOARD);

  useEffect(() => {
    setLoadingDashboard(loading);
  }, [loading, setLoadingDashboard]);
  useEffect(() => {
    if(error)console.log(error)
    if(data){
      console.log(data.loadDashboardData)
    }
  }, [data, error]);

  if(error) return (
    <div>
      <Alert 
        action={false}
        type='error'
        icon
        message="The Server is temporalilly down, please try again later"
        />
    </div>
  );

  if( !data || loading ) return <DashboardSkel />;

  return (
    <div className='h-full flex col-span-2'>
      <div className='flex-1 h-full overflow-hidden overflow-y-auto pb-[10rem]'>
        <Overview overview={data.loadDashboardData.filesOverview}/>
        <Folders folders={data.loadDashboardData.folders}/>
        <Recents recents={data.loadDashboardData.recents}/>
      </div>
      <div className='w-[30%] h-full overflow-y-auto overflow-x-hidden'>
        {/* <StorageGraph /> */}
        <FilePreview />
        {/* <Overview /> */}
      </div>
    </div>
  )
}

export default Dashboard