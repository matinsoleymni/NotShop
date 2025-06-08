import {NotLogoPlaceholder, Placeholder} from "~/components/Placeholder";

export function HomeProductsPlaceholder() {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 !pb-24 ">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={`placholder-container` + index}
                        className="space-y-2"
                    >
                        <NotLogoPlaceholder
                            key={`placholder-image` + index}
                            width="100%"
                            height="160px"
                        />
                        <Placeholder
                            key={`placholder-title` + index}
                            width="100%"
                            height="20px"
                        />
                        <Placeholder
                            key={`placholder-price` + index}
                            width="100%"
                            height="12px"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
