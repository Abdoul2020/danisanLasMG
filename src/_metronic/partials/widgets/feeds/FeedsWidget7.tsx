/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useEffect } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {Link, useLocation} from 'react-router-dom'

type Props = {
  className: string

}

const FeedsWidget7: React.FC<Props> = ({className}) => {






const [operasyonType,setoperasyonType]= useState("");
const [seansPrice, setSeancePrice]= useState("$");

useEffect(() => {

	console.log("changeValue",operasyonType )

	if(operasyonType==="Online"){

		setSeancePrice("1200$")

	}else if(operasyonType==="Yüz Yüze"){
		setSeancePrice("5000$")
	}else if(operasyonType==="Online/ YüzYüze"){
		setSeancePrice("2000$")
	}


}, [operasyonType])



function handleOptionChange(event:any) {

	console.log("theris", event.target.value)
    setoperasyonType(event.target.value);
  }



  
  return (

    <div className={`card ${className}`}>

<div className="card-body pt-0">
											<div className="d-flex flex-column gap-10">
												<div className="fv-row">
													<label className="form-label" style={{visibility:"hidden"}}>Order ID</label>
													<div className="fw-bold fs-3"> Randevu Çizelge </div>
												</div>


												<div className="fv-row">
													<label className="required form-label">Operasyon Tipi</label>
													<select    className="form-select mb-2" data-control="select2" data-hide-search="true"
													 data-placeholder="Select an option" name="payment_method" id="kt_ecommerce_edit_order_payment"
													 value={operasyonType}
													 onChange={handleOptionChange}
													 >
														<option> {operasyonType==="" ? "Operasyon Tipi": operasyonType }</option>
														<option value="Online">  Online</option>
														<option value="Yüz Yüze" > Yüz Yüze </option>
														<option value="Online/ YüzYüze"> Online/ YüzYüze </option>
													</select>
													<div className="text-muted fs-7"> Seans Tipi seçiniz.</div>
												</div>

												

												{/* <div className="fv-row">
													<label className="required form-label">Shipping Method</label>
													<select className="form-select mb-2" data-control="select2" data-hide-search="true" data-placeholder="Select an option" name="shipping_method" id="kt_ecommerce_edit_order_shipping">
														<option></option>
														<option value="none">N/A - Virtual Product</option>
														<option value="standard" >Standard Rate</option>
														<option value="express">Express Rate</option>
														<option value="speed">Speed Overnight Rate</option>
													</select>
													<div className="text-muted fs-7">Set the date of the order to process.</div>
												</div> */}

												


												<div className="fv-row">

													<label className="required form-label"> Seans Ücretiniz </label>
													<input id="kt_ecommerce_edit_order_date" name="order_date" placeholder="Select a date" className="form-control mb-2" value={seansPrice} readOnly />
													<div className="text-muted fs-7">Seans başına Ücret.</div>

												</div>
											</div>
										</div>

    </div>
  )
}

export {FeedsWidget7}
