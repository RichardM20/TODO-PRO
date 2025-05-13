"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";

import { useEffect, useRef, useState } from "react";

import { IType } from "@dashboard/types/type.type";
import { ITaskContentEditionProps } from "@features/dashboard/types/taskEdition.type";
import LoadingButton from "@shared/components/buttons/LoadingButton";
import GenericDropdown from "@shared/components/genericDropdown";

const TaskContentEdition = (props: ITaskContentEditionProps) => {
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [type, setType] = useState<IType | undefined>(
    props.task?.type ?? undefined
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current && props.isModalVisible) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          },
        },
        placeholder: "Write here",
      });

      if (props.task?.content) {
        quill.clipboard.dangerouslyPasteHTML(props.task.content);
        setOriginalContent(props.task.content);
        setContent(props.task.content);
      }

      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });

      quillRef.current = quill;
    }

    return () => {
      quillRef.current = null;
    };
  }, [props.task, props.isModalVisible]);

  const handleOnChangeType = (val: IType) => {
    setType(val);
  };

  const handleOnClick = () => {
    if (content === originalContent) return;
    if (type) {
      props.onSave(content, type);
    }
  };

  const handleCloseModal = () => {
    props.setIsModalVisible(false);
    props.onCancel();
  };

  if (!props.isModalVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
        props.isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`w-full max-w-max mx-auto p-4 bg-white rounded-xl transition-transform duration-300 ease-in-out ${
          props.isLoading ? "scale-95" : "scale-100"
        }`}
      >
        <div className="relative">
          {props.isLoading && (
            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10"></div>
          )}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div ref={editorRef} className="min-h-34 mb-4"></div>
            {props.types && (
              <div className="flex flex-row mt-4 gap-4">
                <GenericDropdown
                  defaultValue={props.task?.type}
                  onSelect={handleOnChangeType}
                  types={props.types}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-row gap-4 justify-end">
          <LoadingButton
            buttonText="Save changes"
            buttonTextLoading="Saving..."
            isLoading={props.isLoading}
            disabled={props.isLoading || content === originalContent}
            onClick={handleOnClick}
          />
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskContentEdition;
