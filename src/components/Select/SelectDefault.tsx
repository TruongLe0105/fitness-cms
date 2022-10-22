/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { components } from 'react-select';
import { ReactComponent as DownIcon } from 'assets/images/icons/icon-select.svg';
import { SelectDefaultProps } from './types';
import Typography from 'components/Typography';

const SelectDefault = (props: SelectDefaultProps): JSX.Element => {
  const {
    options,
    selectedOption,
    handleChange,
    rootClasses,
    isDisabled,
    controlWidth,
    styleSingleValue,
    styleControl,
    label,
    required,
    labelStyle,
    dataTreasure,
    ...otherProps
  } = props;

  const customStyles = {
    control: () => ({
      ...{
        borderBottom: '1px solid #E6EAEF',
        height: 32,
        display: 'flex',
        minWidth: controlWidth || 150,
        cursor: 'pointer',
        ...styleControl,
      },
    }),
    valueContainer: () => ({
      height: 32,
      width: '100%',
      display: otherProps.isMulti ? 'flex' : 'block',
      flexWrap: 'wrap' as any,
    }),
    singleValue: (provided: any, state: any) => {
      const changeStyles = {
        maxWidth: 'calc(100% - 32px)',
        color: '#000000',
        fontSize: '14px',
        fontWeight: 600,
        marginLeft: '0px',
        marginRight: '0px',
        transition: 'opacity 300ms',
        opacity: state.isDisabled ? 0.5 : 1,
        height: 32,
        ...styleSingleValue,
      };
      return {
        ...provided,
        ...changeStyles,
      };
    },
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const DropdownIndicator = (dropProps: any) => {
    return (
      <components.DropdownIndicator {...dropProps}>
        <DownIcon></DownIcon>
      </components.DropdownIndicator>
    );
  };

  // rootClasses="mr-3 custom-select-param bg-gray-02-custom rounded-xl pl-4 border-0 font-medium text-xs-custom"

  // classInput="bg-gray-02-custom rounded-xl pl-4 pr-4 border-0 font-medium text-xs-custom"

  return (
    <div className={rootClasses}>
      {label ? (
        <Typography
          fontWeight='font-semibold'
          textColor='text-gray-custom'
          textClass='text-xs'
          style={labelStyle}
        >
          {label}
          {required && <span className='text-red-500'> (*)</span>}
        </Typography>
      ) : null}
      <Select
        value={selectedOption}
        styles={customStyles}
        isSearchable={false}
        onChange={handleChange}
        options={options}
        // menuIsOpen
        menuPlacement='auto'
        isDisabled={isDisabled}
        className='text'
        components={{
          Option: (optionProps: any) => {
            const data = optionProps.data;
            return (
              <div
                className={`${
                  optionProps.isSelected ? 'bg-primary-custom' : ''
                } min-h-30-custom flex items-center mb-1 pl-3 pr-3 cursor-pointer`}
                {...optionProps.innerProps}
              >
                <span
                  className={`${
                    optionProps.isSelected ? 'text-primary-custom' : 'text-gray'
                  } text-sm select-text font-normal`}
                >
                  {data.label}
                </span>
              </div>
            );
          },
          DropdownIndicator,
        }}
        {...otherProps}
      />
    </div>
  );
};
export default SelectDefault;
