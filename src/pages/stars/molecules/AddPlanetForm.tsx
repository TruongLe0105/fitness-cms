import InputDefault from "components/Input/InputDefault";
import React from "react";
import { AddStarProps } from "../types";

const AddPlanetForm = ({
  inputs,
  handleChangeInput,
  inputStyle,
}: AddStarProps) => {
  return (
    <div>
      <div className="grid grid-cols-5 mb-6 gap-5 items-end">
        <InputDefault
          label="Horizontal Id"
          required
          value={inputs.planet.horizons_id || ""}
          onChange={handleChangeInput("planet", "horizons_id")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Type"
          required
          value={inputs.planet.type || ""}
          onChange={handleChangeInput("planet", "type")}
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Radius"
          required
          value={inputs.planet.radius || ""}
          onChange={handleChangeInput("planet", "radius")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Color"
          required
          value={inputs.planet.color || ""}
          onChange={handleChangeInput("planet", "color")}
          placeholder="1.0, 0.964, 0.914"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Vmag"
          value={inputs.planet.vmag || ""}
          onChange={handleChangeInput("planet", "vmag")}
          type="number"
          inputStyle={inputStyle}
        />
      </div>

      <div className="grid grid-cols-5 mb-6 gap-5 items-end">
        <InputDefault
          label="Parent"
          value={inputs.planet.parent || ""}
          onChange={handleChangeInput("planet", "parent")}
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Albedo"
          value={inputs.planet.albedo || ""}
          onChange={handleChangeInput("planet", "albedo")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Rotation Obliquity"
          value={inputs.planet.rot_obliquity || ""}
          onChange={handleChangeInput("planet", "rot_obliquity")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Rotation Period"
          value={inputs.planet.rot_period || ""}
          onChange={handleChangeInput("planet", "rot_period")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Rotation Offset"
          value={inputs.planet.rot_offset || ""}
          onChange={handleChangeInput("planet", "rot_offset")}
          type="number"
          inputStyle={inputStyle}
        />
      </div>

      <div className="grid grid-cols-5 mb-6 gap-5 items-end">
        <InputDefault
          label="Rotation Pole Declination"
          value={inputs.planet.rot_pole_de || ""}
          onChange={handleChangeInput("planet", "rot_pole_de")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Rotation Pole Right Ascension"
          value={inputs.planet.rot_pole_ra || ""}
          onChange={handleChangeInput("planet", "rot_pole_ra")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Rings Inner Radius"
          value={inputs.planet.rings_inner_radius || ""}
          onChange={handleChangeInput("planet", "rings_inner_radius")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Rings Outer Radius"
          value={inputs.planet.rings_outer_radius || ""}
          onChange={handleChangeInput("planet", "rings_outer_radius")}
          type="number"
          inputStyle={inputStyle}
        />
        <InputDefault
          label="Orbit"
          value={inputs.planet.orbit || ""}
          onChange={handleChangeInput("planet", "orbit")}
          inputStyle={inputStyle}
        />
      </div>

      <div className="grid grid-cols-5 mb-6 gap-5 items-end">
        <InputDefault
          label="Mass"
          value={inputs.planet.mass || ""}
          onChange={handleChangeInput("planet", "mass")}
          type="number"
          inputStyle={inputStyle}
        />
      </div>
    </div>
  );
};

export default AddPlanetForm;
