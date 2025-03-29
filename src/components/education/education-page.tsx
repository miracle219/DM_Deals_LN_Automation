"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function EducationPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const courses = [
    {
      id: 1,
      title: "Founder Led Social Selling Playbook",
      description: "Crypto cardano avalanche elrond algorand WAX serum stellar ox. Flow revain zcash polygon chiliz IOTA ren chiliz.",
      image: "/launch.png"
    },
    {
      id: 2,
      title: "The Personal Brand Playbook",
      description: "Polymath enjin zcash stacks aave decred. Nexo USD kava algorand ethereum. Litecoin IOTA solana solana telcoin.",
      image: "/launch-2.png"
    },
    {
      id: 3,
      title: "LinkedIn Content Strategy Playbook",
      description: "Horizon terra dai decentraland harmony dash stellar ripple elrond.",
      image: "/launch-3.png",
      readNow: true
    },
    {
      id: 4,
      title: "LinkedIn DM Strategy Playbook",
      description: "Hive kava metal flow ox shiba-inu kadena algorand stellar ankr. Serum livepeer revain waves waves.",
      image: "/launch-4.png"
    },
    {
      id: 5,
      title: "X (Twitter) DM Strategy Playbook",
      description: "ECash filecoin digibyte bitcoin terraUSD ethereum digibyte ankr ICON enjin. Ipsum IOTA stacks kava ICON ipsum.",
      image: "/launch-5.png"
    },
    {
      id: 6,
      title: "X (Twitter) Content Strategy Playbook",
      description: "TRON digibyte WAX binance nexo tezos gala polkadot ren vechain. WAX THETA filecoin serum cardano polymath ren.",
      image: "/launch-6.png"
    }
  ];

  return (
    <div className="min-h-screen mx-auto flex flex-col">
      {/* Hero Section */}
      <section className="py-16 -mt-16 pt-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn how to close more deals for free!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              DM Deals was founded by the first sales hire at a startup. They scaled from a low six figure revenue run rate to a 5mm revenue run rate in 2 years with DMs as the most successful lead source. Never sending a single automated message. But the need for DM Deals presented itself to scale the thoughtful strategy.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 inline-flex items-center transition-all duration-300 ease-in-out">
              <Icon icon="ion:log-in-outline" className="mr-2" />
              Login to review all courses
            </button>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/social-life-bro.png"
              alt="Education illustration"
              width={600}
              height={500}
              className="max-w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-[24px] border border-gray-300 overflow-hidden transform transition duration-300 hover:shadow-xl group relative"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="p-1">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={250}
                    className="w-full h-44 object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-600 mb-1">COURSE 0{course.id}:</p>
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-xs">{course.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.3)] to-white opacity-0 group-hover:opacity-95 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <button className="bg-black text-white px-6 py-3 rounded-md font-medium flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Icon icon="ion:eye-outline" className="mr-1" />
                    <span>Read now for free</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </div>
  );
}