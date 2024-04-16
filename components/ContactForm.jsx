'use client';

import React, { useState } from 'react';
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Loader from './Loader';

import { Quantico } from 'next/font/google';
import MyLinks from './MyLinks';
const quantico = Quantico({
    subsets: ["latin"],
    display: 'swap',
    weight: '400',
});
// import { Orbitron } from 'next/font/google';
// const orbitron = Orbitron({
//     subsets: ["latin"],
//     weight: '400'
// });
// import { Courier_Prime } from 'next/font/google';
// const courier_prime = Courier_Prime({
//     subsets: ["latin"],
//     weight: '400'
// });
// import { Anonymous_Pro } from 'next/font/google';
// const anonymous_pro = Anonymous_Pro({
//   subsets: ["latin"],
//   weight: '400'
// });

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    from_name: name,
                    to_name: "Aditya Bang",
                    from_email: email,
                    to_email: "sujata@jsmastery.pro",
                    message: message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setLoading(false);
                    alert("Thank you. I will get back to you as soon as possible.");

                    console.log("Hi");

                    setName("");
                    setEmail("");
                    setMessage("");
                },
                (error) => {
                    setLoading(false);
                    console.log("Bye");
                    console.error(error);

                    alert("Ahh, something went wrong. I may be out of emailjs tokens. Please contact me through linkedin or by email instead.");
                }
            );
    }

    return (
        <section className={`flex flex-col rounded-lg bg-gray-900 p-5 gap-2 w-full h-full max-h-[800px]`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
                <div className='flex w-full flex-row items-center justify-center gap-5 pr-5 pl-5'>
                    <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full"></div>
                    <div className='text-2xl uppercase text-center text-white'>Contact me</div>
                    <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
                </div>

                <div>
                    <label className="block mb-2 font-medium text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={`border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 ${loading ? 'opacity-40 pointer-events-none' : ''}`}
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label
                        for="email"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className={`border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 ${loading ? 'opacity-40 pointer-events-none' : ''}`}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className='grow flex flex-col'>
                    <label
                        for="message"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                    >
                        Message
                    </label>
                    <textarea
                        type="message"
                        name="message"
                        id="message"
                        placeholder="Message"
                        className={`grow border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 ${loading ? 'opacity-40 pointer-events-none' : ''}`}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    {loading ? <div className='flex justify-center items-center'><Loader /></div> :
                        <motion.button
                            className="w-full text-white bg-gradient-to-r from-violet-600 to-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                        >
                            Send
                        </motion.button>}
                </div>
            </form>
            <div className='flex w-full justify-center items-center'><MyLinks type="row"/></div>
        </section>

    )
}

export default ContactForm;