/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler, useRef, useCallback } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link, useLocation } from 'react-router-dom'
// react select title inside
import Select, { components, MultiValueGenericProps, MultiValueProps, OnChangeValue, Props, GroupBase } from 'react-select'
import { SortableContainer, SortableContainerProps, SortableElement, SortEndHandler, SortableHandle, } from 'react-sortable-hoc';
import { ColourOption, colourOptions } from '../../../../service/util/data';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Turkish } from 'flatpickr/dist/l10n/tr.js';
// import Tagify from "@yaireo/tagify";
// import '@yaireo/tagify/dist/tagify.css';

import FlatpickrInput from './FlatpickrInput';
import CalendarComponent from './CalendarTime'

//import CustomInput from './CustomInput'
//import Tagify from '@yaireo/tagify';
import MetronicTagify from './TagifyInput'
import MetronicTagifyPrivate from "./TagifyOzelData";
import DropdownWithoutSearch from './DropdownWithoutSearch'
import { toastify } from "../../../../service/toastify"





import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import 'moment/locale/tr';








type Propss = {
    className: string

}

type Suggestions = string[];

type User = {
    value: string;
    name: string;
    avatar: string;
    email: string;
};






type NormType = { value: string };


type NormElement = {
    value: any;
};



const FeedsWidget8: React.FC<Propss> = ({ className }) => {




    const [suggestions, setSuggestions] = useState<Suggestions>([
        'Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Cumartesi',
        'Pazar',
    ]);




    // from firstdata zaman
    const [zamanInputUpdate, setzamanInputUpdate] = useState<any>("");
    const [ozelCondition, setozelCondition] = useState<any>(""); //ozel kosullu







    const handleDatafromUpdateZaman = (childData: any) => {
        // Do something with the data received from the child
        setzamanInputUpdate(childData);

    };


    const [secondSugestion, setsecondSugestion] = useState([
        'Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Cumartesi',
        'Pazar',
    ]);


    useEffect(() => {
        console.log("secondSu8ggestions", secondSugestion)
    }, [secondSugestion])






    // useEffect(() => {
    //     console.log('array?', Array.isArray(zamanInputUpdate));

    //     if (!zamanInputUpdate || zamanInputUpdate.trim() === '') {
    //         console.error('Norm is empty');
    //         return;
    //     }

    //     let normArray;
    //     try {
    //         normArray = JSON.parse(zamanInputUpdate);
    //     } catch (error) {
    //         console.error('ERROR:', error);
    //         return;
    //     }

    //     if (Array.isArray(normArray)) {
    //         const normValues = normArray.map((item: any) => item.value.toLowerCase());
    //         const secondSuggestion = secondSugestion.filter(item => !normValues.includes(item.toLowerCase()));
    //         setsecondSugestion(secondSuggestion);

    //     }

    // }, [zamanInputUpdate])


    //ozel condition from this part









    const datePickerRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [showLastTwo, setShowLastTwo] = useState(false);




    useEffect(() => {
        datePickerRefs.current.slice(0, 2).forEach((input, index) => {
            if (input) {
                flatpickr(input, {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: 'H:i',
                    locale: Turkish,
                    onChange: function (selectedDates, dateStr, instance) {
                        const newDatePickerElements = [...datePickerElements];
                        newDatePickerElements[index].value = dateStr;
                        setDatePickerElements(newDatePickerElements);
                    },
                });
            }
        });


        // always chaeck sugestions arrays from here

    }, []);




    useEffect(() => {
        if (showLastTwo) {
            datePickerRefs.current.slice(2).forEach((input, index) => {
                if (input) {
                    flatpickr(input, {
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        locale: Turkish,
                        onChange: function (selectedDates, dateStr, instance) {
                            const newDatePickerElements = [...datePickerElements];
                            newDatePickerElements[index + 2].value = dateStr;
                            setDatePickerElements(newDatePickerElements);
                        },
                    });
                }
            });
        }
    }, [showLastTwo]);





    const [datePickerElements, setDatePickerElements] = useState([
        { id: 'kt_datepicker_1', label: 'Masai balşlangıcı', value: "16:59" },
        { id: 'kt_datepicker_2', label: 'Mesai bitişi', value: "" },
        { id: 'kt_datepicker_3', label: 'Mola başlangıcı', value: "" },
        { id: 'kt_datepicker_4', label: 'Mola bitişi', value: "" },
    ]);


    // datePickerElement choose for change
    const handleInputChange = (index: any) => (event: any) => {

        const newDatePickerElements = [...datePickerElements];
        newDatePickerElements[index].value = event.target.value;
        setDatePickerElements(newDatePickerElements);

    };


    // choose the kısa mola and randevu süre
    const [breakTimeToChoose, setbreakTimeToChoose] = useState("")
    const [randevuSaatToChoose, setrandevuSaatToChoose] = useState("")

    //handle break time
    const handleBreakTime = (event: any) => {
        setbreakTimeToChoose(event.target.value);
        console.log("Selected value:", event.target.value);
    };

    //handle randevu time from
    const handleRandevuTime = (event: any) => {
        setrandevuSaatToChoose(event.target.value);
        console.log("Selected value:", event.target.value);
    };


    const handleClick = () => {
        setShowLastTwo(!showLastTwo);
    };



    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(suggestions);
    const [filteredZamanDays, setFilteredZamanDays] = useState<string[]>(suggestions);




    // new Tagify to be use
    const [tags, setTags] = useState([]);
    const [tagsPrivate, settagsPrivate] = useState<any>([]);
    const [newSugestion, setNewSugestion] = useState([])

    const [objectArrayyy, setObjectArrayyy] = useState<any>([]);
    const [objectArrayZaman, setObjectArrayZaman] = useState<any>([]);





    useEffect(() => {

        console.log("AvailableArray", objectArrayyy)

        if (objectArrayyy.length > 0) {

            let array2: any = JSON.parse(objectArrayyy);

            let array2Values: string[] = array2.map((obj: any) => obj.value);

            const filteredSuggestionsTosend: any = suggestions.filter((suggestion) => !array2Values.includes(suggestion));

            setFilteredSuggestions(filteredSuggestionsTosend);

        }

    }, [objectArrayyy])



    useEffect(() => {


        if (objectArrayZaman.length > 0) {

            let array2: any = JSON.parse(objectArrayZaman);

            let array2Values: string[] = array2.map((obj: any) => obj.value);

            const filteredSuggestionsTosend: any = suggestions.filter((suggestion) => !array2Values.includes(suggestion));

            setFilteredZamanDays(filteredSuggestionsTosend);

        }

    }, [objectArrayZaman])



    useEffect(() => {

        try {

            setObjectArrayyy(tags)

        } catch (error) {

            console.error("Error parsing JSON:", error);
        }

    }, [tags])


    const [daysToPrivate, setDaysToPrivate] = useState<any>([])

    useEffect(() => {

        console.log("daysToPrivate", daysToPrivate)

    }, [daysToPrivate])


    useEffect(() => {



        console.log("tagsPrivate", tagsPrivate)

        if (tagsPrivate.length > 0) {
            let selectDays: any = JSON.parse(tagsPrivate);

            console.log("slappU", selectDays)

            selectDays.map((w: any, a: any) => {

                const daysName = w.value

                // Check if a day already exists in the array
                //const dayExists = daysToPrivate.some((item: any) => item.hasOwnProperty(daysName));

                //if(!dayExists){

                const newDaysObject = {
                    [daysName]: [{
                        kmola: kMolaUpdate,
                        rdevu: RdevSureUpdate,
                        saatTime: []
                    }]
                }

                setDaysToPrivate([...daysToPrivate, newDaysObject])

                // }


            })


        }



        try {
            setObjectArrayZaman(tagsPrivate)
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }

    }, [tagsPrivate])



    // Define an array of suggestions for the dropdown

    const handleTagChange = (newTags: any) => {
        setTags(newTags);
    };


    //private Tagify to set 
    const handleTagChangePrivate = (newTags: any) => {
        settagsPrivate(newTags);
    };



    ///options to choose
    const options = ["Option 1", "Option 2", "Option 3"]; // example options
    const KMolaSure = ["5", "10", "15", "20", "25", "30"]
    const RdevSure = ["10", "15", "20", "25", "30", "35", "40", "50", "60", "90", "120"]
    const ozelZamanSaat = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    const ozelZamanDakkika = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]

    //date update from child data
    const [kMolaUpdate, setKMolaUpdate] = useState(KMolaSure[0]);
    const [RdevSureUpdate, setRdevSureUpdate] = useState(RdevSure[0]);

    const [ozelZamanSaatToChange, setOzelZamanSaatToChange] = useState("no update yet");
    const [ozelZamanDakkikaToChange, setOzelZamanDakkikaToChange] = useState("no update yet");







    useEffect(() => {
        console.log("Tobechangeu", ozelZamanSaatToChange)
    }, [ozelZamanSaatToChange])





    const handleKmola = (dataFromChild: any) => {
        setKMolaUpdate(dataFromChild);
    }

    const handleRdevSure = (dataFromChild: any) => {
        setRdevSureUpdate(dataFromChild);
    }

    //ozel zaman saat to be change
    const handleZamanSaat = (dataFromChild: any) => {
        setOzelZamanSaatToChange(dataFromChild)
    }

    //ozel zaman saat to be change
    const handleZamanDakkika = (dataFromChild: any) => {
        setOzelZamanDakkikaToChange(dataFromChild)
    }

    //display zaman an close zaman
    const [displayZaman, setDisplayZaman] = useState(true);
    const [displayCalendar, setDisplayCalendar] = useState(true)


    //days time picker
    const [selectedTime, setSelectedTime] = useState<string | undefined>('');

    // ozel zaman Saati hesaplama burada
    useEffect(() => {
        console.log("weshhUppuu::", RdevSureUpdate)
    }, [RdevSureUpdate])

    useEffect(() => {

        console.log("okkWeelSaid", kMolaUpdate)
    }, [kMolaUpdate])

    useEffect(() => {

        console.log("wehhsPo", selectedTime)

    }, [selectedTime])


    const handleTimeChange = (value: string) => {
        setSelectedTime(value);

    };







    // delete tags from there
    const deleteTag = (indexToDelete: any, valueTodelete: any, key: any) => {

        console.log("toDellete::", valueTodelete, "okkWeshh", key)

        // Make a copy of the state
        let newState = [...daysToPrivate];

        // Find the index of the object with the "pazartesi" key
        let indexofDay = newState.findIndex(obj => obj.hasOwnProperty(key));

        if (indexofDay !== -1) {
            // Find the index of the value to delete in the saatTime array
            let valueIndex = newState[indexofDay][key][0]['saatTime'].indexOf(valueTodelete);

            if (valueIndex !== -1) {
                // Remove the value from the saatTime array
                newState[indexofDay][key][0]['saatTime'].splice(valueIndex, 1);
                // Set the state with the modified copy
                setDaysToPrivate(newState);
            }
        }
    }


    // calculate the time in the day
    const [privateDaysTimes, setPrivateDaysTimes] = useState<any>([])

    useEffect(() => {
        console.log("wefftt", privateDaysTimes)


    }, [privateDaysTimes])


    // Helper function to convert HH:MM time string to minutes
    function convertTimeToMinutes(timeStr: any) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return (hours * 60) + minutes;
    }

    // Helper function to convert minutes to HH:MM time string
    function convertMinutesToTime(minutes: any) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }



    //add more time in a day to proove the time
    const addTimeforPrivateSettings = (value: any, index: any, key: any) => {


        //calculate the time of randvu sure and break time
        const parsedValueKmola = parseInt(kMolaUpdate, 10);
        const parsedValueRsure = parseInt(RdevSureUpdate, 10);


        // Make a copy of the state
        let newState = [...daysToPrivate];
        // Find the index of the object with the "pazartesi" key
        let indexOfDay = newState.findIndex(obj => obj.hasOwnProperty(key));

        // Convert given times to minutes
        const giveTimeInMinutes = convertTimeToMinutes(selectedTime);
        const saatTimeInMinutes = newState[indexOfDay][key][0]['saatTime'].map((time: any) => convertTimeToMinutes(time));

        console.log("whatHERE", saatTimeInMinutes)
        console.log("oppgu", giveTimeInMinutes)

        let result = false;


        if (!isNaN(parsedValueKmola) && !isNaN(parsedValueRsure)) {

            let totalTimeToSpend = parsedValueKmola + parsedValueRsure
            console.log("yuoaap", totalTimeToSpend)

            if (saatTimeInMinutes.length > 0) {

                for (let i = 0; i < saatTimeInMinutes.length; i++) {

                    let timeRequired = saatTimeInMinutes[i] + totalTimeToSpend
                    let timeRequiredless = giveTimeInMinutes + totalTimeToSpend
                    console.log("reqiredTime", timeRequiredless)

                    if (giveTimeInMinutes > saatTimeInMinutes[i]) {
                        console.log("yessfooo")
                        if (i === saatTimeInMinutes.length - 1) {
                            console.log("likeme")
                            if (timeRequired <= giveTimeInMinutes) {
                                console.log("wellSaidTrue::", giveTimeInMinutes)

                                newState[indexOfDay][key][0]['saatTime'].push(convertMinutesToTime(giveTimeInMinutes));
                                setDaysToPrivate(newState);
                                // result = true;
                                break;
                            } else {

                                toastify({ type: 'error', message: 'Randevu ve mola sürelerini dikkate alınız.' });

                            }
                        }
                    } else {


                        if (timeRequiredless > saatTimeInMinutes[i]) {
                            toastify({ type: 'error', message: 'Randevu ve mola sürelerini dikkate alınız.' });
                            break;
                        } else {

                            if (saatTimeInMinutes[i - 1]) {

                                if (saatTimeInMinutes[i - 1] + totalTimeToSpend >= giveTimeInMinutes) {
                                    toastify({ type: 'error', message: 'Randevu ve mola sürelerini dikkate alınız.' });
                                    break;
                                } else {
                                    newState[indexOfDay][key][0]['saatTime'].splice(i, 0, convertMinutesToTime(giveTimeInMinutes));
                                    setDaysToPrivate(newState);
                                    break;
                                }

                            } else {

                                // Convert back to HH:MM format before adding to saatTime
                                newState[indexOfDay][key][0]['saatTime'].splice(i, 0, convertMinutesToTime(giveTimeInMinutes));
                                setDaysToPrivate(newState);
                                break;
                            }
                        }
                    }
                }

            } else {
                if (indexOfDay !== -1) {
                    // Add the new value to the saatTime array
                    newState[indexOfDay][key][0]['saatTime'].push(selectedTime);
                    // Set the state with the modified copy
                    setDaysToPrivate(newState);
                }
            }

        } else {


        }


        // if (result === true) {

        //     if (indexOfDay !== -1) {
        //         // Add the new value to the saatTime array
        //         newState[indexOfDay][key][0]['saatTime'].push(selectedTime);
        //         // Set the state with the modified copy
        //         setDaysToPrivate(newState);
        //     }
        // } else {
        //     console.log("zamanKontrolEdiniz")
        // }

    };






    return (

        <div className={`card ${className}`}>
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                <div className="container-xxl" id="kt_content_container">
                    <div className="d-flex flex-column gap-7 gap-lg-10">
                        <div className="d-flex flex-wrap flex-stack gap-5 gap-lg-10">
                            <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-lg-n2 me-auto">

                                <li className="nav-item" onClick={() => { setDisplayZaman(false); setDisplayCalendar(false) }} >
                                    <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_ecommerce_sales_order_calendar"> Takvimim </a>
                                </li>

                                <li className="nav-item" onClick={() => setDisplayZaman(true)}>
                                    <a className="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_ecommerce_sales_order_summary"> Zaman Koşullu </a>
                                </li>

                                <li className="nav-item" onClick={() => setDisplayZaman(false)} >
                                    <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_ecommerce_sales_order_history"> Özel Koşullu </a>
                                </li>

                                <li className="nav-item" onClick={() => setDisplayZaman(false)} >
                                    <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_ecommerce_sales_harici"> Harici Takim </a>
                                </li>


                            </ul>
                        </div>



                        <div className='tab-content' style={{ display: displayZaman ? 'block' : 'none' }}>
                            <div className='tab-pane fade show active' id="kt_ecommerce_sales_order_summary">
                                <div className="  gap-5 gap-lg-10  mb-4">
                                    <div>
                                        <h4 className=" fw-bold text-gray-800 text-xl font-normal mb-0">Zaman Koşullu Randevu Oluştur!</h4>
                                        <p className="fs-6 fw-semibold text-gray-600 pb-4 m-0">Muayene süreniz kesin bir zaman dilimini kapsıyorsa zaman koşullu randevu çizelgesi oluşturabilirsiniz.</p>
                                    </div>

                                </div>

                                <div className="mb-8">

                                    <div className='mb-4'>

                                        <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'>Randevu Günlerini Belirle</h2>

                                    </div>



                                    {/* new tagify here */}
                                    <div className='w-full'>
                                        <MetronicTagify
                                            value={tags}
                                            onChange={handleTagChange}
                                            suggestions={filteredZamanDays}
                                        />
                                    </div>
                                </div>


                                <div className='mb-8'>

                                    <div className='w-full mb-4'>
                                        <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'> Mesai Saatlerini Belirle  </h2>
                                    </div>

                                    <div className='mt-3 w-full row'>



                                        {datePickerElements.map((element, index) => (

                                            <React.Fragment key={element.id}>
                                                {(index < 2 || showLastTwo) && (
                                                    <div className="col-5">
                                                        <div className='form-text'>
                                                            {element.label}
                                                        </div>

                                                        <input
                                                            ref={(el) => (datePickerRefs.current[index] = el)}
                                                            className="form-control form-control-solid"
                                                            placeholder="Pick date &amp; time"
                                                            id={element.id}
                                                            value={element.value}
                                                            onChange={handleInputChange(index)}


                                                        />

                                                    </div>
                                                )}
                                                {index === 1 && (

                                                    <div className="col-12 mt-3 mb-3">
                                                        {/* Add any content or styling to this div as needed */}
                                                        <div className="form-check form-check-custom form-check-solid w-full">
                                                            <input className="form-check-input" type="checkbox" value="" id="same_as_billing"
                                                                checked={showLastTwo} onClick={handleClick} />
                                                            <label className="form-check-label" >Mola</label>

                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}

                                    </div>
                                </div>




                                <div className='row mb-8'>

                                    <div className='col-xl-5'>

                                        <div className='w-full mb-4'>

                                            <h2 className='fs-6 fw-semibold form-label mb-2 ms-1' > Kısa Mola Süresini Belirle  </h2>

                                        </div>

                                        <div className='mt-3'>



                                            <DropdownWithoutSearch options={KMolaSure} updateData={handleKmola} />


                                        </div>

                                    </div>

                                    <div className='col-xl-5'>

                                        <div className='w-full mb-4'>

                                            <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'> Randevu Süresini Belirle  </h2>

                                        </div>

                                        <div className='mt-3'>

                                            <DropdownWithoutSearch options={RdevSure} updateData={handleRdevSure} />


                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>




                        <div className='tab-content' >

                            <div className="tab-pane fade" id="kt_ecommerce_sales_order_history" >

                                <div className=" gap-5 gap-lg-10 mb-4" >
                                    <div>
                                        <h4 className=" fw-bold text-gray-800 text-xl font-normal mb-0">Özel Koşullu Randevu Oluştur!</h4>
                                        <p className="fs-6 fw-semibold text-gray-600 pb-4 m-0">

                                            Randevu günlerinizi seçebilir ve seçtiğiniz günler için istediğiniz randevu saatlerini tek tek belirtebilirsiniz.
                                        </p>
                                    </div>
                                </div>



                                <div className="mb-8">
                                    <div className='mb-4'>
                                        <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'>Randevu Günlerini Belirle</h2>
                                    </div>


                                    <div className='w-full'>

                                        <MetronicTagifyPrivate
                                            value={tagsPrivate}
                                            onChange={handleTagChangePrivate}
                                            suggestions={filteredSuggestions}
                                        />


                                    </div>

                                </div>


                                <div className='row mb-8'>

                                    <div className='col-xl-5'>


                                        <div className='w-full mb-4'>

                                            <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'> Kısa Mola Süresini Belirle  </h2>

                                        </div>

                                        <div className='mt-3'>

                                            <DropdownWithoutSearch options={KMolaSure} updateData={handleKmola} />
                                        </div>

                                    </div>

                                    <div className='col-xl-5'>



                                        <div className='w-full mb-4'>

                                            <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'> Randevu Süresini Belirle  </h2>

                                        </div>

                                        <div className='mt-3'>

                                            <DropdownWithoutSearch options={RdevSure} updateData={handleRdevSure} />


                                        </div>
                                    </div>
                                </div>


                                {
                                    daysToPrivate.length > 0 && (


                                        daysToPrivate.map((v: any, i: any) => {

                                            return Object.keys(v).map((key: any) => {

                                                console.log("bUNNEEF", v, "koop", key)

                                                return (
                                                    <div className='row mb-8 flex  mt-36' >

                                                        <hr />

                                                        <div className='w-full mb-4 mt-5'>

                                                            <h4 className=" fw-bold text-gray-800 text-xl font-normal mb-0"> {key}</h4>

                                                            <p className='fs-6 fw-semibold form-label mb-2 ms-1'>

                                                                {key} günleri için alınabilecek randevu saatlerini giriniz.

                                                            </p>
                                                        </div>

                                                        {/* choose times to be send */}

                                                        <div className=''>

                                                            {v[key].map((tag: any, index: any) => (

                                                                tag.saatTime.map((e: any, p: any) => (

                                                                    < div key={p} className="form-control form-control-solid tag " onClick={() => { deleteTag(index, e, key) }}>
                                                                        {e}
                                                                        < button >
                                                                            &nbsp;&nbsp;
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        </button>
                                                                    </div>
                                                                )
                                                                )
                                                            )
                                                            )
                                                            }
                                                        </div>





                                                        <div className='w-full flex mt-5'>
                                                            <div className="col-5">
                                                                <FlatpickrInput value={selectedTime} onChange={handleTimeChange} />
                                                            </div>
                                                            &nbsp;&nbsp; &nbsp;
                                                            <div className=''>
                                                                <div className="form-group " onClick={() => addTimeforPrivateSettings(v, i, key)}>
                                                                    <button type="button" className="btn  btn-light-primary flex">
                                                                        <i className="ki-duotone ki-plus fs-2"></i>
                                                                        Ekle </button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                )

                                            });





                                        }).flat()


                                    )
                                }




                            </div>

                        </div>


                        <div className='tab-content'>

                            <div className="tab-pane fade" id="kt_ecommerce_sales_order_calendar" >

                                <CalendarComponent />

                            </div>
                        </div>


                        {/* haricic takvim part */}
                        <div className='tab-content'  >

                            <div className="tab-pane fade" id="kt_ecommerce_sales_harici" >

                                <div className=" gap-5 gap-lg-10 mb-4" >
                                    <div>
                                        <h4 className=" fw-bold text-gray-800 text-xl font-normal mb-0">Özel Koşullu Randevu Oluştur!</h4>
                                        <p className="fs-6 fw-semibold text-gray-600 pb-4 m-0">

                                            Randevu günlerinizi seçebilir ve seçtiğiniz günler için istediğiniz randevu saatlerini tek tek belirtebilirsiniz.
                                        </p>
                                    </div>
                                </div>



                                <div className="mb-8">
                                    <div className='mb-4'>
                                        <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'>Randevu Günlerini Belirle</h2>
                                    </div>


                                    <div className='w-full'>

                                        <MetronicTagifyPrivate
                                            value={tagsPrivate}
                                            onChange={handleTagChangePrivate}
                                            suggestions={filteredSuggestions}
                                        />


                                    </div>

                                </div>


                                <div className='row mb-8'>

                                    <div className='col-xl-5'>


                                        <div className='w-full mb-4'>

                                            <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'> Kısa Mola Süresini Belirle  </h2>

                                        </div>

                                        <div className='mt-3'>

                                            <DropdownWithoutSearch options={KMolaSure} updateData={handleKmola} />
                                        </div>

                                    </div>

                                    <div className='col-xl-5'>



                                        <div className='w-full mb-4'>

                                            <h2 className='fs-6 fw-semibold form-label mb-2 ms-1'> Randevu Süresini Belirle  </h2>

                                        </div>

                                        <div className='mt-3'>

                                            <DropdownWithoutSearch options={RdevSure} updateData={handleRdevSure} />


                                        </div>
                                    </div>
                                </div>


                                {
                                    daysToPrivate.length > 0 && (


                                        daysToPrivate.map((v: any, i: any) => {

                                            return Object.keys(v).map((key: any) => {

                                                console.log("bUNNEEF", v, "koop", key)

                                                return (
                                                    <div className='row mb-8 flex  mt-36' >

                                                        <hr />

                                                        <div className='w-full mb-4 mt-5'>

                                                            <h4 className=" fw-bold text-gray-800 text-xl font-normal mb-0"> {key}</h4>

                                                            <p className='fs-6 fw-semibold form-label mb-2 ms-1'>

                                                                {key} günleri için alınabilecek randevu saatlerini giriniz.

                                                            </p>
                                                        </div>

                                                        {/* choose times to be send */}

                                                        <div className=''>

                                                            {v[key].map((tag: any, index: any) => (

                                                                tag.saatTime.map((e: any, p: any) => (

                                                                    < div key={p} className="form-control form-control-solid tag " onClick={() => { deleteTag(index, e, key) }}>
                                                                        {e}
                                                                        < button >
                                                                            &nbsp;&nbsp;
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        </button>
                                                                    </div>
                                                                )
                                                                )
                                                            )
                                                            )
                                                            }
                                                        </div>





                                                        <div className='w-full flex mt-5'>
                                                            <div className="col-5">
                                                                <FlatpickrInput value={selectedTime} onChange={handleTimeChange} />
                                                            </div>
                                                            &nbsp;&nbsp; &nbsp;
                                                            <div className=''>
                                                                <div className="form-group " onClick={() => addTimeforPrivateSettings(v, i, key)}>
                                                                    <button type="button" className="btn  btn-light-primary flex">
                                                                        <i className="ki-duotone ki-plus fs-2"></i>
                                                                        Ekle </button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                )

                                            });





                                        }).flat()


                                    )
                                }




                            </div>





                        </div>






                        <div className="card-footer d-flex justify-content-end py-6 px-9">
                            {/* <button type="reset" className="btn btn-light btn-active-light-primary me-2" >İptal</button> */}
                            <button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">Kaydet</button>
                        </div>


                    </div>
                </div>
            </div >



        </div >
    )

}

export { FeedsWidget8 }
