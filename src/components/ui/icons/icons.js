import Image from "next/image";

export default function IconsWrapper({icon,alt}) {
    
    return(
        <span
            className="flex bg-white px-3.5 py-2.5 w-fill rounded-md items-center justify-center hover:cursor-pointer"
        >
            <Image
                src={icon.type.src}
                alt={alt}
                width={icon.type.width}
                height={icon.type.height}
            />
        </span>
    )
}