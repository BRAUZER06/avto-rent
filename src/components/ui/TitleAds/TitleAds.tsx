import style from "./TitleAds.module.scss";

interface TitleAdsProps {
    title?: string;
    driverOnly?: boolean | null;
}

export const TitleAds = ({ title, driverOnly }: TitleAdsProps) => {
    if (!title) return null;

    return (
        <div className={style.container}>
            <h1 className={style.title}>
                {title}
                {driverOnly && (
                    <span className={style.driverOnly}>(c&nbsp;водителем)</span>
                )}
            </h1>
        </div>
    );
};
