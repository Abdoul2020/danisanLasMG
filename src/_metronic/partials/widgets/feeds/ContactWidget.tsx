/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler } from 'react'
// react select title inside

// @ts-ignore
import { Country, State, City } from "country-state-city";
import useTurkeyCities from "use-turkey-cities";
// @ts-ignore
import axios from 'axios';
import { Dropdown, FormControl } from 'react-bootstrap';


import DropdownComponent from './DrodownComponent';









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

		// if (citiesToCall.length > 0) {

		// 	let givenState = citiesToCall.find((state: any) => state.name === adresInfo.city);

		// 	if (givenState) {
		// 		let citiesInState = City.getCitiesOfState(isoCity, givenState.isoCode);
		// 		setdistrictToCall(citiesInState)
		// 	} else {
		// 		let citiesInState = City.getCitiesOfState(isoCity, citiesToCall[0].isoCode);
		// 		setdistrictToCall(citiesInState)
		// 	}
		// }

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




	return (

		<div className={`card ${className}`}>

			<div className="card mb-5 mb-xl-10">

				<div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
					<div className="card-title m-0">
						<h3 className="fw-bold m-0">Adres bilgileri</h3>
					</div>
				</div>

				<div id="kt_account_settings_profile_details">

					<form id="kt_account_profile_details_form" className="form"  >
						<div className="card-body border-top p-9">
							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6">Ülke</label> 
								<div className="col-lg-8">
									<div className="row">
										<div className="col-lg-12 fv-row">
											<DropdownComponent options={countries} updateDataChange={handleChildDataCountry} selectedOptionChoose={adresInfo.Country} />
										</div>

									</div>
								</div>
							</div>

							<div className="row mb-6">

								<label className="col-lg-4 col-form-label required fw-semibold fs-6">Şehir & İlçe</label>

								<div className="col-lg-8">
									<div className="row">
										<div className="col-lg-4 fv-row">

											<DropdownComponent options={citiesToCall} updateDataChange={handleChildDataCity} selectedOptionChoose="" />

										</div>
										<div className="col-lg-4 fv-row">

											<DropdownComponent options={districtToCall} updateDataChange={handleChildDataState} selectedOptionChoose="" />

										</div>

										<div className="col-lg-4 fv-row">

											<input type="text" name="fname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
												placeholder="Posta Kodu" value={adresInfo.postaKodu}
												onChange={(x) => { setAdresInfo((e) => ({ ...e, postaKodu: x.target.value })) }}
											/>

										</div>

									</div>
								</div>
							</div>

							{
								adresLocation && (

									<div className="row mb-6" >
										<label className="col-lg-4 col-form-label required fw-semibold fs-6" style={{ visibility: "hidden" }}  >  Açık Adres</label>
										<div className="col-lg-8 fv-row">
											<input type="text" name="company"
												className="form-control form-control-lg form-control-solid"
												value={`${adresInfo.state},${adresInfo.postaKodu}/${adresInfo.city}/${adresInfo.Country}`} />
										</div>
									</div>

								)

							}




							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6" >  Açık Adres</label>
								<div className="col-lg-8 fv-row">
									<textarea className="form-control form-control-solid" name="message" value={adresInfo.openAdress}
										placeholder=""
										onChange={(x) => { setAdresInfo((e) => ({ ...e, openAdress: x.target.value })) }}

									></textarea>

								</div>


							</div>
						</div>



						<div className="card-footer d-flex justify-content-end py-6 px-9">
							{/* <button type="reset" className="btn btn-light btn-active-light-primary me-2" >İptal</button> */}
							<button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">Kaydet</button>

						</div>


					</form>
				</div>
			</div>

		</div>

	)
}

export { ContactWidget }
