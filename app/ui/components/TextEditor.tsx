"use client";

import { useCallback, useState } from "react";
import { createEditor, Descendant, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function TextEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  // Estado inicial do editor
  const [value, setValue] = useState<Descendant[]>(() => [
    {
      type: "paragraph", // Tipo do elemento
      children: [{ text: "Escreva algo aqui..." }], // Nó de texto dentro do parágrafo
    } as SlateElement, // Casting para o tipo correto
  ]);

  // Renderizar cada elemento do editor
  const renderElement = useCallback(
    (props: any) => <p {...props.attributes}>{props.children}</p>,
    []
  );

  return (
    <div className="h-full">
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Editable className="p-2" renderElement={renderElement} />
      </Slate>
    </div>
  );
}
