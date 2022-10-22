import Popup from 'reactjs-popup';
import Typography from 'components/Typography';
import IconClose from 'assets/images/icons/close.svg';
import { DialogCardProps } from './types';

const sizeStyle = {
  xs: { minWidth: '30%' },
  md: { minWidth: '50%' },
  xl: { minWidth: '80%' },
};

const DialogCard = (props: DialogCardProps): JSX.Element => {
  const {
    childrenAction,
    children,
    title,
    popupRef,
    handleCLoseDialog,
    openPopup,
    disablePopup,
    rootStyle,
    classAction,
    action,
    size = 'xs',
    ...restProps
  } = props;
  return (
    <Popup
      ref={popupRef}
      className='dialog'
      open={openPopup}
      disabled={disablePopup}
      trigger={<div>{childrenAction}</div>}
      modal
      {...restProps}
    >
      <div
        className='dialog-body'
        style={{
          ...rootStyle,
          ...sizeStyle[size],
        }}
      >
        <div
          className={`flex items-center justify-between mb-3 ${classAction}`}
        >
          <Typography
            variant='h3'
            fontWeight='font-bold'
            textColor='text-primary-custom'
          >
            {title}
          </Typography>
          <img
            src={IconClose}
            alt='icon'
            className='cursor-pointer'
            onClick={handleCLoseDialog}
          />
        </div>
        {children}
      </div>
      <div>{action}</div>
    </Popup>
  );
};

export default DialogCard;
