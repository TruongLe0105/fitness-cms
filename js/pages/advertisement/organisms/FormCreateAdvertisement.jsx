import BackdropCustomize from 'components/BackdropCustomize';
import IconAddVideo from 'assets/images/icons/play-circle.svg';
import ButtonDefault from 'components/Button/ButtonDefault';
import DialogCard from 'components/Dialog/DialogCard';
import { useBoolean, useString } from 'helpers/hooks';
import { CreateAdvertisementMiddleware } from '../services/api';
import '../styles/index.css';
import { useState } from 'react';
import { defaultEmptyAdvertisementDetail } from '../types';
import { defaultAddAdvertisementInput, } from '../types';
import '../styles/index.css';
import ReactPlayer from 'react-player';
import { showNotification } from 'helpers/util';
import InputDefault from 'components/Input/InputDefault';
const VIDEO_DEFAULT = 'https://dataweb.hocthemtienganh.com/school/022021/1612865332_default-video-thumbnail.jpg';
export const FormCreateAdvertisement = ({ openForm, onClose, onRefetch, }) => {
    const [advertisementDetail, setAdvertisementDetail] = useState(defaultEmptyAdvertisementDetail);
    const isLoading = useBoolean();
    const keyInputFile = useString();
    const [urlVideo, setUrlVideo] = useState(null);
    const fileSelectedHandler = (event) => {
        const fileSize = event.target.files[0].size / 1024 / 1024;
        const currentFiles = [];
        const [file] = event.target.files;
        setUrlVideo(URL.createObjectURL(file));
        currentFiles.push(file);
        keyInputFile.setValue(Math.random().toString(36));
        isLoading.setValue(true);
        if (fileSize < 10) {
            setAdvertisementDetail({
                ...advertisementDetail,
                link: currentFiles[0],
            });
        }
        else {
            showNotification('error', 'Exceed limit 10MB ');
        }
        isLoading.setValue(false);
    };
    const inputStyle = {
        border: '1px solid #e5e5e5',
        backgroundColor: 'rgba(0,0,0,0.01)',
        borderRadius: '4px',
        padding: '0px 10px',
        marginTop: 5,
    };
    const handleChangeInput = (fieldName, subField, splitValue = false) => (e) => {
        const { value } = e.target;
        if (!subField) {
            setAdvertisementDetail({
                ...advertisementDetail,
                [fieldName]: splitValue ? value.split(',') : value,
            });
        }
        else {
            setAdvertisementDetail({
                ...advertisementDetail,
                [fieldName]: {
                    ...advertisementDetail[fieldName],
                    [subField]: splitValue ? value.split(',') : value,
                },
            });
        }
    };
    const onCreateButton = () => {
        isLoading.setValue(true);
        const { link, name } = advertisementDetail;
        const request = {
            link: link,
            name: name,
        };
        const onSuccess = () => {
            isLoading.setValue(false);
            setAdvertisementDetail(defaultAddAdvertisementInput);
            onClose();
            onRefetch?.();
        };
        CreateAdvertisementMiddleware(request, onSuccess);
    };
    return (<DialogCard openPopup={openForm} disablePopup handleCLoseDialog={onClose} title='Add advertisement' size='md' rootStyle={{
            width: '50%',
            height: '50%',
            overflow: 'auto',
        }}>
      <div className='flex flex-col flex-1'>
        <div className='grid grid-cols-2 gap-5'>
          <InputDefault label='Name video' required value={advertisementDetail.name} onChange={handleChangeInput('name')} placeholder='name...' inputStyle={inputStyle}/>
          <div className='mt-6 mb-20 ml-auto inline-block'>
            <div className='relative inline-block'>
              {urlVideo === null ? (<img src={VIDEO_DEFAULT} style={{
                width: '350px',
                height: '200px',
                borderRadius: 5,
                marginLeft: 'auto',
            }}/>) : (<ReactPlayer url={urlVideo} width='350px' height='200px' controls={true}/>)}
              <div className='bg-blue-custom absolute bottom-1 right-1 rounded px-1 py-0.5'>
                <input id='container-files' onChange={fileSelectedHandler} type='file' accept={'video/*'} style={{ display: 'none' }} key={keyInputFile.value || ''}/>
                <label htmlFor='container-files'>
                  <div className='flex cursor-pointer'>
                    <img src={IconAddVideo} alt='icon add video'/>
                    <span style={{
            fontSize: '18px',
            marginLeft: '5px',
        }}>
                      Add Video
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-1 mt-auto'>
          <ButtonDefault widthButton='w-140-custom' onClick={onCreateButton} disabled={!urlVideo || !advertisementDetail.name} style={{
            minHeight: 37,
            marginTop: 'auto',
        }}>
            Create
          </ButtonDefault>
        </div>
      </div>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
