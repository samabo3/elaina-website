# 🌙 Elaina - The Journey of Elaina Website

A beautiful tribute website for Elaina from "Majo no Tabitabi" (The Journey of Elaina) featuring a music player with dynamic lyrics for the opening song "Literature" by Reina Ueda.

![Elaina](public/elaina-hero.jpg)

## ✨ Features

- 🎨 **Magical Design** - Dark purple theme with animated starfield background
- 🎵 **Music Player** - Full-featured player with synchronized lyrics
- 🌐 **Multilingual Lyrics** - Japanese, Romaji, and English translations
- 📱 **Responsive** - Works on desktop and mobile devices
- ⚡ **Fast** - Built with Vite for optimal performance

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/elaina-website.git
   cd elaina-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your MP3 file**
   - Rename your audio file to `literature.mp3`
   - Place it in the `public/` folder

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
elaina-website/
├── .github/workflows/    # GitHub Actions for auto-deployment
├── public/               # Static assets (images, MP3)
│   ├── elaina-hero.jpg
│   ├── elaina-reading.jpg
│   ├── elaina-flying.jpg
│   ├── elaina-music.jpg
│   └── literature.mp3    # Add your MP3 here
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Custom styles
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies
```

## 🌐 Deploy to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment.

### Setup

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/elaina-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Build and deployment**, select **GitHub Actions**

3. **Wait for deployment**
   - The workflow will automatically build and deploy your site
   - Check the **Actions** tab to see the deployment progress
   - Your site will be live at: `https://YOUR_USERNAME.github.io/elaina-website/`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## 🎵 Music Player Features

- ✅ Play/Pause with real audio playback
- ✅ Seek/Progress bar
- ✅ Volume control with mute toggle
- ✅ Skip forward/backward 10 seconds
- ✅ Synchronized lyrics highlighting
- ✅ Toggle Romaji and English translations
- ✅ Auto-scroll to current lyric

## 🎨 Customization

### Change Images
Replace the images in the `public/` folder with your own:
- `elaina-hero.jpg` - Hero section background
- `elaina-reading.jpg` - About section image
- `elaina-flying.jpg` - Gallery image
- `elaina-music.jpg` - Music section background

### Change Colors
Edit `src/index.css` to customize the color scheme:
```css
:root {
  --primary: 270 60% 65%;  /* Purple */
  --accent: 280 60% 55%;   /* Pink */
}
```

### Update Lyrics
Edit the `lyricsData` array in `src/App.tsx` to add or modify lyrics.

## 📄 License

This project is for educational purposes. 

- Character: Elaina from "Majo no Tabitabi" by Jōgi Shiraishi
- Music: "Literature" (リテラチュア) by Reina Ueda

## 🙏 Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

Made with 💜 for fellow Majo no Tabitabi fans!
