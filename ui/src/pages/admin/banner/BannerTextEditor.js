import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./BannerTextEditor.scss";

const BannerTextEditor = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (content.endsWith("\n")) {
      content = content.slice(0, -1);
    }
    onChange(content);
  };

  return <Editor
    editorState={editorState}
    editorClassName="demo-editor"
    wrapperClassName="demo-wrapper"
    onEditorStateChange={onEditorStateChange}
    toolbar={{
      options: ["inline", "link", "emoji", "history"]
    }}
  />
}

export default BannerTextEditor;
