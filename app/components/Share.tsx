import { shareURL } from "@telegram-apps/sdk";
import Button from "./ui/Button";
import Shear from "../assets/icons/share.svg?react";

interface ShareProps {
    id: number|string;
    title: string
}

export default function Share({ id, title }: ShareProps) {
    const handleShare = async () => {
        try {
            alert("Sharing product...");
            await shareURL("https://example.com/product/"+id, title);
            console.log("Product shared successfully!");
        } catch (error) {
            console.error("Failed to share product:", error);
        }
    };
    return (
        <Button variant="ghost" size="small" onClick={handleShare} className="cursor-pointer">
            <Shear className="fill-black dark:fill-white" />
        </Button>
    );
}
