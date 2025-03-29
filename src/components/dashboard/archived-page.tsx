"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/layout/data-table";

type ArchivedConversation = {
  id: string;
  person: string;
  company: string;
  title: string;
  avatar?: string;
  added: string;
  connections: number;
  status: string;
  platforms: string[];
  selected: boolean;
};

export default function ArchivedConversationsComponent() {
  const [conversations, setConversations] = useState<ArchivedConversation[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating API call
  useEffect(() => {
    setTimeout(() => {
      // Sample data
      const sampleData: ArchivedConversation[] = [
        {
          id: "1",
          person: "Darrell Steward",
          company: "Company name",
          title: "Position title",
          added: "24 May, 2020",
          connections: 63,
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email.",
          platforms: ["instagram", "twitter", "linkedin"],
          selected: false
        },
        {
          id: "2",
          person: "Theresa Webb",
          company: "Company name",
          title: "Position title",
          added: "21 Sep, 2020",
          connections: 154,
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email.",
          platforms: ["instagram", "twitter", "linkedin"],
          selected: true
        },
        {
          id: "3",
          person: "Floyd Miles",
          company: "Company name",
          title: "Position title",
          added: "22 Oct, 2020",
          connections: 32,
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email.",
          platforms: ["instagram", "twitter", "linkedin"],
          selected: false
        },
        {
          id: "4",
          person: "Kristin Watson",
          company: "Company name",
          title: "Position title",
          added: "1 Feb, 2020",
          connections: 81,
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email.",
          platforms: ["instagram", "twitter", "linkedin"],
          selected: false
        },
        {
          id: "5",
          person: "Dianne Russell",
          company: "Company name",
          title: "Position title",
          added: "17 Oct, 2020",
          connections: 95,
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email.",
          platforms: ["instagram", "twitter", "linkedin"],
          selected: false
        },
        {
          id: "6",
          person: "Ralph Edwards",
          company: "Company name",
          title: "Position title",
          added: "8 Sep, 2020",
          connections: 74,
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email.",
          platforms: ["instagram", "twitter", "linkedin"],
          selected: true
        }
      ];

      setConversations(sampleData);
      setLoading(false);
    }, 800);
  }, []);

  // Render social media platform icons
  const renderPlatformIcons = (platforms: string[]) => {
    return (
      <div className="flex space-x-1">
        {platforms.map((platform) => (
          <div key={platform} className="w-5 h-5">
            <Image
              src={`/${platform}.png`}
              alt={platform}
              width={20}
              height={20}
            />
          </div>
        ))}
      </div>
    );
  };

  // Define columns for the data table
  const columns = [
    {
      id: 'person',
      header: 'Person',
      cell: (conversation: ArchivedConversation) => (
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            {conversation.avatar ? (
              <AvatarImage src={conversation.avatar} />
            ) : (
              <AvatarFallback className="bg-gray-200 text-gray-700">
                {conversation.person.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{conversation.person}</div>
            <div className="text-sm text-gray-500">{conversation.company}, {conversation.title}</div>
          </div>
        </div>
      )
    },
    {
      id: 'added',
      header: 'Added',
      cell: (conversation: ArchivedConversation) => (
        <span className="text-sm">{conversation.added}</span>
      ),
    },
    {
      id: 'connections',
      header: 'Connections',
      cell: (conversation: ArchivedConversation) => (
        <span className="text-sm">{conversation.connections}</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (conversation: ArchivedConversation) => (
        <div className="flex items-center space-x-3">
          <span className="text-sm">{conversation.status}</span>
          <div>
            {renderPlatformIcons(conversation.platforms)}
          </div>
        </div>
      ),
    }
  ];

  // Action buttons for the table
  const actionButtons: ReactNode[] = [
    <button
      key="push-to-crm"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:arrow-up-circle-outline" width="20" height="20" />
      <span>Push to CRM</span>
    </button>,
    <button
      key="unarchive"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:arrow-down-circle-outline" width="20" height="20" />
      <span>Unarchive</span>
    </button>,
    <button
      key="delete-forever"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-destructive text-red-500 hover:bg-red-50"
    >
      <Icon icon="ion:trash-outline" width="20" height="20" />
      <span>Delete forever</span>
    </button>
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="py-24">
      <DataTable
        data={conversations}
        columns={columns}
        title="Archived"
        totalCount={conversations.length}
        actions={actionButtons}
        enableSelection={true}
        enableHover={true}
        className="shadow-sm"
      />
    </div>
  );
}