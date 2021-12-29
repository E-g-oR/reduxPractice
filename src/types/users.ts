export type User = {
  name: string;
  email: string;
  id: number;
};

export type Developer = User & {
  type: "DEVELOPER";
  mentorId: number | null;
};

export type Mentor = User & {
  type: "MENTOR";
  developers: Array<number>;
};

export type CreateUser = {
  name: string,
  email: string,
  type: "DEVELOPER" | "MENTOR"
}