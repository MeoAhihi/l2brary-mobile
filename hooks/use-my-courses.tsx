import { useQuery } from "@tanstack/react-query";
import api from "./axios-interceptor";

export type EnrollmentResponse = {
  id: number;
  user: {
    id: string;
    fullName: string;
    internationalName: string;
  };
  course: {
    id: string;
    title: string;
    code: string;
  };
  status: string;
  enrolledAt: string;
};

export type CourseResponse = {
  id: string;
  title: string;
  code: string;
  description: string;
  difficulty: string;
  isPublic: boolean;
  isRequireApproval: boolean;
  isAllowGuestAccess: boolean;
  thumbnail: string | null;
  maxStudents: number;
  enrollmentDeadline: string;
  group: string;
  scheduleType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  scheduleDetail: any;
  chatGroupUrl: string;
  createdAt: string;
  updatedAt: string;
  isEnrollable: boolean;
};

export function useMyCourses() {
  return useQuery({
    queryKey: ["my-enrollment"],
    queryFn: async () => {
      const enrollmentsRes = await api.get<{
        message: string;
        enrollment: EnrollmentResponse[];
      }>("/enrollment/my");

      const courseList = (enrollmentsRes.data.enrollment ?? []).map(
        (e) => e.course
      );
      const courses = (
        await Promise.all(
          courseList.map(async (c) => {
            const res = await api.get<CourseResponse>(`/course/${c.id}`);
            if (res.status === 200) return res.data;
            return null;
          })
        )
      )
        .filter((c) => !!c)
        .map((c) => ({
          ...c,
          enrollment: enrollmentsRes.data.enrollment.find(
            (e) => e.course.id === c.id
          ),
        }))
        .sort((a, b) => {
          // show status 'approved' > 'rejected' > 'pending'
          const getOrder = (status: string | undefined) =>
            status === "approved"
              ? 0
              : status === "rejected"
              ? 1
              : status === "pending"
              ? 2
              : 3;
          return (
            getOrder(a.enrollment?.status) - getOrder(b.enrollment?.status)
          );
        });
      return { enrollments: enrollmentsRes.data, courses };
    },
  });
}
