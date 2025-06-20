import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from "./HeaderRightBlock.module.scss";
import { useAuthStore } from "@src/store/useAuthStore";

export const HeaderRightBlock = () => {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const { profile } = useAuthStore();

    const isAuthenticated = !!profile;

    // 👇 ручной контроль для некоторых иконок (временно)
    const showHeartIcon = true;
    const showMessageIcon = false;
    const showAddAutoButton = true;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        router.replace(`?searchHeader=${event.target.value}`);
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            router.push(`/search?searchHeader=${searchText}`);
            setSearchText("");
        }
    };

    const handleImageClick = () => {
        router.push(`/search?searchHeader=${searchText}`);
        setSearchText("");
    };

    const handleClick = () => {
        router.push("/login");
    };

    console.log(profile);

    return (
        <div className={style.search}>
            <div className={style.container}>
                {isAuthenticated ? (
                    <>
                        {showHeartIcon && (
                            <div onClick={handleClick} className={style.heart}>
                                <Image
                                    width={20}
                                    height={20}
                                    src="/images/headerImg/heart.svg"
                                    alt="heart"
                                />
                            </div>
                        )}

                        {showMessageIcon && (
                            <div className={style.message}>
                                <Image
                                    width={20}
                                    height={20}
                                    src="/images/headerImg/message.svg"
                                    alt="message"
                                />
                            </div>
                        )}

                        <Link href="/profile/details" className={style.user}>
                            <Image
                                width={20}
                                height={20}
                                src="/images/headerImg/user.svg"
                                alt="user"
                            />
                        </Link>

                        {showAddAutoButton && (
                            <div className={style.createAds}>
                                <Image
                                    width={20}
                                    height={20}
                                    src="/images/headerImg/plus.svg"
                                    alt="plus"
                                />
                                <Link href="/profile/new_auto">Добавить Атомобиль</Link>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div onClick={handleClick} className={style.heart}>
                            <Image
                                width={20}
                                height={20}
                                src="/images/headerImg/heart.svg"
                                alt="heart"
                            />
                        </div>

                        <div className={style.createAds}>
                            <Link href="/login">Войти</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
