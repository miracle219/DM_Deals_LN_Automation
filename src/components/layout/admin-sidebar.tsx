"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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

  // Handle clicking outside of profile menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  // Admin menu items
  const navItems = [
    {
      name: 'Users',
      href: '/admin/dashboard/users',
      icon: 'ion:people-outline',
    }
  ];

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-72'} h-screen flex flex-col bg-white transition-all duration-300 md:pl-3 ${className}`}
    >
      {/* Logo and toggle button area */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <div className="min-w-[24px] flex items-center justify-center">
            <Icon icon="ion:file-tray-full-outline" width="24" />
          </div>
          {!collapsed && <span className="font-bold text-lg whitespace-nowrap">DM Deals Admin</span>}
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
                            ? 'bg-gray-100 '
                            : ' hover:bg-gray-50'
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
        <div className="p-2 border-t border-gray-100 relative" ref={profileMenuRef}>
          <TooltipProvider>
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="flex justify-center p-2 w-full"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <Avatar className="h-10 w-10 bg-gray-200">
                      <AvatarFallback className="text-gray-700">
                        {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {session.user.name || 'Admin User'}
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                className="flex items-center space-x-3 p-2 w-full hover:bg-gray-50 rounded-md"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback className="text-gray-700">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {session.user.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email || ''}
                  </p>
                </div>
                <Icon
                  icon={showProfileMenu ? "ion:chevron-up" : "ion:chevron-down"}
                  width="16"
                  className="text-gray-500"
                />
              </button>
            )}
          </TooltipProvider>

          {/* Profile dropdown menu */}
          {showProfileMenu && (
            <div className={`absolute ${collapsed ? 'left-full ml-2' : 'left-4 right-4 mt-2'} bottom-full mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-10`}>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 p-3 w-full text-left hover:bg-gray-50 text-gray-700"
              >
                <Icon icon="ion:log-out-outline" width="18" className="text-gray-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}