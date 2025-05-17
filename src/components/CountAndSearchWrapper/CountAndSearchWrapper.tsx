import { memo } from "react";
import { SearchBig } from "../SearchBig/SearchBig";
import { NamePagesAndCountItems } from "../ui/NamePagesAndCountItems/NamePagesAndCountItems";
import style from "./CountAndSearchWrapper.module.scss";

interface CountAndSearchWrapperProps {
    paginationData: {
        totalDocs: number;
    };
    inputSearch: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CountAndSearchWrapper: React.FC<CountAndSearchWrapperProps> = memo(
    ({ paginationData, inputSearch, handleInputChange }) => {
        return (
            <div className={style.containerSearch}>
                <NamePagesAndCountItems
                    text="Объявления"
                    count={paginationData?.totalDocs}
                />

                <div className={style.searchAndBtnContainer}>
                    <SearchBig value={inputSearch} handleOnChange={handleInputChange} />

                </div>
            </div>
        );
    }
);
// export const CountAndSearchWrapper: React.FC<CountAndSearchWrapperProps> = memo(
//     ({ paginationData, inputSearch, handleInputChange }) => {
//         return (
//             <div className={style.containerSearch}>
//                 <NamePagesAndCountItems
//                     text="Объявления"
//                     count={paginationData.totalDocs}
//                 />

//                 <div className={style.searchAndBtnContainer}>
//                     <SearchBig value={inputSearch} handleOnChange={handleInputChange} />

//                     {/* <div className={style.btnAds}>Разместить объявление</div> */}
//                 </div>
//             </div>
//         );
//     }
// );
