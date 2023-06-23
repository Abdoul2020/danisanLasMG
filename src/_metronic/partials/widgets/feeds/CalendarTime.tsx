import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Switch from 'react-switch';
import CalendarOnline from './CalendarSearch/CalendarOnline';
import CalendarOffline from './CalendarSearch/CalendarOffline';


function CalendarComponent() {
    const [value, setValue] = useState(new Date());
    const [checked, setChecked] = useState(false);

    const formatter = new Intl.DateTimeFormat('tr-TR', { weekday: 'short', month: 'long', day: '2-digit' });
    const [online, setOnline] = useState(true);
    const [calendarLoading, setCalenderLoading] = useState(false);

    return (
        <div>
            <div className="sticky top-0 bottom-10 col-span-2  h-[650px] w-full flex-col items-start justify-start gap-4 lg:flex">
                <h1 className="text-lg font-bold text-color-main opacity-0 hidden ">
                    Empty
                </h1>
                <div className="w-full flex-col items-start justify-start gap-4 overflow-hidden rounded-[15px] bg-color-white p-5">
                    <div className="flex flex-col items-start justify-start gap-5 pb-5">
                        <div className="w-full rounded-[30px] bg-color-third p-2" style={{
                            background:"#24767d",
                            color:"#FFFF",

                        }}>
                            <div className="relative grid grid-cols-2 py-2">
                                <div
                                    className="flex cursor-pointer items-center justify-center py-4"
                                    onClick={() => setOnline(true)}
                                >
                                    <h1 className="z-50 text-xs font-bold text-color-white " style={{color:"#FFFF",
                                    fontSize: ".75rem",
                                    lineHeight: "1rem",
                                }}>
                                        Online Görüşme
                                    </h1>
                                </div>
                                <div
                                    className="flex cursor-pointer items-center justify-center py-4"
                                    onClick={() => setOnline(false)}
                                >
                                    <h1 className="z-50 text-xs font-bold text-color-white" style={{color:"#FFFF",
                                     fontSize: ".75rem",
                                     lineHeight: "1rem",
                                }}>
                                        Yüz Yüze Görüşme
                                    </h1>
                                </div>
                                <div
                                    className={`transition-all duration-500 ${online ? "translate-x-0" : "translate-x-full"
                                        } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-main`}
                                        style={{
                                            backgroundColor:"#33a9b3"
                                        }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            {online ? (
                                <div className="flex w-full items-center justify-start gap-5">
                                    <img
                                        src={require("https://static.vecteezy.com/system/resources/previews/010/160/988/original/calendar-icon-sign-symbol-design-free-png.png")}
                                        alt=""
                                        className="w-[64px]"
                                    />
                                    <div className="flex flex-col items-start justify-start">
                                        <h1 className="text-lg font-bold text-color-dark-primary" >
                                            Online Görüşme
                                        </h1>
                                        <p className="text-color-dark-primary text-opacity-50">
                                            Evinden ayrılmadan uzmanına ulaş, görüntülü görüşerek
                                            muayene ol.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex w-full items-center justify-start gap-5">
                                    <img
                                        src={require("https://static.vecteezy.com/system/resources/previews/010/160/988/original/calendar-icon-sign-symbol-design-free-png.png")}
                                        alt=""
                                        className="w-[64px]"
                                    />
                                    <div className="flex flex-col items-start justify-start">
                                        <h1 className="text-lg font-bold text-color-dark-primary">
                                            Yüz Yüze Görüşme
                                        </h1>
                                        <p className="text-color-dark-primary text-opacity-50">
                                            Yüz yüze görüşerek muayene ol.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex min-h-[350px] w-full items-center justify-center border-t-2 border-solid border-color-dark-primary border-opacity-10 py-5">
                        {calendarLoading ? (
                            <div className="animate-spin">
                                {/* <BiLoaderAlt className="text-[48px] text-color-main text-opacity-80" /> */}
                                <div>

                                    ekol Part for


                                </div>
                            </div>
                        ) : (
                            <div className="h-full w-full items-start justify-start">
                                {online ? (
                                    //   <CalendarOnline expert={expert} />
                                    <div>
                                       <CalendarOnline/>
                                    </div>
                                ) : (
                                    <div>
                                       <CalendarOffline/>
                                    </div>
                                    //   <CalendarLocation expert={expert} />


                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>




        </div>
    );
}

export default CalendarComponent;
