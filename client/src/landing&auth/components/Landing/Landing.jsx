import React from "react";
//importing theme color
const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

function Landing(){
    return (
        <>
            <section className="bg-gray-200 dark:bg-gray-950 text-white">
              <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
                <div className="mx-auto max-w-7xl text-center">
                  <h1
                    className={`bg-gradient-to-r from-${theme_color} via-sky-500 to- bg-clip-text lg:text-9xl md:text-8xl sm:text-7xl text-5xl font-extrabold text-transparent `}
                  >
                    AluMNNIT
            
                    {/* <span className="sm:block"> Increase Conversion. </span> */}
                  </h1>
            
                  <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed dark:text-white text-gray-950">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                    numquam ea!
                  </p>
            
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                      className={`block w-full rounded border border-${theme_color} bg-${theme_color} px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-gray-950 dark:hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto`}
                      href="#"
                    >
                      Get Started
                    </a>
            
                    <a
                      className={`block w-full rounded border border-${theme_color} px-12 py-3 text-sm font-medium text-gray-950 hover:text-white dark:text-white hover:bg-${theme_color} focus:outline-none focus:ring active:bg-${theme_color} sm:w-auto`}
                      href="#"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </section>
            {/* ------------------------------------------------------------------------ */}

            <section className="bg-gray-200 dark:bg-gray-950 text-white">
              <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                <div className="flex flex-wrap items-center mx-auto max-w-7xl">

                  <div className=" w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                    <div>
                      <div className="relative w-full max-w-lg">
                        <div className={`absolute top-0 rounded-full bg-${theme_color} dark:bg-${theme_color} -left-4 w-72 h-72 filter blur-xl opacity-40 animate-blob`}></div>
            
                        <div className={`absolute rounded-full bg-sky-400 dark:bg-sky-600 -bottom-24 right-20 w-72 h-72 filter blur-xl dark:blur-3xl opacity-30 animate-blob animation-delay-4000`}></div>
                        <div className="relative">
                          <img className=" object-cover object-center mx-auto rounded-lg shadow-2xl" alt="hero" src="https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=600"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                    <span className={`mb-8 text-xs font-bold tracking-widest text-${theme_color} uppercase`}> 
                    Tagline 
                    </span>
                    <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 dark:text-neutral-400 md:text-7xl lg:text-5xl">
                       Something great to tell the visitor
                    </h1>
                    <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
                    Can tell about features in the site like personalisation, chat feature, updates, reminders, etc.
                    </p>
                    
                    <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
                      <div className="mt-3 rounded-lg sm:mt-0">
                        <button className={`items-center block px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-${theme_color} rounded-xl hover:bg-${theme_color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${hover_color}`}>
                        Get bundle
                        </button>
                      </div>
                      <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                        <button className={`items-center block px-10 py-3.5 text-base font-medium text-center text-${theme_color} transition duration-500 ease-in-out transform border-2 border-${theme_color} shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}>
                        See features
                        </button>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </section>
        </>
    )
}

export default Landing