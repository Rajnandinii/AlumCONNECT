import React from "react";
const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

function About(){
    return (
        <>  
            <section className="bg-gray-200 dark:bg-gray-950 pt-20 lg:pt-24 text-blue-gray-950 dark:text-gray-50 ">
                <div className=" flex flex-col items-center px-5 pt-4 pb-0 mx-16">
                    <div className="flex flex-col w-full mb-8 prose text-left max-w-max lg:max-w-2xl">
                        <div className="w-full mx-auto">
                            <h1 className="text-4xl font-extrabold">A small headline to switch your visitors into users.</h1>
                            <h2 className="py-6 text-2xl font-bold">A small headline to switch your visitors into users.</h2>
                            <p>Right. Say that again. No, no, George, look, it's just an act, right? Okay, so 9:00 you're strolling through the parking lot, you see us struggling in the car, you walk up, you open the door and you say, your line, George. Stop it. We're gonna take a little break but we'll be back in a while so, don't nobody go no where.</p>
                        </div>
                    </div>
                </div>
                <div className=" items-center w-full px-16">
                    <div className="flex flex-wrap justify-center w-full prose mx-auto max-w-max lg:max-w-3xl">
                        <div className="relative justify-center lg:px-4">
                            <div className="lg:grid lg:grid-cols-2">
                                <div className="p-8">
                                    <h1 className="text-3xl font-extrabold">Short length headline.</h1>
                                    <p>You're about to launch soon and must be 100% focused on your product. Don't loose precious days designing, coding the landing page and testing .</p>
                                    <a href="#" className={`inline-flex items-center mt-4 font-semibold text-${theme_color} lg:mb-0 hover:text-neutral-600`} title="read more"> Read More » </a>
                                </div>
                                <div className="p-8">
                                    <h1 className="text-3xl font-extrabold">Short length headline.</h1>
                                    <p>You're about to launch soon and must be 100% focused on your product. Don't loose precious days designing, coding the landing page and testing .</p>
                                    <a href="#" className={`inline-flex items-center mt-4 font-semibold text-${theme_color} lg:mb-0 hover:text-neutral-600`} title="read more"> Read More » </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About