import { Controller, Get, Param, Patch, Post, Put, Delete, Body, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) { }
    @Get()
    getAllCourses() {
        return this.courseService.getAllCourses();
    }
    @Get(':id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(id);
    }

    @Post()
    createCourse(@Body() dto: CreateCourseDto) {
        return this.courseService.createCourse(dto);
    }
    @Put(':id')
    updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
        return this.courseService.updateCourse(id, dto);
    }
    @Patch(':id')
    patchCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
        return this.courseService.patchCourse(id, dto);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }

    @Post(':id/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {

                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
            fileFilter: (req, file, callback) => {
                const ext = extname(file.originalname).toLowerCase();
                if (!ALLOWED_EXTENSIONS.includes(ext)) {
                    return callback(
                        new BadRequestException(`Invalid file type. Only ${ALLOWED_EXTENSIONS.join(', ')} are allowed.`),
                        false,
                    );
                }
                callback(null, true);
            },
            limits: {
                fileSize: MAX_FILE_SIZE_BYTES,
            },
        }),
    )

    uploadCourseMaterial(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('File is required and must be a valid type.');
        }
        return this.courseService.uploadCourseMaterial(id, file);
    }

}
