import Typography from "components/Typography";
import { useEffect, useState } from "react";
import IconEdit from "assets/images/icons/edit-fee.svg";
import { useBoolean } from "helpers/hooks";
import FormUpdateBIO from "../organisms/FormUpdateBIO";
import { BioCardProps } from "../types";

const BioCard = (props: BioCardProps): JSX.Element => {
  const { modelData, idStar, updateStarDetailWhenUpdateBIO, isUpdateBIO } =
    props;
  const [bios, setBios] = useState<{ name: string; value: string }[]>([]);
  const openFormEdit = useBoolean();
  useEffect(() => {
    if (!modelData) {
      return;
    }
    const arrModel: { name: string; value: string }[] = [];
    const newModel = JSON.parse(modelData);
    for (const [key, valueObj] of Object.entries(newModel)) {
      arrModel.push({
        name: key,
        value: String(valueObj) ? String(valueObj) : "",
      });
    }
    setBios(arrModel);
  }, [modelData]);

  const handleOpenForm = (value: boolean) => () => {
    openFormEdit.setValue(value);
  };

  return (
    <div className={`flex flex-col mt-3`}>
      <div className="flex items-center mb-3">
        <Typography
          variant="h5"
          textColor="text-black"
          fontWeight="font-semibold"
        >
          BIO
        </Typography>
        {isUpdateBIO ? (
          <img
            src={IconEdit}
            onClick={handleOpenForm(true)}
            alt="icon"
            className="cursor-pointer ml-2"
          />
        ) : null}
      </div>

      {bios.length
        ? bios.map((bio, index) => (
            <div key={index} className={`flex`}>
              <p
                className="text-black-02-custom font-normal text-sm flex"
                dangerouslySetInnerHTML={{
                  __html: bio.value
                    ? bio.value.replace(/<[^>]*>?/gm, "")
                    : "No data",
                }}
              />
            </div>
          ))
        : null}
      {openFormEdit.value ? (
        <FormUpdateBIO
          openForm={openFormEdit.value}
          onClose={() => openFormEdit.setValue(false)}
          modelData={bios.length ? bios[0].value : ""}
          idStar={idStar}
          updateStarDetailWhenUpdateBIO={updateStarDetailWhenUpdateBIO}
        />
      ) : null}
    </div>
  );
};

export default BioCard;
