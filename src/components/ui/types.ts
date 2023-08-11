import {TextFieldProps as TFP} from 'react-native-ui-lib';

export interface BasePropType {
  name: string;
  rules?: object;
  defaultValue?: string;
  [x: string]: any;
}

export type TextFieldProps = BasePropType & TFP;
