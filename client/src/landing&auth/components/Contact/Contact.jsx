import React from "react";
const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

function Contact(){
    return (
        <>  
            <section className="dark:text-gray-400 text-gray-600 bg-gray-200 dark:bg-gray-950 body-font relative">
              <div className="container px-5 pt-24 pb-1 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 dark:bg-gray-900 bg-gray-400 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                  <iframe
                    width="100%"
                    height="100%"
                    title="map"
                    className="absolute inset-0"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Motilal%20Nehru%20National%20Institute%20of%20Technology%20,%20Allahabad&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                    style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.16)' }}
                  ></iframe>
                  <div className="dark:bg-gray-900 bg-gray-300 relative flex flex-wrap py-6 rounded shadow-md">
                    <div className="lg:w-1/2 px-6">
                      <h2 className="title-font font-semibold dark:text-white text-gray-950 tracking-widest text-xs">ADDRESS</h2>
                      <p className="mt-1">MNNIT Allahabad Campus, Teliarganj, Prayagraj, Uttar Pradesh 211004</p>
                    </div>
                    <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                      <h2 className="title-font font-semibold dark:text-white text-gray-950 tracking-widest text-xs">EMAIL</h2>
                      <a className={`text-${theme_color} leading-relaxed`}>poswalrishi9929@gmail.com</a>
                      <h2 className="title-font font-semibold dark:text-white text-gray-950 tracking-widest text-xs mt-4">PHONE</h2>
                      <p className="leading-relaxed">123-456-7890</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                  <h2 className="dark:text-white text-gray-950 text-lg mb-1 font-medium title-font">Feedback</h2>
                  <p className="leading-relaxed mb-5">Feel free to put down your views and suggestions</p>
                  <div className="relative mb-4">
                    <label htmlFor="name" className="leading-7 text-sm dark:text-gray-400 text-gray-600">Name</label>
                    <input type="text" id="name" name="name" className={`w-full dark:bg-gray-800 bg-gray-300 rounded border dark:border-gray-700 border-gray-400 focus:border-${theme_color}  text-base outline-none dark:text-gray-100 text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}/>
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm dark:text-gray-400 text-gray-600">Email</label>
                    <input type="email" id="email" name="email" className={`w-full dark:bg-gray-800 bg-gray-300 rounded border dark:border-gray-700 border-gray-400 focus:border-${theme_color}  text-base outline-none dark:text-gray-100 text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}/>
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="message" className="leading-7 text-sm dark:text-gray-400 text-gray-600">Message</label>
                    <textarea id="message" name="message" className={`w-full dark:bg-gray-800 bg-gray-300 rounded border dark:border-gray-700 border-gray-400 focus:border-${theme_color}  h-32 text-base outline-none dark:text-gray-100 text-gray-800 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}></textarea>
                  </div>
                  <button className={`text-white bg-${theme_color} border-0 py-2 px-6 focus:outline-none hover:bg-opacity-50 rounded text-lg`}>Button</button>
                  <p className="text-xs text-gray-400 text-opacity-90 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
                </div>
              </div>
            </section>

        </>
    )
}

export default Contact