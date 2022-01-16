import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getLocationData, resetCityAndArea } from '../ProfileAccountSetting/_redux/Action/ProfileAccountSettingAction';
import Select from 'react-select';
import { RHFInput } from 'react-hook-form-input';
import { clearLocation, locationChanged } from './_redux/action/store-action';

function StoreFilter() {
    const dispatch = useDispatch();
    const { divisionList, cityList, areaList, selectedAddress } = useSelector((state) => state.userProfile);
    const { selectedLocation } = useSelector((state) => state.store);

    const { register, setValue } = useForm();

    const handleChangeTextInput = (name, value) => {
        // dispatch(handleChangeBillingAddressInput(name, value));
        const cloneVal = {...selectedLocation, [name]: value};
        dispatch(locationChanged(cloneVal));
    }

    const onClearHandler = () => {
        dispatch(clearLocation())
        dispatch(resetCityAndArea())
    }

    useEffect(() => {
        if(divisionList.length <= 0) {
            dispatch(getLocationData('divisions', 'country', 19))
        }
    }, []);

    return (
        <div className='store-category-list shadow-sm p-3 mb-5 bg-white rounded'>
            <div className="d-flex justify-content-between"> 
                <p>Filter Store by</p>
                <p className="pointer color-main" onClick={onClearHandler}>clear</p>
            </div>
            <div>
                <form
                    autoComplete="off"
                    autoSave="off"
                    className="mt-3" >
                    <div>
                        <div className="custome_form_group">
                            <label className="form-label" htmlFor="division">Division</label>
                            <RHFInput
                                as={<Select options={divisionList} />}
                                placeholder="Select division"
                                rules={{ required: true }}
                                name="division_id"
                                register={register}
                                value={selectedAddress.selectedCountry}
                                onChange={(option) => {
                                    handleChangeTextInput("division", option.value);
                                    dispatch(getLocationData('cities', 'division', option.value));
                                }}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="custome_form_group">
                            <label className="form-label" htmlFor="city">Zilla</label>
                            <RHFInput
                                as={<Select options={cityList} />}
                                placeholder="Select district"
                                rules={{ required: true }}
                                name="city_id"
                                register={register}
                                value={selectedAddress.selectedCity}
                                onChange={(option) => {
                                    handleChangeTextInput("district", option.value);
                                    dispatch(getLocationData('areas', 'city', option.value));
                                }}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="custome_form_group">
                            <label className="form-label" htmlFor="area">Upazilla</label>
                            <RHFInput
                                as={<Select options={areaList} />}
                                placeholder="Select upazilla"
                                rules={{ required: true }}
                                name="area_id"
                                register={register}
                                value={selectedAddress.selectedArea}
                                onChange={(option) => {
                                    handleChangeTextInput("upazilla", option.value);
                                }}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StoreFilter
