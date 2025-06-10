import { NavLink } from "react-router";
import NotLogo from "../assets/icons/logo.svg?react";
import BottomNavigation from "~/components/BottomNavigation";
import { useTMA } from "~/contexts/TMAContext";
import { useState } from "react";
import type { AppBottomNavigationProps } from "../types/AppBottomNavigationProps";
import { useTranslation } from "react-i18next";

export default function AppBottomNavigation({ cartContent }: AppBottomNavigationProps) {
    const { user } = useTMA();
    const [profileImageError, setProfileImageError] = useState(false);
    const { t } = useTranslation();

    return (
        <BottomNavigation>
            {cartContent ? (
                cartContent
            ) : (
                <>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center"
                            : "flex flex-col items-center opacity-50"}>
                        <NotLogo className="w-6 h-6 mx-auto dark:invert-100" />
                        <p className="mt-1 text-[10px] font-medium">{t('store')}</p>
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center"
                            : "flex flex-col items-center opacity-50"}>
                        {user?.photo_url && !profileImageError ? (
                            <img
                                src={user?.photo_url}
                                className="w-6 h-6 rounded-full object-top mx-auto"
                                onError={() => setProfileImageError(true)}
                            />
                        ) : (
                            <span className="w-6 h-6 rounded-full object-top mx-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                {user?.first_name?.[0]}{user?.last_name?.[0]}
                            </span>
                        )}

                        <p className="mt-1 text-[10px] font-medium">{t('profile')}</p>
                    </NavLink>
                </>
            )}
        </BottomNavigation>
    );
}
