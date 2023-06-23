// @ts-nocheck
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {KTIcon} from '../../../helpers'

type Props = {
  className: string
  backGroundColor: string
}

const MixedWidget15: FC<Props> = ({className, backGroundColor}) => (
  <div
    className={`card ${className} theme-dark-bg-body`}
    style={{backgroundColor: backGroundColor}}
  >
    {/* begin::Body */}
    <div className='card-body d-flex flex-column'>
      {/* begin::Wrapper */}
      <div className='d-flex flex-column mb-7'>
        {/* begin::Title  */}
        <a href='#' className='text-dark text-hover-primary fw-bolder fs-3'>
           Hızlı Özet
        </a>
        {/* end::Title */}
      </div>
      {/* end::Wrapper */}

      <div className='row g-0'>
        {/*begin::Col*/}
        <div className='col-6'>
          <div className='d-flex align-items-center mb-9 me-2'>
            {/*begin::Symbol*/}
            <div className='symbol symbol-40px me-3'>
              <div className='symbol-label bg-body bg-opacity-50'>
                <KTIcon iconName='abstract-42' className='fs-1 text-dark' />
              </div>
            </div>
            {/*end::Symbol*/}

            {/*begin::Title*/}
            <div>
              <div className='fs-5 text-dark fw-bolder lh-1'>₺10K</div>
              <div className='fs-7 text-gray-600 fw-bold'>Satış</div>
            </div>
            {/*end::Title*/}
          </div>
        </div>
        {/*end::Col*/}

        {/*begin::Col*/}
        <div className='col-6'>
          <div className='d-flex align-items-center mb-9 ms-2'>
            {/*begin::Symbol*/}
            <div className='symbol symbol-40px me-3'>
              <div className='symbol-label bg-body bg-opacity-50'>
                <KTIcon iconName='abstract-45' className='fs-1 text-dark' />
              </div>
            </div>
            {/*end::Symbol*/}

            {/*begin::Title*/}
            <div>
              <div className='fs-5 text-dark fw-bolder lh-1'>₺0</div>
              <div className='fs-7 text-gray-600 fw-bold'> çıktı </div>
            </div>
            {/*end::Title*/}
          </div>
        </div>
        {/*end::Col*/}

        {/*begin::Col*/}
        <div className='col-6'>
          <div className='d-flex align-items-center me-2'>
            {/*begin::Symbol*/}
            <div className='symbol symbol-40px me-3'>
              <div className='symbol-label bg-body bg-opacity-50'>
                <KTIcon iconName='abstract-21' className='fs-1 text-dark' />
              </div>
            </div>
            {/*end::Symbol*/}

            {/*begin::Title*/}
            <div>
              <div className='fs-5 text-dark fw-bolder lh-1'>40</div>
              <div className='fs-7 text-gray-600 fw-bold'>Seans</div>
            </div>
            {/*end::Title*/}
          </div>
        </div>
        {/*end::Col*/}

        {/*begin::Col*/}
        <div className='col-6'>
          <div className='d-flex align-items-center ms-2'>
            {/*begin::Symbol*/}
            <div className='symbol symbol-40px me-3'>
              <div className='symbol-label bg-body bg-opacity-50'>
                <KTIcon iconName='abstract-44' className='fs-1 text-dark' />
              </div>
            </div>
            {/*end::Symbol*/}

            {/*begin::Title*/}
            <div>
              <div className='fs-5 text-dark fw-bolder lh-1'>₺20K</div>
              <div className='fs-7 text-gray-600 fw-bold'>Kazanç</div>
            </div>
            {/*end::Title*/}
          </div>
        </div>
        {/*end::Col*/}
      </div>
    </div>
  </div>
)

export {MixedWidget15}
