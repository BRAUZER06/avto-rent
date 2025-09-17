"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableImage } from "../ui/SortableImage/SortableImage";
import { categoriesAuto, CategoryAutoItem } from "@src/data/categoriesAuto";
import { createCar } from "@src/lib/api/carService";
import { Notification, useNotification } from "../ui/Notification/Notification";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";
import { FiTrash2, FiPlus } from "react-icons/fi";
import ImageTooltip from "../ui/ImageTooltip/ImageTooltip";
import { forbiddenCharsRegex } from "@src/lib/hooks/forbiddenCharsRegex";

const MAX_IMAGES = 25;

export const ProfileCreateAuto = () => {
    const trimmedCategories: CategoryAutoItem[] = categoriesAuto.slice(1);
    const { notification, showNotification } = useNotification();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [fuel, setFuel] = useState("");
    const [transmission, setTransmission] = useState("");
    const [engineCapacity, setEngineCapacity] = useState("");
    const [horsepower, setHorsepower] = useState("");
    const [year, setYear] = useState("");
    const [drive, setDrive] = useState("");
    const [hasAirConditioner, setHasAirConditioner] = useState(false);
    const [driverOnly, setDriverOnly] = useState(false);

    const [category, setCategory] = useState("");
    const [images, setImages] = useState<any[]>([]);
    const [customFields, setCustomFields] = useState([
        { key: "Аренда авто на день", value: "" },
    ]);
    const [isLoading, setIsLoading] = useState(false);

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

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id !== over.id) {
            const oldIndex = images.findIndex(img => img.id === active.id);
            const newIndex = images.findIndex(img => img.id === over.id);
            setImages(prev => arrayMove(prev, oldIndex, newIndex));
        }
    };

    const handleAddCustomField = () => {
        setCustomFields([...customFields, { key: "", value: "" }]);
    };

    const handleChangeCustomField = (
        index: number,
        field: "key" | "value",
        value: string
    ) => {
        const updated = [...customFields];
        updated[index][field] = value;
        setCustomFields(updated);
    };
    useEffect(() => {
        return () => {
            images.forEach(img => URL.revokeObjectURL(img.preview));
        };
    }, [images]);

    useEffect(() => {
        setCustomFields(prev => {
            const updatedFields = [...prev];
            if (updatedFields.length > 0) {
                updatedFields[0] = {
                    key: "Аренда авто на день",
                    value: pricePerDay ? `${pricePerDay}₽` : "",
                };
            }
            return updatedFields;
        });
    }, [pricePerDay]);

    const handleSaveCar = async () => {
        const requiredFields = [
            { field: title, name: "Название" },
            { field: location, name: "Город" },
            { field: pricePerDay, name: "Цена" },
            { field: category, name: "Категория" },
            { field: fuel, name: "Тип топлива" },
            { field: transmission, name: "Коробка передач" },
            { field: engineCapacity, name: "Объем двигателя" },
            { field: horsepower, name: "Лошадиные силы" },
            { field: year, name: "Год выпуска" },
            { field: drive, name: "Привод" },
        ];

        const emptyFields = requiredFields.filter(i => !i.field).map(i => i.name);
        if (emptyFields.length > 0) {
            showNotification(
                `Заполните обязательные поля: ${emptyFields.join(", ")}`,
                "error"
            );
            return;
        }

        if (images.length === 0) {
            showNotification("Добавьте хотя бы одно изображение", "error");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();

            // Основные поля с encodeURIComponent
            formData.append("title", title);
            formData.append("location", location);

            formData.append("price", pricePerDay);
            formData.append("category", category);
            formData.append("fuel_type", fuel);
            formData.append("horsepower", horsepower);
            formData.append("drive", drive);
            formData.append("transmission", transmission);
            formData.append("engine_capacity", engineCapacity);
            formData.append("year", year);
            formData.append("has_air_conditioner", hasAirConditioner.toString());
            formData.append("driver_only", driverOnly.toString());
            formData.append("description", description);

            customFields.forEach(({ key, value }) => {
                if (key.trim() !== "" && value.trim() !== "") {
                    formData.append(`custom_fields[${key}]`, value);
                }
            });

            images.forEach(img => {
                if (img.file) formData.append("car_images[]", img.file);
            });

            formData.append(
                "image_positions",
                JSON.stringify(
                    images.map((_, index) => ({ id: null, position: index + 1 }))
                )
            );

            await createCar(formData);
            showNotification("Автомобиль успешно добавлен!", "success");

            // Сброс формы
            setTitle("");
            setLocation("");
            setPricePerDay("");
            setCategory("");
            setImages([]);
            setCustomFields([{ key: "Аренда авто на день", value: "" }]);
            setFuel("");
            setDrive("");
            setHorsepower("");
            setDescription("");
            setEngineCapacity("");
            setYear("");
            setHasAirConditioner(false);
        } catch (err) {
            console.error("Ошибка:", err);
            showNotification("Ошибка при добавлении авто", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (id: string) => {
        if (id === "air_conditioner") {
            setHasAirConditioner(prev => !prev);
        }
    };

    const handleRemoveCustomField = (index: number) => {
        if (index > 0) {
            setCustomFields(prev => prev.filter((_, i) => i !== index));
        }
    };
    // --- Безопасное обновление title/location ---
    const handleTitleChange = (value: string) => {
        setTitle(value.replace(forbiddenCharsRegex, ""));
    };

    const handleLocationChange = (value: string) => {
        setLocation(value.replace(forbiddenCharsRegex, ""));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold">Добавление автомобиля</h1>

            <div className="space-y-4">
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Название (например: Mercedes-Benz E-Class 2023)"
                    value={title}
                    onChange={e => handleTitleChange(e.target.value)}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Город (например: Грозный)"
                    value={location}
                    onChange={e => handleLocationChange(e.target.value)}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Цена в сутки (₽)"
                    type="number"
                    value={pricePerDay}
                    onChange={e => setPricePerDay(e.target.value)}
                />

                {/* Категория с плейсхолдером */}
                <select
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="" disabled>
                        Выберите категорию
                    </option>
                    {trimmedCategories.map(cat => (
                        <option key={cat.id} value={cat.slug}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <p className="font-semibold mb-2">
                    Фотографии ({images.length}/{MAX_IMAGES}){" "}
                    <p className="text-sm text-zinc-200">
                        Пример как нужно&nbsp;фотографировать&nbsp;авто&nbsp;
                        <ImageTooltip
                            text="вот тут"
                            src="/assets/redactAvto/vertikalPhone.webp"
                            alt="Toyota Camry, белая, вид спереди"
                        />{" "}
                    </p>
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
                {/* Топливо */}
                <select
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={fuel}
                    onChange={e => setFuel(e.target.value)}
                >
                    <option value="" disabled>
                        Тип топлива
                    </option>
                    <option value="бензин">Бензин</option>
                    <option value="дизель">Дизель</option>
                    <option value="гибрид">Гибрид</option>
                    <option value="электро">Электро</option>
                </select>

                {/* Трансмиссия */}
                <select
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={transmission}
                    onChange={e => setTransmission(e.target.value)}
                >
                    <option value="" disabled>
                        Коробка передач
                    </option>
                    <option value="механика">Механика</option>
                    <option value="автомат">Автомат</option>
                    <option value="вариатор">Вариатор</option>
                </select>

                {/* Привод */}
                <select
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={drive}
                    onChange={e => setDrive(e.target.value)}
                >
                    <option value="" disabled>
                        Привод
                    </option>
                    <option value="передний">Передний</option>
                    <option value="задний">Задний</option>
                    <option value="полный">Полный</option>
                </select>

                <input
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Объём двигателя"
                    value={engineCapacity}
                    onChange={e => setEngineCapacity(e.target.value)}
                />
                <input
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Лошадиные силы"
                    value={horsepower}
                    onChange={e => setHorsepower(e.target.value)}
                />
                <input
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Год выпуска"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />

                <OptionCheckbox.MobileVersionOne
                    id="air_conditioner"
                    title="Есть кондиционер"
                    checked={hasAirConditioner}
                    handleCheckboxChange={handleCheckboxChange}
                />
                <OptionCheckbox.MobileVersionOne
                    id="driver_only"
                    title="Только с водителем"
                    checked={driverOnly}
                    handleCheckboxChange={() => setDriverOnly(prev => !prev)}
                    tooltip="Сдается исключительно только с водителем"
                />
            </div>

            <div className="space-y-2 mt-6 mb-6 p-4 border rounded-md border-zinc-700 bg-zinc-900">
                <p className="font-semibold">Дополнительные характеристики</p>
                {customFields.map((field, index) => (
                    <div key={index} className="flex  md:flex-row gap-2 items-center">
                        <div className="flex flex-col md:flex-row gap-2 w-full">
                            <input
                                className="border rounded px-2 py-1 w-full md:w-1/2 bg-zinc-800 text-white border-zinc-600"
                                placeholder="Ключ"
                                value={field.key}
                                onChange={e =>
                                    handleChangeCustomField(index, "key", e.target.value)
                                }
                                disabled={index === 0} // Первое поле нельзя редактировать
                            />
                            <input
                                className="border rounded px-2 py-1 w-full md:flex-1 bg-zinc-800 text-white border-zinc-600"
                                placeholder="Значение"
                                value={field.value}
                                onChange={e =>
                                    handleChangeCustomField(
                                        index,
                                        "value",
                                        e.target.value
                                    )
                                }
                                disabled={index === 0} // Первое поле нельзя редактировать
                            />
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveCustomField(index)}
                                className="text-red-500 hover:text-red-400  transition-colors"
                                aria-label="Удалить поле"
                            >
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    className="text-blue-600 text-sm mt-1 flex items-center gap-1"
                    onClick={handleAddCustomField}
                    type="button"
                >
                    <FiPlus className="w-4 h-4" />
                    Добавить поле
                </button>
            </div>

            <div>
                <p className="font-semibold mb-2">
                    Краткое описание{" "}
                    <span style={{ color: "gray", fontWeight: "400" }}>
                        (при необходимости)
                    </span>
                </p>
                <textarea
                    className="w-full h-[100px] border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600 resize-none"
                    placeholder="Просторный и комфортный седан с мощным двигателем и плавным ходом..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div>
                <button
                    className={`bg-blue-600 text-white px-6 py-2 rounded transition ${
                        isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                    onClick={handleSaveCar}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Сохранение...
                        </span>
                    ) : (
                        "Сохранить автомобиль"
                    )}
                </button>
            </div>

            <Notification notification={notification} />
        </div>
    );
};
