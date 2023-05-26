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

//import CustomInput from './CustomInput'
//import Tagify from '@yaireo/tagify';
import MetronicTagify from './TagifyInput'
import MetronicTagifyPrivate from "./TagifyOzelData";
import DropdownWithoutSearch from './DropdownWithoutSearch'





import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import 'moment/locale/tr';








type Propss = {
    className: string

}

type User = {
    value: string;
    name: string;
    avatar: string;
    email: string;
};


const suggestions = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
];



type NormType = { value: string };


type NormElement = {
    value: any;
};



const FeedsWidget8: React.FC<Propss> = ({ className }) => {







    // days Check control for input
    const [firstSugestion, setfirstSugestion] = useState(['Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Cumartesi',
        'Pazar',]);





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

    useEffect(() => {
        console.log("whatgy", datePickerElements)
    }, [datePickerElements])



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



    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);


    useEffect(() => {
        console.log("ekolko", filteredSuggestions)
    }, [filteredSuggestions])




    // new Tagify to be use
    const [tags, setTags] = useState([]);
    const [tagsPrivate, settagsPrivate] = useState([]);
    const [newSugestion, setNewSugestion] = useState([])

    const [objectArrayyy, setObjectArrayyy] = useState([]);

    useEffect(() => {
        console.log("wess", objectArrayyy)
    }, [objectArrayyy])


    useEffect(() => {

        // Parse norm array with error checking

        try {
            let parsedArray = JSON.parse(tags[0]);
            setObjectArrayyy(parsedArray);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }

    }, [tags])




    useEffect(() => {

        console.log("privateData", tagsPrivate)

    }, [tagsPrivate])



    // Define an array of suggestions for the dropdown

    const handleTagChange = (newTags: any) => {
        console.log("hoyy", newTags)
        setTags(newTags);
    };


    //private Tagify to set 
    const handleTagChangePrivate = (newTags: any) => {
        settagsPrivate(newTags);

    };

    const handleTagsToOzel = () => {

        console.log("taggs", objectArrayyy)
        let objectArray = objectArrayyy.flatMap(item => JSON.parse(item));
        console.log("weelbeen", objectArray)

        const normValues: string[] = objectArray.map((normElem) => normElem.value);
        const newSuggestions = suggestions.filter(
            (suggestion) => !normValues.includes(suggestion)
        );

        setFilteredSuggestions(newSuggestions);

    }



    ///options to choose
    const options = ["Option 1", "Option 2", "Option 3"]; // example options
    const KMolaSure = ["5", "10", "15", "20", "25", "30"]
    const RdevSure = ["10", "15", "20", "25", "30", "35", "40", "50", "60", "90", "120"]

    //date update from child data
    const [kMolaUpdate, setKMolaUpdate] = useState("no update");
    const [RdevSureUpdate, setRdevSureUpdate] = useState("no update yet");

    useEffect(() => {
        
        console.log("kisaMola",kMolaUpdate )

    }, [kMolaUpdate])
    


    const handleKmola = (dataFromChild: any) => {

        setKMolaUpdate(dataFromChild);

    }

    const handleRdevSure = (dataFromChild: any) => {

        setRdevSureUpdate(dataFromChild);

    }





    return (

        <div className={`card ${className}`}>

            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                <div className="container-xxl" id="kt_content_container">
                    <div className="d-flex flex-column gap-7 gap-lg-10">
                        <div className="d-flex flex-wrap flex-stack gap-5 gap-lg-10">
                            <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-lg-n2 me-auto">
                                <li className="nav-item" onClick={() => { console.log("dataWeZaman::", tags) }}>
                                    <a className="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_ecommerce_sales_order_summary"> Zaman Koşullu </a>
                                </li>
                                <li className="nav-item" onClick={() => { handleTagsToOzel() }}>

                                    <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_ecommerce_sales_order_history"> Özel Koşullu </a>
                                </li>
                            </ul>


                        </div>

                        <div className='tab-content'>

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
                                            suggestions={secondSugestion}

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
                                                            <input className="form-check-input" type="checkbox" value="" id="same_as_billing" checked={showLastTwo} onClick={handleClick} />
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




                        <div className='tab-content'>

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

                                        {/* <MetronicTagify
                                            value={tags}
                                            onChange={handleTagChangePrivate}
                                            suggestions={filteredSuggestions}

                                        /> */}
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

                            </div>
                        </div>



                        <div className="card-footer d-flex justify-content-end py-6 px-9">
                            {/* <button type="reset" className="btn btn-light btn-active-light-primary me-2" >İptal</button> */}
                            <button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">Kaydet</button>
                        </div>


                    </div>
                </div>
            </div>



        </div>
    )

}

export { FeedsWidget8 }
