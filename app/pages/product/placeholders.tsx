import BottomNavigation from "~/components/BottomNavigation";
import GeneralHeader from "~/components/GeneralHeader";
import {NotLogoPlaceholder, Placeholder} from "~/components/Placeholder";

export function ProductPlaceholder() {
    return (
        <>
            <GeneralHeader title="Loading..." icons={[]} />
            <div className="flex flex-col px-4 pb-24 animate-pulse">
                <Placeholder width="100%" height="60px" />
                <div className="flex flex-wrap pt-4 pb-5 gap-2">
                    <Placeholder width="80px" height="24px" />
                    <Placeholder width="64px" height="24px" />
                    <Placeholder width="96px" height="24px" />
                </div>
                <NotLogoPlaceholder width="100%" height="288px" />
                <div className="flex w-full gap-2 pt-4 overflow-x-auto">
                    <NotLogoPlaceholder width="100px" height="100px" />
                    <NotLogoPlaceholder width="100px" height="100px" />
                    <NotLogoPlaceholder width="100px" height="100px" />
                </div>
            </div>
            <BottomNavigation className="gap-3">
                <Placeholder width="100%" height="48px" />
                <Placeholder width="100%" height="48px" />
            </BottomNavigation>
        </>
    );
}
