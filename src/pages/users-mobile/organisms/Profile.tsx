import Typography from "components/Typography";
import { formatDate } from "helpers/util";
import _ from "lodash";
import TitleStarCard from "pages/stars/molecules/TitleStarCard";
import { FC, memo } from "react";

type Props = {
  firstName?: string;
  lastName?: string;
  dob?: string;
  phone?: string;
  bio?: string;
  contactEmail?: string;
  gender?: string;
  email?: string;
};
const Profile: FC<Props> = ({
  firstName,
  lastName,
  dob,
  phone,
  bio,
  email,
  contactEmail,
  gender,
}) => {
  const profile = [
    {
      label: "Full name:",
      value:
        firstName || lastName
          ? `${firstName?.trim()} ${lastName?.trim()}`
          : "Spaceman",
    },
    {
      label: "Gender:",
      value: _.upperFirst(gender),
    },
    {
      label: "Date of Birth:",
      value: dob ? formatDate(dob, "MMM dd yyyy") : "",
    },
    {
      label: "Phone Number:",
      value: phone,
    },
    {
      label: "Email: ",
      value: email || contactEmail,
    },
  ];
  if (email) {
    profile.push({
      label: "Contact Email:",
      value: contactEmail,
    });
  }
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumnGap: 10,
        }}
      >
        {profile.map((p) => (
          <TitleStarCard
            key={p.label}
            label={p.label}
            message={p.value || "N/A"}
            rootClassName="mb-3"
          />
        ))}
      </div>
      <TitleStarCard
        label="Bio: "
        message={bio || "N/A"}
        rootClassMessage="max-w-455-custom"
      />
    </div>
  );
};

export default memo(Profile);
