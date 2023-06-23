/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect , useContext } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown2 } from '../../content/dropdown/Dropdown2'
import MetronicDatePicker from './MetronicDatePicker';
import MetronicPhoneInput from './MetronicPhoneInput';
import 'react-image-crop/dist/ReactCrop.css';
import DropdownComponent from './DrodownComponent';
import DropdownWithoutSearch from './DropdownWithoutSearch';

// @ts-ignore
import { Country, State, City } from "country-state-city";//counrty call

import MetronicModal from './MetronicCropModal';

import ImageContext from './ImageContext';


// import moment from 'moment';
// import 'moment-timezone';
import moment from 'moment-timezone';
import { useIntl } from 'react-intl'




















type Props = {
	className: string,
	onValueChange: any

}

const FeedsWidget3: React.FC<Props> = ({ className, onValueChange }) => {


	// senData to the parent
	const handleChange = (event: any) => {
		event.preventDefault()
		onValueChange(false);
	};

	//set Image to use Context
	const  {imageUrl, setImageUrl} = useContext(ImageContext);



	const [selectedDate, setSelectedDate] = useState("");


	const handleDateChange = (date: any) => {
		console.log("Selected date:", date);
		setSelectedDate(date)
	};

	//   metronik phone Input
	const [phone, setPhone] = useState("");

	const handlePhoneChange = (phone: any) => {
		setPhone(phone);
	};



	// crop the image functions

	const [cropImageModal, setcropImageModal] = useState(false)//ımage crop activer
	const [valueToSend, setvalueToSend] = useState("")



	useEffect(() => {

		console.log("okkfg", valueToSend)

	}, [valueToSend])



	useEffect(() => {

		console.log("kouuo", cropImageModal)

		if (cropImageModal === true) {
			const modalTrigger = document.getElementById('modal-trigger');
			if (modalTrigger) {
				modalTrigger.click();
			}
		}

	}, [cropImageModal])



	//send data to the child
	const handleChildData = (data: any) => {
		console.log("readdData", data)
		setcropImageModal(data);
	};


	// the Image data change
	const [avatarUrl, setAvatarUrl] = useState('');

	useEffect(() => {

		console.log("whatss", avatarUrl)
		

		if (avatarUrl) {

			// const urlObj = new URL(avatarUrl);
			// console.log("goneDta", urlObj)
			// const paths = urlObj.pathname.split('/');
			// const id = paths[paths.length - 1];
			// console.log("okkwell", id)
			localStorage.setItem('setIdTo', avatarUrl);
			setImageUrl?.(avatarUrl);
			window.dispatchEvent(new Event('storage'));


		}




	}, [avatarUrl])



	const handleFileChange = (e: any) => {

		console.log("datrr", e)

		e.persist() // persist the event object
		// initial operations before delay...
		setcropImageModal(true)
		setvalueToSend(e)
		// delay operations...
		setTimeout(() => {
			e.target.value = null
		}, 2000) // replace 1000 with the amount of delay you want in milliseconds





	}


	const handleDataToImage = (data: any) => {

		console.log("newProfilTo", data)

		setAvatarUrl(data);
	}



	const handleRemove = () => {

		setAvatarUrl('');

	};


	//select2 pro
	//const [selectedOption, setselectedOption] = useState(null)
	//const handleChangeToSend = (event: any) => {
	//	setselectedOption(event)
	//};


	//new try for select2
	const [loading, setLoading] = useState(false);

	const handleSubmit = (values: any) => {
		setLoading(true);
		console.log(values);
		// Perform your submission logic here
		setLoading(false);
	};

	//new const to apply
	const [menuOpen, setMenuOpen] = useState(false);
	//try continue
	//const [selectedOption, setSelectedOption] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	//const options = ["Option 1", "Option 2", "Option 3"]; // example options

	const handleSelectOption = (option: any) => {
		setSelectedOption(option);
		setSearchTerm('');
	};

	const handleSearchChange = (e: any) => {
		setSearchTerm(e.target.value);
	};

	// const filteredOptions = options.filter(option =>
	// 	option.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	const options = ["Option 1", "Option 2", "Option 3"]; // example options
	const cinsiyetOption = ["Erkek", "Kadın", "Belirtmek İstemiyorum"]
	const languageOption = ["Türkçe", "English", "French", "German", "Arabic"]
	const [selectedOption, setSelectedOption] = useState(options[0]);

	useEffect(() => {

		console.log("dataChangeOption", selectedOption)

	}, [selectedOption])


	//counrty call
	const [countries, setCountries] = useState<any>(["Turkey"])//countryData
	const [timeZone, setTimeZone] = useState<any>([])//Time Zone to Take

	const nameMappings: any = {
		'Europe/Istanbul': 'Istanbul',
		'America/Los_Angeles': 'Pacific Time',
		// Add more mappings as needed
	};


	useEffect(() => {

		Country.getAllCountries().map((v, i) => {
			setCountries((oldName: any) => [...oldName, v.name])
		})
		// const timezones = moment.tz.names();
		// setTimeZone(timezones)
		//new time zzone
		//const timeZones: any = Intl.DateTimeFormat().resolvedOptions().timeZone;


		const timeZones = Object.keys(nameMappings);
		const now: any = moment();

		const formattedTimeZones = timeZones.map(timeZone => {
			const zone = moment.tz.zone(timeZone);
			if (!zone) {
				return null; // or any other value to denote that this timezone was invalid
			}

			const offset = zone.utcOffset(now);
			const hours = Math.floor(Math.abs(offset) / 60);
			const minutes = Math.abs(offset) % 60;
			const sign = offset >= 0 ? '+' : '-';

			return `(GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}) ${nameMappings[timeZone]}`;
		}).filter(Boolean); // This will remove any null values from the array




		setTimeZone(formattedTimeZones)
		console.log("Ekol2yu", formattedTimeZones)



	}, [])

	//all time Zone
	// Get an array of all timezone names
	// const timezones = moment.tz.names();
	// console.log("TimeZoneToBe::",timezones);

	const timeZoneApply = [
		"(GMT-11:00) International Date Line West",
		"(GMT-11:00) Midway Island",
		"(GMT-11:00) Samoa",
		"(GMT-10:00) Hawaii",
		"(GMT-08:00) Alaska",
		"(GMT-07:00) Pacific Time (US & Canada)",
		"(GMT-07:00) Tijuana",
		"(GMT-07:00) Arizona",
		"(GMT-06:00) Mountain Time (US & Canada)",
		"(GMT-06:00) Chihuahua",
		"(GMT-06:00) Mazatlan",
		"(GMT-06:00) Saskatchewan",
		"(GMT-06:00) Central America",
		"(GMT-05:00) Central Time (US & Canada)",
		"(GMT-05:00) Guadalajara",
		"(GMT-05:00) Mexico City",
		"(GMT-05:00) Monterrey",
		"(GMT-05:00) Bogota",
		"(GMT-05:00) Lima",
		"(GMT-05:00) Quito",
		"(GMT-04:00) Eastern Time (US & Canada)",
		"(GMT-04:00) Indiana (East)",
		"(GMT-04:00) Caracas",
		"(GMT-04:00) La Paz",
		"(GMT-04:00) Georgetown",
		"(GMT-03:00) Atlantic Time (Canada)",
		"(GMT-03:00) Santiago",
		"(GMT-03:00) Brasilia",
		"(GMT-03:00) Buenos Aires",
		"(GMT-02:30) Newfoundland",
		"(GMT-02:00) Greenland",
		"(GMT-02:00) Mid-Atlantic",
		"(GMT-01:00) Cape Verde Is.",
		"(GMT) Azores",
		"(GMT) Monrovia",
		"(GMT) UTC",
		"(GMT+01:00) Dublin",
		"(GMT+01:00) Edinburgh",
		"(GMT+01:00) Lisbon",
		"(GMT+01:00) London",
		"(GMT+01:00) Casablanca",
		"(GMT+01:00) West Central Africa",
		"(GMT+02:00) Belgrade",
		"(GMT+02:00) Bratislava",
		"(GMT+02:00) Budapest",
		"(GMT+02:00) Ljubljana",
		"(GMT+02:00) Prague",
		"(GMT+02:00) Sarajevo",
		"(GMT+02:00) Skopje",
		"(GMT+02:00) Warsaw",
		"(GMT+02:00) Zagreb",
		"(GMT+02:00) Brussels",
		"(GMT+02:00) Copenhagen",
		"(GMT+02:00) Madrid",
		"(GMT+02:00) Paris",
		"(GMT+02:00) Amsterdam",
		"(GMT+02:00) Berlin",
		"(GMT+02:00) Bern",
		"(GMT+02:00) Rome",
		"(GMT+02:00) Stockholm",
		"(GMT+02:00) Vienna",
		"(GMT+02:00) Cairo",
		"(GMT+02:00) Harare",
		"(GMT+02:00) Pretoria",
		"(GMT+03:00) Bucharest",
		"(GMT+03:00) Helsinki",
		"(GMT+03:00) Kiev",
		"(GMT+03:00) Kyiv",
		"(GMT+03:00) Riga",
		"(GMT+03:00) Sofia",
		"(GMT+03:00) Tallinn",
		"(GMT+03:00) Vilnius",
		"(GMT+03:00) Athens",
		"(GMT+03:00) Istanbul",
		"(GMT+03:00) Minsk",
		"(GMT+03:00) Jerusalem",
		"(GMT+03:00) Moscow",
		"(GMT+03:00) St. Petersburg",
		"(GMT+03:00) Volgograd",
		"(GMT+03:00) Kuwait",
		"(GMT+03:00) Riyadh",
		"(GMT+03:00) Nairobi",
		"(GMT+03:00) Baghdad",
		"(GMT+04:00) Abu Dhabi",
		"(GMT+04:00) Muscat",
		"(GMT+04:00) Baku",
		"(GMT+04:00) Tbilisi",
		"(GMT+04:00) Yerevan",
		"(GMT+04:30) Tehran",
		"(GMT+04:30) Kabul",
		"(GMT+05:00) Ekaterinburg",
		"(GMT+05:00) Islamabad",
		"(GMT+05:00) Karachi",
		"(GMT+05:00) Tashkent",
		"(GMT+05:30) Chennai",
		"(GMT+05:30) Kolkata",
		"(GMT+05:30) Mumbai",
		"(GMT+05:30) New Delhi",
		"(GMT+05:30) Sri Jayawardenepura",
		"(GMT+05:45) Kathmandu",
		"(GMT+06:00) Astana",
		"(GMT+06:00) Dhaka",
		"(GMT+06:00) Almaty",
		"(GMT+06:00) Urumqi",
		"(GMT+06:30) Rangoon",
		"(GMT+07:00) Novosibirsk",
		"(GMT+07:00) Bangkok",
		"(GMT+07:00) Hanoi",
		"(GMT+07:00) Jakarta",
		"(GMT+07:00) Krasnoyarsk",
		"(GMT+08:00) Beijing",
		"(GMT+08:00) Chongqing",
		"(GMT+08:00) Hong Kong",
		"(GMT+08:00) Kuala Lumpur",
		"(GMT+08:00) Singapore",
		"(GMT+08:00) Taipei",
		"(GMT+08:00) Perth",
		"(GMT+08:00) Irkutsk",
		"(GMT+08:00) Ulaan Bataar",
		"(GMT+09:00) Seoul",
		"(GMT+09:00) Osaka",
		"(GMT+09:00) Sapporo",
		"(GMT+09:00) Tokyo",
		"(GMT+09:00) Yakutsk",
		"(GMT+09:30) Darwin",
		"(GMT+09:30) Adelaide",
		"(GMT+10:00) Canberra",
		"(GMT+10:00) Melbourne",
		"(GMT+10:00) Sydney",
		"(GMT+10:00) Brisbane",
		"(GMT+10:00) Hobart",
		"(GMT+10:00) Vladivostok",
		"(GMT+10:00) Guam",
		"(GMT+10:00) Port Moresby",
		"(GMT+10:00) Solomon Is.",
		"(GMT+11:00) Magadan",
		"(GMT+11:00) New Caledonia",
		"(GMT+12:00) Fiji",
		"(GMT+12:00) Kamchatka",
		"(GMT+12:00) Marshall Is.",
		"(GMT+12:00) Auckland",
		"(GMT+12:00) Wellington",
		"(GMT+13:00) Nuku'alofa"
	]

	const langToApply = [
		"Bahasa Indonesia - Indonesian",
		"Bahasa Melayu - Malay",
		"Català - Catalan",
		"Čeština - Czech",
		"Dansk - Danish",
		"Deutsch - German",
		"English",
		"English UK - British English",
		"Español - Spanish",
		"Filipino",
		"Français - French",
		"Gaeilge - Irish (beta)",
		"Galego - Galician (beta)",
		"Hrvatski - Croatian",
		"Italiano - Italian",
		"Magyar - Hungarian",
		"Nederlands - Dutch",
		"Norsk - Norwegian",
		"Polski - Polish",
		"Português - Portuguese",
		"Română - Romanian",
		"Slovenčina - Slovak",
		"Suomi - Finnish",
		"Svenska - Swedish",
		"Tiếng Việt - Vietnamese",
		"Türkçe - Turkish",
		"Ελληνικά - Greek",
		"Български език - Bulgarian",
		"Русский - Russian",
		"Српски - Serbian",
		"Українська мова - Ukrainian",
		"עִבְרִית - Hebrew",
		"اردو - Urdu (beta)",
		"العربية - Arabic",
		"فارسی - Persian",
		"मराठी - Marathi",
		"हिन्दी - Hindi",
		"বাংলা - Bangla",
		"ગુજરાતી - Gujarati",
		"தமிழ் - Tamil",
		"ಕನ್ನಡ - Kannada",
		"ภาษาไทย - Thai",
		"한국어 - Korean",
		"日本語 - Japanese",
		"简体中文 - Simplified Chinese",
		"繁體中文 - Traditional Chinese"
	]

	const curencyToApply = [
		"USD - USA dollar",
		"GBP - British pound",
		"AUD - Australian dollar",
		"JPY - Japanese yen",
		"SEK - Swedish krona",
		"CAD - Canadian dollar",
		"CHF - Swiss franc",
		"TRY - Türk Lirası",
		"EUR - Euro"
	]

	const handleChildDataCountry = (data: any) => {
		console.log("veriiokk", data)
	}

	const handleChildDataGender = (data: any) => {
		console.log("veriiokk", data)
	}

	const handleChildDataLanguage = (data: any) => {
		console.log("veriiokk", data)
	}
	const handleChildDataTimeZone = (data: any) => {
		console.log("veriiokk", data)
	}

	const handleChildDataCurrency = (data: any) => {
		console.log("veriiokk", data)
	}




	const intl = useIntl()




	return (


		<div className={`card ${className}`}>


			<div className="card mb-5 mb-xl-10">

				<div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
					<div className="card-title m-0">
						<h3 className="fw-bold m-0">
							{intl.formatMessage({ id: 'USER.MENU.SIDEBAR.SETTING' })}
						</h3>
					</div>
				</div>

				<div id="kt_account_settings_profile_details">
					<form id="kt_account_profile_details_form" className="form">
						<div className="card-body border-top p-9">
							<div className="row mb-6">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.PROFIL' })}
								</label>
								{/* the ways to send data */}

								<div className="col-lg-8">
									<div className="image-input image-input-outline" data-kt-image-input="true" >

										<div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: `url(${avatarUrl !== "" ? avatarUrl : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'})` }}></div>

										<label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
											<i className="ki-duotone ki-pencil fs-7">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
											<input type="file" name="avatar" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
											<input type="hidden" name="avatar_remove" />

										</label>

										{
											avatarUrl !== "" && (

												<span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar" onClick={handleRemove}>
													<i className="ki-duotone ki-cross fs-2">
														<span className="path1"></span>
														<span className="path2"></span>
													</i>
												</span>

											)
										}
									</div>
									<div className="form-text">
										{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.IMAGE_REQUIRED' })}
									</div>
								</div>
							</div>


							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.NAME_SURNAME' })}
								</label>
								<div className="col-lg-8">
									<div className="row">
										<div className="col-lg-6 fv-row">
											<input type="text" name="fname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Adınız" value="Abdoul" />
										</div>
										<div className="col-lg-6 fv-row">
											<input type="text" name="lname" className="form-control form-control-lg form-control-solid" placeholder="Soyadınız" value="YACOUBOU" />
										</div>
									</div>
								</div>
							</div>




							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.BIRTHDATE' })}
								</label>

								<div className='col-lg-8 fv-row'>
									<MetronicDatePicker label="Birth Date" onChange={handleDateChange} value={selectedDate} language="tr" />
								</div>



							</div>


							<div className="row mb-6">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									<span className="required">
										{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.NATIONALITY' })}
									</span>
									<span className="ms-1" data-bs-toggle="tooltip" title="Country of origination">
										<i className="ki-duotone ki-information-5 text-gray-500 fs-6">
											<span className="path1"></span>
											<span className="path2"></span>
											<span className="path3"></span>
										</i>
									</span>
								</label>

								<div className="col-lg-8 fv-row">
									<DropdownComponent options={countries} updateDataChange={handleChildDataCountry} selectedOptionChoose="" />
								</div>
							</div>

							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.IDENTITY' })}

								</label>
								<div className="col-lg-8">
									<div className="row">
										<div className="col-lg-6 fv-row">
											<input type="text" name="fname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Ulusal Kimlik" value="994584395" />
										</div>
										<div className="col-lg-6 fv-row">
											<DropdownWithoutSearch options={cinsiyetOption} updateData={handleChildDataGender} />

										</div>
									</div>
								</div>
							</div>



							<div className="row mb-6">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									<span className="required">
										{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.PHONE_NUMBER' })}
									</span>
									<span className="ms-1" data-bs-toggle="tooltip" title="Phone number must be active">
										<i className="ki-duotone ki-information-5 text-gray-500 fs-6">
											<span className="path1"></span>
											<span className="path2"></span>
											<span className="path3"></span>
										</i>
									</span>
								</label>
								<div className="col-lg-8 fv-row">
									<MetronicPhoneInput value={phone} onChange={handlePhoneChange} />

								</div>
							</div>




							<div className="row mb-6">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.EMAIL' })}
								</label>
								<div className="col-lg-8 fv-row">
									<input type="text" name="website" className="form-control form-control-lg form-control-solid" placeholder="Yeni E-posta" value="abdf@gmail.com" />
								</div>
							</div>

							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.LANGUAGE' })}
								</label>
								<div className="col-lg-8 fv-row">

									<DropdownComponent options={langToApply} updateDataChange={handleChildDataLanguage} selectedOptionChoose="" />

									<div className="form-text">
										{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.SEANSLANGUAGE' })}
									</div>
								</div>
							</div>


							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6"> Saat Dilimi </label>
								<div className="col-lg-8 fv-row">
									<DropdownComponent options={timeZoneApply} updateDataChange={handleChildDataTimeZone} selectedOptionChoose="" />

								</div>
							</div>


							<div className="row mb-6">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.CURRENCY' })}
								</label>
								<div className="col-lg-8 fv-row">
									<DropdownComponent options={curencyToApply} updateDataChange={handleChildDataCurrency} selectedOptionChoose="" />

								</div>
							</div>
							<div className="row mb-6">
								<label className="col-lg-4 col-form-label required fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.CONTACT_CANAL' })}
								</label>
								<div className="col-lg-8 fv-row">
									<div className="d-flex align-items-center mt-3">
										<label className="form-check form-check-custom form-check-inline form-check-solid me-5">
											<input className="form-check-input" name="communication[]" type="checkbox" value="1" />
											<span className="fw-semibold ps-2 fs-6">

												{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.EMAIL' })}
											</span>
										</label>
										<label className="form-check form-check-custom form-check-inline form-check-solid">
											<input className="form-check-input" name="communication[]" type="checkbox" value="2" />
											<span className="fw-semibold ps-2 fs-6">
												{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.PHONE_NUMBER_SIMPLE' })}
											</span>
										</label>
									</div>
								</div>
							</div>


							<div className="row mb-0">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.ACCOUNT_STATUS' })}
								</label>

								<div className="col-lg-8 d-flex align-items-center">
									<div className="form-check form-check-solid form-switch form-check-custom fv-row">
										<input className="form-check-input w-45px h-30px" type="checkbox" id="allowmarketing" checked={true} />
										<label className="form-check-label" ></label>
									</div>
								</div>
							</div>


							<div className="row mb-6">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.SUBSCRIPTION_TYPE' })}
								</label>
								<div className="col-lg-8 fv-row">
									<input type="text" name="website" className="form-control form-control-lg form-control-solid" value="Mega Kişisel" readOnly />
								</div>
							</div>


							<div className="row mb-0">
								<label className="col-lg-4 col-form-label fw-semibold fs-6">
									{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.ACCOUNT_TYPE' })}
								</label>

								<div className="col-lg-8  align-items-center">

									<ul className="nav nav-custom  nav-line-tabs nav-line-tabs-2x fs-6 fw-semibold mt-6 mb-8 gap-2">
										<li className="nav-item">
											<a className="nav-link text-active-primary d-flex align-items-center pb-4 active" data-bs-toggle="tab" href="#kt_contact_view_general">
												<i className="ki-duotone ki-home fs-4 me-1"></i>
												{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.ACCOUNT_TYPE_NAME_COOPERATE' })}
											</a>
										</li>
										<li className="nav-item">
											<a className="nav-link text-active-primary d-flex align-items-center pb-4" data-bs-toggle="tab" href="#kt_contact_view_meetings">

												<i className="ki-duotone ki-badge fs-1 me-2">
													<span className="path1"></span>
													<span className="path2"></span>
													<span className="path3"></span>
													<span className="path4"></span>
													<span className="path5"></span>
												</i>
												{intl.formatMessage({ id: 'EXPERT.PROFIL_INFO.CONTENT.ACCOUNT_TYPE_NAME_PERSONILIZE' })}
											</a>
										</li>

										{/* <li className="nav-item">
											<a className="nav-link text-active-primary d-flex align-items-center pb-4" data-bs-toggle="tab" href="#kt_contact_view_activity">
												<i className="ki-duotone ki-save-2 fs-4 me-1">
													<span className="path1"></span>
													<span className="path2"></span>
												</i>Activity</a>
										</li> */}

									</ul>


									{/* change Type of that */}

									<div className="tab-content" id="">
										<div className="tab-pane fade show active" id="kt_contact_view_general" role="tabpanel">
											<div className="col-lg-8 fv-row">
												<input type="text" name="website" className="form-control form-control-lg form-control-solid" value="" placeholder={intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.COMPANY_WRITE' })} />
											</div>
										</div>
									</div>
								</div>
							</div>


						</div>
						<div className="card-footer d-flex justify-content-end py-6 px-9">

							<button type="reset" className="btn btn-light btn-active-light-primary me-2" onClick={(e) => handleChange(e)} >
								{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.DISCARD' })}
							</button>
							<button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">
								{intl.formatMessage({ id: 'EXPERT.ACCOUNT_SETTINGS.CONTENT.REGISTER' })}
							</button>

						</div>
					</form>
				</div>
			</div>

			<button
				id="modal-trigger"
				type="button"
				className="btn btn-light btn-sm"
				data-bs-toggle="modal"
				data-bs-target="#kt_modal_users_search"
				style={{ display: 'none' }}
			>
				Invite New
			</button>



			{/* crop image modal of user */}

			{
				valueToSend !== "" && (
					<MetronicModal e={valueToSend} onReceiveData={handleChildData} handleDataToImage={handleDataToImage} />

				)
			}


		</div>
	)
}

export { FeedsWidget3 }
