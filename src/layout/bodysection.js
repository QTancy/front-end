import Button from "@/components/ui/buttons/buttons";
import { QRepLogo } from "@/icons";
import Image from "next/image";

export default function BodySection() {
    return(
        <div className="w-full flex justify-center mt-20 ">
            <div className="max-w-[1273px] w-full flex flex-col justify-center gap-30 mb-25 ">
                <div className="w-full flex justify-center items-center flex-col gap-2">
                    <h1 className="color-text-primary font-bold text-6xl">Our Services!</h1>
                    <p className="font-bold text-white">A Key for Helping Your Business</p>
                </div>
                <div className="w-full flex flex-row justify-between gap-6 justify-center p-10 items-center">
                    <div className="w-full flex flex-col justify-start body-color-primary p-5 rounded-3xl">
                        <div>
                            <Image
                                src={QRepLogo.src}
                                alt="Qrep Logo"
                                width={QRepLogo.width}
                                height={QRepLogo.height}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="text-bold text-2xl">QRep</h1>
                            <p className="text-md text-justify">Ditch manual entry! QCap s AI instantly extracts data from your receipts and invoices. Transform paper clutter into accurate digital records effortlessly, freeing up your UMKMs valuable time for what truly matters - your business.</p>
                        </div>
                        <div className="w-full">
                            <Button color="secondary" text="Try Now"/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start body-color-primary p-5 rounded-3xl" >
                        <div>
                            <Image
                                src={QRepLogo.src}
                                alt="Qrep Logo"
                                width={QRepLogo.width}
                                height={QRepLogo.height}
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="text-bold text-2xl">QRep</h1>
                            <p className="text-md text-justify">Ditch manual entry! QCap s AI instantly extracts data from your receipts and invoices. Transform paper clutter into accurate digital records effortlessly, freeing up your UMKMs valuable time for what truly matters - your business.</p>
                        </div>
                        <div className="w-full">
                            <Button color="secondary" text="Try Now"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}