import React, { useState, useRef, useEffect } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

import { canvasPreview } from './imageCrop/canvasPreview'
import { useDebounceEffect } from './imageCrop/useDebounceEffect'
import $ from 'jquery';
import Swal from 'sweetalert2';



function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}


type Props = {
    e: any,
    onReceiveData: any,
    handleDataToImage: any

}


const MetronicModal: React.FC<Props> = ({ e, onReceiveData, handleDataToImage }) => {

    console.log("dataE", e,"okkwell", onReceiveData, "welltap", handleDataToImage  )


    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
    const blobUrlRef = useRef('')
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState<number | undefined>(9 / 9)


    useEffect(() => {

        if (e !== "") {
            onSelectFile(e)
        }

    }, [e])




    function onSelectFile(e: any) {


        console.log("comingher", e)

        if (e.target.files && e.target.files.length > 0) {

            setCrop(undefined) // Makes crop preview update between images.

            const reader = new FileReader()

            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])

        }



    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    useEffect(() => {

        console.log("cahangeDataFf",croppedImageUrl )
        handleDataToImage(croppedImageUrl);

    }, [croppedImageUrl])



    
	const modalDismissRef: any = useRef();

    function onDownloadCropClick() {

        

       


        if (!previewCanvasRef.current) {

            throw new Error('Crop canvas does not exist')

        }else{

            previewCanvasRef.current.toBlob((blob) => {

                if (!blob) {
                    throw new Error('Failed to create blob')
                }
    
                if (blobUrlRef.current) {
                    URL.revokeObjectURL(blobUrlRef.current)
                }
    
                blobUrlRef.current = URL.createObjectURL(blob)


                // Show success message
				Swal.fire({
					text: "Profil başarıyla eklendi!",
					icon: "success",
					buttonsStyling: false,
					confirmButtonText: "Tamam",
					customClass: {
						confirmButton: "btn btn-primary"
					}
				}).then((result) => {
                    
					if (result.isConfirmed) {
                        console.log("weeu",blobUrlRef.current)
                        setCroppedImageUrl(blobUrlRef.current);
                        modalDismissRef.current.click();
					}
				});
    
                 //hiddenAnchorRef.current!.href = blobUrlRef.current
                // hiddenAnchorRef.current!.click()
            })
    
        }


    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined)
        } else if (imgRef.current) {
            const { width, height } = imgRef.current
            setAspect(16 / 9)
            setCrop(centerAspectCrop(width, height, 16 / 9))

        }
    }



// set The data to false
    const handleDismiss = () => {
        onReceiveData(false);
    };


    useEffect(() => {
        // Get the element with the 'data-bs-dismiss' attribute
        const dismissElement = document.querySelector('[data-bs-dismiss="modal"]');


        if (dismissElement) {
            console.log("realData")
            // Add an event listener for the click event
            dismissElement.addEventListener('click', handleDismiss);
            // Clean up the event listener when the component unmounts
            return () => {
                dismissElement.removeEventListener('click', handleDismiss);
            };
        }

    }, []);

    // modal control set
    const modalRef = useRef(null);
    useEffect(() => {

        if(modalRef.current){

            const modal = $(modalRef.current);
    
            const handleModalClose = () => {
              // pass the data to the parent component
              onReceiveData(false)
            };
        
            modal.on('hidden.bs.modal', handleModalClose);
        
            // Clean up the event listener on component unmount
            return () => {
              modal.off('hidden.bs.modal', handleModalClose);
            };
        }

      }, []); 
    




    return (

        <div className="modal fade " id="kt_modal_users_search" aria-hidden="true" >

            <div className="modal-dialog modal-dialog-centered mw-650px">
                <div className="modal-content">
                    <div className="modal-header pb-0 border-0 justify-content-end">


                        <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal"  ref={modalDismissRef}  >
                            <i className="ki-duotone ki-cross fs-1">
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </i>
                        </div>


                    </div>

                    <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">


                        {/* <div>
                            <button onClick={handleToggleAspectClick}>
                                Tam Boyutlandır
                            </button>
                        </div> */}


                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                            className="my-react-crop"
                        >
                            <img
                                ref={imgRef}
                                alt="Profil"
                                src={imgSrc}
                                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                onLoad={onImageLoad}
                            />

                        </ReactCrop>



                        <div className='mt-3 mb-3' style={{display:"none"}}>
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: completedCrop && completedCrop.width,
                                    height: completedCrop && completedCrop.height,
                                }}
                            />
                        </div>

                        

                        <div>
                        <button type="submit" className="btn btn-primary float-center" onClick={()=>{onDownloadCropClick()}} > Değiştir </button>
                            <a
                                ref={hiddenAnchorRef}
                                download
                                style={{
                                    position: 'absolute',
                                    top: '-200vh',
                                    visibility: 'hidden',
                                }}
                            >
                              DON'T TOUCH
                            </a>
                        </div>
                    </div>

                </div>


            </div>







        </div>

    );
};

export default MetronicModal;
