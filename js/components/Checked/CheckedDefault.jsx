const CheckedDefault = (props) => {
    const { checked, ...otherProps } = props;
    return (<button className='flex justify-center items-center	w-18-custom h-18-custom border border-gray-02-custom rounded outline-none-custom' {...otherProps}>
      {checked ? (<div className='w-3 h-3 rounded-sm bg-blue-custom'></div>) : null}
    </button>);
};
export default CheckedDefault;
