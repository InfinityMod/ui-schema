import React from 'react';
import {Map, List} from 'immutable';
import {
    FormControl, FormLabel, FormControlLabel, RadioGroup, Radio,
} from '@mui/material';
import {TransTitle, Trans, beautifyKey} from '@ui-schema/ui-schema';
import {ValidityHelperText} from '@ui-schema/ds-material/Component/LocaleHelperText/LocaleHelperText';
import {getTranslatableEnum} from '@ui-schema/ui-schema/Translate';

const OptionsRadio = ({
                          schema, value, onChange, storeKeys, showValidity, valid, required, errors,
                          row, widgets,
                      }) => {
    const enumVal = schema.get('enum');
    if(!enumVal) return null;

    const isActive = typeof value !== 'undefined' ? value : (schema.get('default') || '');

    const InfoRenderer = widgets?.InfoRenderer
    return <FormControl
        required={required} error={!valid && showValidity} component="fieldset" fullWidth
        size={schema.getIn(['view', 'dense']) ? 'small' : undefined}
        disabled={schema.get('readOnly')}
    >
        <FormLabel component="legend" style={{width: '100%'}}>
            <TransTitle schema={schema} storeKeys={storeKeys}/>
            {InfoRenderer && schema?.get('info') ?
                <InfoRenderer
                    schema={schema} variant={'icon'} openAs={'modal'}
                    storeKeys={storeKeys} valid={valid} errors={errors}
                    align={'right'} dense
                /> :
                undefined}
        </FormLabel>
        <RadioGroup row={row} disabled={schema.get('readOnly')}>
            {enumVal ? enumVal.map((enum_name) => {
                return <FormControlLabel
                    key={enum_name}
                    control={<Radio
                        value={enum_name}
                        checked={enum_name === isActive}
                        onChange={() =>
                            !schema.get('readOnly') &&
                            onChange({
                                storeKeys,
                                scopes: ['value'],
                                type: 'set',
                                schema,
                                required,
                                data: {value: enum_name},
                            })
                        }
                    />}
                    label={<Trans
                        schema={schema.get('t')}
                        text={storeKeys.insert(0, 'widget').concat(List(['enum', getTranslatableEnum(enum_name)])).join('.')}
                        context={Map({'relative': List(['enum', getTranslatableEnum(enum_name)])})}
                        fallback={beautifyKey(getTranslatableEnum(enum_name), schema.get('ttEnum'))}
                    />}
                />
            }).valueSeq() : null}
        </RadioGroup>

        <ValidityHelperText errors={errors} showValidity={showValidity} schema={schema}/>
    </FormControl>
};

export {OptionsRadio};
