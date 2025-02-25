'use client';

import { useRouter } from 'next/navigation';
import AppLogo from '@/components/common/layout/AppLogo';
import ModeToggle from './ModeToggle';
import NavLinks from './NavLinks';
import { Button } from '@/components/ui/button';
import { PowerIcon } from 'lucide-react';

export default function SideNav() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/logout');
    };

    return (
        <div className="flex flex-col h-full p-3">
            <div>
                <AppLogo />
            </div>

            <div className="flex flex-row grow space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:mt-2">
                <NavLinks />
                <div className="h-auto w-full grow rounded-md md:block"></div>

                <div className="flex md:flex-col ">
                    <ModeToggle />
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground"
                        onClick={handleLogout}
                    >
                        <PowerIcon className="w-6 mr-2" />
                        <div className="hidden md:block">Sign Out</div>
                    </Button>
                </div>
            </div>
        </div>
    );
}