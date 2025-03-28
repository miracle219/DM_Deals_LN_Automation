"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/layout/data-table";

type ConversationInteraction = {
  name: string;
  date: string;
};

type Conversation = {
  id: string;
  person: string;
  company: string;
  title: string;
  avatar?: string;
  sentiment: string;
  lastAction: {
    message: string;
    date: string;
    seen: boolean;
  };
  recommendation: {
    message: string;
    platform: string;
  };
  selected: boolean;
};

export default function OpenConversationsComponent() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating API call
  useEffect(() => {
    setTimeout(() => {
      // Sample data
      const sampleData: Conversation[] = [
        {
          id: "1",
          person: "Jenny Wilson",
          company: "Nateks",
          title: "Chief design officer",
          sentiment: "Interested in OneText but lately unresponsive",
          lastAction: {
            message: "You offered a holiday gift on Nov. 14, 2024",
            date: "Nov. 14, 2024",
            seen: true
          },
          recommendation: {
            message: "Wait until Dec. to message again on Instagram",
            platform: "instagram"
          },
          selected: false
        },
        {
          id: "2",
          person: "Kristin Watson",
          company: "Azimut",
          title: "Director of business development",
          sentiment: "Interested in OneText but lately unresponsive",
          lastAction: {
            message: "You offered a holiday gift on Nov. 14, 2024",
            date: "Nov. 14, 2024",
            seen: true
          },
          recommendation: {
            message: "Wait until Dec. to message again on Instagram",
            platform: "instagram"
          },
          selected: true
        },
        {
          id: "3",
          person: "Savannah Nguyen",
          company: "Eltex",
          title: "CEO",
          sentiment: "Interested in OneText but lately unresponsive",
          lastAction: {
            message: "You offered a holiday gift on Nov. 14, 2024",
            date: "Nov. 14, 2024",
            seen: true
          },
          recommendation: {
            message: "Wait until Dec. to message again on Instagram",
            platform: "instagram"
          },
          selected: false
        }
      ];

      setConversations(sampleData);
      setLoading(false);
    }, 800);
  }, []);

  // Define columns for the data table
  const columns = [
    {
      id: 'person',
      header: 'Person',
      cell: (conversation: Conversation) => (
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
      id: 'sentiment',
      header: 'Sentiment analysis',
      cell: (conversation: Conversation) => (
        <span className="text-sm">{conversation.sentiment}</span>
      ),
    },
    {
      id: 'lastAction',
      header: 'Last action',
      cell: (conversation: Conversation) => (
        <div className="text-sm">
          <div>{conversation.lastAction.message}</div>
          <div>Message seen, but no reply</div>
        </div>
      ),
    },
    {
      id: 'recommendation',
      header: 'Recommendation',
      cell: (conversation: Conversation) => (
        <div className="text-sm text-blue-600">
          {conversation.recommendation.message}
        </div>
      ),
    },
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
      key="add-chat"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:add-circle-outline" width="20" height="20" />
      <span>Add chat</span>
    </button>,
    <button
      key="close-chat"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:checkmark-circle-outline" width="20" height="20" />
      <span>Close chat</span>
    </button>,
    <button
      key="set-reminder"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:time-outline" width="20" height="20" />
      <span>Set a reminder</span>
    </button>,
    <button
      key="move-to-target"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-destructive text-red-500 hover:bg-red-50"
    >
      <Icon icon="ion:arrow-forward-circle-outline" width="20" height="20" />
      <span>Move to target</span>
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
        title="Open conversations"
        totalCount={conversations.length}
        actions={actionButtons}
        enableSelection={true}
        enableHover={true}
        className="shadow-sm"
      />
    </div>
  );
}