import { Header } from 'components/Table/types';
import { TreasureDetail } from '../types';
import { API_URL } from 'config/environments';
import {
  FiledFilterItem,
  FilterItemDetail,
  TOKEN_STATUS_FILTER,
  TYPES_STATUS_FILTER,
} from '../types';
import DefaultButtonIcon from 'components/ButtonIcon/DefaultButtonIcon';

const DATA_CONTRACT = {
  '0xae13d989dac2f0debff460ac112a837c89baa7cd': 'Wbnb',
  '0x98649fde88981790b574c9A6066004D5170Bf3EF': 'Busd',
  '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378': 'Eth',
};

export function dataHeaderStar(): Header[] {
  const headers: Header[] = [
    {
      title: 'Thumbnail',
      field: 'thumbnail',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 710,
        minWidth: 710,
        justifyContent: 'center',
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 300,
        minWidth: 300,
        textAlign: 'center',
      },
      renderBody: (value: TreasureDetail) => (
        <div className='flex justify-center cursor-pointer'>
          <div
            style={{
              backgroundImage: `url(${value.imgUrl})`,
            }}
            className='w-35-custom h-35-custom rounded-full bg-no-repeat bg-center bg-cover'
          />
        </div>
      ),
    },
    {
      title: 'Name',
      field: 'name',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 40,
        width: 250,
        minWidth: 250,
        maxWidth: 250,
      },
      sort: true,
      styleBody: {
        paddingRight: 10,
        paddingLeft: 40,
        width: 250,
        minWidth: 250,
        maxWidth: 250,
      },
      renderBody: (value: TreasureDetail) => (
        <div className='flex flex-col cursor-pointer'>
          <p className='text-primary-custom'>{value.name}</p>
        </div>
      ),
    },
    {
      title: 'Description',
      field: 'description',
      styleHeader: {
        width: 450,
        maxWidth: 450,
        minWidth: 450,
      },
      styleBody: {
        paddingTop: 10,
        paddingBottom: 10,
        width: 450,
        maxWidth: 450,
        minWidth: 450,
        textTransform: 'capitalize',
        wordBreak: 'break-word',
      },
      renderBody: (value: TreasureDetail) => (
        <p className=''>{value.description}</p>
      ),
    },
    {
      title: 'Image',
      field: 'image',
      styleHeader: {
        paddingLeft: 80,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      renderBody: (value: TreasureDetail) => (
        <div
          className='flex justify-center cursor-pointer'
          // onClick={handleOpenFormStar("viewStar", value)}
        >
          <div
            style={{
              backgroundImage: `url(${value.imgUrl})`,
            }}
            className='w-35-custom h-35-custom rounded-full bg-no-repeat bg-center bg-cover'
          />
        </div>
      ),
    },

    {
      title: 'Star ID',
      field: 'starId',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 480,
        minWidth: 480,
        maxWidth: 480,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 480,
        minWidth: 480,
        maxWidth: 480,
        wordBreak: 'break-word',
      },
      sort: true,
      renderBody: (value: TreasureDetail) => (
        <div
          className='flex flex-col cursor-pointer'
          // onClick={handleOpenFormStar("viewStar", value)}
        >
          <p className='text-primary-custom'>{value?.star.name}</p>
        </div>
      ),
    },
    {
      title: 'Claim',
      field: 'isClaimed',
      styleHeader: {
        paddingLeft: 10,
        width: '100vh',
        minWidth: 80,
      },
      styleBody: {
        paddingLeft: 10,
        width: '100vh',
        minWidth: 80,
      },
      renderBody: (value: TreasureDetail) => (
        <p style={{ color: '#c93e3e' }}>{value.isClaimed ? 'Claimed' : ''}</p>
      ),
    },
    {
      title: 'Total',
      field: 'total',
      styleHeader: {
        width: '100vw',
        minWidth: 144,
      },
      styleBody: {
        width: '100vw',
        minWidth: 144,
        wordBreak: 'break-word',
      },
      sort: true,
      renderBody: (value: TreasureDetail) => (
        <p>{`${value.total} ${DATA_CONTRACT[value?.tokenContract]}`}</p>
      ),
    },
    // {
    //   title: 'Action',
    //   field: 'action',
    //   styleSort: {
    //     justifyContent: 'flex-end',
    //   },
    //   styleHeader: {
    //     paddingLeft: 10,
    //     width: '100vh',
    //     minWidth: 160,
    //   },
    //   styleBody: {
    //     paddingLeft: 10,
    //     width: '100vh',
    //     minWidth: 160,
    //   },
    //   renderBody: (value: StarDetail) => (
    //     <div className='flex items-center justify-end'>
    //       <DefaultButtonIcon
    //         field='lock'
    //         titleTooltip={value.isLocked ? 'Unlock' : 'Lock'}
    //         keyButtonIcon={Math.random().toString(36)}
    //         disable={false}
    //         onClick={() => handleLockStar?.(value)}
    //       />
    //       <DefaultButtonIcon
    //         disable={value.nftId ? true : false}
    //         onClick={handleOpenFormStar('cost', value)}
    //         field='cost'
    //         titleTooltip='Set Price'
    //         keyButtonIcon={Math.random().toString(36)}
    //       />

    //       <div style={{ margin: '0 5px' }}>
    //         <DefaultButtonIcon
    //           disable={!value.isManualAdd}
    //           onClick={() => onEdit(value)}
    //           field='edit'
    //           titleTooltip='Update'
    //           keyButtonIcon={Math.random().toString(36)}
    //         />
    //       </div>

    //       <DefaultButtonIcon
    //         onClick={() => onDelete(value)}
    //         disable={!value.isManualAdd}
    //         field='delete'
    //         titleTooltip='Destroy'
    //         keyButtonIcon={Math.random().toString(36)}
    //       />
    //     </div>
    //   ),
    // },
  ];

  return headers;
}

export const DEFAULT_IMAGE = `${API_URL}/planets/default.png`;
export const DEFAULT_THUMBNAIL_STAR_IMAGE = `${API_URL}/planets/star_default.png`;
export const DEFAULT_THUMBNAIL_MINOR_PLANET_IMAGE = `${API_URL}/planets/minor_planet_default.png`;

export const filterTreasure: FilterItemDetail[] = [
  {
    title: 'Token Status',
    filed: FiledFilterItem.TOKEN,
    listChecked: [
      {
        name: 'Wbnb',
        filed: TOKEN_STATUS_FILTER.WBNB,
      },
      {
        name: 'Busd',
        filed: TOKEN_STATUS_FILTER.BUSD,
      },
      {
        name: 'Eth',
        filed: TOKEN_STATUS_FILTER.ETH,
      },
    ],
  },
  {
    title: 'Types Status',
    filed: FiledFilterItem.TYPES,
    listChecked: [
      {
        name: 'A',
        filed: TYPES_STATUS_FILTER.A,
      },
      {
        name: 'B',
        filed: TYPES_STATUS_FILTER.B,
      },
      {
        name: 'C',
        filed: TYPES_STATUS_FILTER.C,
      },
      {
        name: 'D',
        filed: TYPES_STATUS_FILTER.D,
      },
      {
        name: 'E',
        filed: TYPES_STATUS_FILTER.E,
      },
    ],
  },
];
