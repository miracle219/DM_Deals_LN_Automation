"use client";

import Link from 'next/link';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PricingPage() {
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

  return (
    <div className="min-h-screen mx-auto flex flex-col">
      {/* Hero Section */}
      <section className="py-20 -mt-16 pt-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Choose the plan that fits your needs. Start free and upgrade as you grow.
            </p>
          </motion.div>

          {/* Pricing Plans */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8 max-w-4xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            {/* Starter Plan */}
            <motion.div
              className="border rounded-lg p-6 bg-white hover:shadow-xl transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4">
                <Icon icon="ion:battery-charging-outline" width="64" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Starter plan</h3>
              <p className="text-blue-600 font-medium mb-8">Free Forever</p>

              <motion.div
                className="space-y-4 mb-20"
                variants={staggerChildren}
              >
                <motion.div
                  className="flex items-start"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">All Target profiles, Open and Closed conversations core functionality</p>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">In-app AI and live chat support</p>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Access to knowledge base and all educational materials</p>
                </motion.div>
              </motion.div>

              <motion.button
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Try starter plan for free
              </motion.button>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              className="border rounded-lg p-6 bg-white hover:shadow-xl transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4">
                <Icon icon="ion:battery-full-outline" width="64" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Professional plan</h3>
              <p className="text-blue-600 font-medium mb-8">$49 per month</p>

              <motion.div
                className="space-y-4 mb-10"
                variants={staggerChildren}
              >
                <motion.div
                  className="flex items-start"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Everything from Starter plan</p>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Push rich DM conversation data automatically to your CRM</p>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Prioritized in-app AI and live chat support</p>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Access to new features early (ability to become a beta tester)</p>
                </motion.div>
              </motion.div>

              <motion.button
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Select professional plan
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-gray-600 mb-2">Know a lot of sellers and those building personal brands?</p>
            <motion.a
              href="#"
              className="font-medium underline"
              whileHover={{ scale: 1.05, color: "#3182CE" }}
              transition={{ duration: 0.2 }}
            >
              Join our affiliate program in 30 seconds
            </motion.a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}