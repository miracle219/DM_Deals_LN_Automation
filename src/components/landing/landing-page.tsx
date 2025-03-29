"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(2);

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

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  const toggleQuestion = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  const faqItems = [
    {
      question: "How does this work with LinkedIn's own messaging features?",
      answer: "We integrate directly with LinkedIn's messaging API, enhancing its native capabilities while maintaining compliance. Our tool adds sentiment analysis, prioritization, and CRM integration features not available in LinkedIn's standard messaging."
    },
    {
      question: "What kind of LI activity can you automate for me?",
      answer: "We help you manage conversations more efficiently, but we don't automate posting or messaging. We provide insights, prioritize high-value conversations, and help you track relationships, but all messaging remains authentic and controlled by you."
    },
    {
      question: "How do I make the most out of DM Demand?",
      answer: "We find our power users are often posting consistently on their LinkedIn, a mix of both video and static posts, as well as engaging with posts in their niche. Access our education materials for free inside the platform."
    },
    {
      question: "Is it safe to use DM Demand with my LinkedIn account and data?",
      answer: "Absolutely. We use OAuth for secure authentication and never store your LinkedIn credentials. We comply with LinkedIn's terms of service and maintain strict data privacy practices with encryption and regular security audits."
    },
    {
      question: "Does DM Demand violate LinkedIn Terms of Service?",
      answer: "No, DM Demand is built to be fully compliant with LinkedIn's Terms of Service and developer policies. We access data only through approved API channels and with proper user authorization."
    },
    {
      question: "How long does onboarding take?",
      answer: "Most users are up and running within 10-15 minutes. The process includes connecting your LinkedIn account, setting up any CRM integrations, and a quick walkthrough of the platform features."
    }
  ];

  return (
    <div className="min-h-screen mx-auto flex flex-col">

      {/* Hero Section */}
      <section className="flex-grow py-12 md:py-20 -mt-16 pt-24 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Create More Pipeline With LinkedIn DMs
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Sentiment Analysis tools manage your ongoing DMs. New profiles are recommended to message based on your ICP and engagement activity to increase your amount of qualified DMs.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="/signup"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 inline-flex items-center transition-all duration-300 ease-in-out"
              >
                <Icon icon="ion:flash-outline" className="mr-2" />
                Get Started For Free
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center items-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/hero.png"
              alt="Person using laptop illustration"
              width={500}
              height={400}
              className="max-w-full h-auto object-contain"
              priority
              style={{ maxHeight: '400px' }}
            />
          </motion.div>
        </div>

        {/* LinkedIn Badges */}
        <motion.div
          className="absolute top-18 -left-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="flex items-center space-x-2 bg-black/60 shadow-md px-3 py-2 rounded-full"
            animate={floatAnimation}
          >
            <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} className="rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs text-white font-medium">Profile View From Your ICP</span>
              <span className="text-xs text-white/60">9 minutes ago</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-36 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="flex items-center space-x-2 bg-black/60 shadow-md px-3 py-2 rounded-full"
            animate={{
              y: [0, -12, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} className="rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs text-white font-medium">Send A Request To This ICP</span>
              <span className="text-xs text-white/60">2 minutes ago</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Built For Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            DM Demand is built for:
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {/* B2B Sales */}
            <motion.div
              className="border border-gray-300 rounded-[24px] p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-center items-center mb-6">
                <Icon icon="ion:magnet-outline" width="48" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">B2B Sales</h3>
              <p className="text-gray-600 text-center">
                In 2025 Cold DMs > Cold Email. Post consistently and profit from social selling.
              </p>
            </motion.div>

            {/* Recruiters */}
            <motion.div
              className="border border-gray-300 rounded-[24px] p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-center items-center mb-6">
                <Icon icon="ion:binoculars-outline" width="48" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Recruiters</h3>
              <p className="text-gray-600 text-center">
                Prioritize high-potential candidates and spark conversations with top talent. Save time and boost hiring efficiency.
              </p>
            </motion.div>

            {/* Investors */}
            <motion.div
              className="border border-gray-300 rounded-[24px] p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-center items-center mb-6">
                <Icon icon="ion:rocket-outline" width="48" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Investors</h3>
              <p className="text-gray-600 text-center">
                Prioritize messages from promising founders and startups. New chats to start based on your investment focus.
              </p>
            </motion.div>

            {/* Freelancers */}
            <motion.div
              className="border border-gray-300 rounded-[24px] p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-center items-center mb-6">
                <Icon icon="ion:color-palette-outline" width="48" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Freelancers</h3>
              <p className="text-gray-600 text-center">
                We sort your messages and flag potential clients. Turn conversations into contracts.
              </p>
            </motion.div>
          </motion.div>

          <div className="flex justify-center mt-12 space-x-6">
            <Link
              href="/signup"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 inline-flex items-center transition-all duration-300 ease-in-out"
            >
              <Icon icon="ion:flash-outline" className="mr-2" />
              Get Started For Free
            </Link>
            <Link
              href="#demo"
              className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 inline-flex items-center transition-all duration-300 ease-in-out"
            >
              <Icon icon="ion:play-circle-outline" className="mr-2" />
              Watch Demo Video
            </Link>
          </div>

          <motion.div
            className="absolute -left-16 bottom-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="flex items-center space-x-2 bg-black/60 shadow-md px-3 py-2 rounded-full"
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 3.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} className="rounded-full" />
              <div className="flex flex-col">
                <span className="text-xs text-white font-medium">Send A Message To This ICP</span>
                <span className="text-xs text-white/60">3 minutes ago</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute right-8 bottom-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="flex items-center space-x-2 bg-black/60 shadow-md px-3 py-2 rounded-full"
              animate={{
                y: [0, -15, 0],
                transition: {
                  duration: 3.8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} className="rounded-full" />
              <div className="flex flex-col">
                <span className="text-xs text-white font-medium">New Like From Your ICP</span>
                <span className="text-xs text-white/60">just now</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute right-4 top-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="flex items-center space-x-2 bg-black/60 shadow-md px-3 py-2 rounded-full"
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} className="rounded-full" />
              <div className="flex flex-col">
                <span className="text-xs text-white font-medium">New Comment From Your ICP</span>
                <span className="text-xs text-white/60">5 minutes ago</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            DM Demand currently integrates with LinkedIn. What integration should we build next?
          </motion.h2>

          <div className="flex justify-start mb-6">
            <button className="flex items-center px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition-all duration-300">
              <Icon icon="ion:add-circle-outline" className="mr-2" />
              Suggest A New Integration
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-start max-w-4xl mx-auto">
            <div className="w-1/4 pr-8 -mt-16">
              <Image
                src="/faq.png"
                alt="FAQ illustration"
                width={200}
                height={200}
                className="max-w-full h-auto"
              />
            </div>
            <div className="w-3/4">
              <motion.h2
                className="text-4xl font-bold mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
              >
                Frequently Asked Questions
              </motion.h2>

              <motion.div
                className="space-y-4"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
              >
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="border-b"
                    variants={fadeInUp}
                  >
                    <button
                      className={`flex justify-between items-center w-full py-4 text-left font-medium ${activeQuestion === index ? 'text-blue-500' : ''}`}
                      onClick={() => toggleQuestion(index)}
                    >
                      <span>{item.question}</span>
                      <Icon
                        icon="bi:plus"
                        width="24" // Bigger icon
                        height="24"
                        className={`${activeQuestion === index ? 'text-red-500' : 'text-blue-500'} transition-transform duration-300 ${activeQuestion === index ? 'transform rotate-45' : ''}`}
                      />
                    </button>
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeQuestion === index ? 'auto' : 0,
                        opacity: activeQuestion === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-4 text-gray-600">
                        {item.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}