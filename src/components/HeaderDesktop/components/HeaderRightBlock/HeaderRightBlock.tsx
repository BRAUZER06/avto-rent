import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "./HeaderRightBlock.module.scss";
import Link from "next/link";

export const HeaderRightBlock = () => {
    const [searchText, setSearchText] = useState("");
    const { replace, push } = useRouter();
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        replace(`?searchHeader=${event.target.value}`);
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            push(`/search?searchHeader=${searchText}`);
            setSearchText("");
        }
    };

    const handleImageClick = () => {
        push(`/search?searchHeader=${searchText}`);
        setSearchText("");
    };

    const handleClick = () => {
        router.push("/login"); // Редирект на /login
    };

    return (
        <div className={style.search}>
            {/* <div className={style.plug}></div> */}

            <div className={style.container}>
                {false && (
                    <div onClick={handleClick} className={style.heart}>
                        <Image
                            width={20}
                            height={20}
                            src="/images/headerImg/heart.svg"
                            alt="heart"
                        />
                    </div>
                )}

                {false && (
                    <div className={style.message}>
                        <Image
                            width={20}
                            height={20}
                            src="/images/headerImg/message.svg"
                            alt="heart"
                        />
                    </div>
                )}
                {true && (
                    <Link href="/profile/details" className={style.user}>
                        <Image
                            width={20}
                            height={20}
                            src="/images/headerImg/user.svg"
                            alt="heart"
                        />
                    </Link>
                )}
                <div className={style.createAds}>
                    <Image
                        width={20}
                        height={20}
                        src="/images/headerImg/plus.svg"
                        alt="heart"
                    />
                    <Link href="/profile/new_auto">Добавить Атомобиль</Link>
                </div>
            </div>
        </div>
    );
};
