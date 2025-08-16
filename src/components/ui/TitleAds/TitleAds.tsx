import style from "./TitleAds.module.scss";

interface TitleAdsProps {
    title?: string;
}

export const TitleAds = ({ title }: TitleAdsProps) => {
    if (!title) {
        return null;
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>{title}</h1>
        </div>
    );
};
