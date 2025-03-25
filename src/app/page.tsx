"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';

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

  return (
    <div className="min-h-screen mx-auto p-6 flex flex-col">
      {/* Header Section */}
      <header className={`py-4 sticky top-4 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md border mx-4 rounded-lg' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon icon="ion:file-tray-full-outline" width="24" />
            <span className="text-xl font-bold">DM Deals</span>
          </div>

          <div className="flex-1"></div>

          <nav className="hidden md:flex items-center space-x-6 mr-8">
            <Link href="#features" className="flex items-center space-x-1 font-medium hover:text-gray-900">
              <Icon icon="ion:cube-outline" />
              <span>Features</span>
            </Link>
            <Link href="#education" className="flex items-center space-x-1 font-medium hover:text-gray-900">
              <Icon icon="ion:book-outline" />
              <span>Education</span>
            </Link>
            <Link href="#pricing" className="flex items-center space-x-1 font-medium hover:text-gray-900">
              <Icon icon="ion:chatbubbles-outline" />
              <span>Pricing</span>
            </Link>
          </nav>

          <div className="grid grid-cols-2 items-center justify-between space-x-6">
            <Link href="/login" className="flex items-center px-4 py-2 border rounded-md justify-center  hover:bg-gray-100">Login</Link>
            <Link
              href="/signup"
              className="bg-black text-white px-4 py-2 rounded-md justify-center hover:bg-gray-800 flex items-center"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow py-12 md:py-20 -mt-16 pt-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Scale 1:1 DMs on LI, X and IG. Close more deals syncing DMs to your CRM
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Generate more leads and meetings by relationship building in your Direct Messages. Close more effectively by pushing rich DM Conversation Data automatically to your CRM.
            </p>
            <Link
              href="/signup"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 inline-flex items-center"
            >
              <Icon icon="ion:flash-outline" className="mr-2" />
              Get started for free
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/social-life-bro.png"
              alt="Social messaging illustration"
              width={600}
              height={500}
              className="max-w-full h-auto -mt-8 -ml-6"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">DM Deals integrates with:</h2>

          <div className="flex justify-start mb-6">
            <button className="flex items-center px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100">
              <Icon icon="ion:add-circle-outline" className="mr-2" />
              Suggest a new integration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LinkedIn */}
            <div className="flex">
              <div className="mr-4">
                <Image src="/linkedin.png" alt="LinkedIn" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-600">
                  Digibyte ankr hedera holo arweave revain. Quant livepeer PancakeSwap telcoin livepeer aave kusama hedera aave. Serum shiba-inu.
                </p>
              </div>
            </div>

            {/* SalesForce */}
            <div className="flex">
              <div className="mr-4">
                <Image src="/salesforce.png" alt="SalesForce" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">SalesForce</h3>
                <p className="text-gray-600">
                  Cardano monero stacks celo livepeer stellar kusama elrond stellar. Nexo livepeer bitcoin terraUSD elrond horizen ethereum stacks.
                </p>
              </div>
            </div>

            {/* X (Twitter) */}
            <div className="flex">
              <div className="mr-4">
                <Image src="/twitter.png" alt="X (Twitter)" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">X (Twitter)</h3>
                <p className="text-gray-600">
                  Audius golem polygon livepeer crypto ankr. Chainlink polygon aave bancor elrond digibyte secret maker USD. ECash crypto.
                </p>
              </div>
            </div>

            {/* HubSpot */}
            <div className="flex">
              <div className="mr-4">
                <Image src="/hubspot.png" alt="HubSpot" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">HubSpot</h3>
                <p className="text-gray-600">
                  PancakeSwap stellar dogecoin horizen celo solana. Serum digibyte THETA litecoin hedera dai filecoin shiba-inu. Velas velas klaytn EOS.
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex">
              <div className="mr-4">
                <Image src="/instagram.png" alt="Instagram" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Instagram</h3>
                <p className="text-gray-600">
                  Kava maker XRP elrond fantom velas ipsum litecoin. Helium helium bancor USD algorand EOS BitTorrent ipsum vechain. Kadena stellar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">DM Deals is built for:</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sales */}
            <div className="border rounded-lg p-6">
              <div className="flex justify-center items-center w-16 h-16 bg-white mb-4">
                <Icon icon="ion:magnet-outline" width="64" className="transform rotate-180" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sales</h3>
              <p className="text-gray-600">
                Stellar arweave ipsum harmony ipsum livepeer stellar celo fantom. Klaytn digibyte avalanche celsius IOTA.
              </p>
            </div>

            {/* Recruiters */}
            <div className="border rounded-lg p-6">
              <div className="flex justify-center items-center w-16 h-16 bg-white mb-4">
                <Icon icon="ion:binoculars-outline" width="64" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recruiters</h3>
              <p className="text-gray-600">
                Secret terra ipsum horizen XRP revain USD serum chainlink.
              </p>
            </div>

            {/* CEOs */}
            <div className="border rounded-lg p-6">
              <div className="flex justify-center items-center w-16 h-16 bg-white mb-4">
                <Icon icon="ion:rocket-outline" width="64" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CEOs</h3>
              <p className="text-gray-600">
                Loopring secret holo binance polkadot decentraland gala fantom kava cardano.
              </p>
            </div>

            {/* Freelancers */}
            <div className="border rounded-lg p-6">
              <div className="flex justify-center items-center w-16 h-16 bg-white mb-4">
                <Icon icon="ion:color-palette-outline" width="64" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Freelancers</h3>
              <p className="text-gray-600">
                Monero filecoin dogecoin eCash shiba-inu velas golem WAX kusama. Litecoin shiba-inu aave terra revain ipsum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="mb-4">
                <Icon icon="ion:battery-half-outline" width="64" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Starter plan</h3>
              <p className="text-blue-600 font-medium mb-8">Free Forever</p>

              <div className="space-y-4 mb-20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">All Target profiles, Open and Closed conversations core functionality</p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">In-app AI and live chat support</p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Access to knowledge base and all educational materials</p>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                Try starter plan for free
              </button>
            </div>

            {/* Professional Plan */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="mb-4">
                <Icon icon="ion:battery-charging-outline" width="64" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Professional plan</h3>
              <p className="text-blue-600 font-medium mb-8">$49 per month</p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Everything from Starter plan</p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Push rich DM conversation data automatically to your CRM</p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Prioritized in-app AI and live chat support</p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Icon icon="ion:checkmark-circle-outline" className="text-gray-500" />
                  </div>
                  <p className="ml-3 text-gray-600">Access to new features early (ability to become a beta tester)</p>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                Select professional plan
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-2">Know a lot of sellers and those building personal brands?</p>
            <a href="#" className="font-medium underline">Join our affiliate program in 30 seconds</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon icon="ion:file-tray-full-outline" width="20" />
              <span className="font-bold">DM Deals</span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DM Deals. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}