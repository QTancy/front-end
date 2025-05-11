import Button from "@/components/ui/buttons/buttons";
import { ReceiptLogo } from "@/icons";
import Image from "next/image";

export default function HeroSection() {
    return(
        <div className="w-full flex justify-center">
            <div className="max-w-[1273px] w-full flex flex-row justify-between ">
                <div className="w-full flex flex-col justify-between">
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-6xl font-bold">
                            SNAP! a Receipt
                        </h1>
                        <h1 className="text-6xl font-bold">
                            Get <span className="color-text-primary">Instant Report</span>
                        </h1>
                    </div>
                    <div className="flex flex-col text-left gap-2.5 ">
                        <p className="text-xl color-text-secondary font-bold">A Smarter Way to Grow Your Small Business</p>
                        <p className="text-justify text-md">With Receipt AI, turn paper receipts into powerful insights—track spending, monitor sales, and make better decisions in seconds. Perfect for small businesses looking to save time and stay organized.</p>
                    </div>
                    <div className="flex justify-center items-center w-full my-2"  >
                        <Button color="secondary" text= "Try Now"  />
                    </div>
                </div>
                <div className="w-full flex justify-end items-center">
                    <Image
                        src={ReceiptLogo.src}
                        alt="Receipt Logo"
                        width={ReceiptLogo.width}
                        height={ReceiptLogo.height}
                    />
                </div>
            </div>
        </div>
    );
}