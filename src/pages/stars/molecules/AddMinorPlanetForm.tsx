import InputDefault from "components/Input/InputDefault";
import React from "react";
import { AddStarProps } from "../types";

const AddMinorPlanetForm = ({
  inputs,
  handleChangeInput,
  inputStyle,
}: AddStarProps) => {
  return (
    <div>
      <div className="grid grid-cols-5 mb-6 gap-5 items-end">
        <InputDefault
          label="Absolute Magnitude"
          required
          value={inputs.asteroid.H || ""}
          onChange={handleChangeInput("asteroid", "H")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Magnitude Slope"
          required
          value={inputs.asteroid.G || ""}
          onChange={handleChangeInput("asteroid", "G")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Epoch"
          required
          value={inputs.asteroid.Epoch || ""}
          onChange={handleChangeInput("asteroid", "Epoch")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Inclination"
          required
          value={inputs.asteroid.i || ""}
          onChange={handleChangeInput("asteroid", "i")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Node"
          required
          value={inputs.asteroid.Node || ""}
          onChange={handleChangeInput("asteroid", "Node")}
          type="number"
          inputStyle={inputStyle}
        />
      </div>

      <div className="grid grid-cols-5 mb-6 gap-5 items-end">
        <InputDefault
          label="Peri"
          required
          value={inputs.asteroid.Peri || ""}
          onChange={handleChangeInput("asteroid", "Peri")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Semimajor Axis"
          required
          value={inputs.asteroid.a || ""}
          onChange={handleChangeInput("asteroid", "a")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Mean Motion"
          required
          value={inputs.asteroid.n || ""}
          onChange={handleChangeInput("asteroid", "n")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Eccentricity"
          required
          value={inputs.asteroid.e || ""}
          onChange={handleChangeInput("asteroid", "e")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Mean Anomaly"
          required
          value={inputs.asteroid.M || ""}
          onChange={handleChangeInput("asteroid", "M")}
          type="number"
          inputStyle={inputStyle}
        />
      </div>
    </div>
  );
};

export default AddMinorPlanetForm;
