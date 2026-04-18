import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class EnrollmentService {
    constructor(
        private readonly courseService: CourseService,
    ) { }

    enrollStudent(studentName: string, courseId: string) {
        const course = this.courseService.getCourseById(courseId);
        return {
            message: `Student ${studentName} enrolled in course ${courseId}.`,
            course,
        }
    }
    getEnrollments() {
        return {
            message: "All enrollments fetched.",
            data: [],
        }
    }
}


