/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromRaw, } from "draft-js";
import IconEditorBold from "assets/images/icons/icon-editor-bold.svg";
import IconEditorItalic from "assets/images/icons/icon-editor-italic.svg";
import IconEditorUnderline from "assets/images/icons/icon-editor-underline.svg";
import IconEditorColor from "assets/images/icons/icon-editor-color.svg";
import IconEditorListUnordered from "assets/images/icons/icon-editor-list-unordered.svg";
import IconEditorListOrdered from "assets/images/icons/icon-editor-list-ordered.svg";
import IconEditorAlignTextLeft from "assets/images/icons/icon-editor-align-text-left.svg";
import IconEditorAlignTextCenter from "assets/images/icons/icon-editor-align-text-center.svg";
import IconEditorAlignTextRight from "assets/images/icons/icon-editor-align-text-right.svg";
import IconEditorAlignTextJustify from "assets/images/icons/icon-editor-align-text-justify.svg";
import { startsWith, isString, debounce } from "lodash";
import htmlToDraft from "html-to-draftjs";
import { useBoolean } from "helpers/hooks";
import Typography from "components/Typography";
const InputEditor = (props) => {
    const { setValue, value, optionsInput, label, required, editorStyle, containerStyle, wrapperStyle, toolbarStyle, } = props;
    const isFocus = useBoolean();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    useEffect(() => {
        try {
            if (!value) {
                setEditorState(EditorState.createEmpty());
                return;
            }
            if (value === JSON.stringify(convertToRaw(editorState.getCurrentContent()))) {
                return;
            }
            const newValue = value
                ? startsWith(value, "blocks", 2)
                    ? JSON.parse(value)
                    : value
                : "";
            let contentState = null;
            if (isString(newValue)) {
                const blocksFromHtml = htmlToDraft(newValue);
                const { contentBlocks, entityMap } = blocksFromHtml;
                contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            }
            else {
                contentState = convertFromRaw(newValue);
            }
            setEditorState(EditorState.createWithContent(contentState));
        }
        catch (e) {
            setEditorState(EditorState.createEmpty());
        }
        // eslint-disable-next-line
    }, [value]);
    const onEditorStateChange = (newEditorState) => {
        if (isFocus.value) {
            setEditorState(newEditorState);
            debounceSearch(newEditorState);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(debounce((newSearch) => {
        setValue(JSON.stringify(convertToRaw(newSearch.getCurrentContent())));
    }, 300), []);
    const uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({ data: { link: reader.result } });
            reader.onerror = (error) => reject(error);
        });
    };
    return (<div className="card-input-editor pl-6 pr-0.5 pt-1 pb-74-custom root-draft-editor custom-toolbar-editor relative" style={containerStyle}>
      {label ? (<Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="text-xs">
          {label}
          {required && <span className="text-red-500"> (*)</span>}
        </Typography>) : null}
      <Editor toolbarStyle={toolbarStyle} wrapperStyle={wrapperStyle} editorStyle={editorStyle} toolbarHidden={optionsInput?.length === 0} editorState={editorState} toolbarClassName="input-editor-toolbar" editorClassName="input-editor-class height-editor" onEditorStateChange={onEditorStateChange} onFocus={() => isFocus.setValue(true)} onBlur={() => isFocus.setValue(false)} toolbar={{
            options: optionsInput
                ? optionsInput
                : [
                    "fontFamily",
                    "fontSize",
                    "inline",
                    "colorPicker",
                    "list",
                    "textAlign",
                    "link",
                    "image",
                ],
            image: {
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                alt: { present: true, mandatory: false },
                inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            },
            inline: {
                options: ["bold", "italic", "underline"],
                bold: { icon: IconEditorBold, className: "editor-bold" },
                italic: { icon: IconEditorItalic, className: "editor-bold" },
                underline: { icon: IconEditorUnderline, className: "editor-bold" },
            },
            list: {
                options: ["unordered", "ordered"],
                unordered: { icon: IconEditorListUnordered },
                ordered: { icon: IconEditorListOrdered },
            },
            textAlign: {
                options: ["left", "center", "right", "justify"],
                left: { icon: IconEditorAlignTextLeft },
                center: { icon: IconEditorAlignTextCenter },
                right: { icon: IconEditorAlignTextRight },
                justify: { icon: IconEditorAlignTextJustify },
            },
            colorPicker: {
                icon: IconEditorColor,
                colors: [
                    "rgb(97,189,109)",
                    "rgb(26,188,156)",
                    "rgb(84,172,210)",
                    "rgb(44,130,201)",
                    "rgb(147,101,184)",
                    "rgb(71,85,119)",
                    "rgb(204,204,204)",
                    "rgb(65,168,95)",
                    "rgb(0,168,133)",
                    "rgb(61,142,185)",
                    "rgb(41,105,176)",
                    "rgb(85,57,130)",
                    "rgb(40,50,78)",
                    "rgb(0,0,0)",
                    "rgb(247,218,100)",
                    "rgb(251,160,38)",
                    "rgb(235,107,86)",
                    "rgb(226,80,65)",
                    "rgb(163,143,132)",
                    "rgb(239,239,239)",
                    "rgb(255,255,255)",
                    "rgb(250,197,28)",
                    "rgb(243,121,52)",
                    "rgb(209,72,65)",
                    "rgb(184,49,47)",
                    "rgb(124,112,107)",
                    "rgb(209,213,216)",
                ],
            },
        }}/>
    </div>);
};
export default InputEditor;
