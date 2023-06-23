/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {KTIcon} from '../../../helpers'

type Props = {
  className: string
  color: string
}

const MixedWidget1: React.FC<Props> = ({className, color}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>Toplam harcamalrım</h3>
            <div className='ms-1'>
              {/* begin::Menu */}
              <button
                type='button'
                className={`btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color-${color} border-0 me-n3`}
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
              >
                <KTIcon iconName='category' className='fs-2' />
              </button>
              <Dropdown1 />
              {/* end::Menu */}
            </div>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-semibold fs-7'> Fiyat </span>
            <span className='fw-bold fs-2x pt-1'> ₺ 37,562.00</span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}


        {/* begin::Items */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
          style={{marginTop: '-100px'}}
        >

<div className="card">
				<div className="card-header card-header-stretch border-bottom border-gray-200">
					<div className="card-title">
						<h3 className="fw-bold m-0"> Ödeme Geçmişi</h3>
					</div>
					<div className="card-toolbar m-0">
						<ul className="nav nav-stretch nav-line-tabs border-transparent" role="tablist">
							<li className="nav-item" role="presentation">
								<a id="kt_billing_6months_tab" className="nav-link fs-5 fw-semibold me-3 active" data-bs-toggle="tab" role="tab" href="#kt_billing_months">Ay</a>
							</li>
							<li className="nav-item" role="presentation">
								<a id="kt_billing_1year_tab" className="nav-link fs-5 fw-semibold me-3" data-bs-toggle="tab" role="tab" href="#kt_billing_year">Yıl</a>
							</li>
							<li className="nav-item" role="presentation">
								<a id="kt_billing_alltime_tab" className="nav-link fs-5 fw-semibold" data-bs-toggle="tab" role="tab" href="#kt_billing_all">Tümü</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="tab-content">
					<div id="kt_billing_months" className="card-body p-0 tab-pane fade show active" role="tabpanel" aria-labelledby="kt_billing_months">
						<div className="table-responsive">
							<table className="table table-row-bordered align-middle gy-4 gs-9">
								<thead className="border-bottom border-gray-200 fs-6 text-gray-600 fw-bold bg-light bg-opacity-75">
									<tr>
										<td className="min-w-150px">İşlem Numarası</td>
										<td className="min-w-250px">Açıklama</td>
										<td className="min-w-150px">Tutar</td>
										<td className="min-w-150px">Fatura</td>
										<td className="min-w-150px">Taksit</td>
										<td></td>
									</tr>
								</thead>


								<tbody className="fw-semibold text-gray-600">
									<tr>
										<td>Nov 01, 2020</td>
										<td>
											<a href="#">Invoice for Ocrober 2023</a>
										</td>
										<td>$123.79</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary"> Göster </a>
										</td>
									</tr>
									<tr>
										<td>Oct 08, 2020</td>
										<td>
											<a href="#">Invoice for September 2023</a>
										</td>
										<td>$98.03</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary"> Göster </a>
										</td>
									</tr>
									<tr>
										<td>Oct 08, 2020</td>
										<td>
											<a href="#">Invoice for September 2023</a>
										</td>
										<td>$98.03</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Oct 08, 2020</td>
										<td>
											<a href="#">Invoice for September 2023</a>
										</td>
										<td>$98.03</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Oct 08, 2020</td>
										<td>
											<a href="#">Invoice for September 2023</a>
										</td>
										<td>$98.03</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Oct 08, 2020</td>
										<td>
											<a href="#">Invoice for September 2023</a>
										</td>
										<td>$98.03</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Oct 08, 2020</td>
										<td>
											<a href="#">Invoice for September 2023</a>
										</td>
										<td>$98.03</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>

								</tbody>
							</table>
						</div>
					</div>


					<div id="kt_billing_year" className="card-body p-0 tab-pane fade" role="tabpanel" aria-labelledby="kt_billing_year">
						<div className="table-responsive">
							<table className="table table-row-bordered align-middle gy-4 gs-9">
								<thead className="border-bottom border-gray-200 fs-6 text-gray-600 fw-bold bg-light bg-opacity-75">
									<tr>
										<td className="min-w-150px">İşlem Numarası</td>
										<td className="min-w-250px">Açıklama</td>
										<td className="min-w-150px">Tutar</td>
										<td className="min-w-150px">Fatura</td>
										<td className="min-w-150px">Taksit</td>
										<td></td>
									</tr>
								</thead>
								<tbody className="fw-semibold text-gray-600">
									<tr>
										<td>Dec 01, 2021</td>
										<td>
											<a href="#">Billing for Ocrober 2023</a>
										</td>
										<td>$250.79</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Oct 08, 2021</td>
										<td>
											<a href="#">Statements for September 2023</a>
										</td>
										<td>$98.03</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Aug 24, 2021</td>
										<td>Paypal</td>
										<td>$35.07</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Aug 01, 2021</td>
										<td>
											<a href="#">Invoice for July 2023</a>
										</td>
										<td>$142.80</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Jul 01, 2021</td>
										<td>
											<a href="#">Statements for June 2023</a>
										</td>
										<td>$123.79</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Jun 17, 2021</td>
										<td>Paypal</td>
										<td>$23.09</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div id="kt_billing_all" className="card-body p-0 tab-pane fade" role="tabpanel" aria-labelledby="kt_billing_all">
						<div className="table-responsive">
							<table className="table table-row-bordered align-middle gy-4 gs-9">
								<thead className="border-bottom border-gray-200 fs-6 text-gray-600 fw-bold bg-light bg-opacity-75">
									<tr>
										<td className="min-w-150px">İşlem Numarası</td>
										<td className="min-w-250px">Açıklama</td>
										<td className="min-w-150px">Tutar</td>
										<td className="min-w-150px">Fatura</td>
										<td className="min-w-150px">Taksit</td>
										<td></td>
									</tr>
								</thead>
								<tbody className="fw-semibold text-gray-600">
									<tr>
										<td>Nov 01, 2021</td>
										<td>
											<a href="#">Billing for Ocrober 2023</a>
										</td>
										<td>$123.79</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Aug 10, 2021</td>
										<td>Paypal</td>
										<td>$35.07</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Aug 01, 2021</td>
										<td>
											<a href="#">Invoice for July 2023</a>
										</td>
										<td>$142.80</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Jul 20, 2021</td>
										<td>
											<a href="#">Statements for June 2023</a>
										</td>
										<td>$123.79</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Jun 17, 2021</td>
										<td>Paypal</td>
										<td>$23.09</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
									<tr>
										<td>Jun 01, 2021</td>
										<td>
											<a href="#">Invoice for May 2023</a>
										</td>
										<td>$123.79</td>
										<td>
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">PDF</a>
										</td>
										<td className="text-right">
											<a href="#" className="btn btn-sm btn-light btn-active-light-primary">Göster</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
         

        



          
         
         
        </div>
        {/* end::Items */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MixedWidget1}
