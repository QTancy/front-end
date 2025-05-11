import { CallPrimaryLogo, EmailPrimaryLogo, FacebookPrimaryLogo, GithubPrimaryLogo, InstagramPrimaryLogo, LocationPrimaryLogo, PieChartLogo } from "@/icons";
import Image from "next/image";
import ButtonLink from "../ui/buttons/buttons-link";

export default function OtherLinkComponent() {
    return(
        <div className="flex flex-row items-center justify-center w-full gap-16">
            <div className="flex items-center">
                <Image
                    src={PieChartLogo.src}
                    alt="Pie Chart Logo"
                    width={PieChartLogo.width}
                    height={PieChartLogo.height}
                />
            </div>
            <div className="flex flex-col color-text-primary">
                <p className="text-2xl">Useful Link</p>
                <a className="text-lg">Home</a>
                <a className="text-lg">Services</a>
                <a className="text-lg">FAQ</a>
            </div>
            <div className="flex flex-col color-text-primary">
                <p className="text-2xl">Contact Info</p>
                <ButtonLink icon={CallPrimaryLogo} alt={"Call Logo"} text={"089232142124"} />
                <ButtonLink icon={EmailPrimaryLogo} alt={"Email Logo"} text={"qtancy@gmail.com"} />
                <ButtonLink icon={LocationPrimaryLogo} alt={"Location Logo"} text={"Sudirman Street Jakarta, Indonesia"} />
            </div>
            <div className="flex flex-col color-text-primary">
                <p className="text-2xl">Social Media</p>
                <div className="flex flex-row py-3">
                    <ButtonLink icon={FacebookPrimaryLogo} alt={"Facebook Logo"} text={""} />
                    <ButtonLink icon={GithubPrimaryLogo} alt={"Github Logo"} text={""} />
                    <ButtonLink icon={InstagramPrimaryLogo} alt={"Instagram Logo"} text={""} />
                </div>
            </div>
        </div>
    )
}