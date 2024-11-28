import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentInterestService } from 'src/app/services/student-interest.service';

@Component({
  selector: 'app-student-interest',
  templateUrl: './student-interest.component.html',
  styleUrls: ['./student-interest.component.css']
})
export class StudentInterestComponent implements OnInit {
  // List of available interests for the student to choose from
  interests: string[] = [
    "Artificial Intelligence & Machine Learning",
    "Web Development",
    "Cloud Computing",
    "Cybersecurity",
    "Data Science & Big Data",
    "Mobile App Development",
    "DevOps & Continuous Integration",
    "Automation Engineering",
    "Database Management & Optimization",
    "User Experience (UX) & User Interface (UI) Design",
    "Embedded Systems",
    "5G Technology",
    "Big Data Analytics",
    "Business Intelligence (BI) Tools",
    "Agile Project Management",
    "Software Architecture & Design Patterns",
    "Ethical Hacking",
    "Augmented Reality (AR) Development",
    "Cloud-native Technologies (Kubernetes, Docker)"
  ];

  // Holds the selected interests as boolean (true or false)
  selectedInterests: boolean[] = new Array(this.interests.length).fill(false);

  constructor(private interestService: StudentInterestService, private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    console.log('Retrieved email:', email); // Log to see the email retrieved from localStorage
    if (!email) {
      console.error('No user email found.');
      this.router.navigate(['/login']); // Redirect to login if no email is found
    } else {
      console.log('User email:', email); // Log the email if found
    }
  }
  
  // Toggle interest selection with a limit of 5 selections
  toggleInterest(index: number): void {
    if (this.selectedInterests.filter(Boolean).length < 5 || this.selectedInterests[index]) {
      this.selectedInterests[index] = !this.selectedInterests[index];
    }
  }

  // Check if the submit button should be disabled (no interests selected)
  isSubmitDisabled(): boolean {
    return this.selectedInterests.filter(Boolean).length === 0;
  }

  // Check if the user has reached the limit of 5 interests
  isLimitReached(): boolean {
    return this.selectedInterests.filter(Boolean).length >= 5;
  }

  // Handle the form submission
  onSubmit(): void {
    const selectedTechnologies = this.interests.filter((_, index) => this.selectedInterests[index]);

    const email = localStorage.getItem('email'); // Ensure email key is consistent

    if (email) {
      this.interestService.saveInterests(email, selectedTechnologies).subscribe(
        (response) => {
          console.log('Interests saved:', response);
          this.router.navigate(['/home']); // Navigate to home after saving interests
        },
        (error) => {
          console.error('Error saving interests:', error);
        }
      );
    } else {
      console.error('No user email found.');
    }
  }
}