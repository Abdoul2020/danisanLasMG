/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler, useRef } from 'react'
// react select title inside

// @ts-ignore
import { Country, State, City } from "country-state-city";
import useTurkeyCities from "use-turkey-cities";
// @ts-ignore
import axios from 'axios';
import { Dropdown, FormControl } from 'react-bootstrap';
import DropdownComponent from './DrodownComponent';

//formik standart form
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import InputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toAbsoluteUrl } from '../../../helpers'








//formik standart
// Define validation schema
const validationSchema = Yup.object({
	card_name: Yup.string().required('Boş olamaz'),
	card_nameSurName: Yup.string().required('Boş olamaz'),
	primarykart: Yup.bool(),
	cvv: Yup.string().required('Boş olamaz').matches(/^\d{3}$/, '3 rakam olması lazım'),
	bank_account: Yup.string()
		.required('Bank Account Number is required')
		.matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Geçersiz Format. Hesap Numarası 16 rakam olması lazım."),
	date: Yup.string()
		.required('Required')
		.matches(
			/^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])$/,
			'Geçersiz Format'
		)
});



const validationFormatSchema = Yup.object({
	adres_Name: Yup.string().required('Boş olamaz'),
	posta_kodu: Yup.string().required('Boş olamaz'),
	adres_complte: Yup.string().required('Boş olamaz')
});



const MaskedInputtt = (props: any) => {
	return (
		<InputMask {...props} mask="9999 9999 9999 9999" maskChar={null} />
	);
}





type Propss = {
	className: string
}

const ContactWidget: React.FC<Propss> = ({ className }) => {

	const { cities, city, setCity, districts, district, setDistrict } = useTurkeyCities(); //Turkey cities
	const [isoCity, setIsoCity] = useState("");

	const [citiesToCall, setCitiesToCall] = useState<any>([]);
	const [districtToCall, setdistrictToCall] = useState<any>([]);
	const [mahalepostaKodu, setMahallePostaKodu] = useState<any>([])




	useEffect(() => {
		console.log("vayyy", mahalepostaKodu)
	}, [mahalepostaKodu])



	useEffect(() => {

		console.log("district", districtToCall)

	}, [districtToCall])




	useEffect(() => {

		if (citiesToCall.length > 0) {

			let givenState = citiesToCall.find((state: any) => state.name === adresInfo.city);

			if (givenState) {
				let citiesInState = City.getCitiesOfState(isoCity, givenState.isoCode);
				setdistrictToCall(citiesInState)
			} else {
				let citiesInState = City.getCitiesOfState(isoCity, citiesToCall[0].isoCode);
				setdistrictToCall(citiesInState)
			}
		}

		console.log("cityCallHEE", citiesToCall)



	}, [citiesToCall])




	const [adresInfo, setAdresInfo] = useState({
		Country: "",
		state: "",
		city: "",
		postaKodu: "",
		openAdress: ""
	})

	const [adresLocation, setAdreslocation] = useState(false)

	const handleChildDataCountry = (data: any) => {
		console.log("dataCount::", data)
		setAdresInfo((e) => ({ ...e, Country: data }))
	}

	const handleChildDataCity = (data: any) => {
		setAdresInfo((e) => ({ ...e, city: data }))
	}
	const handleChildDataState = (data: any) => {
		setAdresInfo((e) => ({ ...e, state: data }))
	}


	const [allCityTo, setAllCityWes] = useState<any>([])

	useEffect(() => {

		//track
		console.log("Yougy", allCityTo)

		if (allCityTo.length > 0) {
			console.log("allCitu", allCityTo)
			let givenState = allCityTo.find((state: any) => state.name === adresInfo.city);
			console.log("setDtaty", givenState)
			if (givenState) {
				let citiesInState = City.getCitiesOfState(isoCity, givenState.isoCode);

				setdistrictToCall([])
				if (citiesInState) {

					citiesInState.map((w, a) => {
						setdistrictToCall((oldName: any) => [...oldName, w.name])
					})
				}

			} else {

				let givenWell = allCityTo.find((state: any) => state.name === allCityTo[0].name);

				let citiesInState = City.getCitiesOfState(isoCity, givenWell.isoCode);

				setdistrictToCall([])
				if (citiesInState) {

					citiesInState.map((w, a) => {
						setdistrictToCall((oldName: any) => [...oldName, w.name])
					})
				}
			}
		}

	}, [allCityTo])



	useEffect(() => {

		console.log("dataTochange", adresInfo.Country)


		Country.getAllCountries().map((v: any, i: any) => {

			if (v.name == adresInfo.Country) {
				setCitiesToCall([])
				let citiesTochange = State.getStatesOfCountry(v.isoCode)
				setAllCityWes(citiesTochange)
				citiesTochange.map((w, a) => {
					setCitiesToCall((oldName: any) => [...oldName, w.name])
				})

			} else {
				let citiesTochange = State.getStatesOfCountry(i === 0 && v.isoCode);
				console.log("wahuu", citiesTochange)
				if (citiesTochange.length > 0) {
					setAllCityWes(citiesTochange)
				}
				citiesTochange.map((w, a) => {
					setCitiesToCall((oldName: any) => [...oldName, w.name])
				})
			}

		});

		if (adresInfo.Country !== "" && adresInfo.city !== "" && adresInfo.state !== "" && adresInfo.postaKodu !== "") {
			setAdreslocation(true)

		}
	}, [adresInfo.Country])


	useEffect(() => {


		if (allCityTo.length > 0) {
			console.log("allCitu", allCityTo)
			let givenState = allCityTo.find((state: any) => state.name === adresInfo.city);
			console.log("setDtaty", givenState)
			if (givenState) {
				let citiesInState = City.getCitiesOfState(isoCity, givenState.isoCode);

				//setdistrictToCall([])

				if (citiesInState) {
					citiesInState.map((w, a) => {
						setdistrictToCall((oldName: any) => [...oldName, w.name])
					})
				}


			} else {

				let givenWell = allCityTo.find((state: any) => state.name === allCityTo[0].name);

				let citiesInState = City.getCitiesOfState(isoCity, givenWell.isoCode);

				setdistrictToCall([])
				if (citiesInState) {

					citiesInState.map((w, a) => {
						setdistrictToCall((oldName: any) => [...oldName, w.name])
					})
				}
			}
		}

		if (adresInfo.Country !== "" && adresInfo.city !== "" && adresInfo.state !== "" && adresInfo.postaKodu !== "") {
			setAdreslocation(true)
		}



	}, [adresInfo.city])



	useEffect(() => {
		//setMahallePostaKodu([])
		if (districtToCall.length > 0) {
			districtToCall.map((v: any, i: any) => {
				console.log("varnom", v)
				if (v.name === adresInfo.state) {
					getNeighborhood(v.latitude, v.longitude, v.name)

				}
			})

		}
		if (adresInfo.Country !== "" && adresInfo.city !== "" && adresInfo.state !== "" && adresInfo.postaKodu !== "") {
			setAdreslocation(true)
		}
	}, [adresInfo.state])




	useEffect(() => {
		if (adresInfo.Country !== "" && adresInfo.city !== "" && adresInfo.state !== "" && adresInfo.postaKodu !== "") {
			setAdreslocation(true)
		}

	}, [adresInfo.postaKodu])




	const [countries, setCountries] = useState<any>([])//countryData

	useEffect(() => {

		Country.getAllCountries().map((v: any, i: any) => {


			console.log("ulkeName", v.name)
			setCountries((oldName: any) => [...oldName, v.name])


			if (adresInfo.Country !== "") {
				if (v.name == adresInfo.Country) {
					setIsoCity(v.isoCode);
				}
			} else {
				if (i === 0) {
					setIsoCity(v.isoCode);
				}
			}
		}
		);
	}, [])


	const [neighborhood, setNeighborhood] = useState<any>(null);

	useEffect(() => {

		if (neighborhood !== null) {
			setMahallePostaKodu((prev: any) => [...prev, neighborhood]);
			//setMahallePostaKodu(neighborhood)
		}

	}, [neighborhood])

	const getNeighborhood = async (lat: any, long: any, name: any) => {

		console.log("largeToSend", lat, "yoo", long, "name::", name)

		try {
			const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
				params: {
					q: `${lat}+${long}`, // replace with your latitude and longitude
					key: '09be18c9cffc4891be7b5a6c49e4c387', // replace with your API key
				},
			});
			console.log("postaKoduPA", response.data)

			if (response.data.results[0] && response.data.results[0].components.suburb) {

				setNeighborhood({
					name: response.data.results[0].components.suburb,
					postaKodu: response.data.results[0].components.postcode,
					CountryCode: response.data.results[0].components.country_code,
					Province: response.data.results[0].components.province,
					sokak: response.data.results[0].components.road,
					ilçe: response.data.results[0].components.town,
					allAdresFormat: response.data.results[0].formatted
				});
			}

		} catch (error) {
			console.error(error);
		}

	};


	//real dropdwon setting
	const options = ["Option 1", "Option 2", "Option 3"];

	const [singleUpdateData, setSingleUpdateData] = useState<any>({})
	const [singleUpdateDataAdres, setSingleUpdateDataAdres] = useState<any>({})

	useEffect(() => {
		console.log("Yooğp", singleUpdateData)
	}, [singleUpdateData])


	const [kartNewAdd, setNewKartAdd] = useState<any>([]);

	const [newAdres, setNewAdres] = useState<any>([]);


	useEffect(() => {
		console.log("AdresMevcut::", newAdres)
	}, [newAdres])










	//add kart into array well properly okk
	const handleTagChange = () => {

		if (singleUpdateData) {
			const newKartToAdd = {
				[singleUpdateData.card_name]: [

					{

						kartName: singleUpdateData.card_name,
						karOwnerSurname: singleUpdateData.card_nameSurName,
						accountNumber: singleUpdateData.bank_account,
						expirationDate: singleUpdateData.date,
						cvv: singleUpdateData.cvv,
						primaryKart: singleUpdateData.primarykart

					}

				]
			}

			console.log("changingValeue::", newKartToAdd)

			console.log("dataChange::", singleUpdateData.primarykart)

			if (singleUpdateData.primarykart === false) {

				const data3Exists = kartNewAdd.some((item: any) => item.hasOwnProperty(singleUpdateData.card_name));

				if (!data3Exists) {

					setNewKartAdd((prevData: any) => [...prevData, newKartToAdd]);

				} else {
					console.log("existwell::");

					Swal.fire({
						text: "Aynı kart ismi olamaz",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Değiştir",
						customClass: {
							confirmButton: "btn btn-primary"
						}
					});

				}

			} else {
				const data3Exists = kartNewAdd.some((item: any) => item.hasOwnProperty(singleUpdateData.card_name));
				if (!data3Exists) {

					const updatedData = kartNewAdd.map((item: any) => {
						for (let key in item) {
							item[key] = item[key].map((i: any) => ({ ...i, primaryKart: false }));
						}
						return item;
					});
					setNewKartAdd([newKartToAdd, ...updatedData]);
				} else {
					console.log("existwellWithTogle::")
					Swal.fire({
						text: "aynı Kart ismi olamaz",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Değiştir",
						customClass: {
							confirmButton: "btn btn-primary"
						}
					});
				}
			}
		}
	};

	//add new Adres Into array well properly
	const handleAddToAdres = () => {

		if (singleUpdateDataAdres) {


			const newAdresToAdd = {

				[singleUpdateDataAdres.adres_Name]: [

					{
						adres_Name: singleUpdateDataAdres.adres_Name,
						country_Name: adresInfo.Country,
						city_Name: adresInfo.city,
						state_Name: adresInfo.state,
						posta_kodu: singleUpdateDataAdres.posta_kodu,
						adres_complete: singleUpdateDataAdres.adres_complte,
						faturaCheck: singleUpdateDataAdres.faturaCheck,
						company_Name: singleUpdateDataAdres.company_Name,
						company_tax_daire: singleUpdateDataAdres.company_tax_daire,
						company_tax_number: singleUpdateDataAdres.company_tax_number
					}

				]
			}


			const data3Exists = newAdres.some((item: any) => item.hasOwnProperty(singleUpdateDataAdres.adres_Name));

				if (!data3Exists) {

					setNewAdres((prevData: any) => [...prevData, newAdresToAdd]);

				} else {
					console.log("existwell::");
					Swal.fire({
						text: "Aynı kart ismi olamaz",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Değiştir",
						customClass: {
							confirmButton: "btn btn-primary"
						}
					});

				}
		}
	}


	//submit the singledata form here adres

	const handleSubmitAdres = async (values: any, { setSubmitting, resetForm, errors }: any) => {
		// Validate your form values here...
		// Here I'm just simulating a successful validation

		console.log("valuesAderss", values)
		const status = 'Valid';


		if (status === 'Valid') {
			// Simulate form submission...
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const data3Exists = newAdres.some((item: any) => item.hasOwnProperty(singleUpdateDataAdres.adres_Name));
			await handleAddToAdres()


			if (data3Exists) {
				Swal.fire({
					text: "aynı Kart ismi olamaz",
					icon: "error",
					buttonsStyling: false,
					confirmButtonText: "Değiştir",
					customClass: {
						//confirmButton: "btn btn-primary",
						cancelButton: "btn btn-active-light"
					}
				}).then((result) => {


					if (result.isConfirmed) {

						//modalDismissRef.current.click();

					}
				})

			} else {

				// Show success message
				Swal.fire({
					text: "Kart başarıyla eklendi!",
					icon: "success",
					buttonsStyling: false,
					confirmButtonText: "Tamam",
					customClass: {
						confirmButton: "btn btn-primary"
					}
				}).then((result) => {
					if (result.isConfirmed) {
						resetForm({});
					}
				});
			}

		} else {

			// Show error message
			Swal.fire({
				text: "Sorry, looks like there are some errors detected, please try again.",
				icon: "error",
				buttonsStyling: false,
				confirmButtonText: "Ok, got it!",
				customClass: {
					confirmButton: "btn btn-primary"
				}
			});
		}
		setSubmitting(false);
	};



	const handleSubmit = async (values: any, { setSubmitting, resetForm, errors }: any) => {
		// Validate your form values here...
		// Here I'm just simulating a successful validation
		const status = 'Valid';


		if (status === 'Valid') {
			// Simulate form submission...
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const data3Exists = kartNewAdd.some((item: any) => item.hasOwnProperty(singleUpdateData.card_name));
			await handleTagChange()


			if (data3Exists) {
				Swal.fire({
					text: "aynı Kart ismi olamaz",
					icon: "error",
					buttonsStyling: false,
					confirmButtonText: "Değiştir",
					customClass: {
						//confirmButton: "btn btn-primary",
						cancelButton: "btn btn-active-light"
					}
				}).then((result) => {


					if (result.isConfirmed) {

						//modalDismissRef.current.click();

					}



				})

			} else {

				// Show success message
				Swal.fire({
					text: "Kart başarıyla eklendi!",
					icon: "success",
					buttonsStyling: false,
					confirmButtonText: "Tamam",
					customClass: {
						confirmButton: "btn btn-primary"
					}
				}).then((result) => {
					if (result.isConfirmed) {
						resetForm({});
					}
				});


			}




		} else {

			// Show error message
			Swal.fire({
				text: "Sorry, looks like there are some errors detected, please try again.",
				icon: "error",
				buttonsStyling: false,
				confirmButtonText: "Ok, got it!",
				customClass: {
					confirmButton: "btn btn-primary"
				}
			});
		}
		setSubmitting(false);
	};



	const modalDismissRef: any = useRef();

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


	const [cardName, setCardName] = useState(null)
	const [cardOwnerName, setCardOwnerName] = useState("")
	const [accountNumber, setAccountNumber] = useState("")
	const [expirationDate, setExpirationDate] = useState("")
	const [cardCvv, setCardCvv] = useState("")
	const [primaryKart, setPrimaryKart] = useState<any>("")


	const formikRef: any = useRef(null);



	useEffect(() => {

		if (cardName !== "" && cardOwnerName !== "" && accountNumber !== "" && expirationDate !== "" && cardCvv !== "" && primaryKart !== "" && formikRef.current) {

			formikRef.current.setFieldValue("card_name", cardName);
			formikRef.current.setFieldValue("card_nameSurName", cardOwnerName);
			formikRef.current.setFieldValue("bank_account", accountNumber);
			formikRef.current.setFieldValue("date", expirationDate);
			formikRef.current.setFieldValue("cvv", cardCvv);
			formikRef.current.setFieldValue("primarykart", primaryKart);


		}


	}, [cardName])


	const buttonRef: any = useRef();
	//handle duzenle click
	const handleCardEdit = (cardName: any, cardOwnerName: any, accountNumber: any, expirationDate: any, cardCvv: any, primaryKart: any) => {

		console.log("dataComing::", cardName, cardOwnerName)
		setCardName(cardName);
		setCardOwnerName(cardOwnerName);
		setAccountNumber(accountNumber);
		setExpirationDate(expirationDate);
		setCardCvv(cardCvv);
		setPrimaryKart(primaryKart);

		if (cardName !== null) {
			buttonRef.current.click();

		}

	}












	// delete card in your account
	const handleCardDelete = (key: any) => {

		console.log("keyheery", key)


		Swal.fire({
			text: "Bu kartı silmek istediğinizden Emin misiniz?",
			icon: "warning",
			buttonsStyling: false,
			showDenyButton: true,
			confirmButtonText: "Evet",
			denyButtonText: 'Hayır',
			customClass: {
				confirmButton: "btn btn-primary",
				denyButton: "btn btn-light-danger"
			}
		}).then((result: any) => {
			if (result.isConfirmed) {
				Swal.fire({
					text: 'Kartınız başarıyla Silindi',
					icon: 'success',
					confirmButtonText: "Tamam",
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn btn-light-primary"
					}
				}).then(() => {

					let stateTodelete = [...kartNewAdd];

					//let indexofDay = stateTodelete.findIndex((obj: any) => obj.hasOwnProperty(key));
					const updatedData = stateTodelete.filter(obj => !(key in obj));
					setNewKartAdd(updatedData);




					// Here, you can remove the card from your state that manages the cards


				});
			}
		});
	}


	//handleDelete adres add
	const handleCardDeleteAdres = (key: any) => {

		console.log("keyheery", key)


		Swal.fire({
			text: "Bu kartı silmek istediğinizden Emin misiniz?",
			icon: "warning",
			buttonsStyling: false,
			showDenyButton: true,
			confirmButtonText: "Evet",
			denyButtonText: 'Hayır',
			customClass: {
				confirmButton: "btn btn-primary",
				denyButton: "btn btn-light-danger"
			}
		}).then((result: any) => {
			if (result.isConfirmed) {
				Swal.fire({
					text: 'Kartınız başarıyla Silindi',
					icon: 'success',
					confirmButtonText: "Tamam",
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn btn-light-primary"
					}
				}).then(() => {

					let stateTodelete = [...newAdres];
					//let indexofDay = stateTodelete.findIndex((obj: any) => obj.hasOwnProperty(key));
					const updatedData = stateTodelete.filter(obj => !(key in obj));
					setNewAdres(updatedData);
					// Here, you can remove the card from your state that manages the cards



				});
			}
		});
	}




	const [faturaAccept, setFaturaAccept] = useState(false)

	const handleFaturaAccept = () => {
		setFaturaAccept(!faturaAccept)
	}















	return (

		<div>


			<div className={`card ${className}`}>

				<div className="card mb-5 mb-xl-10">

					<div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
						<div className="card-title m-0">
							<h3 className="fw-bold m-0">Abonelik Bilgilerim</h3>
						</div>
					</div>

					{/* new Update */}

					<div className="card-body">


						{/* <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-12 p-6">
							<i className="ki-duotone ki-information fs-2tx text-warning me-4">
								<span className="path1"></span>
								<span className="path2"></span>
								<span className="path3"></span>
							</i>
							<div className="d-flex flex-stack flex-grow-1">
								<div className="fw-semibold">
									<h4 className="text-gray-900 fw-bold">Uyarı</h4>
									<div className="fs-6 text-gray-700">Seanslarınızdan ödeme almaya başlamak için en az bir pakete abone olmanız gerekmektedir.
										<a href="#" className="fw-bold" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Paketleri İncele</a>.</div>
								</div>
							</div>
						</div> */}



						<div className="row">
							<div className="col-lg-7">
								<h3 className="mb-2" style={{ visibility: "hidden" }}>9 Aralık 2023 tarihine kadar aktif</h3>
								<p className="fs-6 text-gray-600 fw-semibold mb-6 mb-lg-15" style={{ visibility: "hidden" }}>Aboneliğiniz bitmeden N gün önce size bildireceğiz</p>
								<div className="fs-5 mb-2">
									<span className="text-gray-800 fw-bold me-1">€100.00</span>
									<span className="text-gray-600 fw-semibold">Yıllık</span>
								</div>
								<div className="fs-6 text-gray-600 fw-semibold">Paketinizi yükselterek X ve Y özelliğini kullanmaya başlayabilirsiniz!</div>
							</div>
							<div className="col-lg-5">
								<div className="d-flex text-muted fw-bold fs-5 mb-3">
									<span className="flex-grow-1 text-gray-800" style={{ visibility: "hidden" }}>Uzman</span>
									<span className="text-gray-800">1/99 Gün</span>

								</div>
								<div className="progress h-8px bg-light-primary mb-2">
									{/* <div className="progress-bar bg-primary" role="progressbar" style="width: 86%" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100"></div> */}
								</div>
								<div className="fs-6 text-gray-600 fw-semibold mb-10"> 99 gün içerisinde abone sona erecek.</div>
								<div className="d-flex justify-content-end pb-0 px-0">
									<a href="#" className="btn btn-light btn-active-light-primary me-2" id="kt_account_billing_cancel_subscription_btn">Abonelik iptal</a>
									<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">Abonelik Planını Yükselt</button>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>






			<div className="card mb-5 mb-xl-10 mt-16">
				<div className="card-header card-header-stretch pb-0">
					<div className="card-title">
						<h3 className="m-0">Ödeme Yöntemleri</h3>
					</div>
					<div className="card-toolbar m-0">
						<ul className="nav nav-stretch nav-line-tabs border-transparent" role="tablist">
							<li className="nav-item" role="presentation">
								<a id="kt_billing_creditcard_tab" className="nav-link fs-5 fw-bold me-5 active" data-bs-toggle="tab" role="tab" href="#kt_billing_creditcard">Kredi / Banka Kardı</a>
							</li>
							<li className="nav-item" role="presentation" style={{ visibility: "hidden" }} >
								<a id="kt_billing_paypal_tab" className="nav-link fs-5 fw-bold" data-bs-toggle="tab" role="tab" href="#kt_billing_paypal">Paypal</a>
							</li>
						</ul>
					</div>
				</div>
				<button type="button" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card" style={{ display: 'none' }} ref={buttonRef}></button>

				<div id="kt_billing_payment_tab_content" className="card-body tab-content">
					<div id="kt_billing_creditcard" className="tab-pane fade show active" role="tabpanel">
						<h3 className="mb-5">Kartlarım</h3>
						<div className="row gx-9 gy-6">




							{

								kartNewAdd.length > 0 && (

									kartNewAdd.map((w: any, a: any) => {

										return Object.keys(w).map((key) => {

											return (

												<div className="col-xl-6" data-kt-billing-element="card">
													{
														w[key].map((tag: any, index: any) => {


															const num = tag.accountNumber.replace(/\s/g, ''); // Remove spaces if there's any
															let cardType = "";

															if (/^4[0-9]{12}(?:[0-9]{3})?$/g.test(num)) {
																cardType = "Visa";
															} else if (/^5[1-5][0-9]{14}$/g.test(num)) {
																cardType = "MasterCard";
															} else {
																cardType = "Unknown";
															}


															const maskedNum = num.replace(/\d(?=\d{4})/g, "*");



															return (
																<div >
																	<div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
																		<div className="d-flex flex-column py-2">
																			<div className="d-flex align-items-center fs-4 fw-bold mb-5">
																				{tag.karOwnerSurname}
																				<span className="badge badge-light-success fs-7 ms-2">
																					{tag.primaryKart ? "birincil" : ""}
																				</span></div>
																			<div className="d-flex align-items-center">

																				{
																					cardType === "Visa" ?
																						<img
																							alt='Logo'
																							className="me-4"
																							src={toAbsoluteUrl('/media/svg/card-logos/visa.svg')}
																						/>
																						:
																						cardType === "MasterCard" ?
																							<img
																								alt='Logo'
																								className="me-4"
																								src={toAbsoluteUrl('/media/svg/card-logos/mastercard.svg')}
																							/>

																							:

																							""

																				}






																				<div>
																					<div className="fs-4 fw-bold">

																						{
																							cardType

																						}
																						&nbsp;
																						{maskedNum}
																					</div>
																					<div className="fs-6 fw-semibold text-gray-400"> Kullanım Süresi: {tag.expirationDate}</div>
																				</div>
																			</div>
																		</div>
																		<div className="d-flex align-items-center py-2">
																			<button className="btn btn-sm btn-light btn-active-light-primary me-3"
																				onClick={() => handleCardDelete(key)}
																				data-kt-billing-action="card-delete"   >
																				<span className="indicator-label"  >Sil</span>
																				<span className="indicator-progress"> Please wait...
																					<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
																			</button>
																			<button className="btn btn-sm btn-light btn-active-light-primary"

																				onClick={() => handleCardEdit(tag.kartName, tag.karOwnerSurname, tag.accountNumber, tag.expirationDate, tag.cvv, tag.primaryKart)}

																			>
																				Düzenle
																			</button>
																		</div>
																	</div>
																</div>
															)
														})
													}
												</div>

											)

										})

									})
								)

							}


							<div className="col-xl-6">
								<div className="notice d-flex bg-light-primary rounded border-primary border border-dashed h-lg-100 p-6">
									<div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
										<div className="mb-3 mb-md-0 fw-semibold">
											<h4 className="text-gray-900 fw-bold"> Hatırlatma ! </h4>
											<div className="fs-6 text-gray-700 pe-7"> Lütfen dikkatlice
												<a href="#" className="fw-bold me-1"> Kullanım Sözleşmesi </a>
												<br />okuyunuz</div>
										</div>
										<a href="#" className="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Kart Ekle</a>
									</div>
								</div>
							</div>

						</div>
					</div>
					<div id="kt_billing_paypal" className="tab-pane fade" role="tabpanel" aria-labelledby="kt_billing_paypal_tab">
						<h3 className="mb-5">My Paypal</h3>
						<div className="text-gray-600 fs-6 fw-semibold mb-5">To use PayPal as your payment method, you will need to make pre-payments each month before your bill is due.</div>
						<form className="form">
							<div className="mb-7 mw-350px">
								<select name="timezone" data-control="select2" data-placeholder="Select an option" data-hide-search="true" className="form-select form-select-solid form-select-lg fw-semibold fs-6 text-gray-700">
									<option>Select an option</option>
									<option value="25">US $25.00</option>
									<option value="50">US $50.00</option>
									<option value="100">US $100.00</option>
									<option value="125">US $125.00</option>
									<option value="150">US $150.00</option>
								</select>
							</div>
							<button type="submit" className="btn btn-primary">Pay with Paypal</button>
						</form>
					</div>
				</div>
			</div>


			<div className="card mb-5 mb-xl-10">
				<div className="card-header">
					<div className="card-title">
						<h3>Adres Bilgileri</h3>
					</div>
				</div>
				<div className="card-body">
					<div className="row gx-9 gy-6">





						{

							newAdres.length > 0 && (

								newAdres.map((w: any, a: any) => {

									return Object.keys(w).map((key) => {


										return (

											<div className="col-xl-6" data-kt-billing-element="card">
												{
													w[key].map((tag: any, index: any) => {


														return (
															<div className="col-xl-6" data-kt-billing-element="address">
																<div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
																	<div className="d-flex flex-column py-2">
																		<div className="d-flex align-items-center fs-5 fw-bold mb-5">
																			{tag.adres_Name}
																		</div>
																		<div className="fs-6 fw-semibold text-gray-600">
																			{tag.adres_complete}
																		</div>

																		{
																			tag.faturaCheck === true && (

																				<div className="fs-6 fw-semibold text-gray-600">
																					{tag.adres_complete} <br />
																					gsgfhdshjf <br />
																				</div>

																			)
																		}

																	</div>
																	<div className="d-flex align-items-center py-2">
																		<button className="btn btn-sm btn-light btn-active-light-primary me-3"
																		 data-kt-billing-action="address-delete" onClick={()=>handleCardDeleteAdres(key)}>
																			<span className="indicator-label">Sil</span>
																			<span className="indicator-progress">Lütfen bekleyin...
																				<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
																		</button>
																		<button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_address">
																			Düzenle
																		</button>
																	</div>
																</div>
															</div>
														)
													})
												}
											</div>

										)

									})

								})
							)

						}









						<div className="col-xl-6">
							<div className="notice d-flex bg-light-primary rounded border-primary border border-dashed flex-stack h-xl-100 mb-10 p-6">
								<div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
									<div className="mb-3 mb-md-0 fw-semibold">
										<h4 className="text-gray-900 fw-bold"> Önemli Not!</h4>
										<div className="fs-6 text-gray-700 pe-7"> Adres başlık ismileri aynı olmamasına özen gösterin.</div>
									</div>
									<a href="#" className="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_new_address">New Address</a>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>

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



			{/* Modal part to popup */}
			<div className="modal fade" id="kt_modal_offer_a_deal" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered mw-1000px">
					<div className="modal-content">
						<div className="modal-header py-7 d-flex justify-content-between">
							<h2>Offer a Deal</h2>
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
								<i className="ki-duotone ki-cross fs-1">
									<span className="path1"></span>
									<span className="path2"></span>
								</i>
							</div>
						</div>
						<div className="modal-body scroll-y m-5">
							<div className="stepper stepper-links d-flex flex-column" id="kt_modal_offer_a_deal_stepper">
								<div className="stepper-nav justify-content-center py-2">
									<div className="stepper-item me-5 me-md-15 current" data-kt-stepper-element="nav">
										<h3 className="stepper-title">Deal Type</h3>
									</div>
									<div className="stepper-item me-5 me-md-15" data-kt-stepper-element="nav">
										<h3 className="stepper-title">Deal Details</h3>
									</div>
									<div className="stepper-item me-5 me-md-15" data-kt-stepper-element="nav">
										<h3 className="stepper-title">Finance Settings</h3>
									</div>
									<div className="stepper-item" data-kt-stepper-element="nav">
										<h3 className="stepper-title">Completed</h3>
									</div>
								</div>
								<form className="mx-auto mw-500px w-100 pt-15 pb-10" id="kt_modal_offer_a_deal_form">
									<div className="current" data-kt-stepper-element="content">
										<div className="w-100">
											<div className="mb-13">
												<h2 className="mb-3">Deal Type</h2>
												<div className="text-muted fw-semibold fs-5">If you need more info, please check out
													<a href="#" className="link-primary fw-bold">FAQ Page</a>.</div>
											</div>
											<div className="fv-row mb-15" data-kt-buttons="true">
												<label className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 mb-6 active">
													<input className="btn-check" type="radio" checked={true} name="offer_type" value="1" />
													<span className="d-flex">
														<i className="ki-duotone ki-profile-circle fs-3hx">
															<span className="path1"></span>
															<span className="path2"></span>
															<span className="path3"></span>
														</i>
														<span className="ms-4">
															<span className="fs-3 fw-bold text-gray-900 mb-2 d-block">Personal Deal</span>
															<span className="fw-semibold fs-4 text-muted">If you need more info, please check it out</span>
														</span>
													</span>
												</label>
												<label className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6">
													<input className="btn-check" type="radio" name="offer_type" value="2" />
													<span className="d-flex">
														<i className="ki-duotone ki-element-11 fs-3hx">
															<span className="path1"></span>
															<span className="path2"></span>
															<span className="path3"></span>
															<span className="path4"></span>
														</i>
														<span className="ms-4">
															<span className="fs-3 fw-bold text-gray-900 mb-2 d-block">Corporate Deal</span>
															<span className="fw-semibold fs-4 text-muted">Create corporate account to manage users</span>
														</span>
													</span>
												</label>
											</div>
											<div className="d-flex justify-content-end">
												<button type="button" className="btn btn-lg btn-primary" data-kt-element="type-next">
													<span className="indicator-label">Offer Details</span>
													<span className="indicator-progress">Please wait...
														<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
												</button>
											</div>
										</div>
									</div>
									<div data-kt-stepper-element="content">
										<div className="w-100">
											<div className="mb-13">
												<h2 className="mb-3">Deal Details</h2>
												<div className="text-muted fw-semibold fs-5">If you need more info, please check out
													<a href="#" className="link-primary fw-bold">FAQ Page</a>.</div>
											</div>
											<div className="fv-row mb-8">
												<label className="required fs-6 fw-semibold mb-2">Customer</label>
												<select className="form-select form-select-solid" data-control="select2" data-placeholder="Select an option" name="details_customer">
													<option></option>
													<option value="1" selected={true}>Keenthemes</option>
													<option value="2">CRM App</option>
												</select>
											</div>
											<div className="fv-row mb-8">
												<label className="required fs-6 fw-semibold mb-2">Deal Title</label>
												<input type="text" className="form-control form-control-solid" placeholder="Enter Deal Title" name="details_title" value="Marketing Campaign" />
											</div>
											<div className="fv-row mb-8">
												<label className="fs-6 fw-semibold mb-2">Deal Description</label>
												<textarea className="form-control form-control-solid" placeholder="Enter Deal Description" name="details_description">Experience share market at your fingertips with TICK PRO stock investment mobile trading app</textarea>
											</div>
											<div className="fv-row mb-8">
												<label className="required fs-6 fw-semibold mb-2">Activation Date</label>
												<div className="position-relative d-flex align-items-center">
													<i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4">
														<span className="path1"></span>
														<span className="path2"></span>
														<span className="path3"></span>
														<span className="path4"></span>
														<span className="path5"></span>
														<span className="path6"></span>
													</i>
													<input className="form-control form-control-solid ps-12" placeholder="Pick date range" name="details_activation_date" />
												</div>
											</div>
											<div className="fv-row mb-15">
												<div className="d-flex flex-stack">
													<div className="me-5">
														<label className="required fs-6 fw-semibold">Notifications</label>
														<div className="fs-7 fw-semibold text-muted">Allow Notifications by Phone or Email</div>
													</div>
													<div className="d-flex">
														<label className="form-check form-check-custom form-check-solid me-10">
															<input className="form-check-input h-20px w-20px" type="checkbox" value="email" name="details_notifications[]" />
															<span className="form-check-label fw-semibold">Email</span>
														</label>
														<label className="form-check form-check-custom form-check-solid">
															<input className="form-check-input h-20px w-20px" type="checkbox" value="phone" checked={true} name="details_notifications[]" />
															<span className="form-check-label fw-semibold">Phone</span>
														</label>
													</div>
												</div>
											</div>
											<div className="d-flex flex-stack">
												<button type="button" className="btn btn-lg btn-light me-3" data-kt-element="details-previous">Deal Type</button>
												<button type="button" className="btn btn-lg btn-primary" data-kt-element="details-next">
													<span className="indicator-label">Financing</span>
													<span className="indicator-progress">Please wait...
														<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
												</button>
											</div>
										</div>
									</div>
									<div data-kt-stepper-element="content">
										<div className="w-100">
											<div className="mb-13">
												<h2 className="mb-3">Finance</h2>
												<div className="text-muted fw-semibold fs-5">If you need more info, please check out
													<a href="#" className="link-primary fw-bold">FAQ Page</a>.</div>
											</div>
											<div className="fv-row mb-8">
												<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
													<span className="required">Setup Budget</span>
													<span className="ms-1" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-html="true" data-bs-content="&lt;div className=&#039;p-4 rounded bg-light&#039;&gt; &lt;div className=&#039;d-flex flex-stack text-muted mb-4&#039;&gt; &lt;i className=&quot;ki-duotone ki-bank fs-3 me-3&quot;&gt;&lt;span className=&quot;path1&quot;&gt;&lt;/span&gt;&lt;span className=&quot;path2&quot;&gt;&lt;/span&gt;&lt;/i&gt; &lt;div className=&#039;fw-bold&#039;&gt;INCBANK **** 1245 STATEMENT&lt;/div&gt; &lt;/div&gt; &lt;div className=&#039;d-flex flex-stack fw-semibold text-gray-600&#039;&gt; &lt;div&gt;Amount&lt;/div&gt; &lt;div&gt;Transaction&lt;/div&gt; &lt;/div&gt; &lt;div className=&#039;separator separator-dashed my-2&#039;&gt;&lt;/div&gt; &lt;div className=&#039;d-flex flex-stack text-dark fw-bold mb-2&#039;&gt; &lt;div&gt;USD345.00&lt;/div&gt; &lt;div&gt;KEENTHEMES*&lt;/div&gt; &lt;/div&gt; &lt;div className=&#039;d-flex flex-stack text-muted mb-2&#039;&gt; &lt;div&gt;USD75.00&lt;/div&gt; &lt;div&gt;Hosting fee&lt;/div&gt; &lt;/div&gt; &lt;div className=&#039;d-flex flex-stack text-muted&#039;&gt; &lt;div&gt;USD3,950.00&lt;/div&gt; &lt;div&gt;Payrol&lt;/div&gt; &lt;/div&gt; &lt;/div&gt;">
														<i className="ki-duotone ki-information-5 text-gray-500 fs-6">
															<span className="path1"></span>
															<span className="path2"></span>
															<span className="path3"></span>
														</i>
													</span>
												</label>
												<div className="position-relative w-lg-250px" id="kt_modal_finance_setup" data-kt-dialer="true" data-kt-dialer-min="50" data-kt-dialer-max="50000" data-kt-dialer-step="100" data-kt-dialer-prefix="$" data-kt-dialer-decimals="2">
													<button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0" data-kt-dialer-control="decrease">
														<i className="ki-duotone ki-minus-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</button>
													<input type="text" className="form-control form-control-solid border-0 ps-12" data-kt-dialer-control="input" placeholder="Amount" name="finance_setup" readOnly value="$50" />
													<button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0" data-kt-dialer-control="increase">
														<i className="ki-duotone ki-plus-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</button>
												</div>
											</div>
											<div className="fv-row mb-8">
												<label className="fs-6 fw-semibold mb-2">Budget Usage</label>
												<div className="row g-9" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button='true']">
													<div className="col-md-6 col-lg-12 col-xxl-6">
														<label className="btn btn-outline btn-outline-dashed btn-active-light-primary active d-flex text-start p-6" data-kt-button="true">
															<span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
																<input className="form-check-input" type="radio" name="finance_usage" value="1" checked={true} />
															</span>
															<span className="ms-5">
																<span className="fs-4 fw-bold text-gray-800 mb-2 d-block">Precise Usage</span>
																<span className="fw-semibold fs-7 text-gray-600">Withdraw money to your bank account per transaction under $50,000 budget</span>
															</span>
														</label>
													</div>
													<div className="col-md-6 col-lg-12 col-xxl-6">
														<label className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6" data-kt-button="true">
															<span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
																<input className="form-check-input" type="radio" name="finance_usage" value="2" />
															</span>
															<span className="ms-5">
																<span className="fs-4 fw-bold text-gray-800 mb-2 d-block">Extreme Usage</span>
																<span className="fw-semibold fs-7 text-gray-600">Withdraw money to your bank account per transaction under $50,000 budget</span>
															</span>
														</label>
													</div>
												</div>
											</div>
											<div className="fv-row mb-15">
												<div className="d-flex flex-stack">
													<div className="me-5">
														<label className="fs-6 fw-semibold">Allow Changes in Budget</label>
														<div className="fs-7 fw-semibold text-muted">If you need more info, please check budget planning</div>
													</div>
													<label className="form-check form-switch form-check-custom form-check-solid">
														<input className="form-check-input" type="checkbox" value="1" name="finance_allow" checked={true} />
														<span className="form-check-label fw-semibold text-muted">Allowed</span>
													</label>
												</div>
											</div>
											<div className="d-flex flex-stack">
												<button type="button" className="btn btn-lg btn-light me-3" data-kt-element="finance-previous">Project Settings</button>
												<button type="button" className="btn btn-lg btn-primary" data-kt-element="finance-next">
													<span className="indicator-label">Build Team</span>
													<span className="indicator-progress">Please wait...
														<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
												</button>
											</div>
										</div>
									</div>
									<div data-kt-stepper-element="content">
										<div className="w-100">
											<div className="mb-13">
												<h2 className="mb-3">Deal Created!</h2>
												<div className="text-muted fw-semibold fs-5">If you need more info, please check out
													<a href="#" className="link-primary fw-bold">FAQ Page</a>.</div>
											</div>
											<div className="d-flex flex-center pb-20">
												<button type="button" className="btn btn-lg btn-light me-3" data-kt-element="complete-start">Create New Deal</button>
												<a href="#" className="btn btn-lg btn-primary" data-bs-toggle="tooltip" title="Coming Soon">View Deal</a>
											</div>
											<div className="text-center px-4">
												<img src="assets/media/illustrations/dozzy-1/20.png" alt="" className="mw-100 mh-300px" />
												
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* new Modal  new card*/}

			<div className="modal fade" id="kt_modal_new_card" tabIndex={-1} aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered mw-650px">
					<div className="modal-content">


						<div className="modal-header">
							<h2>Yeni kart Ekle</h2>
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" ref={modalDismissRef}>
								<i className="ki-duotone ki-cross fs-1">
									<span className="path1"></span>
									<span className="path2"></span>
								</i>
							</div>
						</div>

						<div className="modal-body scroll-y mx-5 mx-xl-15 my-7">

							<div></div>



							<Formik

								innerRef={formikRef}
								initialValues={{
									card_name: "",
									card_nameSurName: '',
									bank_account: '',
									date: '',
									cvv: '',
									primarykart: false
								}}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
							>
								{({ values, errors, status, touched, isSubmitting, handleChange, handleBlur, setFieldValue }) => {


									setSingleUpdateData(values)

									return (

										<Form id="kt_modal_new_card_form" className="form">
											<div className="d-flex flex-column mb-7 fv-row">
												<label className="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
													<span className="required"> Kart Ismı</span>
													<span className="ms-1" data-bs-toggle="tooltip" title="Specify a card holder's name">
														<i className="ki-duotone ki-information-5 text-gray-500 fs-6">
															<span className="path1"></span>
															<span className="path2"></span>
															<span className="path3"></span>
														</i>
													</span>
												</label>
												<Field type="text" className="form-control form-control-solid" name="card_name" />

												<ErrorMessage name="card_name" component="div" className="field-error" />
											</div>

											<div className="d-flex flex-column mb-7 fv-row">
												<label className="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
													<span className="required">Kart Sahibi Ad Soyadı</span>
													<span className="ms-1" data-bs-toggle="tooltip" title="Specify a card holder's name">
														<i className="ki-duotone ki-information-5 text-gray-500 fs-6">
															<span className="path1"></span>
															<span className="path2"></span>
															<span className="path3"></span>
														</i>
													</span>
												</label>
												{/* <input type="text" className="form-control form-control-solid" placeholder="" name="card_name" value="Max Doe" /> */}
												<Field type="text" className="form-control form-control-solid" name="card_nameSurName" />
												<ErrorMessage name="card_nameSurName" component="div" className="field-error" />
											</div>



											<div className="d-flex flex-column mb-7 fv-row">
												<label className="required fs-6 fw-semibold form-label mb-2"> Hesap Numarası </label>
												<div className="position-relative">

													<Field name="bank_account" render={({ field }: any) => <MaskedInputtt {...field} className={'form-control form-control-solid' + (errors.bank_account && touched.bank_account ? ' is-invalid' : '')} />} />
													<ErrorMessage name="bank_account" component="div" className="invalid-feedback" />
													<div className="position-absolute translate-middle-y top-50 end-0 me-5">
														<img src="assets/media/svg/card-logos/visa.svg" alt="" className="h-25px" />
														<img src="assets/media/svg/card-logos/mastercard.svg" alt="" className="h-25px" />
														<img src="assets/media/svg/card-logos/american-express.svg" alt="" className="h-25px" />
													</div>
												</div>
											</div>

											<div className="row mb-10">
												<div className="col-md-8 fv-row">

													<div className="row fv-row">
														<div className="col-6">

															<label className="required fs-6 fw-semibold form-label mb-2">Geçerlilik Tarihi</label>

															<Field name="date">
																{({ field }: any) => (
																	<ReactInputMask
																		{...field}
																		mask="99/99"
																		className="form-control form-control-solid"
																		placeholder="DD/MM"
																	/>
																)}
															</Field>
															<ErrorMessage name="date" component="div" className='field-error' />




														</div>


														<div className='col-6'>

															<label className="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
																<span className="required">CVV</span>
																<span className="ms-1" data-bs-toggle="tooltip" title="Enter a card CVV code">
																	<i className="ki-duotone ki-information-5 text-gray-500 fs-6">
																		<span className="path1"></span>
																		<span className="path2"></span>
																		<span className="path3"></span>
																	</i>
																</span>
															</label>
															<div className="position-relative">
																<Field type="text" className="form-control form-control-solid" maxLength={3} name="cvv" placeholder="CVV" />

																<div className="position-absolute translate-middle-y top-50 end-0 me-3">
																	<i className="ki-duotone ki-credit-cart fs-2hx">
																		<span className="path1"></span>
																		<span className="path2"></span>
																	</i>
																</div>
															</div>
															<ErrorMessage name="cvv" component="div" className="field-error" />
														</div>
													</div>
												</div>
												<div className="col-md-4 fv-row">

												</div>
											</div>

											<div className="d-flex flex-stack">
												<div className="me-5">
													<label className="fs-6 fw-semibold form-label">Birincil Kart olsun</label>
													{/* <div className="fs-7 fw-semibold text-muted">If you need more info, please check budget planning</div> */}
												</div>
												<label className="form-check form-switch form-check-custom form-check-solid">
													<input className="form-check-input"
														type="checkbox" value="1" checked={values.primarykart}
														onChange={handleChange}
														onBlur={handleBlur}
														name="primarykart"
													/>
													<span className="form-check-label fw-semibold text-muted">Kaydet</span>
												</label>
											</div>

											<div className="text-center pt-15">
												<button type="reset" id="kt_modal_new_card_cancel" className="btn btn-light me-3" onClick={handleCancel} >İptal</button>

												<button type="submit" id="kt_modal_new_card_submit" className="btn btn-primary">
													{!isSubmitting && <span className="indicator-label">Kaydet</span>}
													{isSubmitting && (
														<span >
															Lütfen Bekleyin...
															<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
														</span>
													)}
												</button>

												{/* <button type="submit" id="kt_modal_new_card_submit" className="btn btn-primary" >
													<span className="indicator-label" > Kaydet </span>
													<span className="indicator-progress">Lütfen Bekleyin...
														<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
												</button> */}

												{/* <button type="submit" id="kt_modal_new_card_submit" className="btn btn-primary" disabled={isSubmitting}>
													{!isSubmitting && <span className="indicator-label">Kaydet</span>}
													<span className={`indicator-progress ${isSubmitting ? 'visible' : 'hidden'}`}>Lütfen Bekleyin...
														<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
													</span>
												</button> */}


											</div>
										</Form>
									)
								}
								}
							</Formik>

						</div>
					</div>
				</div>
			</div>


			{/* düzenle part new Modal */}






			{/* upgrade plan to search for */}
			<div className="modal fade" id="kt_modal_upgrade_plan" tabIndex={-1} aria-hidden="true">
				<div className="modal-dialog modal-xl">
					<div className="modal-content rounded">
						<div className="modal-header justify-content-end border-0 pb-0">
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
								<i className="ki-duotone ki-cross fs-1">
									<span className="path1"></span>
									<span className="path2"></span>
								</i>
							</div>
						</div>
						<div className="modal-body pt-0 pb-15 px-5 px-xl-20">
							<div className="mb-13 text-center">
								<h1 className="mb-3">Upgrade a Plan</h1>
								<div className="text-muted fw-semibold fs-5">If you need more info, please check
									<a href="#" className="link-primary fw-bold">Pricing Guidelines</a>.</div>
							</div>
							<div className="d-flex flex-column">
								<div className="nav-group nav-group-outline mx-auto" data-kt-buttons="true">
									<button className="btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2 active" data-kt-plan="month">Monthly</button>
									<button className="btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3" data-kt-plan="annual">Annual</button>
								</div>
								<div className="row mt-10">
									<div className="col-lg-6 mb-10 mb-lg-0">
										<div className="nav flex-column">
											<label className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 active mb-6" data-bs-toggle="tab" data-bs-target="#kt_upgrade_plan_startup">
												<div className="d-flex align-items-center me-2">
													<div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
														<input className="form-check-input" type="radio" name="plan" checked={true} value="startup" />
													</div>
													<div className="flex-grow-1">
														<div className="d-flex align-items-center fs-2 fw-bold flex-wrap">Startup</div>
														<div className="fw-semibold opacity-75">Best for startups</div>
													</div>
												</div>
												<div className="ms-5">
													<span className="mb-2">$</span>
													<span className="fs-3x fw-bold" data-kt-plan-price-month="39" data-kt-plan-price-annual="399">39</span>
													<span className="fs-7 opacity-50">/
														<span data-kt-element="period">Mon</span></span>
												</div>
											</label>
											<label className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 mb-6" data-bs-toggle="tab" data-bs-target="#kt_upgrade_plan_advanced">
												<div className="d-flex align-items-center me-2">
													<div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
														<input className="form-check-input" type="radio" name="plan" value="advanced" />
													</div>
													<div className="flex-grow-1">
														<div className="d-flex align-items-center fs-2 fw-bold flex-wrap">Advanced</div>
														<div className="fw-semibold opacity-75">Best for 100+ team size</div>
													</div>
												</div>
												<div className="ms-5">
													<span className="mb-2">$</span>
													<span className="fs-3x fw-bold" data-kt-plan-price-month="339" data-kt-plan-price-annual="3399">339</span>
													<span className="fs-7 opacity-50">/
														<span data-kt-element="period">Mon</span></span>
												</div>
											</label>
											<label className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 mb-6" data-bs-toggle="tab" data-bs-target="#kt_upgrade_plan_enterprise">
												<div className="d-flex align-items-center me-2">
													<div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
														<input className="form-check-input" type="radio" name="plan" value="enterprise" />
													</div>
													<div className="flex-grow-1">
														<div className="d-flex align-items-center fs-2 fw-bold flex-wrap">Enterprise
															<span className="badge badge-light-success ms-2 py-2 px-3 fs-7">Popular</span></div>
														<div className="fw-semibold opacity-75">Best value for 1000+ team</div>
													</div>
												</div>
												<div className="ms-5">
													<span className="mb-2">$</span>
													<span className="fs-3x fw-bold" data-kt-plan-price-month="999" data-kt-plan-price-annual="9999">999</span>
													<span className="fs-7 opacity-50">/
														<span data-kt-element="period">Mon</span></span>
												</div>
											</label>
											<label className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 mb-6" data-bs-toggle="tab" data-bs-target="#kt_upgrade_plan_custom">
												<div className="d-flex align-items-center me-2">
													<div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
														<input className="form-check-input" type="radio" name="plan" value="custom" />
													</div>
													<div className="flex-grow-1">
														<div className="d-flex align-items-center fs-2 fw-bold flex-wrap">Custom</div>
														<div className="fw-semibold opacity-75">Requet a custom license</div>
													</div>
												</div>
												<div className="ms-5">
													<a href="#" className="btn btn-sm btn-success">Contact Us</a>
												</div>
											</label>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="tab-content rounded h-100 bg-light p-10">
											<div className="tab-pane fade show active" id="kt_upgrade_plan_startup">
												<div className="pb-5">
													<h2 className="fw-bold text-dark">What’s in Startup Plan?</h2>
													<div className="text-muted fw-semibold">Optimal for 10+ team size and new startup</div>
												</div>
												<div className="pt-1">
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Up to 10 Active Users</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Up to 30 Project Integrations</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Analytics Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-muted flex-grow-1">Finance Module</span>
														<i className="ki-duotone ki-cross-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-muted flex-grow-1">Accounting Module</span>
														<i className="ki-duotone ki-cross-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-muted flex-grow-1">Network Platform</span>
														<i className="ki-duotone ki-cross-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center">
														<span className="fw-semibold fs-5 text-muted flex-grow-1">Unlimited Cloud Space</span>
														<i className="ki-duotone ki-cross-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="kt_upgrade_plan_advanced">
												<div className="pb-5">
													<h2 className="fw-bold text-dark">What’s in Startup Plan?</h2>
													<div className="text-muted fw-semibold">Optimal for 100+ team size and grown company</div>
												</div>
												<div className="pt-1">
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Up to 10 Active Users</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Up to 30 Project Integrations</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Analytics Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Finance Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Accounting Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-muted flex-grow-1">Network Platform</span>
														<i className="ki-duotone ki-cross-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center">
														<span className="fw-semibold fs-5 text-muted flex-grow-1">Unlimited Cloud Space</span>
														<i className="ki-duotone ki-cross-circle fs-1">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="kt_upgrade_plan_enterprise">
												<div className="pb-5">
													<h2 className="fw-bold text-dark">What’s in Startup Plan?</h2>
													<div className="text-muted fw-semibold">Optimal for 1000+ team and enterpise</div>
												</div>
												<div className="pt-1">
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Up to 10 Active Users</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Up to 30 Project Integrations</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Analytics Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Finance Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Accounting Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Network Platform</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Unlimited Cloud Space</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="kt_upgrade_plan_custom">
												<div className="pb-5">
													<h2 className="fw-bold text-dark">What’s in Startup Plan?</h2>
													<div className="text-muted fw-semibold">Optimal for corporations</div>
												</div>
												<div className="pt-1">
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Unlimited Users</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Unlimited Project Integrations</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Analytics Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Finance Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Accounting Module</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center mb-7">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Network Platform</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
													<div className="d-flex align-items-center">
														<span className="fw-semibold fs-5 text-gray-700 flex-grow-1">Unlimited Cloud Space</span>
														<i className="ki-duotone ki-check-circle fs-1 text-success">
															<span className="path1"></span>
															<span className="path2"></span>
														</i>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="d-flex flex-center flex-row-fluid pt-12">
								<button type="reset" className="btn btn-light me-3" data-bs-dismiss="modal">Cancel</button>
								<button type="submit" className="btn btn-primary" id="kt_modal_upgrade_plan_btn">
									<span className="indicator-label">Upgrade Plan</span>
									<span className="indicator-progress">Please wait...
										<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* add new address from here */},

			<div className="modal fade" id="kt_modal_new_address" tabIndex={-1} aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered mw-650px">
					<div className="modal-content">

						<div className="modal-header" id="kt_modal_new_address_header">
							<h2> Yeni Adres Ekle</h2>
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" ref={modalDismissRef}>
								<i className="ki-duotone ki-cross fs-1">
									<span className="path1"></span>
									<span className="path2"></span>
								</i>
							</div>
						</div>
						<Formik

							initialValues={{
								adres_Name: "",
								country_Name: '',
								city_Name: '',
								sate_Name: '',
								posta_kodu: '',
								adres_complte: '',
								faturaCheck: false,
								company_tax_number: "",
								company_tax_daire: "",
								company_Name: ""

							}}
							validationSchema={validationFormatSchema}

							onSubmit={handleSubmitAdres}
						>
							{({ values, errors, status, touched, isSubmitting, handleChange, handleBlur, setFieldValue }) => {

								console.log("valuesOfArdes", values)
								setSingleUpdateDataAdres(values)

								return (

									<Form id="kt_modal_new_address_form" className="form">

										<div className="modal-body py-10 px-lg-17">
											<div className="scroll-y me-n7 pe-7" id="kt_modal_new_address_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_new_address_header" data-kt-scroll-wrappers="#kt_modal_new_address_scroll" data-kt-scroll-offset="300px">

												<div className="d-flex flex-column mb-5 fv-row">
													<label className="fs-5 fw-semibold mb-2">Adres İsmi</label>

													<Field
														className="form-control form-control-solid"
														placeholder=""
														name="adres_Name"
													/>
													<ErrorMessage name="adres_Name" component="div" className="field-error" />
												</div>

												<div className="d-flex flex-column mb-5 fv-row">
													<label className="d-flex align-items-center fs-5 fw-semibold mb-2">
														<span className="required">Ülke</span>
														<span className="ms-1" data-bs-toggle="tooltip" title="Your payment statements may very based on selected country">
															<i className="ki-duotone ki-information-5 text-gray-500 fs-6">
																<span className="path1"></span>
																<span className="path2"></span>
																<span className="path3"></span>
															</i>
														</span>
													</label>

													{/* country to be call */}

													<DropdownComponent options={countries} updateDataChange={handleChildDataCountry} selectedOptionChoose="" />

												</div>

												<div className="d-flex flex-column mb-5 fv-row">
													<label className="fs-5 fw-semibold mb-2">Şehir</label>
													<DropdownComponent options={citiesToCall} updateDataChange={handleChildDataCity} selectedOptionChoose="" />

												</div>
												<div className="row g-9 mb-5">
													<div className="col-md-6 fv-row">
														<label className="fs-5 fw-semibold mb-2">İlçe</label>
														<DropdownComponent options={districtToCall} updateDataChange={handleChildDataState} selectedOptionChoose="" />
													</div>
													<div className="col-md-6 fv-row">
														<label className="fs-5 fw-semibold mb-2">Posta Kodu</label>
														<Field
															className="form-control form-control-solid"
															placeholder=""
															name="posta_kodu"
														/>
														<ErrorMessage name="posta_kodu" component="div" className="field-error" />
													</div>
												</div>
												<div className="d-flex flex-column mb-5 fv-row">
													<label className="required fs-5 fw-semibold mb-2">Address Line 2</label>
													<Field
														className="form-control form-control-solid"
														placeholder=""
														name="adres_complte"
													/>
													<ErrorMessage name="adres_complte" component="div" className="field-error" />
												</div>

												<hr className='mt-9' />

												<div className="fv-row mb-5 mt-5">
													<div className="d-flex flex-stack">
														<div className="me-5">
															<label className="fs-5 fw-semibold">
																Fatura
															</label>
															<div className="fs-7 fw-semibold text-muted">Fatura bilgileriniz .</div>
														</div>
														<label className="form-check form-switch form-check-custom form-check-solid">
															<span className="form-check-label fw-semibold text-muted"> Bireysel</span>
															&nbsp;
															<input className="form-check-input"  type="checkbox"
																  checked={values.faturaCheck}
																onChange={handleChange}
																onBlur={handleBlur}
																name="faturaCheck"
															  />
															<span className="form-check-label fw-semibold text-muted"> Kurumsal</span>
														</label>
													</div>
												</div>

												<hr className='mb-9' />



												{/* fatura do exist differently from there */}

												{

													values.faturaCheck && (

														<>


															{/* telefon Numara */}


															<div className="d-flex flex-column mb-5 fv-row">
																<label className="required fs-5 fw-semibold mb-2"> Firma Adı</label>
																<input className="form-control form-control-solid" placeholder="" name="address2" />
															</div>

															<div className="d-flex flex-column mb-5 fv-row">
																<label className="required fs-5 fw-semibold mb-2"> Vergi Dairesi</label>
																<input className="form-control form-control-solid" placeholder="" name="address2" />
															</div>

															<div className="d-flex flex-column mb-5 fv-row">
																<label className="required fs-5 fw-semibold mb-2"> Vergi Numarası</label>
																<input className="form-control form-control-solid" placeholder="" name="address2" />
															</div>



														</>



													)


												}

											</div>
										</div>
										<div className="modal-footer flex-center">
											<button type="reset" id="kt_modal_new_address_cancel" className="btn btn-light me-3" onClick={handleCancel}>iptal</button>
											<button type="submit" id="kt_modal_new_address_submit" className="btn btn-primary">
												<span className="indicator-label">Kaydet</span>
												<span className="indicator-progress">Lütfen bekleyin...
													<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
											</button>
										</div>


									</Form>
								)
							}
							}
						</Formik>

					</div>
				</div>
			</div>


		</div >



	)
}

export { ContactWidget }
