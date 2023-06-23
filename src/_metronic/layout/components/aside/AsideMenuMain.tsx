/* eslint-disable react/jsx-no-target-blank */
import { useIntl } from 'react-intl'
import { KTIcon } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>



      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        icon='black-right'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/apps/user-management/users' title={intl.formatMessage({ id: 'MENU.DASHBOARD_ALTSUB' })} hasBullet={true} />
        <AsideMenuItem to='/apps/user-management/users' title={intl.formatMessage({ id: 'MENU.DASHBOARD_ALTSUBSECOND' })} hasBullet={true} />
      </AsideMenuItemWithSub>


      <AsideMenuItem
        to='/crafted/pages/profile/projects'
        icon='black-right'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD.APPOINTMENT' })}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem to='/crafted/widgets/mixed' icon='black-right'
        title={intl.formatMessage({ id: 'MENU.PAYMENT' })}
        fontIcon='bi-layers' />

      <AsideMenuItem to='/crafted/pages/profile/documents' icon='black-right'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD.CERTIFICATE' })}
        fontIcon='bi-layers' />

      <AsideMenuItem to='/crafted/pages/profile/documents' icon='black-right'
        // title={intl.formatMessage({ id: 'MENU.DASHBOARD.ALLCLIENT' })}
        title="Keşfet"
        fontIcon='bi-layers' />




      {/* <div className='menu-item '>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div> */}

      




      {/* <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Randevularım'
        fontIcon='bi-archive'
        icon='black-right'

      
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Aldığım' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub> */}


      {/* <AsideMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='black-right'>
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />

      </AsideMenuItemWithSub> */}


      {/* <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='black-right'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub> */}


      {/* <div className='menu-item '>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div> */}


      {/* <AsideMenuItemWithSub to='/apps/chat' title='Chat' fontIcon='bi-chat-left' icon='black-right'>
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub> */}


      {/* <AsideMenuItem
        to='/apps/user-management/users'
        icon='black-right'
        title='User management'
        fontIcon='bi-layers'

      /> */}

      {/* 
      <div className='menu-item hidden'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div> */}


      {/* <div className='menu-item hidden'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='document' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}


    </>
  )
}
