import React from "react";
import {TransTitle, updateValue} from "@ui-schema/ui-schema";
import {ValidityHelperText} from "../../Component/LocaleHelperText/LocaleHelperText";
import {useUID} from "react-uid";

const StringRenderer = ({ownKey, schema, value, multiline = false, onChange, storeKeys, showValidity, required, errors, type, rows}) => {
    const format = schema.get('format');
    const uid = useUID();

    let Renderer = 'input';
    if(multiline) {
        Renderer = 'textarea';
    }

    let classFormGroup = ["form-group"];
    let classFormControl = ["form-control"];
    if(showValidity && errors.hasError()) {
        classFormControl.push('is-invalid');
    }
    if(showValidity && !errors.hasError()) {
        classFormGroup.push('was-validated');
    }

    return <div className={classFormGroup.join(' ')}>
        <label htmlFor={'uis-' + uid}><TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey}/></label>
        <Renderer
            className={classFormControl.join(' ')}
            type={format || type}
            required={required}
            rows={rows}
            value={typeof value !== 'undefined' ? value : ''}
            onChange={(e) => {
                const value = e.target.value;
                const target = e.target;
                if(type === 'number') {
                    if(isNaN(value * 1)) {
                        console.error('Invalid Type: input not a number in:', target);
                        return;
                    }
                    onChange(updateValue(storeKeys, value === '' ? '' : value * 1, required, type || schema.get('type')));
                } else {
                    onChange(updateValue(storeKeys, value, required, type || schema.get('type')));
                }
            }}
        />
        <ValidityHelperText errors={errors} showValidity={showValidity} schema={schema}/>
    </div>;
};

const TextRenderer = ({schema, ...props}) => {
    return <StringRenderer
        {...props}
        schema={schema}
        rows={schema.getIn(['view', 'rows'])}
        multiline
    />
};


const NumberRenderer = ({schema, ...props}) => {
    return <StringRenderer
        {...props}
        schema={schema}
        type={'number'}
    />
};

export {StringRenderer, NumberRenderer, TextRenderer};
