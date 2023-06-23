/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../app/modules/auth'
import { toAbsoluteUrl } from '../../../helpers'
import { Languages } from '../header-menus/Languages'
import { HiBadgeCheck } from "react-icons/hi"
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from '../../../../service/store';
import ImageContext from '../../widgets/feeds/ImageContext'
import { useIntl } from 'react-intl'










const UserMenu = () => {



  const { imageUrl, setImageUrl } = useContext(ImageContext);


  const navigate = useNavigate();
  const profileImage = useSelector((state: any) => state.user_ExpertSlice.pro_base64);



  const { currentUser, logout } = useAuth()


  function logout_Expert(e: any) {

    e.preventDefault();
    localStorage.removeItem("AElog");
    window.location.href = "/auth/login"
    // navigate("/auth/login");
  }


  //langugage 
  const intl = useIntl()







  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      {/* begin::Menu item */}
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          {/* begin::Avatar */}
          <div className='symbol symbol-50px me-5'>

            {
              imageUrl ? (
                <img src={imageUrl} alt="" />)
                : (
                  <img alt='Logo' src={toAbsoluteUrl(`data:image/png;base64,${profileImage && profileImage !== null && profileImage}`)} />
                )
            }


          </div>
          {/* end::Avatar */}

          {/* begin::Username */}
          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              Abdoul Kowyou YACOUBOU
              {/* {currentUser?.first_name} {currentUser?.last_name} */}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>
                <HiBadgeCheck />
              </span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
          {/* end::Username */}
        </div>
      </div>
      {/* end::Menu item */}

      {/* begin::Menu separator */}
      <div className='separator my-2'></div>
      {/* end::Menu separator */}

      {/* begin::Menu item */}
      <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          {intl.formatMessage({ id: 'USER.MENU.SIDEBAR.PROFIL' })}
        </Link>
      </div>
      {/* end::Menu item */}


      {/* begin::Menu separator */}

      <div className='separator my-2'> </div>

      {/* end::Menu separator */}

      <Languages languageMenuPlacement='right-end' />

      {/* begin::Menu item */}
      <div className='menu-item px-5 my-1'>
        <a href='#' className='menu-link px-5'>
          {/* Hesap Ayarı */}

          {intl.formatMessage({ id: 'USER.MENU.SIDEBAR.SETTING' })}


        </a>
      </div>
      {/* end::Menu item */}

      {/* begin::Menu item */}
      <div className='menu-item px-5' onClick={(e) => logout_Expert(e)}>
        <a onClick={logout} className='menu-link px-5'>
          {intl.formatMessage({ id: 'USER.MENU.SIDEBAR.LOGOUT' })}
        </a>
      </div>
    </div>
  )
}

export { UserMenu }
