import fs from 'fs';
import { createCanvas } from 'canvas';

// Create project images
const projects = [
  { name: 'project1', title: 'E-commerce Platform' },
  { name: 'project2', title: 'Task Management App' },
  { name: 'project3', title: 'Portfolio Website' }
];

projects.forEach(project => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, 800, 600);

  // Title
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(project.title, 400, 300);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(`./${project.name}.jpg`, buffer);
}); 