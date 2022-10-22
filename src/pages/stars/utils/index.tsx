import { Header } from 'components/Table/types';
import { StarDetail } from '../types';
import {
  formatDate,
  formatETH,
  getNameModal,
  getDefaultImageStar,
} from 'helpers/util';
import { API_URL, CURRENCY_SYMBOL_WEB } from 'config/environments';
import OwnerDetailCard from '../molecules/OwnerDetailCard';
import DefaultButtonIcon from 'components/ButtonIcon/DefaultButtonIcon';
import CheckedDefault from 'components/Checked/CheckedDefault';
import {
  FiledFilterItem,
  FilterItemDetail,
  MARKET_STATUS_FILTER,
  TYPES_STATUS_FILTER,
  OWNER_STATUS_FILTER,
} from 'components/Filter/types';

export function dataHeaderStar(
  handleOpenFormStar: (
    key: 'cost' | 'viewStar',
    dataRes: StarDetail
  ) => () => void,
  onEdit: (value: StarDetail) => void,
  onDelete: (value: StarDetail) => void,
  handleLockStar?: (star: StarDetail) => void,
  handleUpdateFamousStar?: (
    starId: string
  ) => () => void,
): Header[] {
  const headers: Header[] = [
    {
      title: '',
      field: 'checkbox',
      styleHeader: {
        paddingRight: 10,
        width: 60,
        minWidth: 60,
        maxWidth: 60,
      },
      styleBody: {
        paddingRight: 10,
        width: 60,
        minWidth: 60,
        maxWidth: 60,
      },
      isCheckbox: true,
    },
    {
      title: 'Thumbnail',
      field: 'thumbnail',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 100,
        minWidth: 100,
        justifyContent: 'center',
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 100,
        minWidth: 100,
        textAlign: 'center',
      },
      renderBody: (value: StarDetail) => (
        <div
          className='flex justify-center cursor-pointer'
          onClick={handleOpenFormStar('viewStar', value)}
        >
          <div
            style={{
              backgroundImage: `url(${
                value.imgUrlPreview
                  ? value.imgUrlPreview
                  : getDefaultImageStar(value.model)
              })`,
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
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      sort: true,
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      renderBody: (value: StarDetail) => (
        <div
          className='flex flex-col cursor-pointer'
          onClick={handleOpenFormStar('viewStar', value)}
        >
          <p className='text-primary-custom'>{value.name}</p>
          {value.nameRegister ? (
            <p className='text-xs font-normal text-gray-06-custom italic'>
              {value.nameRegister}
            </p>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Model',
      field: 'model',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 120,
        minWidth: 120,
        maxWidth: 120,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 120,
        minWidth: 120,
        maxWidth: 120,
        textTransform: 'capitalize',
      },
      sort: true,
      renderBody: (value: StarDetail) => (
        <p className=''>{getNameModal(value.model)}</p>
      ),
    },
    {
      title: 'Also Know',
      field: 'alsoKnow',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
      },
      sort: true,
      renderBody: (value: StarDetail) => (
        <p
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-word',
          }}
        >
          {value.info ? value.info.alsoKnow : ''}
        </p>
      ),
    },
    {
      title: 'Price',
      field: 'purchasePrice',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        wordBreak: 'break-word',
      },
      sort: true,
      renderBody: (value: StarDetail) => (
        <p>
          {value.purchasePrice
            ? `${formatETH(value.purchasePrice)} ${CURRENCY_SYMBOL_WEB}`
            : ''}
        </p>
      ),
    },
    {
      title: 'Ticket',
      field: '',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 100,
        minWidth: 100,
        maxWidth: 100,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 100,
        minWidth: 100,
        maxWidth: 100,
      },
      renderBody: (value: StarDetail) => (value.freeMint === 1 ? 'Ticket' : ''),
    },
    {
      title: 'Owner',
      field: 'owner',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      renderBody: (value: StarDetail) => (
        <OwnerDetailCard owner={value.owner} market={value.market} />
      ),
    },
    {
      title: 'Purchase Date',
      field: 'ownerBoughtAt',
      styleHeader: {
        paddingRight: 0,
        paddingLeft: 10,
        width: 170,
        minWidth: 170,
        maxWidth: 170,
      },
      styleBody: {
        paddingRight: 0,
        paddingLeft: 10,
        width: 170,
        minWidth: 170,
        maxWidth: 170,
      },
      sort: true,
      renderBody: (value: StarDetail) => (
        <p>{value.ownerBoughtAt ? formatDate(value.ownerBoughtAt) : ''}</p>
      ),
    },
    {
      title: 'Selling Price',
      field: 'price',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 120,
        minWidth: 120,
        maxWidth: 120,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 120,
        minWidth: 120,
        maxWidth: 120,
      },
      renderBody: (value: StarDetail) => (
        <p>
          {value.market
            ? `${formatETH(value.market.price)} ${CURRENCY_SYMBOL_WEB}`
            : ''}
        </p>
      ),
    },
    {
      title: 'Create At',
      field: 'createdAt',
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      sort: true,
      renderBody: (value: StarDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ''}</p>
      ),
    },
    {
      title: 'Lock',
      field: 'isLocked',
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
      renderBody: (value: StarDetail) => (
        <p style={{ color: '#c93e3e' }}>{value.isLocked ? 'Locked' : ''}</p>
      ),
    },
    {
      title: 'Famous',
      field: 'isFamous',
      styleHeader: {
        paddingLeft: 10,
        width: '100vh',
        minWidth: 80,
      },
      styleBody: {
        paddingLeft: 30,
        width: '100vh',
        minWidth: 80,
      },
      renderBody: (value: StarDetail) => (
        // <p style={{ color: '#c93e3e' }}>{value.isFamous ? 'Famous' : ''}</p>
        <CheckedDefault
        checked={value.isFamous ?? false}
        onClick={
          handleUpdateFamousStar &&
          handleUpdateFamousStar(value.id)
        }
      />
      ),
    },
    {
      title: 'Action',
      field: 'action',
      styleSort: {
        justifyContent: 'flex-end',
      },
      styleHeader: {
        paddingLeft: 10,
        width: '100vh',
        minWidth: 160,
      },
      styleBody: {
        paddingLeft: 10,
        width: '100vh',
        minWidth: 160,
      },
      renderBody: (value: StarDetail) => (
        <div className='flex items-center justify-end'>
          <DefaultButtonIcon
            field='lock'
            titleTooltip={value.isLocked ? 'Unlock' : 'Lock'}
            keyButtonIcon={Math.random().toString(36)}
            disable={false}
            onClick={() => handleLockStar?.(value)}
          />
          <DefaultButtonIcon
            disable={value.nftId ? true : false}
            onClick={handleOpenFormStar('cost', value)}
            field='cost'
            titleTooltip='Set Price'
            keyButtonIcon={Math.random().toString(36)}
          />

          <div style={{ margin: '0 5px' }}>
            <DefaultButtonIcon
              disable={!value.isManualAdd}
              onClick={() => onEdit(value)}
              field='edit'
              titleTooltip='Update'
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>

          <DefaultButtonIcon
            onClick={() => onDelete(value)}
            disable={!value.isManualAdd}
            field='delete'
            titleTooltip='Destroy'
            keyButtonIcon={Math.random().toString(36)}
          />
        </div>
      ),
    },
  ];

  return headers;
}

export const DEFAULT_IMAGE = `${API_URL}/planets/default.png`;
export const DEFAULT_THUMBNAIL_STAR_IMAGE = `${API_URL}/planets/star_default.png`;
export const DEFAULT_THUMBNAIL_MINOR_PLANET_IMAGE = `${API_URL}/planets/minor_planet_default.png`;

export const filterStar: FilterItemDetail[] = [
  {
    title: 'Owner Status',
    filed: FiledFilterItem.OWNER,
    listChecked: [
      {
        name: 'Owned',
        filed: OWNER_STATUS_FILTER.OWNED,
      },
      {
        name: 'No Owner',
        filed: OWNER_STATUS_FILTER.NO_OWNED,
      },
    ],
  },
  {
    title: 'Market Status',
    filed: FiledFilterItem.MARKET,
    listChecked: [
      {
        name: 'Selling',
        filed: MARKET_STATUS_FILTER.SELLING,
      },
      {
        name: 'Is not selling',
        filed: MARKET_STATUS_FILTER.IS_NOT_SELLING,
      },
    ],
  },
  {
    title: 'Types Status',
    filed: FiledFilterItem.TYPES,
    listChecked: [
      {
        name: 'Planet',
        filed: TYPES_STATUS_FILTER.PLAN,
      },
      {
        name: 'Star',
        filed: TYPES_STATUS_FILTER.STAR,
      },
      {
        name: 'Asteroid',
        filed: TYPES_STATUS_FILTER.ASTEROID,
      },
    ],
  },
];
