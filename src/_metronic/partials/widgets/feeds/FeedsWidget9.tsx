/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link, useLocation } from 'react-router-dom'

type Props = {
	className: string

}

const FeedsWidget9: React.FC<Props> = ({ className }) => {


	


	return (
		<div >


                            <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
								<div className="col-md-6 col-lg-4 col-xl-3">
									<div className="card h-100">
										<div className="card-body d-flex justify-content-center text-center flex-column p-8">
											<a href="../../demo3/dist/apps/file-manager/files.html" className="text-gray-800 text-hover-primary d-flex flex-column">
												<div className="symbol symbol-60px mb-5">
													<img src="assets/media/svg/files/pdf.svg" className="theme-light-show" alt="" />
													<img src="assets/media/svg/files/pdf-dark.svg" className="theme-dark-show" alt="" />
												</div>
												<div className="fs-5 fw-bold mb-2">Project Reqs..</div>
											</a>
											<div className="fs-7 fw-semibold text-gray-400">3 days ago</div>
										</div>
									</div>
								</div>

								<div className="col-md-6 col-lg-4 col-xl-3">
									<div className="card h-100">
										<div className="card-body d-flex justify-content-center text-center flex-column p-8">
											<a href="../../demo3/dist/apps/file-manager/files.html" className="text-gray-800 text-hover-primary d-flex flex-column">
												<div className="symbol symbol-60px mb-5">
													<img src="assets/media/svg/files/doc.svg" className="theme-light-show" alt="" />
													<img src="assets/media/svg/files/doc-dark.svg" className="theme-dark-show" alt="" />
												</div>
												<div className="fs-5 fw-bold mb-2">CRM App Docs..</div>
											</a>
											<div className="fs-7 fw-semibold text-gray-400">3 days ago</div>
										</div>
									</div>
								</div>

								<div className="col-md-6 col-lg-4 col-xl-3">
									<div className="card h-100">
										<div className="card-body d-flex justify-content-center text-center flex-column p-8">
											<a href="../../demo3/dist/apps/file-manager/files.html" className="text-gray-800 text-hover-primary d-flex flex-column">
												<div className="symbol symbol-60px mb-5">
													<img src="assets/media/svg/files/css.svg" className="theme-light-show" alt="" />
													<img src="assets/media/svg/files/css-dark.svg" className="theme-dark-show" alt="" />
												</div>
												<div className="fs-5 fw-bold mb-2">User CRUD Styles</div>
											</a>
											<div className="fs-7 fw-semibold text-gray-400">4 days ago</div>
										</div>
									</div>
								</div>

								


			
								<div className="col-md-6 col-lg-4 col-xl-3">
									<div className="card h-100 flex-center bg-light-primary border-primary border border-dashed p-8">
										<img src="assets/media/svg/files/upload.svg" className="mb-5" alt="" />
										<a href="#" className="text-hover-primary fs-5 fw-bold mb-2"> Sertifika Yükle</a>
										<div className="fs-7 fw-semibold text-gray-400">Sürükle Bırak</div>
									</div>
								</div>
							</div>


		</div>

	)
}

export { FeedsWidget9 }
