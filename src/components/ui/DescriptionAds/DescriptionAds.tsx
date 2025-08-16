import style from "./DescriptionAds.module.scss";

interface DescriptionAdsProps {
    description?: string;
}

export const DescriptionAds = ({ description }: DescriptionAdsProps) => {
    if (!description) {
        return null;
    }

    return (
        <div className={style.container}>
            <p className={style.title}>Описание</p>
            <p className={style.desc}>{description}</p>
        </div>
    );
};
