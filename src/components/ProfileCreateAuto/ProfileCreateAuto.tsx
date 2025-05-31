"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableImage } from "../ui/SortableImage/SortableImage";
import { categoriesAuto, CategoryAutoItem } from "@src/data/categoriesAuto";

const MAX_IMAGES = 25;

export const ProfileCreateAuto = () => {
    const trimmedCategories: CategoryAutoItem[] = categoriesAuto.slice(1);

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [category, setCategory] = useState("premium");
    const [images, setImages] = useState([]);
    const [customFields, setCustomFields] = useState([
        { key: "Аренда", value: "на день" },
    ]);
    const [fuel, setFuel] = useState("бензин");
    const [drive, setDrive] = useState("задний");
    const [horsepower, setHorsepower] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        onDrop: acceptedFiles => {
            const newImages = acceptedFiles
                .slice(0, MAX_IMAGES - images.length)
                .map(file => ({
                    id: uuidv4(),
                    file,
                    preview: URL.createObjectURL(file),
                }));
            setImages(prev => [...prev, ...newImages]);
        },
        maxFiles: MAX_IMAGES,
    });

    const removeImage = id => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = event => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = images.findIndex(img => img.id === active.id);
            const newIndex = images.findIndex(img => img.id === over.id);
            setImages(prev => arrayMove(prev, oldIndex, newIndex));
        }
    };

    const handleAddCustomField = () => {
        setCustomFields([...customFields, { key: "", value: "" }]);
    };

    const handleChangeCustomField = (index, field, value) => {
        const updated = [...customFields];
        updated[index][field] = value;
        setCustomFields(updated);
    };

    useEffect(() => {
        setCustomFields(prev => {
            const withoutRental = prev.filter(f => f.key !== "Аренда авто на день");
            return [
                {
                    key: "Аренда авто на день",
                    value: pricePerDay ? `${pricePerDay}₽` : "",
                },
                ...withoutRental,
            ];
        });
    }, [pricePerDay]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold">Добавление автомобиля</h1>

            <div className="space-y-4">
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Название (например: Mercedes-Benz E-Class 2023)"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Город (например: Назрань)"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Цена в сутки (₽)"
                    type="number"
                    value={pricePerDay}
                    onChange={e => setPricePerDay(e.target.value)}
                />
                <select
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    {trimmedCategories.map(cat => (
                        <option key={cat.id} value={cat.slug}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <p className="font-semibold mb-2">
                    Фотографии ({images.length}/{MAX_IMAGES})
                </p>
                <div
                    {...getRootProps()}
                    className="border border-dashed rounded p-6 text-center cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-all"
                >
                    <input {...getInputProps()} />
                    <p className="text-sm">
                        📷 Перетащите изображения сюда или нажмите для выбора
                    </p>
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={images.map(img => img.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4 touch-manipulation">
                            {images.map(img => (
                                <SortableImage
                                    key={img.id}
                                    id={img.id}
                                    url={img.preview}
                                    onRemove={() => removeImage(img.id)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={fuel}
                    onChange={e => setFuel(e.target.value)}
                >
                    <option value="бензин">Бензин</option>
                    <option value="дизель">Дизель</option>
                    <option value="гибрид">Гибрид</option>
                    <option value="электро">Электро</option>
                </select>
                <input
                    type="number"
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Лошадиные силы"
                    value={horsepower}
                    onChange={e => setHorsepower(e.target.value)}
                />
                <select
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={drive}
                    onChange={e => setDrive(e.target.value)}
                >
                    <option value="передний">Передний</option>
                    <option value="задний">Задний</option>
                    <option value="полный">Полный</option>
                </select>
            </div>

            <div className="space-y-2 mt-6 mb-6 p-4 border rounded-md border-zinc-700 bg-zinc-900">
                <p className="font-semibold">Дополнительные характеристики</p>
                {customFields.map((field, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-2">
                        <input
                            className="border rounded px-2 py-1 w-full md:w-1/2 bg-zinc-800 text-white border-zinc-600"
                            placeholder="Ключ (например: Цвет)"
                            value={field.key}
                            onChange={e =>
                                handleChangeCustomField(index, "key", e.target.value)
                            }
                            readOnly={field.key === "Аренда авто на день"}
                        />
                        <input
                            className="border rounded px-2 py-1 w-full md:w-1/2 bg-zinc-800 text-white border-zinc-600"
                            placeholder="Значение (например: Чёрный)"
                            value={field.value}
                            onChange={e =>
                                handleChangeCustomField(index, "value", e.target.value)
                            }
                            readOnly={field.key === "Аренда авто на день"}
                        />
                    </div>
                ))}
                <button
                    className="text-blue-600 text-sm mt-1"
                    onClick={handleAddCustomField}
                    type="button"
                >
                    + Добавить поле
                </button>
            </div>

            <div>
                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => alert("Форму можно отправить")}
                >
                    Сохранить автомобиль
                </button>
            </div>
        </div>
    );
};
