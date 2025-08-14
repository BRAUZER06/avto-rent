"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export const SortableImage = ({ id, url, onRemove, isDeleting }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    });

    console.log("url", url);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative group touch-none"
            {...attributes}
        >
            <div {...listeners} className="cursor-move">
                <img
                    src={url}
                    alt="preview"
                    className="rounded object-cover aspect-[4/3] w-full h-auto"
                />
            </div>
            <button
                onClick={e => {
                    e.stopPropagation();

                    e.preventDefault();
                    if (!isDeleting) onRemove();
                    onRemove(id);
                }}
                disabled={isDeleting}
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs hidden group-hover:flex items-center justify-center"
            >
                ✕
            </button>
        </div>
    );
};
