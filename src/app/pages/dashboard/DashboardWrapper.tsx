import { EnableSidebar, PageTitle } from '../../../_metronic/layout/core'
import {
  ListsWidget4,
  ListsWidget5,
  TablesWidget9,
  MixedWidget13,
  MixedWidget14,
  MixedWidget15,
} from '../../../_metronic/partials/widgets'
import AllCalendar from '../../../_metronic/partials/widgets/mixed/AllCalendar'

const DashboardPage = () => (
  <>
    <div className='row gy-5 g-xl-10'>
      {/*begin::Col*/}
      <div className='col-xl-4'>


        <MixedWidget13
          className='card-xl-stretch mb-xl-10'
          backGroundColor='#F7D9E3'
          chartHeight='100px'
        />
      </div>



      {/*end::Col*/}

      {/*begin::Col*/}
      <div className='col-xl-4'>

        <MixedWidget14
          className='card-xl-stretch mb-xl-10'

          backGroundColor='#CBF0F4'
          chartHeight='100px'
        />




      </div>
      {/*end::Col*/}

      {/*begin::Col*/}
      <div className='col-xl-4'>

        <MixedWidget15 className='card-xl-stretch mb-xl-10' backGroundColor='#CBD4F4' />

      </div>
      {/*end::Col*/}
    </div>
    {/*end::Row*/}

    {/* time to be replace here */}
    <AllCalendar />



    {/* <TablesWidget9 className='mb-5 mb-xl-10' /> */}


  </>
)

const DashboardWrapper = () => {
  return (

    <>

      <PageTitle description='Yeni Randevun var' breadcrumbs={[]}>
        Merhaba Abdoul
      </PageTitle>
      <DashboardPage />

    </>


  )
}

export { DashboardWrapper }


{/* <EnableSidebar>
    
</EnableSidebar> */}