/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler } from 'react'
import SocialList from "./SocialAllList"



type Propss = {
    className: string
}



const SocialWidget: React.FC<Propss> = ({ className }) => {


    const options = ["facebook", "instagram", "Twitter","Diğer Sosyal Media"];



    return (
        <div className={`card ${className}`}>

            <div className="card mb-5 mb-xl-10">

                <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">

                    <div className="card-title m-0">
                        <h3 className="fw-bold m-0"> Sosyal Medya </h3>
                    </div>

                </div>
                <div id="kt_account_settings_profile_details">

                    <form id="kt_account_profile_details_form" className="form" >

                        <div className="card-body border-top p-9">

                            <div className="row mb-6">

                                <div className="col-lg-5 fv-row">

                                    <SocialList options={options} />

                                </div>

                                <div className="col-lg-5 fv-row" >
                                    <div className="input-group mb-5">
                                        <span className="input-group-text" id="basic-addon3">https//:instagram.com/</span>
                                        <input type="text" className="form-control" id="basic-url" name="input_group_input" aria-describedby="basic-addon3" />
                                    </div>
                                </div>


                                {/* <div className="col-lg-5 fv-row">
                                    <input type="text" name="company" className="form-control form-control-lg form-control-solid" placeholder="Company name" value="instagram.com/abdul2020" />
                                </div> */}


                                <div className="col-lg-2">

                                    <button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">Ekle</button>
                                </div>


                            </div>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
    
}



export { SocialWidget }
