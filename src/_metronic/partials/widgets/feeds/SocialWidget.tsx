/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, MouseEventHandler } from 'react'
import SocialList from "./SocialAllList"
import { SocialIcon } from 'react-social-icons';



type Propss = {
    className: string
}



const SocialWidget: React.FC<Propss> = ({ className }) => {


    const options = [
        "Twitter",
        "Blogger",
        "WhatsApp",
        "TikTok",
        "Telegram",
        "Meetup",
        "Quora",
        "MySpace",
        "Gmail",
        "Skype",
        "Zoom",
        "WordPress",
        "StumbleUpon",
        "Messenger",
        "Zillow",
        "AngelList",
        "Last.fm",
        "Foursquare",
        "DeviantArt",
        "Houzz",
        "Behance",
        "Facebook",
        "Instagram",
        "YouTube",
        "Pinterest",
        "Snapchat",
        "Tumblr",
        "Reddit",
        "Vimeo",
        "Slack",
        "Dribbble",
        "Github",
        "SoundCloud",
        "Medium",
        "Twitch",
        "Flickr",
        "Yelp",
        "Spotify",
        "SlideShare",
        "VKontakte",
        "Xing",
        "Weibo",
        "TripAdvisor"
    ];

    //url value to change
    const [urlValue, setUrlValue] = useState<any>();

    // coming data from child component socialList
    const [childSociaList, setChildSociaList] = useState<any>(null);

    useEffect(() => {

        console.log("wellDay", childSociaList)
        setUrlValue(childSociaList && childSociaList.url);

    }, [childSociaList])


    const handleChildSociaList = (data: any) => {
        setChildSociaList(data);
    }

    //delete social Media
    // delete tags from there

    const handleRemoveSocial = (Social: any) => {
        setSocialMedia((oldArray: any) => oldArray?.filter((el: any) => el !== Social));
    };



    //   add social Media
    const [socialMedia, setSocialMedia] = useState<any>(["one", "two", "three"])

    const handleAddSocial = (data: any) => {

        let fullName = `${data}/${valueName}`

        setSocialMedia((oldArray: any) => [...oldArray, fullName]);
        setValueName("")

    }

    //handle value Input inside
    const [valueName, setValueName] = useState("")

    const handleAddSocialName = (event: any) => {
        console.log("valueNmae")
        setValueName(event.target.value);
    }






    return (
        <div className={`card ${className}`}>

            <div className="card mb-5 mb-xl-10">

                <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">

                    <div className="card-title m-0">
                        <h3 className="fw-bold m-0"> Sosyal Medya </h3>
                    </div>

                </div>
                <div id="kt_account_settings_profile_details">

                    <form id="kt_account_profile_details_form" className="form" >

                        <div className="card-body border-top p-9">

                            <div className='row'>

                                {

                                    socialMedia.map((v: any, i: any) => {

                                        let url = v
                                        let path = url.split("/").pop();

                                        if (url.includes('whatsapp.com')) {
                                            let phoneNumber = path; // replace this with the actual phone number
                                            
                                            url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
                                          }

                                        
                                      

                                        return (

                                            < div key={i} className="form-control form-control-solid tag " >
                                                <SocialIcon
                                                    style={{ height: 20, width: 20 }}
                                                    target='_blank'
                                                    url={url} />
                                                &nbsp;
                                                {/* {valueName} */}
                                                {path}

                                                &nbsp;
                                                < button onClick={(e) => { handleRemoveSocial(v); e.preventDefault() }}>
                                                    &nbsp;&nbsp;
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>

                                            </div>
                                        )

                                    })

                                }






                            </div>

                            <div className="row mb-6 my-9">

                                <div className="col-lg-5 fv-row">

                                    <SocialList options={options} handleData={handleChildSociaList} />


                                </div>

                                <div className="col-lg-5 fv-row" >
                                    <div className="input-group mb-5">

                                        <span className="input-group-text" id="basic-addon3">{urlValue}</span>
                                        <input type="text" className="form-control"
                                            id="basic-url" name="input_group_input"
                                            aria-describedby="basic-addon3"
                                            value={valueName}
                                            onChange={(e) => handleAddSocialName(e)} />
                                    </div>
                                </div>



                                {/* <div className="col-lg-5 fv-row">
                                    <input type="text" name="company" className="form-control form-control-lg form-control-solid" placeholder="Company name" value="instagram.com/abdul2020" />
                                </div> */}


                                <div className="col-lg-2">

                                    <button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit"
                                     onClick={(e) => { handleAddSocial(urlValue); e.preventDefault() }}>Ekle</button>
                                </div>


                            </div>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    )

}



export { SocialWidget }
