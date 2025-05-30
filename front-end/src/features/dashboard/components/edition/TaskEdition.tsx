"use client";

import { useEffect, useRef, useState } from "react";

import { IType } from "@dashboard/types/type.type";
import { ITaskContentEditionProps } from "@features/dashboard/types/taskEdition.type";
import SimpleButton from "@shared/components/buttons/SimpleButton";
import GenericDropdown from "@shared/components/GenericDropdown";
import Toast from "@shared/components/toast/Toast";
import "quill/dist/quill.snow.css";

const TaskContentEdition = (props: ITaskContentEditionProps) => {
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState<IType | undefined>(
    props.task?.type ?? undefined
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (!props.isModalVisible) return;

    if (editorRef.current && !quillRef.current) {
      import("quill").then((QuillModule) => {
        const Quill = QuillModule.default;
        const quill = new Quill(editorRef.current!, {
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
      });
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
    } else {
      setToastMessage("Please select a type");
      setShowToast(true);
    }
  };

  const handleCloseModal = () => {
    props.setIsModalVisible(false);
    props.onCancel();
  };

  if (!props.isModalVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
        props.isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-full h-full bg-white flex flex-col">
        <div className="max-w-5xl w-full mx-auto flex flex-col flex-grow p-6">
          <div className="flex flex-col max-h-[800px] overflow-y-auto flex-grow">
            <div ref={editorRef} className="min-h-40 mb-6" />
          </div>

          {props.types && (
            <div className="pb-4 relative z-50">
              <GenericDropdown
                defaultValue={props.task?.type}
                onSelect={handleOnChangeType}
                types={props.types}
              />
            </div>
          )}

          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end gap-4">
            <SimpleButton
              buttonText="Save changes"
              buttonTextLoading="Saving..."
              isLoading={props.isLoading}
              disabled={props.isLoading || content === originalContent}
              onClick={handleOnClick}
            />
            <SimpleButton
              buttonText="Cancel"
              variant="outlined"
              onClick={handleCloseModal}
              disabled={false}
            />
          </div>
        </div>
      </div>
      <Toast
        isVisible={showToast}
        title="Action required"
        onClose={() => setShowToast(false)}
        message={toastMessage}
        type="warning"
      />
    </div>
  );
};

export default TaskContentEdition;
