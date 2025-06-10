import { shareURL } from "@telegram-apps/sdk";
import Button from "./ui/Button";
import Shear from "../assets/icons/share.svg?react";
import type { ShareProps } from '../types/ShareProps';
import { useTranslation } from "react-i18next";

export default function Share({ id, title }: ShareProps) {
    const { t } = useTranslation();
    const handleShare = async () => {
        try {
            await shareURL("https://t.me/notStore24Bot?startapp=product_"+id, title);
        } catch (error) {
            alert(t('share_error'))
            console.error("Failed to share product:", error);
        }
    };
    return (
        <Button variant="ghost" size="small" onClick={handleShare} className="cursor-pointer bg-transparent !p-0">
            <Shear className="fill-black dark:fill-white" />
        </Button>
    );
}
