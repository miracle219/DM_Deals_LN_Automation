"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTable } from "@/components/layout/data-table";
import { TargetProfile } from "@/types/user";

export default function TargetProfilesComponent() {
  const [profiles, setProfiles] = useState<TargetProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: this will come from LinkedIn API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      // Sample data
      const sampleData: TargetProfile[] = [
        {
          id: "1",
          person: "Marvin McKinney",
          company: "Presse Citron",
          title: "Sales executive",
          yearlyProfit: "$34M yearly profit on Shopify",
          added: "Oct. 10, 2024",
          connections: 63,
          viewed: {
            name: "Marvin",
            date: "Oct. 24, 2024"
          },
          replied: {
            name: "You",
            date: "Nov. 1, 2024"
          },
          liked: {
            name: "You",
            date: "Nov. 15, 2024"
          },
          recommendation: {
            type: "Direct message",
            platform: "instagram",
            date: "Nov. 20, 2024",
            platforms: ["twitter", "instagram", "linkedin"]
          },
          selected: false
        },
        {
          id: "2",
          person: "Dianne Russell",
          company: "Fatboy",
          title: "CEO",
          yearlyProfit: "$21M yearly profit on Shopify",
          added: "Nov. 5, 2024",
          connections: 1,
          viewed: null,
          replied: null,
          liked: {
            name: "Dianne",
            date: "Nov. 9, 2024"
          },
          recommendation: {
            type: "Direct message",
            platform: "instagram",
            date: "Nov. 20, 2024",
            platforms: ["twitter", "instagram", "linkedin"]
          },
          selected: true
        },
        {
          id: "3",
          person: "Arlene McCoy",
          company: "Zago",
          title: "Senior account executive",
          yearlyProfit: "$47M yearly profit on Shopify",
          added: "Nov. 5, 2024",
          connections: 1,
          viewed: {
            name: "You",
            date: "Nov. 7, 2024"
          },
          replied: null,
          liked: {
            name: "Dianne",
            date: "Nov. 9, 2024"
          },
          recommendation: {
            type: "Direct message",
            platform: "instagram",
            date: "Nov. 20, 2024",
            platforms: ["twitter", "instagram", "linkedin"]
          },
          selected: true
        }
      ];

      setProfiles(sampleData);
      setLoading(false);
    }, 800);
  }, []);

  // Render social media platform icons
  const renderPlatformIcons = (profile: TargetProfile) => {
    if (!profile.recommendation) return null;

    const { platform, platforms } = profile.recommendation;

    return (
      <div className="flex space-x-1">
        {platforms.map((platformName) => {
          const isActive = platformName === platform;
          return (
            <div
              key={platformName}
              className={`${isActive ? '' : 'opacity-15'}`}
            >
              <Image
                src={`/${platformName}.png`}
                alt={platformName}
                width={20}
                height={20}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Define columns for the data table
  const columns = [
    {
      id: 'person',
      header: 'Person',
      cell: (profile: TargetProfile) => (
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {profile.person.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{profile.person}</div>
            <div className="text-sm text-gray-500">{profile.title}</div>
            <div className="text-xs text-gray-500">{profile.yearlyProfit}</div>
          </div>
        </div>
      )
    },
    {
      id: 'added',
      header: 'Added',
      accessorKey: 'added' as keyof TargetProfile,
    },
    {
      id: 'connections',
      header: 'Connections',
      accessorKey: 'connections' as keyof TargetProfile,
    },
    {
      id: 'viewed',
      header: 'Viewed',
      cell: (profile: TargetProfile) => (
        <span>
          {profile.viewed ? (
            <span>
              {profile.viewed.name} on<br/>{profile.viewed.date}
            </span>
          ) : 'No messages'}
        </span>
      ),
    },
    {
      id: 'replied',
      header: 'Replied',
      cell: (profile: TargetProfile) => (
        <span>
          {profile.replied ? (
            <span>
              {profile.replied.name} on<br/>{profile.replied.date}
            </span>
          ) : 'No messages'}
        </span>
      ),
    },
    {
      id: 'liked',
      header: 'Liked',
      cell: (profile: TargetProfile) => (
        <span>
          {profile.liked ? (
            <span>
              {profile.liked.name} on<br/>{profile.liked.date}
            </span>
          ) : '-'}
        </span>
      ),
    },
    {
      id: 'recommendation',
      header: 'Recommendation',
      cell: (profile: TargetProfile) => (
        profile.recommendation ? (
          <div className="flex flex-row space-x-2">
                  <div className="text-sm text-blue-600 flex flex-col"><span>{profile.recommendation.type}</span>
                      <span>on {profile.recommendation.platform} on </span>
                      {profile.recommendation.date}
                  </div>
            <div className="flex items-center space-x-1">
              {renderPlatformIcons(profile)}
            </div>
          </div>
        ) : '-'
      ),
    },
  ];

  // Action buttons for the table
  const actionButtons: ReactNode[] = [
    <button
      key="push-to-crm"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
      disabled
    >
      <Icon icon="ion:arrow-up-circle-outline" width="20" height="20" />
      <span>Push to CRM</span>
    </button>,
    <button
      key="add-target"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:add-circle-outline" width="20" height="20" />
      <span>Add target</span>
    </button>,
    <button
      key="existing-customer"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:checkmark-circle-outline" width="20" height="20" />
      <span>Existing customer</span>
    </button>,
    <button
      key="move-to-conversations"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:arrow-forward-circle-outline" width="20" height="20" />
      <span>Move to conversations</span>
    </button>,
    <button
      key="not-a-target"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-destructive text-red-500 hover:bg-red-50"
    >
      <Icon icon="ion:close-circle-outline" width="20" height="20" />
      <span>Not a target</span>
    </button>
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Icon icon="ion:people-outline" className="text-4xl mb-2 text-gray-400" />
        <p className="text-gray-500">No target profiles found</p>
        <Link
          href="/dashboard/target/add"
          className="mt-4 flex items-center justify-center py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          <Icon icon="ion:add-circle-outline" className="h-5 w-5 mr-2" />
          <span>Add Target Profile</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24">
      <DataTable
        data={profiles}
        columns={columns}
        title="Target profiles"
        totalCount={profiles.length}
        actions={actionButtons}
        enableSelection={true}
        enableHover={true}
        className="shadow-sm"
      />
    </div>
  );
}