import type { Dispatch, SetStateAction } from "react";

export interface SearchInputProps {
    setShowSearch: Dispatch<SetStateAction<boolean>>;
    isVisible: boolean;
}
