import { FormControl, Input, InputLabel, useTheme } from '@mui/material'
import React from 'react'
import useCustomStyles from './useCustomStyles';
import { fontWeight } from '@mui/system';
const styles = (theme) => ({

  })
export default function CustomInput(props) {
  const theme = useTheme();
  const classes = useCustomStyles(styles, theme);
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        color,
        labelColor,
        onChange,
        value,
        required,
        placeholder
      } = props;
         return (
        <FormControl {...formControlProps} >
          {labelText !== undefined ? (
            <InputLabel
              htmlFor={id}
              {...labelProps}
              style={{fontSize:"15px",color:labelColor}}
              error={error}
              required={required}
            >
              {labelText}
            </InputLabel>
          ) : null}
          <Input
            id={id}
            value={ value || "" }
            onChange={onChange}
            style={{color:color,fontSize:"15px"}}
            error={error}
            placeholder={placeholder}
            {...inputProps}
          />
        </FormControl>
    

  )
}
