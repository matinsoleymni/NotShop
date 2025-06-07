import Button from "./ui/Button";
import type { PaymentSuccessProps } from '../types/PaymentSuccessProps';

export default function PaymentSuccess({onClose}: PaymentSuccessProps){

    return (
        <div className="h-dvh w-dvw absolute z-[100] flex items-center justify-center backdrop-blur-sm bg-black/70">
            <div className="text-center">
                <img width={300} height={300} src="/images/PartyPopper.webp" alt="Party Pooper Animation" />
                <h2 className="text-white font-semibold text-[36px]">You Got It!</h2>
                <p className="h4 !text-white">Your purchase is on the way</p>
                <Button onClick={onClose} variant="primary" size="big" className="w-full mt-15 bg-white !text-black">Awesome</Button>
            </div>
        </div>
    )
}
