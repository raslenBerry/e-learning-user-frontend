

// chapter-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChapterService } from 'src/app/services/chapter.service';
import { DomSanitizer } from '@angular/platform-browser';

interface Chapter {
  idChapter: string;
  courseId: string;
  name: string;
  description: string;
  content: string;
}


@Component({
  selector: 'app-managechapters',
  templateUrl: './managechapters.component.html',
  styleUrls: ['./managechapters.component.css']
})

export class ManagechaptersComponent implements OnInit {
  courseId!: string;
  chapterForm!: FormGroup;
  chapters: any[] = [];
  isLoading = false;
  isIframeLoaded = false;

  onIframeLoad(): void {
    this.isIframeLoaded = true;
  }
  
  // Variables pour le modal
  isModalOpen = false;
  selectedChapter: any = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.chapterForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', Validators.required],
    });

    this.getChapters();
  }

  getChapters(): void {
    this.isLoading = true;
    this.chapterService.getChaptersByCourseId(this.courseId).subscribe({
      next: (data) => {
        this.chapters = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des chapitres:', err);
        this.isLoading = false;
      },
    });
  }

  addChapter(): void {
    if (this.chapterForm.valid) {
      const newChapter = {
        ...this.chapterForm.value,
        courseId: this.courseId,
        
      };

      this.chapterService.addChapter(newChapter).subscribe({
        next: (data) => {
          this.chapters.push(data);
          this.chapterForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du chapitre:', err);
        },
      });
    }
  }

  openModal(chapter: any): void {
    if (chapter.content.includes('drive.google.com')) {
      const fileId = chapter.content.split('/d/')[1]?.split('/')[0];
      chapter.content = `https://drive.google.com/file/d/${fileId}/preview`;
    }
    this.selectedChapter = chapter;
    this.isModalOpen = true;
  }
  
  
  

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedChapter = null;
  }
}