import clsx from "clsx";

import style from './MaxWidthWrapper.module.scss'

interface MaxWidthWrapperProps {
    className?: string;
    children: React.ReactNode;
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
    return (
        <div className={clsx(style.wrapper, className)}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
