/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler } from 'react'

















type Propss = {
    className: string
}



const SocialWidget: React.FC<Propss> = ({ className }) => {





    return (
        <div className={`card ${className}`}>

            <div  className="card mb-5 mb-xl-10">

            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
					<div className="card-title m-0">
						<h3 className="fw-bold m-0"> Sosyal Medya </h3>
					</div>
				</div>

                <div id="kt_account_settings_profile_details">

                    <form   id="kt_account_profile_details_form" className="form" >

                        <div className="card-body border-top p-9">

                        <div className="row mb-6">
								
								<div className="col-lg-8 fv-row">
									<input type="text" name="company" className="form-control form-control-lg form-control-solid" placeholder="Company name" value="instagram.com/abdul2020" />
								</div>

                                <div className="col-lg-4">
							{/* <button type="reset" className="btn btn-light btn-active-light-primary me-2" >İptal</button> */}
							<button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">Ekle</button>
						</div>

                                {/* <label className="col-lg-4 col-form-label required fw-semibold fs-6">Company</label> */}
							</div>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}



export { SocialWidget }
