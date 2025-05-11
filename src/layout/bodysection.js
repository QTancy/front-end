import HeaderSubHeader from "@/components/header/header-subheader";
import Features from "@/components/ui/features/feature";
import SectionWraper from "@/components/ui/wrapper/section-wraper";
import { QRepLogo } from "@/icons";

export default function BodySection() {
    return(
        <SectionWraper className={"flex-col mt-20 gap-30"}> 
            <HeaderSubHeader header={"Our Services!"} subHeader={"A Key for Helping Your Business"} subColor={"background"}/>
            <div className="w-full flex flex-row justify-between gap-6 justify-center p-10 items-center">
                <Features logo={QRepLogo} featureName={"QCap"} description={"Ditch manual entry! QCap's AI instantly extracts data from your receipts and invoices. Transform paper clutter into accurate digital records effortlessly, freeing up your UMKM's valuable time for what truly matters – your business."}/>
                <Features logo={QRepLogo} featureName={"QRep"} description={"Ditch manual entry! QCap's AI instantly extracts data from your receipts and invoices. Transform paper clutter into accurate digital records effortlessly, freeing up your UMKM's valuable time for what truly matters – your business."}/>
            </div>
        </SectionWraper>
    );
}