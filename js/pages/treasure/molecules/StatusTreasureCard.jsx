import Typography from 'components/Typography';
import { DEFAULT_STATUS } from '../types';
import IconEdit from 'assets/images/icons/edit-while.svg';
const StatusTreasureCard = (props) => {
    const { title, isUpdate } = props;
    return (<div className='p-2 bg-green-custom rounded-xl flex cursor-pointer'>
      <Typography textColor='text-white'>{title ?? DEFAULT_STATUS}</Typography>
      {isUpdate ? <img src={IconEdit} alt='icon' className='w-4 ml-3'/> : null}
    </div>);
};
export default StatusTreasureCard;
