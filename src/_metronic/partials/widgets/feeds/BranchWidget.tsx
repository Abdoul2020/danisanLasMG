/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
// react select title inside
import Select, { components, MultiValueGenericProps, MultiValueProps, OnChangeValue, Props, } from 'react-select'
import { SortableContainer, SortableContainerProps, SortableElement, SortEndHandler, SortableHandle, } from 'react-sortable-hoc';
import { ColourOption, colourOptions } from '../../../../service/util/data';

import MetronicTagify from './TagifyInput'







function arrayMove<T>(array: readonly T[], from: number, to: number) {

    const slicedArray = array.slice();

    slicedArray.splice(
        to < 0 ? array.length + to : to,
        0,
        slicedArray.splice(from, 1)[0]
    );
    return slicedArray;
}


const SortableMultiValue = SortableElement(
    (props: MultiValueProps<ColourOption>) => {



        const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        const innerProps = { ...props.innerProps, onMouseDown };
        return <components.MultiValue   {...props} innerProps={innerProps} />;
    }
);
const SortableMultiValueLabel = SortableHandle(
    (props: MultiValueGenericProps) => <components.MultiValueLabel {...props} />
);


const SortableSelect = SortableContainer(Select) as React.ComponentClass<
    Props<ColourOption, true> & SortableContainerProps

>;









type Propss = {
    className: string
}

const BranchWidget: React.FC<Propss> = ({ className }) => {


    //choose branch from heer
    const [selected, setSelected] = React.useState<readonly ColourOption[]>([
        colourOptions[4],
        colourOptions[5],
    ]);

    const onChange = (selectedOptions: OnChangeValue<ColourOption, true>) =>
        setSelected(selectedOptions);

    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
        console.log(
            'Values sorted:',
            newValue.map((i) => i.value)

        );
    };

    // add new brnach
    const [tags, setTags] = useState([]);

    // Define an array of suggestions for the dropdown
    const suggestions = [
        'Acil Tip',
        'Avukat',
        'Astrolog',
    ];

    const handleTagChange = (newTags: any) => {
        setTags(newTags);
    };





    return (
        <div className={`card ${className}`}>

            <div className="row g-5 g-xxl-8">

                <div className='col-xl-6'>

                    <div className="card-header" style={{borderBottom:"none"}}>
                        <div className="card-title required">
                            <h2> Branş</h2>
                        </div>
                    </div>

                    <div className='card-header' style={{borderBottom:"none"}}>
                        {/* <MetronicTagify
                            value={tags}
                            onChange={handleTagChange}
                            suggestions={suggestions}

                        /> */}
                        {/* <p>Selected tags: {tags.join(', ')}</p> */}
                        
                        <div className="text-muted fs-7">Branşınız seçiniz</div>
                    </div>
                </div>


                <div className='col-xl-6'>

                    <div className='row g-5 g-xxl-8'>

                        <div className='col-xl-6'>


                            <div className="card-header" style={{borderBottom:"none"}}>
                                <div className="card-title">
                                    <h2> Ünvan</h2>
                                </div>
                            </div>

                            <div className="card card-flush pt-0">
                                <div className="card-body pt-0">

                                    <select className="form-select mb-2 form-control form-control-lg form-control-solid" data-control="select2" data-hide-search="true" data-placeholder="Select an option" id="kt_ecommerce_add_category_store_template">
                                        <option></option>
                                        <option value="default" >Default template</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="office">Office stationary</option>
                                        <option value="fashion">Fashion</option>
                                    </select>
                                    <div className="text-muted fs-7"> Ünvanınız.</div>
                                </div>


                            </div>

                        </div>

                        <div className='col-xl-6'>


                            <div className="card card-flush pt-0">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>

                                            Uzmanlık
                                        </h2>
                                    </div>
                                </div>
                                <div className="card-body pt-0">

                                    <select className="form-select mb-2 form-control form-control-lg form-control-solid" data-control="select2" data-hide-search="true" data-placeholder="Select an option" id="kt_ecommerce_add_category_store_template">
                                        <option></option>
                                        <option value="default" >Default template</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="office">Office stationary</option>
                                        <option value="fashion">Fashion</option>
                                    </select>
                                    <div className="text-muted fs-7">Uzmanlık alanı seçiniz.</div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>


            </div>



            {/* konsole daccord */}


        </div>
    )
}

export { BranchWidget }
