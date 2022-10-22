/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginatedItems from 'components/Table/PaginatedItems';
import IconArrowUp from 'assets/images/icons/arrow-up.svg';
import IconArrowDown from 'assets/images/icons/arrow-down.svg';
import { ORDER_DIRECTION } from 'types';
import React from 'react';
import CheckedDefault from 'components/Checked/CheckedDefault';
import { HashLoader } from 'react-spinners';
const TableAddNewTreasureForm = (props) => {
    const { limit, page, countItems, handleChangePage, headers, data, orderBy, orderDirection, handleChangeSort, checkedAdd, handleChangeChecked, isLoadingTable, hidePagination, handleViewDetailTable, rowStyle, } = props;
    // const [click, setClick] = React.useState(false);
    const renderTableBody = (header, value, index) => {
        if (header.renderBody) {
            return header.renderBody(value, index);
        }
        if (header.field === 'index') {
            return <p>{(page - 1) * limit + (index + 1)} </p>;
        }
        return value[header.field];
    };
    const renderIconSort = (newField) => {
        if (newField === orderBy) {
            return (<div className='p-1 ml-2 rounded-full hover:bg-gray-02-custom cursor-pointer' onClick={handleChangeSort &&
                    handleChangeSort(newField, orderDirection === ORDER_DIRECTION.ASC
                        ? ORDER_DIRECTION.DESC
                        : ORDER_DIRECTION.NO)}>
          <img src={orderDirection === ORDER_DIRECTION.ASC
                    ? IconArrowUp
                    : IconArrowDown} alt='icon' className='cursor-pointer w-15-custom h-15-custom'/>
        </div>);
        }
        return (<div className='p-1 ml-2 rounded-full bg-gray-02-custom cursor-pointer icon-sort'>
        <img src={IconArrowUp} alt='icon' className='cursor-pointer w-15-custom h-15-custom'/>
      </div>);
    };
    return (<div className='relative' style={{
            display: 'grid',
            gridAutoRows: 'calc(100% - 50px) 50px',
            overflow: 'auto',
            backgroundColor: '#fff',
        }}>
      <div style={{
            justifyContent: 'space-between',
            overflow: 'auto',
            width: '100%',
        }}>
        <table className='table-card over'>
          <thead>
            <tr>
              {headers.map((header, idx //disable thumbnail header column,cause reuse
        ) => (<th key={idx} style={{
                ...header.styleHeader,
            }}>
                    <div className='flex items-center show-icon-sort' style={header.styleSort}>
                      {header.isCheckbox ? (<CheckedDefault checked={checkedAdd ?? false} onClick={handleChangeChecked &&
                    handleChangeChecked('all', checkedAdd ?? false, 0)}/>) : (<React.Fragment>
                          {header.renderHeader
                    ? header.renderHeader
                    : header.title}

                          {header.sort ? renderIconSort(header.field) : null}
                        </React.Fragment>)}
                    </div>
                  </th>))}
            </tr>
          </thead>
          <tbody>
            {data.length ? (data.map((el, index) => {
            return (<tr key={el.link} 
            // onClick={onClickViewDetail(el)}
            className={`${handleViewDetailTable ? 'cursor-pointer' : ''}`} style={{
                    borderBottom: index === data.length - 1
                        ? 'none '
                        : '1px solid rgba(0, 0, 0, 0.05)',
                    ...rowStyle,
                }}>
                    {headers.map((header, idx) => (<td key={`kh_child_${idx}`} style={header.styleBody}>
                        {renderTableBody(header, el, index)}
                      </td>))}
                  </tr>);
        })) : (<tr style={{
                borderBottom: 'none',
            }}>
                <td className='text-center' colSpan={headers.length}>
                  No data
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className=' flex items-center justify-end bg-white pr-8' style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        }}>
        {!hidePagination && data.length ? (<PaginatedItems countItems={countItems} limit={limit} page={page} handleChangePage={handleChangePage}/>) : null}
      </div>
      {isLoadingTable ? (<div className='absolute bg-white w-full h-full flex items-center justify-center opacity-30' style={{
                borderRadius: 20,
            }}>
          <HashLoader color='#57B8FF' loading={true} size={50}/>
        </div>) : null}
    </div>);
};
export default TableAddNewTreasureForm;
