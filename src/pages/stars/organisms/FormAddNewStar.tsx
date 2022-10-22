import BackdropCustomize from 'components/BackdropCustomize';
import ButtonDefault from 'components/Button/ButtonDefault';
import DialogCard from 'components/Dialog/DialogCard';
import InputDefault from 'components/Input/InputDefault';
import MultipleInput from 'components/Input/Multiple';
import SelectDefault from 'components/Select/SelectDefault';
import { useBoolean } from 'helpers/hooks';
import React, { FC } from 'react';
import { StarModel, StarModelOptions } from '../constants';
import AddMinorPlanetForm from '../molecules/AddMinorPlanetForm';
import AddPlanetForm from '../molecules/AddPlanetForm';
import AddStarForm from '../molecules/AddStarForm';
import { postNewStar, updateStar } from '../services/api';
import '../styles/index.css';
import {
  AddNewStarInput,
  defaultAddStarInput,
  FormAddNewStarProps,
  StarModelOption,
} from '../types';

export const FormAddNewStar: FC<FormAddNewStarProps> = ({
  openForm,
  onClose,
  onRefetch,
  item,
}) => {
  const isLoading = useBoolean();
  const [inputs, setInputs] =
    React.useState<AddNewStarInput>(defaultAddStarInput);
  //const isChangeTextEditor = React.useRef(false);

  React.useEffect(() => {
    if (item) {
      const { name, names, model, info } = item;
      const information = JSON.parse(item.information || '{}');
      const { alsoKnow, distance, mag, visibility, raDec, azAlt } = info;

      setInputs({
        model: model as any,
        name,
        names: names || [],
        alsoKnow,
        distance,
        mag,
        visibility,
        raDec: raDec || '',
        azAlt: azAlt || '',
        bio: JSON.parse(info?.modelData || '{}').wiki,
        planet: model === StarModel.PLANET ? information : {},
        star: model === StarModel.STAR ? information : {},
        asteroid: model === StarModel.MINOR_PLANET ? information : {},
      });
    }
  }, [item]);

  const handleChangeInput =
    (fieldName: string, subField?: string, splitValue = false) =>
    (e) => {
      const { value } = e.target;
      if (!subField) {
        setInputs({
          ...inputs,
          [fieldName]: splitValue ? value.split(',') : value,
        });
      } else {
        setInputs({
          ...inputs,
          [fieldName]: {
            ...inputs[fieldName],
            [subField]: splitValue ? value.split(',') : value,
          },
        });
      }
    };

  const onSelectChange = (value: StarModelOption) =>
    setInputs({
      ...inputs,
      model: value.value,
    });

  const getModelValue = () =>
    StarModelOptions.find((el) => el.value === inputs.model);

  const isDisabledSubmit = () => {
    if (!inputs.name || !inputs.names.length) return true;

    if (inputs.model === StarModel.PLANET) {
      const { horizons_id, type, radius, color } = inputs.planet;
      if (!horizons_id || !type || !radius || !color) {
        return true;
      }
    }

    if (inputs.model === StarModel.STAR) {
      const { ra, de, plx, pm_ra, pm_de, epoch } = inputs.star;
      if (!ra || !de || !plx || !pm_ra || !pm_de || !epoch) return true;
    }

    if (inputs.model === StarModel.MINOR_PLANET) {
      const { H, G, Epoch, i, Node, Peri, a, n, e, M } = inputs.asteroid;
      if (!H || !G || !Epoch || !i || !Node || !Peri || !M || !a || !n || !e)
        return true;
    }
  };

  const onSubmitButton = () => {
    isLoading.setValue(true);
    const {
      model,
      name,
      names,
      bio,
      planet,
      star,
      asteroid,
      alsoKnow,
      distance,
      mag,
      visibility,
      raDec,
      azAlt,
    } = inputs;
    const information =
      model === StarModel.PLANET
        ? planet
        : model === StarModel.STAR
        ? star
        : asteroid;

    const request = {
      model,
      name,
      names,
      bio,
      alsoKnow,
      distance,
      mag,
      visibility,
      raDec,
      azAlt,
      information: JSON.stringify(information),
    };
    const onSuccess = () => {
      isLoading.setValue(false);
      setInputs(defaultAddStarInput);
      onClose();
      onRefetch?.();
    };

    const onError = () => {
      isLoading.setValue(false);
    };

    if (!item) {
      postNewStar(request, onSuccess, onError);
    } else {
      updateStar(item.id, request, onSuccess, onError);
    }
  };

  const inputStyle: React.CSSProperties = {
    border: '1px solid #e5e5e5',
    backgroundColor: 'rgba(0,0,0,0.01)',
    borderRadius: '4px',
    padding: '0px 10px',
    marginTop: 5,
  };

  return (
    <DialogCard
      openPopup={openForm}
      disablePopup
      handleCLoseDialog={onClose}
      title={item ? 'Update star' : `Add new star`}
      size='md'
      rootStyle={{
        width: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      <p
        style={{
          color: 'rgba(239, 68, 68)',
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        *Please ensure that the data entered matches the actual data.
      </p>
      <p
        style={{
          marginBottom: 20,
          width: 'fit-content',
          color: '#1a1f36',
          fontSize: 20,
          letterSpacing: 0.6,
        }}
      >
        Basic information
      </p>
      <div className='grid grid-cols-5 mb-6 gap-5'>
        <SelectDefault
          label='Model'
          required
          options={StarModelOptions}
          selectedOption={getModelValue()}
          handleChange={onSelectChange}
          styleControl={inputStyle}
          styleSingleValue={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            maxWidth: 'inherit',
          }}
          controlWidth={1}
        />
        <InputDefault
          label='Name'
          required
          value={inputs.name}
          onChange={handleChangeInput('name')}
          placeholder='Sun'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Names'
          required
          value={inputs.names}
          onChange={handleChangeInput('names', '', true)}
          placeholder='Sun, Brightness'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Also know'
          value={inputs.alsoKnow}
          onChange={handleChangeInput('alsoKnow')}
          placeholder=''
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Distance'
          value={inputs.distance}
          onChange={handleChangeInput('distance')}
          placeholder=''
          inputStyle={inputStyle}
        />
      </div>

      <div className='grid grid-cols-5 mb-6 gap-5'>
        <InputDefault
          label='Mag'
          value={inputs.mag}
          onChange={handleChangeInput('mag')}
          placeholder=''
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Visibility'
          value={inputs.visibility}
          onChange={handleChangeInput('visibility')}
          placeholder=''
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Ra/Dec'
          value={inputs.raDec}
          onChange={handleChangeInput('raDec')}
          placeholder=''
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Az/Alt'
          value={inputs.azAlt}
          onChange={handleChangeInput('azAlt')}
          placeholder=''
          inputStyle={inputStyle}
        />
      </div>

      <p
        style={{
          marginBottom: 20,
          paddingTop: 20,
          color: '#1a1f36',
          fontSize: 20,
          borderTop: '1px solid #e5e5e5',
          letterSpacing: 0.6,
        }}
      >
        Detail information
      </p>
      <div>
        {inputs.model === StarModel.PLANET ? (
          <AddPlanetForm
            inputs={inputs}
            handleChangeInput={handleChangeInput}
            inputStyle={inputStyle}
          />
        ) : null}
        {inputs.model === StarModel.STAR ? (
          <AddStarForm
            inputs={inputs}
            handleChangeInput={handleChangeInput}
            inputStyle={inputStyle}
          />
        ) : null}
        {inputs.model === StarModel.MINOR_PLANET ? (
          <AddMinorPlanetForm
            inputs={inputs}
            handleChangeInput={handleChangeInput}
            inputStyle={inputStyle}
          />
        ) : null}
      </div>
      <p
        style={{
          marginBottom: 10,
          paddingTop: 20,
          color: '#1a1f36',
          fontSize: 20,
          borderTop: '1px solid #e5e5e5',
          letterSpacing: 0.6,
        }}
      >
        Bio
      </p>
      <MultipleInput
        label=''
        rootClass='mb-6'
        rows={5}
        value={inputs.bio}
        onChange={handleChangeInput('bio')}
        inputStyle={{
          ...inputStyle,
          padding: '5px 10px',
        }}
      />
      <ButtonDefault
        widthButton='w-140-custom'
        disabled={isDisabledSubmit()}
        onClick={onSubmitButton}
        style={{
          minHeight: 37,
        }}
      >
        {item ? 'Update' : 'Add'}
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>
  );
};
