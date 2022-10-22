/* eslint-disable @typescript-eslint/no-explicit-any */
import BackdropCustomize from "components/BackdropCustomize";
import DialogCard from "components/Dialog/DialogCard";
import Typography from "components/Typography";
import { useBoolean, useString } from "helpers/hooks";
import { STATUS_RESPONSE_CODE } from "types";
import { importKeywordMiddleware } from "../services/api";
const FormImport = (props) => {
    const { updateListKeywordWhenImport, openForm, onClose } = props;
    const isLoading = useBoolean();
    const keyInputFile = useString();
    const submitFile = (currentFile) => {
        keyInputFile.setValue(Math.random().toString(36));
        isLoading.setValue(true);
        importKeywordMiddleware({
            file: currentFile,
        }, (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                updateListKeywordWhenImport();
                onClose();
            }
        });
    };
    const fileSelectedHandler = (event) => {
        const currentFiles = [];
        if (event.target.files) {
            for (const [, file] of Object.entries(event.target.files)) {
                currentFiles.push(file);
            }
        }
        submitFile(currentFiles[0]);
    };
    const handleDownloadFileSample = () => {
        const link = document.createElement("a");
        link.href = `/keyword.csv`;
        link.setAttribute("download", "Sample Import Keyword");
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
    };
    const onDrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const { files } = event.dataTransfer;
        if (typeof files !== "object") {
            return;
        }
        const newFiles = Object.values(files) || [];
        if (newFiles.length) {
            submitFile(newFiles[0]);
        }
    };
    const onDragEnter = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
    };
    const onDragOver = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
    };
    const onDragLeave = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
    };
    return (<DialogCard openPopup={openForm} disablePopup handleCLoseDialog={onClose} title="Import CSV file">
      <div className="flex flex-col" onDrop={onDrop} onDragEnter={onDragEnter} onDragOver={onDragOver} onDragLeave={onDragLeave}>
        <div>
          <input id="container-files-import-keyword" onChange={fileSelectedHandler} accept=".csv" type="file" style={{ display: "none" }} key={keyInputFile.value || ""}/>
          <label htmlFor="container-files-import-keyword">
            <div className="flex items-center justify-center card-import cursor-pointer">
              <Typography textColor="text-black" fontWeight="font-medium">
                Add or drop files
              </Typography>
            </div>
          </label>
        </div>
        <div className="flex items-center mt-4">
          <p className="text-xs text-gray-custom italic cursor-pointer" onClick={handleDownloadFileSample}>
            <span className="text-primary-custom underline mr-1">
              Download the sample file
            </span>
            to see what you can import!
          </p>
        </div>
      </div>

      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
export default FormImport;
