import { useTranslation } from 'react-i18next';
import Button from "./ui/Button";
import type { PaymentSuccessProps } from '../types/PaymentSuccessProps';

export default function PaymentSuccess({onClose}: PaymentSuccessProps){
    const { t } = useTranslation();

    return (
        <div className="h-dvh w-dvw absolute z-[100] flex items-center justify-center backdrop-blur-sm bg-black/70">
            <div className="text-center">
                <img width={300} height={300} src="/images/PartyPopper.webp" alt="Party Pooper Animation" />
                <h2 className="text-white font-semibold text-[36px]">{t('you_got_it')}</h2>
                <p className="h4 !text-white">{t('purchase_on_the_way')}</p>
                <Button onClick={onClose} variant="primary" size="big" className="w-full mt-15 bg-white !text-black">{t('awesome')}</Button>
            </div>
        </div>
    )
}
