import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ExpandableText = ({ text}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
    
      <div className={` flex flex-col items-stretch justify-start `}>
         
         <div className={`relative overflow-hidden  ${isExpanded ? 'max-h-full' : `max-h-16`}`}>
            <p className='text-sm dark:text-gray-400 text-gray-700'>{text}</p>
            {!isExpanded && text.length>250 && (
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-gray-900" />
            )}
         </div>
         

         <div className='flex justify-end '>
            <button onClick={toggleExpand} className='dark:text-gray-600 text-gray-400'>
               {isExpanded? <ChevronUp className='size-5 '/> : <ChevronDown className='size-5'/>}
            </button>
         </div>

      </div>
      
    </div>
  );
};

export default ExpandableText;
