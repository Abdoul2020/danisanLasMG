/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown, FormControl } from 'react-bootstrap';
import DropdownComponent from './DrodownComponent';
import DropdownWithoutSearch from './DropdownWithoutSearch';





type Props = {
	className: string

}

const FeedsWidget7: React.FC<Props> = ({ className }) => {






	const [operasyonType, setoperasyonType] = useState("");
	const [seansPrice, setSeancePrice] = useState("$");

	useEffect(() => {

		console.log("changeValue", operasyonType)


	}, [operasyonType])



	function handleOptionChange(event: any) {

		console.log("theris", event.target.value)
		setoperasyonType(event.target.value);
	}



	//option choose type
	//const options = ["Option 1", "Option 2", "Option 3"];
	const orperationType = ["Online", "Yüz Yüze", "Online/ YüzYüze"]
	const [operationTypeChange,setOperationTypeChange]=useState("No data from Child yet")


	useEffect(() => {
		console.log("wellType", operationTypeChange)


		if (operationTypeChange === "Online") {

			setSeancePrice("1200$")

		} else if (operationTypeChange === "Yüz Yüze") {
			setSeancePrice("5000$")
		} else if (operationTypeChange === "Online/ YüzYüze") {
			setSeancePrice("2000$")
		}

	}, [operationTypeChange])
	
	const handleOperationType = (dataFromChild:any) => {

        setOperationTypeChange(dataFromChild);

    }
	


	return (

		<div className={`card ${className}`}>
			<div className="card-body pt-0">
				<div className="d-flex flex-column gap-10">
					<div className="fv-row">
						<label className="form-label" style={{ visibility: "hidden" }}>Order ID</label>
						<div className="fw-bold fs-3"> Randevu Çizelge </div>
					</div>


					<div className="fv-row">
						<label className="required form-label">Operasyon Tipi</label>
						<DropdownWithoutSearch options={orperationType}  updateData={handleOperationType}/>
						<div className="text-muted fs-7"> Seans Tipi seçiniz.</div>
					</div>

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

export { FeedsWidget7 }
