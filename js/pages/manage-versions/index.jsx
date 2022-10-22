import ButtonDefault from "components/Button/ButtonDefault";
import InputDefault from "components/Input/InputDefault";
import Table from "components/Table/Table";
import { useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import React from "react";
import useVersionsHook from "./hooks/useVersionsHook";
import DestroyDialog from "./organisms/DeleteDialog";
import FormDialog from "./organisms/FormDialog";
import { renderHeader } from "./organisms/Header";
import ViewDialog from "./organisms/ViewDialog";
const ManageVersionPage = () => {
    const { handleChangePage, limit, orderBy, orderDirection, page, search, handleChangeSort, handleChangeInputSearch, searchParamRequest, } = useTable();
    const [refetch, setRefetch] = React.useState(0);
    const { totalVersion, versions, isLoading } = useVersionsHook({
        page: page.value,
        limit: limit.value,
        search: searchParamRequest.value,
        refetch,
    });
    const convertData = () => versions.map((el, index) => ({
        ...el,
        stt: (page.value - 1) * limit.value + index + 1,
    }));
    const [type, setType] = React.useState("");
    const [selected, setSelected] = React.useState(null);
    const onOpenDialog = (item, newType) => {
        setSelected(item);
        setType(newType);
    };
    const onClose = () => {
        setSelected(null);
        setType("");
    };
    const onRefetch = React.useCallback(() => setRefetch(new Date().getTime()), []);
    return (<PageLayout title="Manage Versions" childrenAction={<div className="flex items-center justify-between h-full pr-8">
          <ButtonDefault widthButton="w-140-custom" onClick={() => setType("add")}>
            Add version
          </ButtonDefault>
          <InputDefault label="" value={search.value} onChange={handleChangeInputSearch} classInput="bg-gray-02-custom rounded-xl pl-4 pr-4 border-0 font-medium text-xs-custom"/>
        </div>}>
      <Table limit={limit.value} page={page.value} countItems={totalVersion} headers={renderHeader((item) => onOpenDialog(item, "view"), (item) => onOpenDialog(item, "edit"), (item) => onOpenDialog(item, "delete"))} handleChangePage={handleChangePage} data={convertData()} handleChangeSort={handleChangeSort} orderBy={orderBy.value} orderDirection={orderDirection.value} isLoadingTable={isLoading} rowStyle={{
            display: "flex",
            alignItems: "center",
        }}/>
      {type === "add" ? (<FormDialog openPopup={type === "add"} onClose={onClose} item={null} onRefetch={onRefetch}/>) : null}
      {type === "view" && selected ? (<ViewDialog openPopup={type === "view"} onClose={onClose} item={selected}/>) : null}
      {type === "edit" ? (<FormDialog openPopup={type === "edit"} onClose={onClose} item={selected} onRefetch={onRefetch}/>) : null}
      {type === "delete" ? (<DestroyDialog openPopup={type === "delete"} onClose={onClose} item={selected} onRefetch={onRefetch}/>) : null}
    </PageLayout>);
};
export default React.memo(ManageVersionPage);
