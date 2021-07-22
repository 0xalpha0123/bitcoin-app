import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.1,
    height: height / 15,
  },
});

export const FormInput = ({ labelName, denominator, ...rest }) => {
  return (
    <TextInput
      label={labelName}
      style={[styles.input, { height: height / denominator }]} // default denominator is 15 (makes it skinny)
      numberOfLines={1}
      theme={{
        colors: {
          primary: '#006ee6',
          underlineColor: 'transparent',
        },
      }}
      {...rest}
    />
  );
};

export default FormInput;
