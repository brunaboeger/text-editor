import React, { useState } from "react";

const ChapterTabs = ({
  chapters,
  activeChapter,
  onSelectChapter,
  onAddChapter,
  onRenameChapter,
}: any) => {
  const [editingChapterId, setEditingChapterId] = useState<number | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState("");

  const handleRename = (chapter: any) => {
    onRenameChapter(chapter.id, newChapterTitle);
    setEditingChapterId(null);
    setNewChapterTitle("");
  };

  return (
    <div className="flex items-center border-b mb-2">
      {chapters.map((chapter: any, index: number) => (
        <div
          key={chapter.id}
          className={`flex items-center cursor-pointer px-4 py-2 ${
            activeChapter?.id === chapter.id
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          } hover:bg-gray-300`}
        >
          {editingChapterId === chapter.id ? (
            <div className="flex items-center w-full">
              <input
                type="text"
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                className="border px-2 py-1 flex-1"
              />
              <button
                onClick={() => handleRename(chapter)}
                className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          ) : (
            <span
              onDoubleClick={() => {
                setEditingChapterId(chapter.id);
                setNewChapterTitle(chapter.title);
              }}
              onClick={() => onSelectChapter(chapter)}
              className="flex-1"
            >
              {chapter.title || `Capítulo ${index + 1}`}
            </span>
          )}
        </div>
      ))}
      <button
        onClick={onAddChapter}
        className="ml-auto px-4 py-2 bg-green-500 text-white hover:bg-green-600"
      >
        + Novo Capítulo
      </button>
    </div>
  );
};

export default ChapterTabs;
