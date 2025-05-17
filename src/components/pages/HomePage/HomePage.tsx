"use client";
import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "@src/utils/api/hooks/useDebounce";

import { updateHomePageQueryParams } from "@src/lib/helpers/queryParams/updateHomePageQueryParams";
import { useScrollToBottom } from "@src/utils/api/hooks/useScrollToBottom";

import { fetchHomePage } from "@src/lib/api/homePage";
import { HomePageDashboard } from "@src/components/HomePageDashboard/HomePageDashboard";
import { CountAndSearchWrapper } from "@src/components/CountAndSearchWrapper/CountAndSearchWrapper";


import style from "./HomePage.module.scss";

export default function HomePage() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [hasSearchParams, setHasSearchParams] = useState(!!searchParams.toString());

    const [inputSearch, setInputSearch] = useState<string>("");

    const [data, setData] = useState<any[]>([]);

    const [paginationData, setPaginationData] = useState<any>({
        totalDocs: 0,
        limit: 20,
        totalPages: 0,
        page: 1,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
    });

    const debounceInput = useDebounce(inputSearch, 300);

    let queryParams = updateHomePageQueryParams(debounceInput);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearch(event.target.value);
        setHasSearchParams(false);
    };

    // подгрузка постов когда меняется queryParams
    useEffect(() => {
        if (!hasSearchParams) {
            replace(` ?${queryParams}`);
        }

        (async function fetchData() {
            const { ads, ...paginateData }: any = await fetchHomePage(queryParams);

            if (ads) setData(ads);
            if (paginateData) setPaginationData(paginateData as any);
        })();
    }, [queryParams]);

    //подгрузка постов при скролле
    const isNearBottom = useScrollToBottom();
   
    

    useEffect(() => {
      
        if (isNearBottom && !!paginationData?.nextPage) {
          
            (async function fetchData() {
                const { ads, ...paginateData }: any = await fetchHomePage(
                    `${queryParams}&page=${paginationData?.nextPage}`
                );

                if (ads) setData(prev => [...prev, ...ads]);

                if (paginateData) setPaginationData(paginateData as any);
            })();
        }
    }, [isNearBottom]);

   

    return (
        <>
        
            <CountAndSearchWrapper
                handleInputChange={handleInputChange}
                paginationData={paginationData}
                inputSearch={inputSearch}
            />

            <div className={style.containerHomePage}>
                <div className={style.containerFilters}>
                    <div className={style.desktopContainer}></div>
                    <div className={style.mobileContainer}></div>
                </div>

                <HomePageDashboard ads={data} />
            </div>
        </>
    );
}
