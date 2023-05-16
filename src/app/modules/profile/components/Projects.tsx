/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Card2} from '../../../../_metronic/partials/content/cards/Card2'
import {IconUserModel} from '../ProfileModels'
import { FeedsWidget7, FeedsWidget8 } from '../../../../_metronic/partials/widgets'

export function Projects() {



  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-4'>

        <FeedsWidget7  className='mb-5 mb-xxl-8'/>

      </div>

      <div className='col-xl-8'>

        <FeedsWidget8  className='mb-5 mb-xxl-8'/>

      </div>


    </div>
  )
}