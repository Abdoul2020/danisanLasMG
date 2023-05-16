/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler } from 'react'
// react select title inside

// @ts-ignore
import { Country, State, City } from "country-state-city";
import useTurkeyCities from "use-turkey-cities";
import axios from 'axios';




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

		if (isoCity) {
			//setCitiesToCall(City.getCitiesOfCountry(isoCity))
			console.log("fauyy", State.getStatesOfCountry(isoCity))
			setCitiesToCall(State.getStatesOfCountry(isoCity))
		}
	}, [isoCity])


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

	}, [citiesToCall])




	const [adresInfo, setAdresInfo] = useState({
		Country: "",
		state: "",
		city: ""
	})



	useEffect(() => {
		Country.getAllCountries().map((v: any, i: any) => {
			if (v.name == adresInfo.Country) {
				setIsoCity(v.isoCode);
			}
		});
	}, [adresInfo.Country])


	useEffect(() => {
		console.log("city", adresInfo.city)

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


	}, [adresInfo.city])

	useEffect(() => {
		console.log("State::", adresInfo.state)

		if (districtToCall.length > 0) {
			districtToCall.map((v: any, i: any) => {
				getNeighborhood(v.latitude, v.longitude)
			})

		}


	}, [adresInfo.state])
	



	useEffect(() => {
		Country.getAllCountries().map((v: any, i: any) => {

			if (adresInfo.Country !== "") {

				if (v.name == adresInfo.Country) {
					setIsoCity(v.isoCode);
				}

			} else {
				if (i === 0) {
					setIsoCity(v.isoCode);
				}
			}

		});

	}, [])


	const [neighborhood, setNeighborhood] = useState({});
	useEffect(() => {

		console.log("hello", neighborhood)
	//mahalepostaKodu.push(neighborhood)

	}, [neighborhood])

	const getNeighborhood = async (lat: any, long: any) => {

		console.log("attitude"+lat+"long::", long)

		try {
			const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
				params: {
					q: lat+long, // replace with your latitude and longitude
					key: '09be18c9cffc4891be7b5a6c49e4c387', // replace with your API key
				},
			});
			console.log("postaKoduPA",response.data)

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
											<select name="country" aria-label="Select a Country"
												data-control="select2" data-placeholder="Select a country..."
												className="form-select form-select-solid form-select-lg fw-semibold"
												value={adresInfo.Country}
												onChange={(x) => { setAdresInfo((e) => ({ ...e, Country: x.target.value })); console.log("valueSee", x.target.value) }}

											>
												{Country.getAllCountries().map(
													(name: any, index: any) => (
														<option key={index} value={name.name}>
															{name.name === "Turkey"
																? "Türkiye"
																: name.name}

														</option>
													)
												)}

											</select>

										</div>

									</div>
								</div>
							</div>

							<div className="row mb-6">

								<label className="col-lg-4 col-form-label required fw-semibold fs-6">Şehir & İlçe</label>

								<div className="col-lg-8">
									<div className="row">
										<div className="col-lg-4 fv-row">

											<select name="country" aria-label="Select a Country"
												data-control="select2"
												data-placeholder="Select a country..."
												className="form-select form-select-solid form-select-lg fw-semibold"
												value={adresInfo.city}
												onChange={(x) => { setAdresInfo((e) => ({ ...e, city: x.target.value })) }}
											>

												{citiesToCall.map((name: any, index: any) => {
													return (
														<option key={index} value={name.name}>
															{name.name}
														</option>
													);
												})

												}


											</select>

										</div>
										<div className="col-lg-4 fv-row">

											<select name="country" aria-label="Select a Country"
												data-control="select2" data-placeholder="Select a country..."
												className="form-select form-select-solid form-select-lg fw-semibold"
												value={adresInfo.state}
												onChange={(x) => { setAdresInfo((e) => ({ ...e, state: x.target.value })) }}

											>
												{districtToCall.map((name: any, index: any) => {
													return (
														<option key={index} value={name.name}>
															{name.name}
														</option>
													);
												})

												}

											</select>


										</div>

										<div className="col-lg-4 fv-row">

											<select
												onChange={e => {
													setDistrict(e.target.value);
												}}
												value={district}
												name="country" aria-label="Select a Country" data-control="select2" data-placeholder="Select a country..." className="form-select form-select-solid form-select-lg fw-semibold"
											>
												{districts.map(district => (
													<option key={district} value={district}>
														{district}
													</option>
												))}
											</select>

										</div>

									</div>
								</div>
							</div>


							<div className="row mb-6" style={{ visibility: "hidden" }}>
								<label className="col-lg-4 col-form-label required fw-semibold fs-6" style={{ visibility: 'hidden' }}>Company</label>
								<div className="col-lg-8 fv-row">

									<input type="text" name="company" className="form-control form-control-lg form-control-solid" value="" />
								</div>


							</div>

							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6" >  Açık Adres</label>
								<div className="col-lg-8 fv-row">
									<textarea className="form-control form-control-solid" name="message" placeholder=""></textarea>

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
