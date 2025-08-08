import { useEffect, useState } from 'react'
import BASE_url from '../api/api'

const Content = () => {
  
  // creating quote and author variable for effieciently updating their values
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("")

  // function to generate a random number between 1 and 300
  const getId = () => {
    return Math.floor(Math.random() * 300) + 1; // 1..300
  }
  
  // function to fetch quote from the API endpoint
  const getQuote = async() => {
    try {
      const data = await fetch(`${BASE_url}/${getId()}`);

      // converting data to a feasible response using json method 
      const response = await data.json();

      // updating state of quote and author variables
      setAuthor(response.data.author);
      setQuote(response.data.content);

    } catch (error) {
      // if there was an error while request then log it in the console
      console.log(error);
    }
  }

  useEffect(() => {
    getQuote();
  }, [])

  return (
    <main className='relative h-screen flex flex-col justify-center items-center px-2 md:px-5 font-mono'>
      <p className='flex flex-col flex-wrap items-center gap-y-10 md:gap-y-15 z-50 text-center'>
        <span className='text-[#191919] text-3xl md:text-5xl tracking-tighter'>{quote}</span>
        <span className='text-[#191919]/80 text-2xl md:text-3xl font-medium'>{author}</span>
      </p>
      <button 
        onClick={getQuote}
        className='absolute px-3 py-2 rounded-4xl bottom-18 md:bottom-30 text-md md:text-3xl bg-gradient-to-r from-pink-500 to-blue-500 active:shadow-[inset_2px_2px_2px_2px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_.5px_rgba(255,255,255,.8)] active:scale-90 text-[#191919] border-1 border-[#191919]/50 cursor-pointer duration-75 z-50'  
      >
          Get Inspired!</button>
    </main>
  )
}

export default Content
