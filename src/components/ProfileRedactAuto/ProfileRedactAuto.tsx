// @src/components/ProfileRedactAuto/ProfileRedactAuto.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
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
import { deletePhotoCar, getCarById, updateCar } from "@src/lib/api/carService";
import { Notification, useNotification } from "../ui/Notification/Notification";
import OptionCheckbox from "../ui/OptionCheckbox/OptionCheckbox";
import { FiTrash2, FiPlus, FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";

const MAX_IMAGES = 25;

type ImageType = {
    id: string;
    file: File | null;
    preview: string;
    existingId?: number; // Для существующих изображений из БД
};

type CustomFieldType = {
    key: string;
    value: string;
};

export const ProfileRedactAuto = ({ carId }: { carId: string }) => {
    const trimmedCategories: CategoryAutoItem[] = categoriesAuto.slice(1);
    const { notification, showNotification } = useNotification();
    const router = useRouter();

    // Состояния для данных автомобиля
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Состояния формы
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [fuel, setFuel] = useState("бензин");
    const [transmission, setTransmission] = useState("автомат");
    const [engineCapacity, setEngineCapacity] = useState("");
    const [horsepower, setHorsepower] = useState("");
    const [year, setYear] = useState("");
    const [drive, setDrive] = useState("передний");
    const [hasAirConditioner, setHasAirConditioner] = useState(false);
    const [category, setCategory] = useState("premium");
    const [images, setImages] = useState<ImageType[]>([]);
    const [customFields, setCustomFields] = useState<CustomFieldType[]>([
        { key: "Аренда авто на день", value: "" },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const baseUrl = mediaUrlHelper();

    // Загрузка данных автомобиля
    const fetchCarData = useCallback(async () => {
        if (!carId) {
            setError("ID автомобиля не предоставлен");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const carData = await getCarById(carId);

            if (!carData) {
                throw new Error("Автомобиль не найден");
            }

            setInitialData(carData);
            setTitle(carData.title || "");
            setDescription(carData.description || "");
            setLocation(carData.location || "");
            setPricePerDay(carData.price || "");
            setCategory(carData.category || "premium");
            setFuel(carData.fuel_type || "бензин");
            setTransmission(carData.transmission || "автомат");
            setEngineCapacity(carData.engine_capacity || "");
            setHorsepower(carData.horsepower?.toString() || "");
            setYear(carData.year?.toString() || "");
            setDrive(carData.drive || "передний");
            setHasAirConditioner(carData.has_air_conditioner || false);

            // Обработка изображений
            const loadedImages = (carData.car_images || []).map(img => ({
                id: uuidv4(),
                file: null,
                preview: `${baseUrl}/${img.url}`,
                existingId: img.id,
            }));
            console.log("loadedImages", loadedImages);

            setImages(loadedImages);

            // Обработка кастомных полей
            const fields = carData.custom_fields || [];
            const defaultFields =
                fields.length > 0
                    ? fields
                    : [
                          {
                              key: "Аренда авто на день",
                              value: carData.price ? `${carData.price}₽` : "",
                          },
                      ];

            setCustomFields(defaultFields);
        } catch (err) {
            setError(err.message || "Ошибка при загрузке данных");
            console.error("Ошибка загрузки автомобиля:", err);
        } finally {
            setLoading(false);
        }
    }, [carId]);

    useEffect(() => {
        fetchCarData();
    }, [fetchCarData]);

    // Dropzone для загрузки изображений
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
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
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    // Удаление изображения
    // Изменяем функцию removeImage
    const removeImage = async (id: string) => {
        console.log("1");

        try {
            const imageToRemove = images.find(img => img.id === id);

            if (!imageToRemove) return;

            // Если изображение существует на сервере - отправляем запрос на удаление
            if (imageToRemove.existingId) {
                await deletePhotoCar(imageToRemove.existingId);
                showNotification("Изображение удалено", "success");
            }

            // Удаляем изображение из состояния
            setImages(prev => prev.filter(img => img.id !== id));

            // Если это локальный файл - освобождаем память
            if (imageToRemove.file) {
                URL.revokeObjectURL(imageToRemove.preview);
            }
        } catch (err) {
            console.error("Ошибка при удалении изображения:", err);
            showNotification("Ошибка при удалении изображения", "error");
        }
    };

    // Модифицируем SortableImage в рендере:

    // Настройка датчиков для drag-and-drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Обработка перетаскивания изображений
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = images.findIndex(img => img.id === active.id);
        const newIndex = images.findIndex(img => img.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            setImages(prev => arrayMove(prev, oldIndex, newIndex));
        }
    };

    // Управление кастомными полями
    const handleAddCustomField = () => {
        setCustomFields([...customFields, { key: "", value: "" }]);
    };

    const handleChangeCustomField = (
        index: number,
        field: keyof CustomFieldType,
        value: string
    ) => {
        const updated = [...customFields];
        updated[index][field] = value;
        setCustomFields(updated);
    };

    const handleRemoveCustomField = (index: number) => {
        if (index > 0) {
            setCustomFields(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Синхронизация первого кастомного поля с pricePerDay
    useEffect(() => {
        if (customFields.length > 0) {
            const updatedFields = [...customFields];
            updatedFields[0] = {
                key: "Аренда авто на день",
                value: pricePerDay ? `${pricePerDay}₽` : "",
            };
            setCustomFields(updatedFields);
        }
    }, [pricePerDay]);

    // Очистка URL-объектов при размонтировании
    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img.file) {
                    URL.revokeObjectURL(img.preview);
                }
            });
        };
    }, [images]);

    // Валидация формы
    const validateForm = (): boolean => {
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

        const emptyFields = requiredFields
            .filter(item => !item.field)
            .map(item => item.name);

        if (emptyFields.length > 0) {
            showNotification(
                `Заполните обязательные поля: ${emptyFields.join(", ")}`,
                "error"
            );
            return false;
        }

        if (images.length === 0) {
            showNotification("Добавьте хотя бы одно изображение", "error");
            return false;
        }

        return true;
    };

    // Обработка сохранения изменений
    const handleSaveCar = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const formData = new FormData();

            // Основные поля
            formData.append("title", title);
            formData.append("description", description);
            formData.append("location", location);
            formData.append("price", pricePerDay);
            formData.append("category", category);
            formData.append("fuel_type", fuel);
            formData.append("transmission", transmission);
            formData.append("engine_capacity", engineCapacity);
            formData.append("horsepower", horsepower);
            formData.append("year", year);
            formData.append("drive", drive);
            formData.append("has_air_conditioner", hasAirConditioner.toString());

            // Кастомные поля
            customFields.forEach(({ key, value }) => {
                if (key.trim() && value.trim()) {
                    formData.append(`custom_fields[${key}]`, value);
                }
            });

            // Добавляем только новые изображения
            images.forEach(img => {
                if (img.file) {
                    formData.append("car_images[]", img.file);
                }
            });

            // Позиции изображений (включая существующие)
            formData.append(
                "image_positions",
                JSON.stringify(
                    images.map((img, index) => ({
                        id: img.existingId || null, // ID существующего изображения или null для нового
                        position: index + 1,
                    }))
                )
            );

            // Удаленные изображения (если нужно)
            if (initialData?.car_images) {
                const removedImages = initialData.car_images
                    .filter(
                        (dbImg: any) => !images.some(img => img.existingId === dbImg.id)
                    )
                    .map((img: any) => img.id);

                if (removedImages.length > 0) {
                    formData.append("removed_images", JSON.stringify(removedImages));
                }
            }

            await updateCar(carId, formData);
            showNotification("Автомобиль успешно обновлен!", "success");

            // Обновляем данные после сохранения
            await fetchCarData();

            //avto/car/1
        } catch (err) {
            console.error("Ошибка при обновлении:", err);
            showNotification(err.message || "Ошибка при обновлении автомобиля", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Обработка изменения чекбокса
    const handleCheckboxChange = (id: string) => {
        if (id === "air_conditioner") {
            setHasAirConditioner(prev => !prev);
        }
    };

    // Отображение состояния загрузки
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="animate-spin text-2xl text-blue-500" />
                <span className="ml-2">Загрузка данных автомобиля...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Ошибка:</strong> {error}
                    <button
                        onClick={fetchCarData}
                        className="ml-4 text-blue-600 hover:text-blue-800"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold">Редактирование автомобиля</h1>

            {/* Основные поля */}
            <div className="space-y-4">
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Название"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    className="w-full border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    placeholder="Город"
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

            {/* Блок с фотографиями */}
            <div>
                <p className="font-semibold mb-2">
                    Фотографии ({images.length}/{MAX_IMAGES})
                </p>
                <div
                    {...getRootProps()}
                    className="border border-dashed rounded p-6 text-center cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors"
                >
                    <input {...getInputProps()} />
                    <p className="text-sm">
                        📷 Перетащите изображения сюда или нажмите для выбора
                    </p>
                    <p className="text-xs mt-2 text-gray-400">
                        Максимум {MAX_IMAGES} изображений, каждое до 5MB
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
                                    isDeleting={isSubmitting}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Технические характеристики */}
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
                <select
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={transmission}
                    onChange={e => setTransmission(e.target.value)}
                >
                    <option value="механика">Механика</option>
                    <option value="автомат">Автомат</option>
                    <option value="вариатор">Вариатор</option>
                </select>
                <select
                    className="border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600"
                    value={drive}
                    onChange={e => setDrive(e.target.value)}
                >
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
                <OptionCheckbox.MobileVersionTwo
                    id="air_conditioner"
                    title="Есть кондиционер"
                    checked={hasAirConditioner}
                    handleCheckboxChange={handleCheckboxChange}
                />
            </div>

            {/* Дополнительные характеристики */}
            <div className="space-y-2 mt-6 mb-6 p-4 border rounded-md border-zinc-700 bg-zinc-900">
                <p className="font-semibold">Дополнительные характеристики</p>
                {customFields.map((field, index) => (
                    <div key={index} className="flex md:flex-row gap-2 items-center">
                        <div className="flex flex-col md:flex-row gap-2 w-full">
                            <input
                                className="border rounded px-2 py-1 w-full md:w-1/2 bg-zinc-800 text-white border-zinc-600"
                                placeholder="Ключ"
                                value={field.key}
                                onChange={e =>
                                    handleChangeCustomField(index, "key", e.target.value)
                                }
                                disabled={index === 0}
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
                                disabled={index === 0}
                            />
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveCustomField(index)}
                                className="text-red-500 hover:text-red-400 transition-colors"
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
                    disabled={customFields.length >= 10} // Ограничение на количество полей
                >
                    <FiPlus className="w-4 h-4" />
                    Добавить поле
                </button>
            </div>

            {/* Описание */}
            <div>
                <p className="font-semibold mb-2">
                    Краткое описание{" "}
                    <span className="text-gray-400 font-normal">(при необходимости)</span>
                </p>
                <textarea
                    className="w-full h-[100px] border rounded px-4 py-2 bg-zinc-800 text-white border-zinc-600 resize-none"
                    placeholder="Описание автомобиля..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            {/* Кнопка сохранения */}
            <div className="flex justify-end">
                <button
                    className={`bg-blue-600 text-white px-6 py-2 rounded transition flex items-center justify-center min-w-[200px] ${
                        isSubmitting
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-blue-700"
                    }`}
                    onClick={handleSaveCar}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <FiLoader className="animate-spin mr-2" />
                            Сохранение...
                        </>
                    ) : (
                        "Сохранить изменения"
                    )}
                </button>
            </div>

            <Notification notification={notification} />
        </div>
    );
};
