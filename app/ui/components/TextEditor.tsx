"use client";

import { useCallback, useEffect, useState } from "react";
import { createEditor, Descendant, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Button, ButtonGroup } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

export default function TextEditor() {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[]>([]); // estado inicial vazio
  const [isClient, setIsClient] = useState(false); // estado para evitar SSR

  // Garantir que o código roda apenas no cliente

  useEffect(() => {
    setIsClient(true);
    const savedContent = localStorage.getItem("editor-content");
    setValue(
      savedContent
        ? JSON.parse(savedContent)
        : [{ type: "paragraph", children: [{ text: "Escreva algo aqui..." }] }]
    );
  }, []);

  // Salvar no localStorage sempre que o conteúdo mudar

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("editor-content", JSON.stringify(value));
    }
  }, [value, isClient]);

  // Renderiza elementos corretamente

  const renderElement = useCallback(
    ({ attributes, children, element }: any) => {
      switch (element.type) {
        case "paragraph":
          return <p {...attributes}>{children}</p>;
        default:
          return <p {...attributes}>{children}</p>;
      }
    },
    []
  );

  const renderLeaf = useCallback(({ attributes, children, leaf }: any) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    return <span {...attributes}>{children}</span>;
  }, []);

  const toggleFormat = (format: string) => {
    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true }
    );
  };

  const isFormatActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => (n as any)[format] === true,
    });
    return !!match;
  };

  // Função para capturar atalhos de teclado

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "b":
          event.preventDefault();
          toggleFormat("bold");
          break;
        case "i":
          event.preventDefault();
          toggleFormat("italic");
          break;
        case "u":
          event.preventDefault();
          toggleFormat("underline");
          break;
        default:
          break;
      }
    }
  };

  if (!isClient) return <p>Carregando editor...</p>;

  return (
    <div className="flex-column h-full p-container border-gray-100 round-2">
      <ButtonGroup
        variant="outlined"
        aria-label="text formatting"
        className="mb-5"
      >
        <Button onClick={() => toggleFormat("bold")}>
          <FormatBoldIcon />
        </Button>
        <Button onClick={() => toggleFormat("italic")}>
          <FormatItalicIcon />
        </Button>
        <Button onClick={() => toggleFormat("underline")}>
          <FormatUnderlinedIcon />
        </Button>
      </ButtonGroup>
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Editable
          className="h-full border-none"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
}
