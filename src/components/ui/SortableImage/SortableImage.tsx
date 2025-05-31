"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export const SortableImage = ({ id, url, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative group touch-none"
        >
            <Image
                src={url}
                alt="preview"
                width={200}
                height={150}
                className="rounded object-cover aspect-[4/3]"
            />
            <button
                onClick={onRemove}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs hidden group-hover:flex items-center justify-center"
            >
                ✕
            </button>
        </div>
    );
};
