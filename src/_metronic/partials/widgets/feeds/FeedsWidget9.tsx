/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link, useLocation } from 'react-router-dom';


type Props = {
	className: string

}

const FeedsWidget9: React.FC<Props> = ({ className }) => {


	const [certificateData, setcertificateData] = useState([
		{
			type: "pdf",
			name: "uzman sertifika",
			src: ""
		},
		{
			type: "pdf",
			name: "birinciPdf",
			src: ""
		},
		{
			type: "pdf",
			name: "ikinciPdf",
			src: ""
		}
	])
	//pdf certificate Data


	const [newFileTo, setNewFileTo] = useState<any>()

	useEffect(() => {

		if (newFileTo) {

			setcertificateData((lastData) => [...lastData,
			{
				type: "pdf",
				name: "agianKo",
				src: ""
			}
			])
		}



	}, [newFileTo])


	const fileInput = useRef<HTMLInputElement>(null);

	const handleDivClick = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("aleaysFu", event)
		if (event.target.files) {
			const file = event.target.files[0];
			console.log("nerwFileToeplo", file);
			setNewFileTo(file)
			event.target.value = ""
			// Do whatever you want with the file
		}
	}


	const handleRemove = () => {
		//remove certificate

	};







	return (

		<div className="row g-6 g-xl-9 mb-6 mb-xl-9">
			{/* click and choose file */}
			<div className="col-md-6 col-lg-4 col-xl-3">
				<input type="file" ref={fileInput} style={{ display: "none" }} onChange={handleFileChange} />
				<div onClick={handleDivClick} className="card h-100 flex-center bg-light-primary border-primary border border-dashed p-8">
					<img
						src={toAbsoluteUrl('/media/svg/files/upload.svg')}
						className="mb-5" alt="" />
					<a href="#" className="text-hover-primary fs-5 fw-bold mb-2"> Sertifika Yükle</a>
					<div className="fs-7 fw-semibold text-gray-400">Sürükle Bırak</div>
				</div>
			</div>



			{

				certificateData.map((v, i) => {
					return (

						<div className="col-md-6 col-lg-4 col-xl-2">
							<div className="card h-100">
								<div className="card-body d-flex justify-content-center text-center flex-column p-8">
									<div>
										<span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow float-right"
											data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Sil" onClick={handleRemove}>
											<i className="ki-duotone ki-cross fs-2" >
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
										</span>
									</div>
									<a href="" className="text-gray-800 text-hover-primary d-flex flex-column">
										<div className="symbol symbol-60px mb-5">
											<img
												src={toAbsoluteUrl('/media/svg/files/pdf.svg')}

												className="theme-light-show" alt="" />
											<img
												src={toAbsoluteUrl('/media/svg/files/pdf-dark.svg')}
												className="theme-dark-show" alt="" />
										</div>
										<div className="fs-5 fw-bold mb-2">{v.name}</div>
									</a>
								</div>
							</div>
						</div>

					)

				})
			}





		</div>




	)
}

export { FeedsWidget9 }
