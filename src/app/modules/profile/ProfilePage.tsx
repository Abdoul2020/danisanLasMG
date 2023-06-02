import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Projects} from './components/Projects'
import {Campaigns} from './components/Campaigns'
import {Documents} from './components/Documents'
import {Connections} from './components/Connections'
import {ProfileHeader} from './ProfileHeader';
import { FC } from 'react';
import {ProfilePageComponent} from "../../../service/Model/expert/profilePage"

import {useIntl} from 'react-intl'



let titleTochange : any;

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: "Expert" ,
    path: '/crafted/pages/profile/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,

  },
]



const ProfilePage: FC<ProfilePageComponent> = ({userData}) => {



//langugage 
const intl = useIntl()


  return (
    <Routes>
      <Route
        element={
          <>
            <ProfileHeader userData={userData} />
            
            <Outlet />
  
          </>
        }
      >
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
  
                {intl.formatMessage({id: 'EXPERT.HEADER.CONTENT.ACCOUNT_INFO'})}
                </PageTitle>
  
              <Overview />
  
            </>
          }
        />
        <Route
          path='projects'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>

                {intl.formatMessage({id: 'EXPERT.HEADER.CONTENT.TIME_LINE'})}

                </PageTitle>
              <Projects />
            </>
          }
        />
        <Route
          path='campaigns'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}> 
              {intl.formatMessage({id: 'EXPERT.HEADER.CONTENT.RESUME'})}
              </PageTitle>
              <Campaigns />
            </>
          }
        />
        <Route
          path='documents'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>

                {intl.formatMessage({id: 'EXPERT.HEADER.CONTENT.CERTIFICATE'})}

                </PageTitle>
              <Documents />
            </>
          }
        />
        <Route
          path='connections'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>

                {intl.formatMessage({id: 'EXPERT.HEADER.CONTENT.CONTACT'})}

                </PageTitle>
              <Connections />
            </>
          }
        />
        <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
        
  
      </Route>
    </Routes>
  )
}

export default ProfilePage
