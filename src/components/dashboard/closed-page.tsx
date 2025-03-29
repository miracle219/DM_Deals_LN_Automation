"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/layout/data-table";

type ClosedConversation = {
  id: string;
  person: string;
  company: string;
  title: string;
  avatar?: string;
  status: string;
  supplement?: string;
  selected: boolean;
};

export default function ClosedConversationsComponent() {
  const [conversations, setConversations] = useState<ClosedConversation[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating API call
  useEffect(() => {
    setTimeout(() => {
      // Sample data
      const sampleData: ClosedConversation[] = [
        {
          id: "1",
          person: "Kristin Watson",
          company: "ExtremeNetwork",
          title: "Director of operations",
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email. Great job!",
          supplement: "Supplement brand on Shopify",
          selected: true
        },
        {
          id: "2",
          person: "Jesse Puiji",
          company: "Uniboat",
          title: "Partner",
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email. Great job!",
          supplement: "Supplement brand on Shopify",
          selected: false
        },
        {
          id: "3",
          person: "Savannah Nguyen",
          company: "Check Point",
          title: "COO",
          status: "You created this opportunity on X DMs and successfully moved the deal along to Email. Great job!",
          supplement: "Supplement brand on Shopify",
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
      cell: (conversation: ClosedConversation) => (
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
            {conversation.supplement && (
              <div className="text-xs text-gray-500">{conversation.supplement}</div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      cell: (conversation: ClosedConversation) => (
        <span className="text-sm">{conversation.status}</span>
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
      key="add-chat"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:add-circle-outline" width="20" height="20" />
      <span>Add chat</span>
    </button>,
    <button
      key="scrape-profile"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:aperture-outline" width="20" height="20" />
      <span>Scrape profile</span>
    </button>,
    <button
      key="move-to-archive"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:arrow-down-circle-outline" width="20" height="20" />
      <span>Move to archive</span>
    </button>,
    <button
      key="re-open"
      className="flex items-center space-x-2 px-3 py-2 rounded-md border border-destructive text-red-500 hover:bg-red-50"
    >
      <Icon icon="ion:sync-circle-outline" width="20" height="20" />
      <span>Re-open</span>
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
        title="Closed conversations"
        totalCount={conversations.length}
        actions={actionButtons}
        enableSelection={true}
        enableHover={true}
        className="shadow-sm"
      />
    </div>
  );
}