import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-chapters',
  templateUrl: './course-chapters.component.html',
  styleUrls: ['./course-chapters.component.css']
})
export class CourseChaptersComponent implements OnInit {
  chapters: any[] = [];
  selectedCourseId: string | null = null;
  isLoadingChapters = false;
  isModalOpen = false;
  selectedChapter: any | null = null;
  isIframeLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedCourseId = params['courseId'];
      if (this.selectedCourseId) {
        this.loadChapters(this.selectedCourseId);
      }
    });
  }

  private loadChapters(courseId: string): void {
    this.isLoadingChapters = true;

    // Call the service to fetch chapters for the course
    this.courseService.getChaptersByCourseId(courseId).subscribe({
      next: (data) => {
        this.chapters = data;
        this.isLoadingChapters = false;
      },
      error: (error) => {
        console.error('Error fetching chapters:', error);
        this.isLoadingChapters = false;
      },
    });
  }

  openModal(chapter: any): void {
    if (chapter.content.includes('drive.google.com')) {
      const fileId = chapter.content.split('/d/')[1]?.split('/')[0];
      chapter.content = `https://drive.google.com/file/d/${fileId}/preview`;
    }
    this.selectedChapter = chapter;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedChapter = null;
  }

  onIframeLoad(): void {
    this.isIframeLoaded = true;
  }
}
