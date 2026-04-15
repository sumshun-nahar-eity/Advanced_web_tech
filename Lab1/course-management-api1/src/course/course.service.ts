import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {

  getAllCourses() {
    return {
      message: 'All courses fetched',
      data: []
    };
  }

  getCourseById(id: string) {
    return {
      message: 'Course fetched',
      id
    };
  }

  createCourse(dto: CreateCourseDto) {
    return {
      message: 'Course created',
      data: dto
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    return {
      message: 'Course updated',
      id,
      data: dto
    };
  }

  deleteCourse(id: string) {
    return {
      message: 'Course deleted',
      id
    };
  }
}