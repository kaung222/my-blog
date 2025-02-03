import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import lexical, { ElementFormatType, TextFormatType } from "lexical";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { Button } from "./ui/button";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const applyFormat = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const toggleBlockType = (blockType: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, blockType);
  };

  const toggleList = (listType: string) => {
    editor.dispatchCommand(
      listType === "bullet"
        ? INSERT_UNORDERED_LIST_COMMAND
        : INSERT_ORDERED_LIST_COMMAND,
      undefined
    );
  };

  const removeList = () => {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  };

  const insertLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const removeLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  };

  return (
    <div className="toolbar">
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => applyFormat("bold")}
      >
        Bold
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => applyFormat("italic")}
      >
        Italic
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => applyFormat("strikethrough")}
      >
        Underline
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleBlockType("start")}
      >
        start
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleBlockType("end")}
      >
        end
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleBlockType("center")}
      >
        center
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleBlockType("justify")}
      >
        justify
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleBlockType("left")}
      >
        left
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleBlockType("right")}
      >
        right
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleList("bullet")}
      >
        Bullet List
      </Button>
      <Button
        type="button"
        className="text-slate-600"
        onClick={() => toggleList("number")}
      >
        Numbered List
      </Button>
      <Button type="button" className="text-slate-600" onClick={removeList}>
        Remove List
      </Button>
      <Button type="button" className="text-slate-600" onClick={insertLink}>
        Insert Link
      </Button>
      <Button type="button" className="text-slate-600" onClick={removeLink}>
        Remove Link
      </Button>
    </div>
  );
}
