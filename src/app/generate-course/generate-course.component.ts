import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-generate-course',
  templateUrl: './generate-course.component.html',
  styleUrls: ['./generate-course.component.css'],
})
export class GenerateCourseComponent {
  courseDescription = '';
  generatedCourse = '';
  generatedCourseHTML = '';
  loading = false;

  async generateCourse() {
    this.loading = true;

    const apiKey = 'AIzaSyCk3UtmXVB-6n87FijINhQquqjtKUpB1mo'; // Replace with your Gemini API key

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: this.courseDescription, // Pass the course description here
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log('API Response:', data);

        if (data.candidates && data.candidates.length > 0) {
          const candidateContent = data.candidates[0].content;
          if (candidateContent && candidateContent.parts && candidateContent.parts.length > 0) {
            this.generatedCourse = candidateContent.parts[0].text.trim(); // Extract text from the first part
            this.generatedCourseHTML = candidateContent.parts[0].text.trim(); // Extract text from the first part

            // Convert the markdown-like content into HTML
            this.generatedCourseHTML = this.convertToHTML(this.generatedCourse);
          } else {
            this.generatedCourseHTML = 'No parts found in the response.';
          }
        } else {
          this.generatedCourseHTML = 'No candidates found in the response.';
        }
      } else {
        const data = await response.json();
        this.generatedCourseHTML = `Error generating course: ${data.error.message}`;
      }
    } catch (error) {
      console.error('Error generating course:', error);
      this.generatedCourseHTML = 'Error generating course!';
    } finally {
      this.loading = false;
    }
  }

  convertToHTML(content: string): string {
    // Replace markdown-like syntax with HTML tags for display
    content = content.replace(/## (.*?)\n/g, '<h2>$1</h2>'); // Convert headers
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Convert bold text
    content = content.replace(/\* (.*?)\n/g, '<ul><li>$1</li></ul>'); // Convert bullet points
    content = content.replace(/\n/g, '<p>$&</p>'); // Convert paragraphs by replacing newlines

    return content;
  }

  // Function to remove HTML tags before generating the PDF
  removeHTML(content: string): string {
    return content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  }

  downloadPdf() {
    const doc = new jsPDF('p', 'mm', 'a4');  // Portrait orientation, millimeter units, A4 size
  
    const margins = { top: 20, left: 10, bottom: 20, right: 10 };  // Adjusted margins
    const pageHeight = doc.internal.pageSize.height;  // Get page height
  
    const lineHeight = 8;  // Set the line height for readability
    const pageWidth = doc.internal.pageSize.width;  // Get page width
  
    // Split the course content into paragraphs
    const contentLines = doc.splitTextToSize(this.generatedCourse, pageWidth - margins.left - margins.right);
  
    let yPos = margins.top;  // Set the initial position for text
  
    // Function to add headers with formatting (Bold, Blue color)
    const addHeader = (header: string) => {
      header = header.replace(/^\*\*(.*?)\*\*$/, '$1');  // Remove ** at the beginning and end
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 51, 153);  // Set color to blue
      doc.text(header, margins.left, yPos);
      yPos += lineHeight * 2;  // Add extra space after the header
    };
  
    // Function to add sub-headers with formatting (Bold, Dark Gray color)
    const addSubHeader = (subHeader: string) => {
      subHeader = subHeader.replace(/^\*\*(.*?)\*\*$/, '$1');  // Remove ** at the beginning and end
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(77, 77, 77);  // Dark gray color for sub-headers
      doc.text(subHeader, margins.left, yPos);
      yPos += lineHeight;  // Adjust spacing after sub-header
    };
  
    // Function to add regular paragraphs with default styling (Black color)
    const addParagraph = (text: string) => {
      text = text.replace(/^\*\*(.*?)\*\*$/, '$1');  // Remove ** at the beginning and end
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);  // Black text color for regular paragraphs
      doc.text(text, margins.left, yPos);
      yPos += lineHeight;  // Space after paragraph
    };
  
    // Function to add bullet points with indentation (Black color)
    const addBulletPoints = (bulletPoints: string[]) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);  // Black color for bullet points
      for (let point of bulletPoints) {
        point = point.replace(/^\*\*(.*?)\*\*$/, '$1');  // Remove ** at the beginning and end
        doc.text("• " + point, margins.left + 5, yPos);  // Indentation for bullets
        yPos += lineHeight;  // Space between bullet points
      }
    };
  
    // Function to add emphasized text with formatting (Italic, Green color)
    const addEmphasizedText = (text: string) => {
      text = text.replace(/^\*\*(.*?)\*\*$/, '$1');  // Remove ** at the beginning and end
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(0, 153, 51);  // Green text color for emphasized text
      doc.text(text, margins.left, yPos);
      yPos += lineHeight;  // Space after emphasized text
    };
  
    // Loop through the contentLines and add them to the PDF
    contentLines.forEach((line: string) => {
      if (yPos + lineHeight > pageHeight - margins.bottom) {
        doc.addPage();  // Add a new page if content overflows
        yPos = margins.top;  // Reset yPos to top of the new page
      }
  
      // Handle headers (lines starting with '#') and sub-headers (lines starting with '##')
      if (line.startsWith('# ')) {
        // It's a main header (starts with '# ')
        addHeader(line.slice(2));  // Remove '#' symbol
      } else if (line.startsWith('## ')) {
        // It's a sub-header (starts with '## ')
        addSubHeader(line.slice(3));  // Remove '##' symbol
      } else if (line.startsWith('* ')) {
        // It's a bullet point (starts with '* ')
        addBulletPoints([line.slice(2)]);  // Remove '*' symbol
      } else if (line.startsWith('**')) {
        // It's emphasized text (starts with '**')
        addEmphasizedText(line);  // Remove '**' symbol
      } else {
        // Regular text (normal paragraph)
        addParagraph(line);
      }
    });
  
    doc.save('GeneratedCourse.pdf');  // Save the PDF
  }
}