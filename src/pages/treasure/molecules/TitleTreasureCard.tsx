import Typography from 'components/Typography';
import { TitleStarTreasureProps } from '../types';

const TitleTreasureCard = (props: TitleStarTreasureProps): JSX.Element => {
  const { label, message, rootClassName, isHtml, rootClassMessage } = props;
  console.log('rootClassMessage', rootClassMessage);

  return (
    <div className={`flex item-center ${rootClassName}`}>
      <Typography
        textColor='text-gray-custom'
        fontWeight='font-normal'
        textClass='mr-3'
      >
        {label}
      </Typography>
      {isHtml ? (
        <div>
          {message ? (
            <p
              className='text-primary-custom font-normal text-sm flex'
              dangerouslySetInnerHTML={{ __html: message }}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        <Typography
          textColor='text-primary-custom'
          fontWeight='font-normal'
          textClass={`work-break-custom ${rootClassMessage || ''}`}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};
export default TitleTreasureCard;
