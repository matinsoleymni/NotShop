import type { LaunchParams, User } from '@telegram-apps/sdk';

export interface TMAContextType {
    launchParams: LaunchParams | undefined;
    user: User | undefined;
}
