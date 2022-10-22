import { StarModelOption } from "../types";

export enum StarModel {
  PLANET = "plan",
  STAR = "star",
  MINOR_PLANET = "mpc_asteroid",
}

export const StarModelOptions: StarModelOption[] = [
  // {
  //   label: "Planet",
  //   value: StarModel.PLANET,
  // },
  {
    label: "Star",
    value: StarModel.STAR,
  },
  {
    label: "Asteroid",
    value: StarModel.MINOR_PLANET,
  },
];
