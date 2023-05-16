import React, { useState } from 'react'
import {
  FeedsWidget2,
  FeedsWidget3,
  FeedsWidget4,
  FeedsWidget5,
  FeedsWidget6,
  ChartsWidget1,
  ListsWidget5,
  ListsWidget2,
} from '../../../../_metronic/partials/widgets'
import { Value } from 'sass';

export function Overview() {


  const [editUpdate, seteditUpdate] =useState(false);



  const handleEditProfile=(data:any)=>{

    seteditUpdate(data)

  }




  return (
    <div className='row g-5 g-xxl-8'>
      
      <div className=''>

        {
          editUpdate===false ? (
<FeedsWidget2 className='mb-5 mb-xxl-8'  onValueChange={handleEditProfile} />
          ):

          (
            <FeedsWidget3 className='mb-5 mb-xxl-8'  onValueChange={handleEditProfile} />
          )

        }


            

    
      </div>


    </div>
  )
}
