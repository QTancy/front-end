export default function HeaderSubHeader({header,subHeader,subColor}) {
    return (
        <div className="w-full  flex justify-center items-center flex-col gap-2">
            <h1 className={`color-text-primary font-bold text-6xl`}>{header}</h1>
            <p className={`font-bold color-text-${subColor}`}>{subHeader}</p>
        </div>
    )
    
}