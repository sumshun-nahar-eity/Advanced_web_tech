import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Injectable()
export class NotificationService {
    constructor(
        @Inject(forwardRef(() => EnrollmentService))
        private readonly enrollmentService: EnrollmentService
    ) {}

    sendNotification(srudentName: string, message: string) {
        return {
            message: "Notification Sent",
            to: srudentName,
            content: message,
        }
    }

    checkEnrollmentAndNotify(studentName: string, courseId: string) {
        const enrollments = this.enrollmentService.getEnrollments();
        return {
            message: "Checked enrollment for student and sent notification.",
            studentName,
            courseId,
            enrollmentData: enrollments,
        }
    }
}
