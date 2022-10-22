import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import InputDefault from "components/Input/InputDefault";
import { useBoolean } from "helpers/hooks";
import { cloneDeep } from "lodash";
import React from "react";
import ReactSwitch from "react-switch";
import { addKeywordCategoryMiddleware, deleteKeywordCategoryMiddleware, getKeywordCategoryMiddleware, updateKeywordCategoryMiddleware, } from "../../keywords/services/api";
import DeleteKeywordCategoryDialog from "./DeleteKeywordCategoryDialog";
const KeywordCategoryPage = () => {
    const isLoading = useBoolean();
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        const getKeywordCategories = async () => {
            isLoading.setValue(true);
            const rs = await getKeywordCategoryMiddleware();
            setCategories(rs);
            isLoading.setValue(false);
        };
        getKeywordCategories();
    }, []);
    const [deleteCategory, setDeleteCategory] = React.useState(null);
    const onAdd = (newCategory) => {
        setCategories((pre) => [...pre, newCategory]);
    };
    const onUpdate = (id, newCategory) => {
        const newCategories = cloneDeep(categories).map((el) => el.id === id ? newCategory : el);
        setCategories(newCategories);
    };
    const onDelete = (id) => {
        deleteKeywordCategoryMiddleware(id, isLoading.setValue, () => {
            const newCategories = cloneDeep(categories).filter((el) => el.id !== id);
            setCategories(newCategories);
            setDeleteCategory(null);
        });
    };
    const openDeleteDialog = (id) => {
        const item = categories.find((el) => el.id === id);
        if (item) {
            setDeleteCategory(item);
        }
    };
    return (<div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(700px, 1fr))",
            gap: 10,
        }}>
      {categories.map((el) => (<KeywordCategoryItem key={el.id} id={el.id} data={{
                name: el.name,
                hide: el.hide,
            }} onAdd={onAdd} onUpdate={onUpdate} onDelete={openDeleteDialog}/>))}
      <KeywordCategoryItem id={0} data={{
            name: "",
            hide: false,
        }} onAdd={onAdd} onUpdate={onUpdate} onDelete={openDeleteDialog}/>
      {isLoading.value ? <BackdropCustomize /> : null}
      {deleteCategory ? (<DeleteKeywordCategoryDialog openPopup={!!deleteCategory} onClose={() => setDeleteCategory(null)} onSubmit={() => onDelete(deleteCategory.id)}/>) : null}
    </div>);
};
export default KeywordCategoryPage;
const KeywordCategoryItem = (props) => {
    const { id, data, onAdd, onUpdate, onDelete } = props;
    const [form, setForm] = React.useState({ ...data });
    const { value: isLoading, setValue: setLoading } = useBoolean();
    React.useEffect(() => {
        setForm({ ...data });
    }, [data]);
    const handleChangeInput = (e) => {
        setForm({
            ...form,
            name: e.target.value,
        });
    };
    const handleSubmit = () => {
        if (!id) {
            addKeywordCategoryMiddleware(form, setLoading, (value) => {
                onAdd(value);
                setForm({ name: "", hide: false });
            });
        }
        else {
            updateKeywordCategoryMiddleware(id, form, setLoading, (value) => {
                onUpdate(id, value);
            });
        }
    };
    const onReset = () => {
        setForm({ ...data });
    };
    const handleDelete = () => {
        onDelete(id);
    };
    const checkDisableBtn = (type) => {
        switch (type) {
            case "save":
            case "reset":
                if (type === "save" && !form.name.trim()) {
                    return true;
                }
                return form.name.trim() === data.name && form.hide === data.hide;
            case "delete":
                return !form.name.trim();
        }
    };
    return (<div style={{
            display: "flex",
            alignItems: "end",
            background: "#ffffff",
            borderRadius: 20,
            boxShadow: "0px 0px 5px rgb(0 0 0 / 5%)",
            padding: 20,
            minWidth: 700,
            maxWidth: 700,
        }}>
      <div style={{ flexGrow: 1, width: 0 }}>
        <InputDefault label="Category" required value={form.name} onChange={handleChangeInput} rootStyle={{
            width: "100%",
        }}/>
      </div>
      <div style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 20,
        }}>
        {data.name || form.name ? (<>
            <label style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}>
              <span style={{
                fontSize: 13,
                position: "absolute",
                top: -18,
                zIndex: 1,
            }}>
                Hide
              </span>
              <ReactSwitch checked={form.hide} onChange={(checked) => setForm({ ...form, hide: checked })} uncheckedIcon={false} checkedIcon={false}/>
            </label>
            <ButtonDefault style={{ width: 75, marginLeft: 5 }} disabled={checkDisableBtn("save")} onClick={handleSubmit}>
              Save
            </ButtonDefault>
            <ButtonDefault style={{ width: 75, marginLeft: 5, marginRight: 5 }} disabled={checkDisableBtn("reset")} onClick={onReset}>
              Reset
            </ButtonDefault>

            <ButtonDefault style={{ width: 75 }} disabled={checkDisableBtn("delete")} onClick={handleDelete}>
              Delete
            </ButtonDefault>
          </>) : null}
        {isLoading ? <BackdropCustomize /> : null}
      </div>
    </div>);
};
