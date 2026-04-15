import { Controller, Get, Post, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {

  constructor(private enrollmentService: EnrollmentService) {}

  @Get()
  getAll() {
    return this.enrollmentService.getEnrollments();
  }

  @Post()
  enroll(@Body() body: any) {
    return this.enrollmentService.enrollStudent(
      body.studentName,
      body.courseId
    );
  }
}