/**
 * PDF Generator utility for Student Progress and Quiz Summary Report.
 * Uses jsPDF to generate a clean, formatted student transcript and certificate summary.
 */

import { jsPDF } from 'jspdf';
import { Chapter, UserProgress } from '../types';

export function generateProgressPDF(
  chapters: Chapter[],
  progress: UserProgress,
  studentName: string = 'Python Student'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const navy = [15, 23, 42]; // #0f172a
  const sky = [2, 132, 199]; // #0284c7
  const slate = [100, 116, 139]; // #64748b
  const lightGray = [248, 250, 252]; // #f8fafc
  const emerald = [16, 185, 129]; // #10b981
  const borderGray = [226, 232, 240]; // #e2e8f0

  let y = margin;

  // Header Banner
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, y, contentWidth, 24, 'F');

  // Brand Wordmark & Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('PYTHON MASTERY', margin + 6, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(186, 230, 253);
  doc.text('Official Student Progress Report & Academic Transcript', margin + 6, y + 17);

  // Right-aligned Issue Date & ID
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const transcriptId = `TR-${Math.abs(
    studentName.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
  )
    .toString(16)
    .toUpperCase()}-${new Date().getFullYear()}`;

  doc.setFontSize(8);
  doc.setTextColor(224, 242, 254);
  doc.text(`Date: ${today}`, pageWidth - margin - 6, y + 10, { align: 'right' });
  doc.text(`ID: ${transcriptId}`, pageWidth - margin - 6, y + 17, { align: 'right' });

  y += 30;

  // Student Profile Card
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(`Student: ${studentName}`, margin + 5, y + 8);

  const completedCount = progress.completedChapters.length;
  const completionPercent = Math.round((completedCount / chapters.length) * 100);
  const quizScores = Object.values(progress.quizScores);
  const avgQuiz =
    quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;
  const challengesCount = progress.completedChallenges.length;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text(`Curriculum Status: ${completionPercent}% Complete (${completedCount}/${chapters.length} Chapters Read)`, margin + 5, y + 15);
  doc.text(`Coding Challenges: ${challengesCount}/${chapters.length} Solved  |  Average Quiz Mastery: ${avgQuiz}%`, margin + 5, y + 21);

  y += 32;

  // Section Header: Detailed Chapter Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('Chapter-by-Chapter Curriculum & Assessment Breakdown', margin, y);

  y += 5;

  // Table Header
  const colWidths = [14, 80, 24, 30, 30]; // total = 178
  const headers = ['Ch', 'Chapter Title', 'Read Status', 'Quiz Score', 'Challenge'];

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, y, contentWidth, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);

  let currentX = margin;
  headers.forEach((h, idx) => {
    doc.text(h, currentX + 3, y + 5.5);
    currentX += colWidths[idx];
  });

  y += 8;

  // Table Rows for all 10 chapters
  chapters.forEach((ch, idx) => {
    const isCompleted = progress.completedChapters.includes(ch.id);
    const score = progress.quizScores[ch.id];
    const isChallengeSolved = progress.completedChallenges.includes(ch.challenge.id);

    const rowHeight = 9.5;
    const isEven = idx % 2 === 0;

    if (isEven) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    }
    doc.rect(margin, y, contentWidth, rowHeight, 'F');

    // Horizontal line
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);

    // Ch Num
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(sky[0], sky[1], sky[2]);
    doc.text(ch.number, margin + 3, y + 6);

    // Title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    const cleanTitle = ch.title.length > 40 ? ch.title.substring(0, 38) + '...' : ch.title;
    doc.text(cleanTitle, margin + colWidths[0] + 3, y + 6);

    // Read Status
    if (isCompleted) {
      doc.setTextColor(emerald[0], emerald[1], emerald[2]);
      doc.text('Completed', margin + colWidths[0] + colWidths[1] + 3, y + 6);
    } else {
      doc.setTextColor(slate[0], slate[1], slate[2]);
      doc.text('In Progress', margin + colWidths[0] + colWidths[1] + 3, y + 6);
    }

    // Quiz Score
    if (score !== undefined) {
      if (score >= 80) {
        doc.setTextColor(emerald[0], emerald[1], emerald[2]);
      } else {
        doc.setTextColor(navy[0], navy[1], navy[2]);
      }
      doc.text(`${score}% Passed`, margin + colWidths[0] + colWidths[1] + colWidths[2] + 3, y + 6);
    } else {
      doc.setTextColor(slate[0], slate[1], slate[2]);
      doc.text('Not Taken', margin + colWidths[0] + colWidths[1] + colWidths[2] + 3, y + 6);
    }

    // Challenge Status
    if (isChallengeSolved) {
      doc.setTextColor(emerald[0], emerald[1], emerald[2]);
      doc.text('Passed Tests', margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 3, y + 6);
    } else {
      doc.setTextColor(slate[0], slate[1], slate[2]);
      doc.text('Pending', margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 3, y + 6);
    }

    y += rowHeight;
  });

  y += 8;

  // Competency Mastery Summary Card
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('Core Technical Competencies Assessed:', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(slate[0], slate[1], slate[2]);

  const competencies = [
    '• Python syntax fundamentals, dynamic typing, and memory model semantics.',
    '• Control flow logic: comparison algebra, boolean operators, and loop iteration.',
    '• Collections: sequence indexing, list slicing, tuples, sets, and dictionary lookups.',
    '• Modular functions: parameter passing, variable scope, and defensive exception handling.',
    '• Object-Oriented Programming: classes, constructor initializers (__init__), and encapsulation.',
  ];

  let compY = y + 11;
  competencies.forEach((c) => {
    doc.text(c, margin + 5, compY);
    compY += 4.5;
  });

  y += 42;

  // Footer & Seal
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.line(margin, pageHeight - 20, margin + contentWidth, pageHeight - 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text('Python Mastery Interactive Courseware · Document generated client-side for verified student records.', margin, pageHeight - 15);
  doc.text(`Verification Hash: ${transcriptId}`, pageWidth - margin, pageHeight - 15, { align: 'right' });

  // Download PDF file
  const sanitizedName = studentName.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`Python_Mastery_Transcript_${sanitizedName}.pdf`);
}
