<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const showMobileNav = ref(false)
const isDarkMode = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submissionStatus = ref({
  message: '',
  type: ''
})

const projects = ref([
  {
    title: 'E-commerce Platform',
    description: 'A simple E-commerce website built with Django and deployed with AWS.',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/GJXStore.png?alt=media&token=6db2c220-6a8c-4e4f-a6e6-14ea0a30b2f4',
    tags: ['Python','Django', 'AWS', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/yzu1062039/E-commerce-with-Django-and-AWS',
    demo: 'https://gjxstore.com/'
  },
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio website with interactive animations.',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/portfolio.png?alt=media&token=db979676-fbe6-4d66-88cd-7e443c6dbbea',
    tags: ['Vue.js', 'GSAP', 'SCSS'],
    github:'https://github.com/yzu1062039/Portfolio',
    demo: 'https://portfolio-omega-rust-84.vercel.app/'
  },
  {
    title: 'Responsive Admin Dashboard',
    description: 'Modern Responsive Admin Dashboard with Flutter.',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/Responsive-Admin-Dashboard.png?alt=media&token=904695f8-0ae3-4796-b3b8-a6385ad222cb',
    tags: ['Flutter', 'Dart'],
    github: 'https://github.com/yzu1062039/Flutter-Responsive-Admin-Dashboard',
    demo: '#'
  },
  {
    title: 'Movies App',
    description: 'An App listing top-rated and recently popular Movies with TMDB Api and Flutter.',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/movie_app.png?alt=media&token=2797b755-4a69-47b7-b2cf-61ec579e6dc6',
    tags: ['Flutter', 'TMDB Api', 'Dart'],
    github: 'https://github.com/yzu1062039/Movies-App-with-TMDB-and-Flutter',
    demo: '#'
  },
  {
    title: 'Music Player App',
    description: 'A Music Player App with Firebase and Flutter.',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/music%20player%20app.png?alt=media&token=7b575008-b766-49a0-b726-1d0074654dd5',
    tags: ['Flutter', 'Firebase', 'Dart'],
    github: 'https://github.com/yzu1062039/Music-Player-App-with-Firebase-and-Flutter',
    demo: '#'
  },
  {
    title: 'Polar Bear Running',
    description: 'A mobile game App with Unity.',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/game%20title.png?alt=media&token=d1740c4d-3dbd-4d20-be10-0b9f2c1f5718',
    tags: ['Unity', 'C#', 'Game'],
    github: '#',
    demo: 'https://apps.apple.com/jp/app/polarbearrunning/id6744299368?l=en-US'
  },
  {
    title: 'CubeSide方塊邊境',
    description: 'An ARPG with Unity.',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/cubeside.png?alt=media&token=11120ef0-3fee-4c4e-aa66-a31ff7987be4',
    tags: ['Unity', 'C#', 'Game'],
    github: '#',
    demo: 'https://www.youtube.com/watch?v=6ztoyjFycBw'
  },
  {
    title: 'Vision Transformer',
    description: 'A Vision Transformer(ViT) built with Python(jupyter notebook).',
    image: 'https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/predic.png?alt=media&token=c0656cf1-5462-4eb1-9eb4-175a52de3bfd',
    tags: ['Python', 'Jupyter Notebook', 'Pytorch', 'Computer Vision'],
    github: 'https://github.com/yzu1062039/Building_Vision_Transformer_on_CIFAR_10',
    demo: '#'
  },
])

const skills = ref([
  { name: 'Vue.js', level: 80, icon: 'fab fa-vuejs' },
  { name: 'JavaScript', level: 90, icon: 'fab fa-js' },
  { name: 'Node.js', level: 85, icon: 'fab fa-node-js' },
  { name: 'HTML/CSS', level: 90, icon: 'fab fa-html5' },
  { name: 'Flutter', level: 90, icon: 'lni lni-flutter' },
  { name: 'Python', level: 85, icon: 'fab fa-python' },
  { name: 'PyTorch', level: 80, icon: 'icon-pytorch icon-PyTorch' },
  { name: 'Django', level: 80, icon: 'icon-django icon-django-logo-positive' },
  { name: 'C#', level: 80, icon: 'icon icon-c-sharp' },
  { name: 'Unity', level: 90, icon: 'fab fa-unity' },
  { name: 'PHP', level: 85, icon: 'fab fa-php' },
  { name: 'Laravel', level: 80, icon: 'fab fa-laravel' },
  { name: 'MySQL', level: 90, icon: 'lni lni-mysql' },
  { name: 'Firebase', level: 80, icon: 'lni lni-firebase' },
  { name: 'AWS', level: 80, icon: 'fab fa-aws' },
  { name: 'Git', level: 80, icon: 'fab fa-git' },
 

])

function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value
}

function closeMobileNav() {
  showMobileNav.value = false
}

async function handleSubmit() {
  submissionStatus.value = { message: 'Sending...', type: 'info' }
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      submissionStatus.value = { message: 'Message sent successfully!', type: 'success' }
      form.value = { name: '', email: '', message: '' } // Clear form
    } else {
      const data = await response.json()
      submissionStatus.value = { message: data.message || 'Oops! Something went wrong.', type: 'error' }
    }
  } catch (error) {
    submissionStatus.value = { message: 'There was a network error. Please try again.', type: 'error' }
  }
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDarkMode.value = true
  }

  // Animate hero section
  gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
  })

  // Animate project cards on scroll
  gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power2.out'
    })
  })

  // Animate skill cards
  gsap.utils.toArray('.skill-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      duration: 0.5,
      delay: index * 0.1,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    })
  })
})
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <div class="logo"><a href="#home" class="logo" @click="closeMobileNav">Portfolio</a></div>
      <div class="nav-links" :class="{ open: showMobileNav }">
        <a href="#home" class="nav-link" @click="closeMobileNav">Home</a>
        <a href="#about" class="nav-link" @click="closeMobileNav">About</a>
        <a href="#projects" class="nav-link" @click="closeMobileNav">Projects</a>
        <a href="#skills" class="nav-link" @click="closeMobileNav">Skills</a>
        <a href="#contact" class="nav-link" @click="closeMobileNav">Contact</a>
        <button class="theme-switcher" @click="toggleTheme" aria-label="Toggle theme">
          <i v-if="isDarkMode" class="lni lni-sun-1"></i>
          <i v-else class="fas fa-moon"></i>
        </button>
    </div>
      <button class="hamburger" @click="toggleMobileNav" aria-label="Toggle navigation">
        <span :class="{ 'is-active': showMobileNav }"></span>
        <span :class="{ 'is-active': showMobileNav }"></span>
        <span :class="{ 'is-active': showMobileNav }"></span>
      </button>
    </nav>

  <main>
      <section id="home" class="hero">
        <div class="hero-content">
          <h1 class="glitch-text">Software Developer</h1>
          <p class="subtitle">Building modern web experiences, apps, games, and more.</p>
          <div class="cta-buttons">
            <a href="#projects" class="btn primary">View Projects</a>
            <a href="#contact" class="btn secondary">Contact Me</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://firebasestorage.googleapis.com/v0/b/spotifyclone-20250215-re01.firebasestorage.app/o/profile_anime.png?alt=media&token=1ac1794b-1968-4cc7-bd0f-c263b0965629" alt="Portrait" class="portrait-image" />
        </div>
      </section>

      <section id="about" class="about">
        <h2>About Me</h2>
        <div class="about-content">
          <div class="about-text">
            <p>A Developer from Taiwan, <span class="highlight">Guan Jun Xian</span>. I'm a passionate Software Developer with expertise in modern web, apps, games, and more technologies. I am constantly exploring new technologies and refining my skills to stay at the forefront of innovation. I believe in the power of technology to solve real-world challenges and am always eager for the next opportunity to build something impactful.</p>
          </div>
          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-number">1+</span>
              <span class="stat-label">Years of Experience</span>  
            </div>
            <div class="stat-item">
              <span class="stat-number">10+</span>
              <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">10+</span>
              <span class="stat-label">Skills</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="projects">
        <h2>Featured Projects</h2>
        <div class="project-grid">
          <div v-for="(project, index) in projects" :key="index" class="project-card">
            <div class="project-image">
              <img :src="project.image" :alt="project.title">
            </div>
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-links">
                <a v-if="project.github !== '#'" :href="project.github" target="_blank" class="project-link" aria-label="GitHub link"><i class="fab fa-github"></i></a>
                <a v-if="project.demo !== '#'" :href="project.demo" target="_blank" class="project-link" aria-label="Live demo link"><i class="fi fi-rr-arrow-up-right-from-square"></i></a>
              </div>
              <div class="project-tags">
                <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" class="skills">
        <h2>Skills & Technologies</h2>
        <div class="skills-grid">
          <div v-for="(skill, index) in skills" :key="index" class="skill-card">
            <div class="skill-icon">
              <i :class="skill.icon"></i>
            </div>
            <h3>{{ skill.name }}</h3>
            <div class="skill-level">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="contact">
        <h2>Get In Touch</h2>
        <div class="contact-content">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <input type="text" placeholder="Your Name" required v-model="form.name">
            </div>
            <div class="form-group">
              <input type="email" placeholder="Your Email" required v-model="form.email">
            </div>
            <div class="form-group">
              <textarea placeholder="Your Message" required v-model="form.message"></textarea>
            </div>
            <button type="submit" class="btn primary" :disabled="submissionStatus.type === 'info'">
              {{ submissionStatus.type === 'info' ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
          <div v-if="submissionStatus.message" :class="`form-status ${submissionStatus.type}`">
            {{ submissionStatus.message }}
          </div>
        </div>
      </section>
  </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="social-links">
          <a href="https://github.com/yzu1062039?tab=repositories" class="social-link"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/jun-xian-guan-3a6799348/?trk=opento_sprofile_details" class="social-link"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        </div>
        <p>&copy; 2025 GJX. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://cdn.lineicons.com/5.0/lineicons.css');
@import url('https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css');
@import './assets/icons.css';
@import './assets/django_icon.css';
@import './assets/PyTorch_icons.css';

:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  --accent-color: #3b82f6;
  --card-bg-color: #ffffff;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --input-bg-color: #ffffff;
  --input-border-color: #e5e7eb;
  --tag-bg-color: #e5e7eb;
  --tag-text-color: #374151;
}

.dark {
  --primary-color: #3b82f6;
  --secondary-color: #60a5fa;
  --text-color: #e5e7eb;
  --bg-color: #111827;
  --accent-color: #2563eb;
  --card-bg-color: #1f2937;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  --input-bg-color: #1f2937;
  --input-border-color: #4b5563;
  --tag-bg-color: #4b5563;
  --tag-text-color: #e5e7eb;
}

html, body, #app, .app {
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: var(--bg-color);
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text-color);
  line-height: 1.6;
}
.highlight {
  color: var(--primary-color);
  font-weight: 700;
}

.app {
  min-height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.dark .navbar {
  background-color: rgba(17, 24, 39, 0.85);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}

main {
  padding-top: 80px;
  width: 100vw;
  min-height: calc(100vh - 80px);
}

section {
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  padding: 5rem 5%;
}

.hero {
  min-height: calc(100vh - 80px);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  box-sizing: border-box;
  background: var(--bg-color);
}

.hero-content, .hero-image {
  width: 50%;
}

.glitch-text {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn.primary {
  background-color: var(--primary-color);
  color: white;
}

.btn.secondary {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.hero-image {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portrait-image {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  border: 8px solid var(--primary-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.dark .portrait-image {
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.portrait-image:hover {
  transform: scale(1.05) rotate(2deg);
}

.floating-shapes {
  display: none;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  font-size: 1.1rem;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  color: #6b7280;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.project-card {
  background: var(--card-bg-color);
  box-shadow: var(--card-shadow);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info {
  padding: 1.5rem;
}

.project-links {
  display: flex;
  gap: 1.25rem;
  margin-top: 0.75rem;
  margin-bottom: 1rem;
}

.project-link {
  color: var(--text-color);
  font-size: 1.4rem;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

.project-link:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  background-color: var(--tag-bg-color);
  color: var(--tag-text-color);
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.skill-card {
  background: var(--card-bg-color);
  box-shadow: var(--card-shadow);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.skill-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.skill-level {
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
  transition: width 1s ease;
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--input-border-color);
  background-color: var(--input-bg-color);
  color: var(--text-color);
  border-radius: 0.5rem;
  font-family: inherit;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.footer {
  background-color: #1f2937;
  color: white;
  padding: 3rem 5%;
}

.footer-content {
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.social-link {
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--primary-color);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
}

.hamburger span {
  display: block;
  width: 28px;
  height: 4px;
  margin: 4px 0;
  background: var(--primary-color);
  border-radius: 2px;
  transition: 0.3s;
}

.hamburger span.is-active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger span.is-active:nth-child(2) {
  opacity: 0;
}

.hamburger span.is-active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.theme-switcher {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.theme-switcher:hover {
  background-color: rgba(0,0,0,0.1);
}

.dark .theme-switcher:hover {
  background-color: rgba(255,255,255,0.1);
}

@media (max-width: 1024px) {
  .navbar {
    padding: 1rem 2rem;
  }
  .nav-links {
    gap: 1.2rem;
  }

  section {
    padding: 3rem 1.5rem;
    width: 100vw;
    max-width: 100vw;
  }
  .hero-content, .hero-image {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1rem;
  }
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70vw;
    max-width: 320px;
    background: #fff;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5rem 2rem 2rem 2rem;
    gap: 2rem;
    box-shadow: -2px 0 12px rgba(0,0,0,0.08);
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(.4,2,.6,1);
    z-index: 1050;
    display: flex;
  }
  .nav-links.open {
    transform: translateX(0);
  }
  .nav-link {
    font-size: 1.2rem;
    width: 100%;
    padding: 0.5rem 0;
  }
  .hamburger {
    display: flex;
  }
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 0 1.5rem 0;
    min-height: calc(100vh - 80px);
    width: 100vw;
  }
  .hero-image {
    margin-top: 2rem;
  }
  .portrait-image {
    width: 250px;
    height: 250px;
    border-width: 6px;
  }
  .hero-content, .hero-image {
    width: 100vw;
    max-width: 100vw;
  }
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .about-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .project-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .footer {
    padding: 2rem 1rem;
  }
  .footer-content {
    font-size: 0.95rem;
  }
  .contact-content {
    padding: 0;
  }
  .cta-buttons{
    padding: 0 25%;
  }
  section {
    width: 100vw;
    max-width: 100vw;
  }
}

@media (max-width: 480px) {
  .glitch-text {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }
  h2 {
    font-size: 1.3rem;
  }
  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }
  .project-image {
    height: 140px;
  }
  .skill-icon {
    font-size: 1.5rem;
  }
  .cta-buttons{
    padding: 0 25%;
  }
  .portrait-image {
    width: 200px;
    height: 200px;
  }
}

.form-status {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
  width: 100%;
  max-width: 600px;
}

.form-status.success {
  background-color: #d1fae5;
  color: #065f46;
}

.dark .form-status.success {
  background-color: #064e3b;
  color: #d1fae5;
}

.form-status.error {
  background-color: #fee2e2;
  color: #991b1b;
}

.dark .form-status.error {
  background-color: #7f1d1d;
  color: #fee2e2;
}

.form-status.info {
  background-color: #dbeafe;
  color: #1e40af;
}

.dark .form-status.info {
  background-color: #1e3a8a;
  color: #dbeafe;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--input-border-color);
  background-color: var(--input-bg-color);
  color: var(--text-color);
  border-radius: 0.5rem;
  font-family: inherit;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}
</style>
