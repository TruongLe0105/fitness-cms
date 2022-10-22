import InputDefault from 'components/Input/InputDefault';
import React from 'react';
import { AddStarProps } from '../types';

const AddStarForm = ({
  inputs,
  handleChangeInput,
  inputStyle,
}: AddStarProps) => {
  return (
    <div>
      <div className='grid grid-cols-5 mb-6 gap-5 items-end'>
        <InputDefault
          label='Right Ascension'
          required
          value={inputs.star.ra || ''}
          onChange={handleChangeInput('star', 'ra')}
          type='number'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Declination'
          required
          value={inputs.star.de || ''}
          onChange={handleChangeInput('star', 'de')}
          type='number'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Parallactic Angle'
          required
          value={inputs.star.plx || ''}
          onChange={handleChangeInput('star', 'plx')}
          type='number'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Proper motion in RA'
          required
          value={inputs.star.pm_ra || ''}
          onChange={handleChangeInput('star', 'pm_ra')}
          type='number'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Proper motion in DE'
          required
          value={inputs.star.pm_de || ''}
          onChange={handleChangeInput('star', 'pm_de')}
          type='number'
          inputStyle={inputStyle}
        />
      </div>

      <div className='grid grid-cols-5 mb-6 gap-5 items-end'>
        <InputDefault
          label='Vmag'
          required
          value={inputs.star.Vmag || ''}
          onChange={handleChangeInput('star', 'Vmag')}
          type='number'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Epoch'
          required
          value={inputs.star.epoch || ''}
          onChange={handleChangeInput('star', 'epoch')}
          type='number'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Bmag'
          value={inputs.star.Bmag || ''}
          onChange={handleChangeInput('star', 'Bmag')}
          type='number'
          inputStyle={inputStyle}
        />
      </div>
    </div>
  );
};

export default AddStarForm;
