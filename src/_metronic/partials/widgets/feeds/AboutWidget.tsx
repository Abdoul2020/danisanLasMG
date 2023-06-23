/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';




type Props = {
	className: string
}
interface Dictionary<T> {
	[key: string]: T;
}

type DictionaryEntry = [string, boolean];
type DictionaryType = {
	[key: string]: DictionaryEntry;
};



const AbdouWidget: React.FC<Props> = ({ className }) => {



	const [myDictionary, setMyDictionary] = useState<DictionaryType>({
		Biyografi: ['Abdoul', false],
		Akademik_Bilgileri: ['gazi-uni', false],
		Deneyimler: ['FullStack Developer', false],
		Ekstra_Bilgiler: ["Ekol", false]
	});



	const [openSubDescription, setopenSubDescription] = useState(false);

	useEffect(() => {
		console.log("cahanges part", openSubDescription)
	}, [openSubDescription])


	const handleClick = (key: any) => {

		console.log("ErrorToBe::", key)

		setMyDictionary((prevState) => {
			const updatedEntry: DictionaryEntry = [...prevState[key]];
			updatedEntry[1] = !updatedEntry[1];
			console.log("updatedEntry", updatedEntry)
			return { ...prevState, [key]: updatedEntry };
		});


		console.log("lastObject", myDictionary)


	};


	const entries = Object.entries(myDictionary);

	const [titleData, setTitleData] = useState("");
	const [description, setDescription] = useState("");
	// send Thchhosen to the form
	const handleSenDataToModule = (title: any, description: any) => {
		setTitleData(title)
		setDescription(description)

	};


	let customPlugins = ClassicEditor.builtinPlugins.filter(plugin => plugin.pluginName !== 'ImageUpload');
	const editorConfig = {
		toolbar: ['heading', '|', 'bold', 'italic', 'link'],
		language: 'tr',
	};

	const modalDismissRef: any = useRef();
	//cancel the data
	const handleCancel = (e: any) => {
		e.preventDefault();

		Swal.fire({
			text: "İşlemi iptal etmek istediğini emin misin?",
			icon: "warning",
			showCancelButton: true,
			buttonsStyling: false,
			confirmButtonText: "Evet",
			cancelButtonText: "Hayır",
			customClass: {
				confirmButton: "btn btn-primary",
				cancelButton: "btn btn-active-light"
			}
		}).then((result) => {
			if (result.isConfirmed) {
				// form.reset(); // Reset form
				modalDismissRef.current.click();
				// modal.hide(); // Hide modal
				// Instead of manually hiding the modal, you can control it via state
				//setModalVisible(false);
			} else if (result.isDismissed) {

				Swal.fire({
					text: "işleminiz devam ediyor.",
					icon: "error",
					buttonsStyling: false,
					confirmButtonText: "Tamam",
					customClass: {
						confirmButton: "btn btn-primary",
					}

				});
			}
		});
	}



	return (

		<div className={`card ${className}`}>

			<div className="card pt-4 mb-6 mb-xl-9">
				<div className="card-header border-0">
					<div className="card-title">
						<h2 className="fw-bold mb-0"> Kişisel Bilgiler</h2>
					</div>

					{/* 
					<div className="card-toolbar">
						<a href="#" className="btn btn-sm btn-flex btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">
							<i className="ki-duotone ki-plus-square fs-3">
								<span className="path1"></span>
								<span className="path2"></span>
								<span className="path3"></span>
							</i> Yeni K.B Ekle</a>
					</div> */}



				</div>



				<div id="kt_customer_view_payment_method" className="card-body pt-0">


					{entries.map(([v, [value, boolValue]], index) => {

						console.log("whatWehave::", v, "okkwesh::", value, "okyuu::", boolValue)

						return (

							<div>
								<div className="py-0" data-kt-customer-payment-method="row" key={v}>
									<div className="py-3 d-flex flex-stack flex-wrap">
										<div className="d-flex align-items-center collapsible rotate" data-bs-toggle="collapse" role="button"

											onClick={() => handleClick(v)}

											aria-expanded="false" aria-controls="kt_customer_view_payment_method_1">

											<div className="me-3 rotate-90" >
												<i className="ki-duotone ki-right fs-3"></i>
											</div>


											{/* <img src="assets/media/svg/card-logos/mastercard.svg" className="w-40px me-3" alt="" /> */}

											<div className="me-3">
												<div className="d-flex align-items-center">

													<div className="text-gray-800 fw-bold">

														{v === "Akademik_Bilgileri" ? "Akademik Bilgileri" : v === "Ekstra_Bilgiler" ? "Ekstra Bilgiler" : v}

													</div>
													{/* <div className="badge badge-light-primary ms-5">Primary</div> */}
												</div>
												{/* <div className="text-muted">Expires Dec 2024</div> */}
											</div>


										</div>


										{/* second part  */}

										<div className="d-flex my-3 ms-9">

											<a href="#" className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
												data-bs-toggle="modal" data-bs-target="#kt_modal_new_card" onClick={() => handleSenDataToModule(v, value)}>
												<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="Düzenle">
													<i className="ki-duotone ki-pencil fs-3">
														<span className="path1"></span>
														<span className="path2"></span>

													</i>
												</span>
											</a>



											{/* <a href="#" className="btn btn-icon btn-active-light-primary w-30px h-30px" data-bs-toggle="tooltip" title="More Options" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
											<i className="ki-duotone ki-setting-3 fs-3">
												<span className="path1"></span>
												<span className="path2"></span>
												<span className="path3"></span>
												<span className="path4"></span>
												<span className="path5"></span>
											</i>
										</a>

										<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-150px py-3" data-kt-menu="true">
											<div className="menu-item px-3">
												<a href="#" className="menu-link px-3" data-kt-payment-mehtod-action="set_as_primary">Set as Primary</a>

											</div>
										</div> */}




										</div>



									</div>

									{
										boolValue && (

											<div id="kt_customer_view_payment_method_1" className=" show fs-6 ps-10" data-bs-parent="#kt_customer_view_payment_method">
												<div className="d-flex flex-wrap py-5">
													<div className="flex-equal me-5">
														<div>
															{value}
														</div>
													</div>

												</div>
											</div>
										)
									}


								</div>

								{
									index !== entries.length - 1 && (
										<div className="separator separator-dashed"></div>
									)
								}




							</div>
						)
					}



					)}



				</div>


				{/* the  end of about us */}



			</div>



			{/* popup Module From here Biyografi */}

			<div className="modal fade" id="kt_modal_new_card" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered mw-650px">
					<div className="modal-content">
						<div className="modal-header">
							<h2>

								{titleData === "Akademik_Bilgileri" ? "Akademik Bilgileri" : titleData === "Ekstra_Bilgiler" ? "Ekstra Bilgiler" : titleData}

							</h2>
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" ref={modalDismissRef}>
								<i className="ki-duotone ki-cross fs-1">
									<span className="path1"></span>
									<span className="path2"></span>
								</i>
							</div>
						</div>

						{/* about Content */}





						<div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
							<form id="kt_modal_new_card_form" className="form" action="#">
								<div className="row mb-10">
									<div className="fv-row mb-7">
										<label className="fs-6 fw-semibold form-label mb-2">
											{titleData === "Akademik_Bilgileri" ? "Akademik Bilgileri" : titleData === "Ekstra_Bilgiler" ? "Ekstra Bilgiler" : titleData} Ekle
										</label>



										{/* <textarea className="form-control form-control-solid rounded-3 mb-5"  id="kt_docs_ckeditor_document_toolbar" ></textarea> */}


										{/* <CKEditor
											editor={ClassicEditor}
											data="<p>Hello from CKEditor 5!</p>"
											config={{
												plugins: customPlugins,
												// other configurations...
											}}
											onReady={editor => {
												// You can store the "editor" and use when it is needed.
												console.log('Editor is ready to use!', editor);
											}}
											onChange={(event, editor) => {
												const data = editor.getData();
												console.log({ event, editor, data });
												setFieldValue("content", data);

											}}
											onBlur={(event, editor) => {
												console.log('Blur.', editor);
											}}
											onFocus={(event, editor) => {
												console.log('Focus.', editor);
											}}
										/> */}

										<CKEditor
											editor={ClassicEditor}
											data={description}
											// config={editorConfig}
											config={{
												language: 'tr',
												toolbar: ['heading', '|', 'bold', 'italic', 'link'],
											  }}

											onReady={(editor:any) => {
												editor.commands.get('uploadImage').isEnabled = false;
											}}

											onChange={(event, editor) => {
												const data = editor.getData();
												console.log({ event, editor, data });
											}}

										/>

									

									</div>
									<div className="fs-7 text-muted mb-15">Please be aware that all manual balance changes will be audited by the financial team every fortnight. Please maintain your invoices and receipts until then. Thank you.</div>

								</div>




								{/* <div className="d-flex flex-stack">
													<div className="me-5">
														<label className="fs-6 fw-semibold form-label">Save Card for further billing?</label>
														<div className="fs-7 fw-semibold text-muted">If you need more info, please check budget planning</div>
													</div>
													<label className="form-check form-switch form-check-custom form-check-solid">
														<input className="form-check-input" type="checkbox" value="1" checked={true} />
														<span className="form-check-label fw-semibold text-muted">Save Card</span>
													</label>
												</div> */}



								<div className="text-center pt-15">
									<button type="reset" id="kt_modal_new_card_cancel" className="btn btn-light me-3" onClick={handleCancel} >İptal</button>
									<button type="submit" id="kt_modal_new_card_submit" className="btn btn-primary">
										<span className="indicator-label">Kaydet</span>

										<span className="indicator-progress">Lütfen bekleyin...
											<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
									</button>
								</div>
							</form>
						</div>






					</div>
				</div>
			</div>


		</div>
	)
}

export { AbdouWidget }
