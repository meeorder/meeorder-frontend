import { user, type User } from "@/modules/user/mock/user";

export type Session = {
  user: User | null;
  headTableUser: User | null;
  coupon: string | null;
  tableNumber: number | null;
};

export const session: Session = {
  user: user,
  headTableUser: user,
  coupon: "1",
  tableNumber: 10,
};
