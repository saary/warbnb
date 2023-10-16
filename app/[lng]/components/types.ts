import { ReactElement } from "react";

export enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export interface ICategory {
  label: string;
  description: string;
  renderIcon: (size?: number) => ReactElement,
}
