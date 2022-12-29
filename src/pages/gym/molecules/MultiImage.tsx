import React, { useEffect, useState } from 'react'
import ImageUploading from 'react-images-uploading';
import { ReactComponent as IconDestroy } from "assets/images/icons/destroy.svg";
import { ReactComponent as IconImage } from "assets/images/icons/image.svg";
import IconAddAvatar from "assets/images/icons/add-avatar.svg";
import Typography from 'components/Typography';
import { uploadImageMiddleware } from '../services/api';
import { useBoolean, useString } from 'helpers/hooks';

function MultiImage({ required, setFormInput, formInput, currentImages }: any) {
    const [images, setImages] = useState<any>(currentImages ? formInput.images : []);
    const [uploadImgs, setUploadImgs] = useState<any>([]);

    const maxNumber = 69;//maximum image upload

    useEffect(() => {
        console.log("render");

    }, [images.length]);

    const onChange = (imageList: any) => {
        setImages(imageList);
        const formData = new FormData();
        imageList.map((image: any) => {
            if (typeof image === 'string') {
                setFormInput({
                    ...formInput,
                    images: imageList
                });
            } else {
                formData.append("image", image.file);

                uploadImageMiddleware(formData).then((response: any) => {
                    setUploadImgs([...uploadImgs, ...response.data.data]);
                    setFormInput({
                        ...formInput,
                        images: [...formInput.images, ...response.data.data]
                    });
                    setImages([...formInput.images, ...response.data.data])
                })
            }
        })
    }

    return (
        <div className="images-container">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper">
                        <Typography
                            fontWeight='font-semibold'
                            textColor='text-gray-custom'
                            textClass='text-xs'
                        // style={labelStyle}
                        >
                            Images
                            {required && <span className='text-red-500'> (*)</span>}
                        </Typography>
                        <div className="wrapper-image">
                            {imageList.map((image: any, index) => (
                                <div key={index} className="image-item bg-gray-04-custom">
                                    {/* {images && <img src={image} alt="" className="images " />} */}
                                    <img src={image['data_url'] || image} alt="" className="images " />
                                    <div
                                        // onClick={() => handleRemoveImage(onImageRemove, index, image)}
                                        onClick={() => {
                                            onImageRemove(index)
                                        }}
                                        className="w-8 h-8 rounded-full absolute cursor-pointer flex items-center justify-center destroy-icon"
                                        style={{
                                            background: "rgba(29, 29, 29, 0.6)",
                                        }}
                                    >
                                        <IconDestroy className="w-4	h-4 destroy-image" />
                                    </div>
                                    {/* <img
                                        onClick={() => onImageUpdate(index)}
                                        src={IconAddAvatar}
                                        alt="icon"
                                        className="absolute bottom-2 right-2 cursor-pointer"
                                    /> */}
                                </div>
                            ))}
                            <IconImage className="w-8 h-8 cursor-pointer" style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps} />
                        </div>
                    </div>
                )
                }
            </ImageUploading >
        </div >
    );
}

export default MultiImage;