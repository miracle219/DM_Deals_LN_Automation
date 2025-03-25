"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
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
      <section className="flex-grow py-12 md:py-20 -mt-16 pt-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Scale 1:1 DMs on LI, X and IG. Close more deals syncing DMs to your CRM
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Generate more leads and meetings by relationship building in your Direct Messages. Close more effectively by pushing rich DM Conversation Data automatically to your CRM.
            </p>
            <div>
              <Link
                href="/signup"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 inline-flex items-center transition-all duration-300 ease-in-out"
              >
                <Icon icon="ion:flash-outline" className="mr-2" />
                Get started for free
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/social-life-bro.png"
              alt="Social messaging illustration"
              width={600}
              height={500}
              className="max-w-full h-auto -mt-8 -ml-6"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            DM Deals integrates with:
          </motion.h2>

          <div className="flex justify-start mb-6">
            <button className="flex items-center px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition-all duration-300">
              <Icon icon="ion:add-circle-outline" className="mr-2" />
              Suggest a new integration
            </button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {/* LinkedIn */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300"
            >
              <div className="mr-4">
                <Image src="/linkedin.png" alt="LinkedIn" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-600">
                  Digibyte ankr hedera holo arweave revain. Quant livepeer PancakeSwap telcoin livepeer aave kusama hedera aave. Serum shiba-inu.
                </p>
              </div>
            </motion.div>

            {/* SalesForce */}
            <motion.div
              className="flex bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mr-4">
                <Image src="/salesforce.png" alt="SalesForce" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">SalesForce</h3>
                <p className="text-gray-600">
                  Cardano monero stacks celo livepeer stellar kusama elrond stellar. Nexo livepeer bitcoin terraUSD elrond horizen ethereum stacks.
                </p>
              </div>
            </motion.div>

            {/* X (Twitter) */}
            <motion.div
              className="flex bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mr-4">
                <Image src="/twitter.png" alt="X (Twitter)" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">X (Twitter)</h3>
                <p className="text-gray-600">
                  Audius golem polygon livepeer crypto ankr. Chainlink polygon aave bancor elrond digibyte secret maker USD. ECash crypto.
                </p>
              </div>
            </motion.div>

            {/* HubSpot */}
            <motion.div
              className="flex bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mr-4">
                <Image src="/hubspot.png" alt="HubSpot" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">HubSpot</h3>
                <p className="text-gray-600">
                  PancakeSwap stellar dogecoin horizen celo solana. Serum digibyte THETA litecoin hedera dai filecoin shiba-inu. Velas velas klaytn EOS.
                </p>
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div
              className="flex bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mr-4">
                <Image src="/instagram.png" alt="Instagram" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Instagram</h3>
                <p className="text-gray-600">
                  Kava maker XRP elrond fantom velas ipsum litecoin. Helium helium bancor USD algorand EOS BitTorrent ipsum vechain. Kadena stellar.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            DM Deals is built for:
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {/* Sales */}
            <motion.div
              className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div
                className="flex justify-center items-center w-16 h-16 bg-white mb-4"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Icon icon="ion:magnet-outline" width="64" className="transform rotate-180" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Sales</h3>
              <p className="text-gray-600">
                Stellar arweave ipsum harmony ipsum livepeer stellar celo fantom. Klaytn digibyte avalanche celsius IOTA.
              </p>
            </motion.div>

            {/* Recruiters */}
            <motion.div
              className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div
                className="flex justify-center items-center w-16 h-16 bg-white mb-4"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Icon icon="ion:binoculars-outline" width="64" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Recruiters</h3>
              <p className="text-gray-600">
                Secret terra ipsum horizen XRP revain USD serum chainlink.
              </p>
            </motion.div>

            {/* CEOs */}
            <motion.div
              className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div
                className="flex justify-center items-center w-16 h-16 bg-white mb-4"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <Icon icon="ion:rocket-outline" width="64" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">CEOs</h3>
              <p className="text-gray-600">
                Loopring secret holo binance polkadot decentraland galafantom kava cardano.
              </p>
            </motion.div>

            {/* Freelancers */}
            <motion.div
              className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div
                className="flex justify-center items-center w-16 h-16 bg-white mb-4"
                whileHover={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 1 }}
              >
                <Icon icon="ion:color-palette-outline" width="64" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Freelancers</h3>
              <p className="text-gray-600">
                Monero filecoin dogecoin eCash shiba-inu velas golem WAX kusama. Litecoin shiba-inu aave terra revain ipsum.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            Pricing Plans
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8 max-w-4xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
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
                <Icon icon="ion:battery-charging-outline" width="64" />
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
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

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center space-x-2 mb-4 md:mb-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Icon icon="ion:file-tray-full-outline" width="20" />
              <span className="font-bold">DM Deals</span>
            </motion.div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DM Deals. All rights reserved.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}