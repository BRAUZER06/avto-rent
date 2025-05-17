import { FullMobileScreenOverlay } from "@src/components/ui/FullMobileScreenOverlay/FullMobileScreenOverlay";
import { MobileSelectCheckboxGroup } from "@src/components/ui/MobileSelectCheckboxGroup/MobileSelectCheckboxGroup";

import style from "./MobileFilter.module.scss";

export const MobileFilter = ({
    title,
    data,
    toggleFilter,
    isOpen,
    toggleCheckbox,
    resetAllFilters,
    counter,
}: {
    title: string;
    data: any[];
    toggleFilter: any;
    isOpen: any;
    toggleCheckbox: (id: string) => void;
    resetAllFilters: () => void;
    counter: number;
}) => {
    return (
        <div className={style.container}>
            <FullMobileScreenOverlay isOpen={isOpen}>
                <MobileSelectCheckboxGroup
                    counter={counter}
                    toggleFilter={toggleFilter}
                    isOpen={isOpen}
                    title={title}
                    data={data}
                    toggleCheckbox={toggleCheckbox}
                    resetAllFilters={resetAllFilters}
                />
            </FullMobileScreenOverlay>
        </div>
    );
};
