import {NotLogoPlaceholder, Placeholder} from "~/components/Placeholder";

export function ProfilePlaceholder() {
    return (
        <>
            <div className="flex flex-col h-full pt-10 px-4">
                <div className="text-center space-y-2 animate-pulse">
                    <NotLogoPlaceholder width="120px" height="120px" /> {/* Adjusted width/height based on w-30 h-30 */}
                    <Placeholder width="128px" height="24px" /> {/* Adjusted width/height based on h-6 w-32 */}
                </div>
                <div className="mt-8 pb-24 h-full">
                    <h3>History</h3>
                    <div className="space-y-3 mt-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex items-center justify-between rounded-lg animate-pulse">
                                <div className="flex items-center space-x-3">
                                    <Placeholder width="60px" height="60px" />
                                    <div className="space-y-1">
                                        <Placeholder width="96px" height="12px" /> {/* Adjusted width/height based on h-3 w-24 */}
                                        <Placeholder width="128px" height="16px" /> {/* Adjusted width/height based on h-4 w-32 */}
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <Placeholder width="64px" height="12px" /> {/* Adjusted width/height based on h-3 w-16 */}
                                    <Placeholder width="80px" height="16px" /> {/* Adjusted width/height based on h-4 w-20 */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
