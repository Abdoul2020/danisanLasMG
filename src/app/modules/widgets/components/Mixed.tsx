import React, {FC} from 'react'
import {
  MixedWidget1,
  MixedWidget2,
  MixedWidget3,
  MixedWidget4,
  MixedWidget5,
  MixedWidget6,
  MixedWidget7,
  MixedWidget8,
  MixedWidget9,
  MixedWidget10,
  MixedWidget11,
} from '../../../../_metronic/partials/widgets'

const Mixed: FC = () => {
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col'>
          <MixedWidget1 className='card-xl-stretch mb-xl-8' color='primary' />
        </div>
      
      </div>
      {/* end::Row */}
    </>
  )
}

export {Mixed}
