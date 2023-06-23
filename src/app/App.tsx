import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { MasterInit } from '../_metronic/layout/MasterInit'
import { AuthInit } from './modules/auth'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageContext from '../_metronic/partials/widgets/feeds/ImageContext'


// redux toolkit send
//@ts-ignore
import { Provider } from 'react-redux'
import { store } from "../service/store"
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode"; //jwt time install to calculate user login time
//@ts-ignore
import axios from "axios";






const App = () => {

  const navigate = useNavigate();

  const expertTokenCheck = localStorage.AElog


  //image to update
  const [imageUrl, setImageUrl] = useState<any>("");

  useEffect(() => {



    if (localStorage.getItem("AElog")) {
      console.log("therisAuth")

      if (expertTokenCheck) {
        const decodedToken: any = jwtDecode(expertTokenCheck);

        const expertTokenTime = decodedToken.exp * 1000;
        console.log("theris", expertTokenTime)

        if (decodedToken.exp * 1000 < Date.now()) {

          localStorage.removeItem("AElog");
          delete axios.defaults.headers.common["Authorization"];
          navigate("/auth/login");

        } else {
          console.log("authenticate var")
          navigate("/crafted/pages/profile");
        }
      }

    } else {
      console.log("noAuth")
      navigate("/auth/login");
    }




    setImageUrl(localStorage.getItem("setIdTo"));


  }, [])

  // Listen for changes in localStorage
  window.addEventListener('storage', () => {
    setImageUrl(localStorage.getItem("setIdTo"));
  });



  return (

    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Provider store={store}>

            <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
              
              <Outlet />
              <MasterInit />
              <ToastContainer />


              </ImageContext.Provider>



            </Provider>
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export { App }
