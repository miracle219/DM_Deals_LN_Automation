"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'Completed' | 'Reading' | 'New';
};

export default function EducationalCoursesComponent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating API call
  useEffect(() => {
    setTimeout(() => {
      // Sample data
      const sampleData: Course[] = [
        {
          id: "1",
          title: "Founder Led Social Selling Playbook",
          description: "Decentraland telcoin tether kadena dai hive THETA cosmos. Kava IOTA ren maker vechain. Golem terraUSD hive BitTorrent litecoin nexo cosmos livepeer cosmos. Dash eCash dash.",
          image: "/launch.png",
          status: "Completed"
        },
        {
          id: "2",
          title: "The Personal Brand Playbook",
          description: "Bancor enjin IOTA tezos celo tether ICON. Crypto stacks flow dash XRP. Waves PancakeSwap avalanche ox binance monero. Hive shiba-inu ipsum binance holo tether nexo waves audius hive. Horizon binance.",
          image: "/launch-2.png",
          status: "Completed"
        },
        {
          id: "3",
          title: "LinkedIn Content Strategy Playbook",
          description: "Avalanche EOS neo zcash compound livepeer TRON flow. Dai terraUSD audius tether compound cardano elrond. Serum ipsum polkadot cosmos decentraland livepeer hedera.",
          image: "/launch-3.png",
          status: "Reading"
        },
        {
          id: "4",
          title: "LinkedIn Content Strategy Playbook",
          description: "Stellar binance flow stacks dai XRP eCash BitTorrent. Ipsum EOS stellar siacoin dash. Golem THETA dash bitcoin maker polymath ren. XRP polkadot monero secret vechain fantom. Quant bancor shiba-inu celsius.",
          image: "/launch-4.png",
          status: "New"
        },
        {
          id: "5",
          title: "LinkedIn Content Strategy Playbook",
          description: "Cardano ICON PancakeSwap terra ox filecoin avalanche telcoin ipsum vechain. Decred monero THETA audius bancor digibyte serum. Tether serum binance elrond siacoin audius.",
          image: "/launch-5.png",
          status: "New"
        },
        {
          id: "6",
          title: "LinkedIn Content Strategy Playbook",
          description: "Avalanche tezos helium binance avalanche crypto golem. Helium uniswap dash filecoin stacks cardano harmony. Velas celo USD chiliz monero dash EOS eCash dai. USD audius compound crypto polkadot.",
          image: "/launch-6.png",
          status: "New"
        }
      ];

      setCourses(sampleData);
      setLoading(false);
    }, 800);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500';
      case 'Reading':
        return 'text-amber-500';
      case 'New':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const completedCount = courses.filter(course => course.status === 'Completed').length;

  return (
    <div className="py-24">
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-white p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Educational courses</h2>
            <div className="text-sm text-gray-500">
              {courses.length} total, {completedCount} completed
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 font-medium text-sm">
            <div className="col-span-4">Title</div>
            <div className="col-span-7">Description</div>
            <div className="col-span-1">Status</div>
          </div>

          {courses.map((course) => (
            <div key={course.id} className="grid grid-cols-12 gap-4 px-6 py-6 hover:bg-gray-50 transition-colors">
              <div className="col-span-4 flex items-center space-x-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={64}
                    height={64}
                    className="rounded-sm"
                  />
                </div>
                <div className="text-sm font-medium">{course.title}</div>
              </div>
              <div className="col-span-7 text-sm text-gray-600 flex items-center">
                {course.description}
              </div>
              <div className={`col-span-1 flex items-center ${getStatusColor(course.status)}`}>
                {course.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}