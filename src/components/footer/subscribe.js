export default function SubscribeComponent() {
    return(
        <div className="flex flex-col mt-20 md:flex-row w-full items-center md:items-end">
            <div className="flex flex-col gap-1 md:gap-2.5 text-center md:text-left mb-6 md:mb-0 md:pr-10">
                <h1 className="color-text-primary font-bold text-xl md:text-2xl">Subscribe</h1>
                <h2 className="color-text-primary text-sm md:text-md">Join our weekly newsletter</h2>
            </div>
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5">
                <input
                    className="flex-grow rounded-lg body-color-background color-text-on-background p-2.5 md:p-3 text-sm md:text-base"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                />
                <button
                    type="submit"
                    className="font-bold body-color-primary p-2.5 md:p-3 color-text-background text-sm md:text-base w-full sm:w-fit rounded-lg whitespace-nowrap"
                >
                    Subscribe
                </button>
            </div>
        </div>
    )
}