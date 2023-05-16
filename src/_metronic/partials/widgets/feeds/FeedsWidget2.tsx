/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link, useLocation } from 'react-router-dom'

type Props = {
	className: string,
	onValueChange: any

}

const FeedsWidget2: React.FC<Props> = ({ className, onValueChange }) => {


	const handleChange = (event: any) => {
		event.preventDefault()
		onValueChange(true);
	};





	return (
		<div className={`card ${className}`}>


			<div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
				<div className="card-header cursor-pointer">
					<div className="card-title m-0">
						<h3 className="fw-bold m-0">Profil bilgileri</h3>
					</div>

						<a href="#" className="btn btn-sm btn-primary align-self-center" onClick={(e)=>handleChange(e)}  >Profil Düzenle </a>


					
				</div>
				<div className="card-body p-9">
					<div className="row mb-7">
						<label className="col-lg-4 fw-semibold text-muted">Ad Soyad</label>
						<div className="col-lg-8">
							<span className="fw-bold fs-6 text-gray-800"> Abdoul k.</span>
						</div>
					</div>


				
					<div className="row mb-7">
						<label className="col-lg-4 fw-semibold text-muted">Hesap Tipi</label>
						<div className="col-lg-8">
							<span className="fw-bold fs-6 text-gray-800">Bireysel</span>
						</div>
					</div>



					<div className="row mb-7">
						<label className="col-lg-4 fw-semibold text-muted">Telefon Numarası
							<span className="ms-1" data-bs-toggle="tooltip" title="Phone number must be active">
								<i className="ki-duotone ki-information fs-7">
									<span className="path1"></span>
									<span className="path2"></span>
									<span className="path3"></span>
								</i>
							</span></label>
						<div className="col-lg-8 d-flex align-items-center">
							<span className="fw-bold fs-6 text-gray-800 me-2">+905351035340</span>
							<span className="badge badge-success">Onaylanmış</span>
						</div>
					</div>
					<div className="row mb-7">
						<label className="col-lg-4 fw-semibold text-muted"> E-posta</label>
						<div className="col-lg-8">
							<a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">abd@gmail.com</a>
							
						</div>
					</div>
					<div className="row mb-7">
						<label className="col-lg-4 fw-semibold text-muted">Ülke
							<span className="ms-1" data-bs-toggle="tooltip" title="Country of origination">
								<i className="ki-duotone ki-information fs-7">
									<span className="path1"></span>
									<span className="path2"></span>
									<span className="path3"></span>
								</i>
							</span></label>
						<div className="col-lg-8">
							<span className="fw-bold fs-6 text-gray-800">Germany</span>
						</div>
					</div>

					


					<div className="notice  bg-light-warning rounded border-warning border border-dashed p-6">
						{/* <h4 className="text-gray-800 mb-0">Your Referral Link</h4> */}
						<p className="fs-6 fw-semibold text-gray-600 py-4 m-0">Referans Linki</p>
						<div className="d-flex">
							<input id="kt_referral_link_input" type="text" className="form-control form-control-solid me-3 flex-grow-1" name="search" value="0074752" />
							<button id="kt_referral_program_link_copy_btn" className="btn btn-light btn-active-light-primary fw-bold flex-shrink-0" data-clipboard-target="#kt_referral_link_input">Kopyala</button>
						</div>
					</div>


					{/* 
									<div className="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6">
										<i className="ki-duotone ki-information fs-2tx text-warning me-4">
											<span className="path1"></span>
											<span className="path2"></span>
											<span className="path3"></span>
										</i>
										<div className="d-flex flex-stack flex-grow-1">
											<div className="fw-semibold">
												<h4 className="text-gray-900 fw-bold">We need your attention!</h4>
												<div className="fs-6 text-gray-700">Your payment was declined. To start using tools, please
												<a className="fw-bold" href="../../demo3/dist/account/billing.html">Add Payment Method</a>.</div>
											</div>
										</div>
									</div> */}





				</div>
			</div>


		</div>
	)
}

export { FeedsWidget2 }
