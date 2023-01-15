import { nameByActionType } from 'helpers/actionType';

export type GamePlayer = {
  name: string;
  profileImageUrl?: string;
  actionType: keyof typeof nameByActionType;
  stack: number;
  betSize?: number;
};
