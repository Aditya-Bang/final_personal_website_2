'use client';

import React, { useState } from 'react';
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Loader from './Loader';

import { Quantico } from 'next/font/google';
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

                    alert("Ahh, something went wrong. Please try again.");
                }
            );
    }

    return (
        <section className={`${quantico.className} flex flex-col rounded-lg bg-gray-800 border-gray-700 p-5 gap-2 w-full h-full`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
                <h1 className="text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Send me a message!
                </h1>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${loading ? 'opacity-40 pointer-events-none' : ''}`}
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
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${loading ? 'opacity-40 pointer-events-none' : ''}`}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className='grow flex flex-col'>
                    <label
                        for="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Message
                    </label>
                    <textarea
                        type="message"
                        name="message"
                        id="message"
                        placeholder="Message"
                        className={`grow bg-gray-50 border align-text-top border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${loading ? 'opacity-40 pointer-events-none' : ''}`}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    {loading ? <div className='flex justify-center items-center'><Loader /></div> :
                        <motion.button
                            className="w-full text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                        >
                            Send
                        </motion.button>}
                </div>
            </form>
        </section>

    )
}

export default ContactForm;