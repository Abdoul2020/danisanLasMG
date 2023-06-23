import React,{useRef,useEffect} from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';




const AllCalendar = () => {

	const calendarRef = useRef(null);
	//second ref
	const formRef = useRef(null);

	useEffect(() => {
        if (!calendarRef.current) return;
        
        const todayDate = moment().startOf('day');
        const YM = todayDate.format('YYYY-MM');
        const YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
        const TODAY = todayDate.format('YYYY-MM-DD');
        const TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

        const calendar = new Calendar(calendarRef.current, {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            initialDate: TODAY,
            navLinks: true,
            selectable: true,
            selectMirror: true,
            select: function (arg:any) {
                // formatArgs(arg);
                // handleNewEvent();
            },
            eventClick: function (arg:any) {
                // formatArgs({
                //     id: arg.event.id,
                //     title: arg.event.title,
                //     description: arg.event.extendedProps.description,
                //     location: arg.event.extendedProps.location,
                //     startStr: arg.event.startStr,
                //     endStr: arg.event.endStr,
                //     allDay: arg.event.allDay
                // });
                // handleViewEvent();
            },
            editable: true,
            dayMaxEvents: true,
            events: [
                // define your events here
            ],
            datesSet: function(){
                // do some stuff
            }
        });

        calendar.render();

       

		//second ref form here n ot neccessary

		




		

		return () => {
            // When component unmounts, we want to destroy the calendar instance to avoid memory leaks.
            calendar.destroy();
        };





    }, []);



	//second function







	return (
		<div>

			{/* top bar form there */}

			<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
				<div className="container-xxl" id="kt_content_container">
					<div className="card">
						<div className="card-header">
							<h2 className="card-title fw-bold">Calendar</h2>
							<div className="card-toolbar hidden">
								<button className="btn btn-flex btn-primary" data-kt-calendar="add">
									<i className="ki-duotone ki-plus fs-2"></i>Add Event</button>

							</div>
						</div>

						<div className="card-body">
							<div id="kt_calendar_app"  ref={calendarRef}></div>
						</div>
					</div>



					<div className="modal fade" id="kt_modal_add_event" tabIndex={-1} aria-hidden="true">
						<div className="modal-dialog modal-dialog-centered mw-650px">
							<div className="modal-content">
								<form className="form" action="#" id="kt_modal_add_event_form">
									<div className="modal-header">
										<h2 className="fw-bold" data-kt-calendar="title">Add Event</h2>

										<div className="btn btn-icon btn-sm btn-active-icon-primary" id="kt_modal_add_event_close">
											<i className="ki-duotone ki-cross fs-1">
												<span className="path1"></span>
												<span className="path2"></span>
											</i>
										</div>
									</div>

									<div className="modal-body py-10 px-lg-17">
										<div className="fv-row mb-9">
											<label className="fs-6 fw-semibold required mb-2">Event Name</label>

											<input type="text" className="form-control form-control-solid" placeholder="" name="calendar_event_name" />
										</div>

										<div className="fv-row mb-9">
											<label className="fs-6 fw-semibold mb-2">Event Description</label>

											<input type="text" className="form-control form-control-solid" placeholder="" name="calendar_event_description" />
										</div>

										<div className="fv-row mb-9">
											<label className="fs-6 fw-semibold mb-2">Event Location</label>

											<input type="text" className="form-control form-control-solid" placeholder="" name="calendar_event_location" />
										</div>

										<div className="fv-row mb-9">
											<label className="form-check form-check-custom form-check-solid">
												<input className="form-check-input" type="checkbox" value="" id="kt_calendar_datepicker_allday" />
												<span className="form-check-label fw-semibold" >All Day</span>
											</label>
										</div>

										<div className="row row-cols-lg-2 g-10">
											<div className="col">
												<div className="fv-row mb-9">
													<label className="fs-6 fw-semibold mb-2 required">Event Start Date</label>

													<input className="form-control form-control-solid" name="calendar_event_start_date" placeholder="Pick a start date" id="kt_calendar_datepicker_start_date" />
												</div>
											</div>
											<div className="col" data-kt-calendar="datepicker">
												<div className="fv-row mb-9">
													<label className="fs-6 fw-semibold mb-2">Event Start Time</label>

													<input className="form-control form-control-solid" name="calendar_event_start_time" placeholder="Pick a start time" id="kt_calendar_datepicker_start_time" />
												</div>
											</div>
										</div>

										<div className="row row-cols-lg-2 g-10">
											<div className="col">
												<div className="fv-row mb-9">
													<label className="fs-6 fw-semibold mb-2 required">Event End Date</label>

													<input className="form-control form-control-solid" name="calendar_event_end_date" placeholder="Pick a end date" id="kt_calendar_datepicker_end_date" />
												</div>
											</div>
											<div className="col" data-kt-calendar="datepicker">
												<div className="fv-row mb-9">
													<label className="fs-6 fw-semibold mb-2">Event End Time</label>

													<input className="form-control form-control-solid" name="calendar_event_end_time" placeholder="Pick a end time" id="kt_calendar_datepicker_end_time" />
												</div>
											</div>
										</div>
									</div>

									<div className="modal-footer flex-center">
										<button type="reset" id="kt_modal_add_event_cancel" className="btn btn-light me-3">Cancel</button>

										<button type="button" id="kt_modal_add_event_submit" className="btn btn-primary">
											<span className="indicator-label">Submit</span>
											<span className="indicator-progress">Please wait...
												<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>



					<div className="modal fade" id="kt_modal_view_event" tabIndex={-1} aria-hidden="true">
						<div className="modal-dialog modal-dialog-centered mw-650px">
							<div className="modal-content">
								<div className="modal-header border-0 justify-content-end">
									<div className="btn btn-icon btn-sm btn-color-gray-400 btn-active-icon-primary me-2" data-bs-toggle="tooltip" data-bs-dismiss="click" title="Edit Event" id="kt_modal_view_event_edit">
										<i className="ki-duotone ki-pencil fs-2">
											<span className="path1"></span>
											<span className="path2"></span>
										</i>
									</div>

									<div className="btn btn-icon btn-sm btn-color-gray-400 btn-active-icon-danger me-2" data-bs-toggle="tooltip" data-bs-dismiss="click" title="Delete Event" id="kt_modal_view_event_delete">
										<i className="ki-duotone ki-trash fs-2">
											<span className="path1"></span>
											<span className="path2"></span>
											<span className="path3"></span>
											<span className="path4"></span>
											<span className="path5"></span>
										</i>
									</div>

									<div className="btn btn-icon btn-sm btn-color-gray-500 btn-active-icon-primary" data-bs-toggle="tooltip" title="Hide Event" data-bs-dismiss="modal">
										<i className="ki-duotone ki-cross fs-2x">
											<span className="path1"></span>
											<span className="path2"></span>
										</i>
									</div>
								</div>

								<div className="modal-body pt-0 pb-20 px-lg-17">
									<div className="d-flex">
										<i className="ki-duotone ki-calendar-8 fs-1 text-muted me-5">
											<span className="path1"></span>
											<span className="path2"></span>
											<span className="path3"></span>
											<span className="path4"></span>
											<span className="path5"></span>
											<span className="path6"></span>
										</i>
										<div className="mb-9">
											<div className="d-flex align-items-center mb-2">
												<span className="fs-3 fw-bold me-3" data-kt-calendar="event_name"></span>
												<span className="badge badge-light-success" data-kt-calendar="all_day"></span>
											</div>

											<div className="fs-6" data-kt-calendar="event_description"></div>
										</div>
									</div>

									<div className="d-flex align-items-center mb-2">
										<span className="bullet bullet-dot h-10px w-10px bg-success ms-2 me-7"></span>
										<div className="fs-6">
											<span className="fw-bold">Starts</span>
											<span data-kt-calendar="event_start_date"></span>
										</div>
									</div>

									<div className="d-flex align-items-center mb-9">
										<span className="bullet bullet-dot h-10px w-10px bg-danger ms-2 me-7"></span>
										<div className="fs-6">
											<span className="fw-bold">Ends</span>
											<span data-kt-calendar="event_end_date"></span>
										</div>
									</div>

									<div className="d-flex align-items-center">
										<i className="ki-duotone ki-geolocation fs-1 text-muted me-5">
											<span className="path1"></span>
											<span className="path2"></span>
										</i>
										<div className="fs-6" data-kt-calendar="event_location"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
	)
}

export default AllCalendar