import { useQuery } from "@tanstack/react-query";
import api from "./axios-interceptor";

export type ProfileResponse = {
  id: string;
  avatarUrl: string | null;
  fullName: string;
  internationalName: string;
  gender: string;
  birthdate: string;
  phoneNumber: string;
  email: string;
  rank: string;
  courseCertificates: string[];
  eventCertificates: string[];
  experiences: string[];
  createdAt: string;
  updatedAt: string;
  roles: {
    id: string;
    name: string;
    description: string | null;
  }[];
};

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await api.get<ProfileResponse>("/user/profile");
    },
    select: (res) => res.data,
  });
}
