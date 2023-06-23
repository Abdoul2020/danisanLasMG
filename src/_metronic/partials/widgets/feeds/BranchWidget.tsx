/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
// react select title inside
import Select, { components, MultiValueGenericProps, MultiValueProps, OnChangeValue, Props, } from 'react-select'
import { SortableContainer, SortableContainerProps, SortableElement, SortEndHandler, SortableHandle, } from 'react-sortable-hoc';
import { ColourOption, colourOptions } from '../../../../service/util/data';
import DropdownComponent from './DrodownComponent';
import DropdownWithoutSearch from './DropdownWithoutSearch';

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



    //optionsTOcHOOSE
    const options = ["Option 1", "Option 2", "Option 3"]; // example options
    const optionsUnvan= ["Electronics","Ekol","Yutube"]


    const [unvanUpdateChange, setUnvanUpdateChange]=useState("nochangeYet");
    const [uzmanUpdateChange, setUzmanUpdateChange]=useState("nochangeYet");



    const handleDataUnvan = (dataFromChild:any) => {
        setUnvanUpdateChange(dataFromChild);
    }
    const handleDataUzman = (dataFromChild:any) => {
        setUzmanUpdateChange(dataFromChild);
    }


    




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

                        <MetronicTagify
                            value={tags}
                            onChange={handleTagChange}
                            suggestions={suggestions}

                        />
                        
                        {/* <p>Selected tags: {tags.join(', ')}</p> */}

                        {/* <DropdownComponent options={options}/> */}
                        
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

                                <DropdownWithoutSearch options={optionsUnvan}  updateData={handleDataUnvan}/>


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

                                <DropdownWithoutSearch options={options}  updateData={handleDataUzman}/>
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
