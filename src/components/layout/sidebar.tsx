"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  // Set initial collapsed state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  // Admin-specific items
  const navItems = [
    {
      name: 'Target',
      href: '/dashboard/targets',
      icon: 'ion:person-circle-outline',
    },
    {
      name: 'Open',
      href: '/dashboard/open',
      icon: 'ion:chatbox-ellipses-outline',
    },
    {
      name: 'Closed',
      href: '/dashboard/closed',
      icon: 'ion:chatbox-outline',
    },
    {
      name: 'Archived',
      href: '/dashboard/archived',
      icon: 'ion:archive-outline',
    },
    {
      name: 'Education',
      href: '/dashboard/education',
      icon: 'ion:book-outline',
    },
    {
      name: 'Support',
      href: '/dashboard/support',
      icon: 'ion:help-buoy-outline',
    },
    {
      name: 'Users',
      href: '/dashboard/users',
      icon: 'ion:people-outline',
    }
  ];

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-72'} h-screen flex flex-col bg-white transition-all duration-300 md:pl-3 ${className}`}
    >
      {/* Logo and toggle button area */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="min-w-[24px] flex items-center justify-center">
            <Icon icon="ion:file-tray-full-outline" width="24" />
          </div>
          {!collapsed && <span className="font-bold text-lg whitespace-nowrap">DM Deals</span>}
        </Link>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Collapse sidebar"
          >
            <Icon icon="ion:chevron-back" width="16" />
          </button>
        )}
      </div>

      {/* Toggle button for expanding when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 p-1 rounded-md hover:bg-gray-100"
          aria-label="Expand sidebar"
        >
          <Icon icon="ion:chevron-forward" width="16" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <ul className="space-y-1">
          <TooltipProvider>
            {navItems.map((item) => (
              <li key={item.name}>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                          isActive(item.href)
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon icon={item.icon} width="20" className="flex-shrink-0" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 font-bold'
                        : ' hover:bg-gray-100'
                    }`}
                  >
                    <Icon icon={item.icon} width="20" className="flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </TooltipProvider>
        </ul>
      </nav>

      {/* User profile area - fixed at bottom */}
      {session?.user && (
        <div className="p-2 border-t border-gray-100">
          <TooltipProvider>
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center p-2">
                    <Avatar className="h-10 w-10 bg-gray-200">
                      <AvatarFallback className="text-gray-700">
                        {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {session.user.name || 'User'}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex items-center space-x-3 p-2">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback className="text-gray-700">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {session.user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email || ''}
                  </p>
                </div>
              </div>
            )}
          </TooltipProvider>
        </div>
      )}
    </aside>
  );
}