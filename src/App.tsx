import { useState, useEffect, useRef } from 'react'
import './App.css'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Music,
  BookOpen,
  Wand2,
  Heart,
  Star,
  Sparkles
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

// Lyrics data with timestamps (in seconds)
const lyricsData = [
  { time: 7.5, japanese: "彩られていけば幻想が", romaji: "Irodorarete ikeba gensou ga", english: "Like when the fantasy is brilliantly colored" },
  { time: 11.8, japanese: "カタチあるものになるように", romaji: "Katachi aru mono ni naru you ni", english: "It begins to be molded into shape" },
  { time: 15.7, japanese: "描いてゆける 叶えてゆけるんだ", romaji: "Egaite yukeru kanaete yukerunda", english: "I'm sure I can draw it and make it happen" },
  { time: 20.6, japanese: "優しく吹いた風が 古いページ捲るように", romaji: "Yasashiku fuita kaze ga furui peeji mekuru you ni", english: "Like the gently blowing wind flips through the pages of an old book" },
  { time: 27.3, japanese: "振り返るけど", romaji: "Furikaeru kedo", english: "I look back, but" },
  { time: 29.5, japanese: "「ううん、いいのよ」", romaji: "'Uun, ii no yo'", english: "'Well, that's okay'" },
  { time: 32, japanese: "知らないことだらけの 出会い別れの話", romaji: "Shiranai kotodarake no deai wakare no hanashi", english: "Stories of meetings and partings full of unknown things" },
  { time: 40.5, japanese: "滲むインクをそっとなぞった", romaji: "Nijimu inku wo sotto nazotta", english: "I gently traced the blurred ink" },
  { time: 48.2, japanese: "どこ行くの？", romaji: "Doko iku no?", english: "Where are you going?" },
  { time: 50, japanese: "…少し遠くまで", romaji: "...Sukoshi tooku made", english: "...Just a little further" },
  { time: 52.5, japanese: "置いてきたものは夢に", romaji: "Oite kita mono wa yume ni", english: "What I left behind is in my dreams" },
  { time: 57, japanese: "好きだから選ぶ 選びながら私になってゆく", romaji: "Suki dakara erabu erabi nagara watashi ni natte yuku", english: "I choose because I love, becoming myself as I choose" },
  { time: 65.3, japanese: "「また会いましょう、約束だから」", romaji: "'Mata aimashou, yakusoku dakara'", english: "'Let's meet again, it's a promise'" },
  { time: 70, japanese: "あなたはそう微笑んだ", romaji: "Anata wa sou hohoenda", english: "You smiled like that" },
  { time: 73.2, japanese: "「また会いましょう」小指のまじない", romaji: "'Mata aimashou' koyubi no majinai", english: "'Let's meet again' - the magic of pinky promises" },
  { time: 78, japanese: "誰かの声がして目が覚めた", romaji: "Dareka no koe ga shite me ga sameta", english: "I woke up to someone's voice" },
  { time: 86, japanese: "期待されていること 見向きさえされないこと", romaji: "Kitai sareteiru koto mimuki sae sarenai koto", english: "Being expected of, not even being noticed" },
  { time: 93, japanese: "どちらが良いの？", romaji: "Dochira ga ii no?", english: "Which is better?" },
  { time: 95.8, japanese: "「…ううん、どちらも」", romaji: "'...Uun, dochira mo'", english: "'...Well, both'" },
  { time: 98, japanese: "嬉しいし不安だし 私だって必死だし", romaji: "Ureshii shi fuan da shi watashi datte hisshi da shi", english: "I'm happy and anxious, and I'm desperate too" },
  { time: 105.6, japanese: "主人公になれていますか？", romaji: "Shujinkou ni narete imasu ka?", english: "Can I become the protagonist?" },
  { time: 114, japanese: "雨が降る 一つ、一つずつ", romaji: "Ame ga furu hitotsu, hitotsu zutsu", english: "The rain falls, one by one" },
  { time: 118, japanese: "誰もいない世界みたい", romaji: "Dare mo inai sekai mitai", english: "Like a world with no one in it" },
  { time: 122, japanese: "満月も見ないフリしながら", romaji: "Mangetsu wo minai furi shinagara", english: "Pretending not to see the full moon" },
  { time: 126.5, japanese: "明日を待っている", romaji: "Asu wo matteiru", english: "Waiting for tomorrow" },
  { time: 130, japanese: "「信じるだけで叶えられるわ」", romaji: "'Shinjiru dake de kanaerareru wa'", english: "'Just by believing, it can come true'" },
  { time: 135, japanese: "一人はそう、背を押した", romaji: "Hitori wa sou, se wo oshita", english: "One person pushed me forward" },
  { time: 138, japanese: "「信じるだけで助けられるわ」", romaji: "'Shinjiru dake de tasukerareru wa'", english: "'Just by believing, you can be saved'" },
  { time: 143, japanese: "一人はそう、まるで願うように", romaji: "Hitori wa sou, marude negau you ni", english: "One person, as if making a wish" },
  { time: 149.5, japanese: "やがて青い空の上で", romaji: "Yagate aoi sora no ue de", english: "Eventually, above the blue sky" },
  { time: 157.7, japanese: "星は笑う", romaji: "Hoshi wa warau", english: "The stars laugh" },
  { time: 164.7, japanese: "本で見たような夜だった", romaji: "Hon de mita you na yoru datta", english: "It was a night like I saw in a book" },
  { time: 168.8, japanese: "雨は止み 頬をつたう", romaji: "Ame wa yami hoho wo tsutau", english: "The rain stopped and ran down my cheeks" },
  { time: 172.8, japanese: "朝が来た 忘れないでいてね", romaji: "Asa ga kita wasurenaide ite ne", english: "Morning came, please don't forget" },
  { time: 177.1, japanese: "旅のリテラチュア", romaji: "Tabi no riterachua", english: "The Journey's Literature" },
  { time: 181.4, japanese: "どこ行くの？", romaji: "Doko iku no?", english: "Where are you going?" },
  { time: 183, japanese: "…少し遠くまで", romaji: "...Sukoshi tooku made", english: "...Just a little further" },
  { time: 186, japanese: "置いてきたものは夢に", romaji: "Oite kita mono wa yume ni", english: "What I left behind is in my dreams" },
  { time: 189.9, japanese: "好きだから選ぶ 選びながら私になってゆく", romaji: "Suki dakara erabu erabi nagara watashi ni natte yuku", english: "I choose because I love, becoming myself as I choose" },
  { time: 197.1, japanese: "「また会いましょう、約束だから」", romaji: "'Mata aimashou, yakusoku dakara'", english: "'Let's meet again, it's a promise'" },
  { time: 201.6, japanese: "あなたはそう微笑んだ", romaji: "Anata wa sou hohoenda", english: "You smiled like that" },
  { time: 205, japanese: "「また会いましょう」小指のまじない", romaji: "'Mata aimashou' koyubi no majinai", english: "'Let's meet again' - the magic of pinky promises" },
  { time: 209, japanese: "誰かを信じても良いのかな", romaji: "Dareka wo shinjitemo ii no kana", english: "I wonder if it's okay to believe in someone" },
];

// Star field component
function StarField() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`,
  }))

  return (
    <div className="star-field">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}

// Navigation component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Elaina
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => scrollToSection('hero')} className="text-sm text-gray-300 hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-sm text-gray-300 hover:text-white transition-colors">About</button>
          <button onClick={() => scrollToSection('music')} className="text-sm text-gray-300 hover:text-white transition-colors">Music</button>
          <button onClick={() => scrollToSection('gallery')} className="text-sm text-gray-300 hover:text-white transition-colors">Gallery</button>
        </div>
      </div>
    </nav>
  )
}

// Hero section
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/elaina-hero.jpg" 
          alt="Elaina" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-background" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm tracking-widest uppercase">The Ashen Witch</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Elaina
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            「そう、私です」<br />
            <span className="text-lg text-gray-400">"Yes, that's me"</span>
          </p>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            A wandering witch who travels from country to country, 
            weaving tales of adventure, magic, and self-discovery.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2"
            >
              <Music className="w-5 h-5" />
              Listen to Literature
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-purple-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}

// About section
function AboutSection() {
  const stats = [
    { label: "Age", value: "18", icon: Star },
    { label: "Title", value: "Ashen Witch", icon: Wand2 },
    { label: "Height", value: "160cm", icon: Heart },
    { label: "Birthday", value: "Oct 17", icon: BookOpen },
  ]

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl" />
            <img 
              src="/elaina-reading.jpg" 
              alt="Elaina Reading" 
              className="relative rounded-2xl w-full shadow-2xl"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 text-sm tracking-widest uppercase">About the Witch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              The Wandering Witch
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Elaina is the protagonist of "Majo no Tabitabi" (The Journey of Elaina), 
              a Japanese light novel series written by Jōgi Shiraishi. With her distinctive 
              ash-gray hair and azure eyes, she travels from country to country on her broomstick, 
              experiencing countless stories and adventures.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Inspired by her favorite book "The Adventure of Niké," Elaina became the youngest 
              apprentice witch to pass the sorcery exam in the Peaceful Country of Robetta. 
              Under the tutelage of Fran, the Stardust Witch, she earned her title as the 
              "Ashen Witch" and embarked on her journey of self-discovery.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-xl p-4 text-center">
                  <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Music Player with Dynamic Lyrics
function MusicPlayerSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(248) // ~4:08 in seconds
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [activeLyricIndex, setActiveLyricIndex] = useState(0)
  const [showRomaji, setShowRomaji] = useState(true)
  const [showEnglish, setShowEnglish] = useState(true)
  const lyricsRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio('/literature.mp3')
    audioRef.current = audio
    audio.volume = volume / 100

    // Update duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration) {
        setDuration(Math.floor(audio.duration))
      }
    })

    // Update current time during playback
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
    })

    // Handle song end
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  // Update active lyric based on current time
  useEffect(() => {
    const index = lyricsData.findIndex((lyric, i) => {
      const nextLyric = lyricsData[i + 1]
      return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time)
    })
    if (index !== -1 && index !== activeLyricIndex) {
      setActiveLyricIndex(index)
      // Scroll to active lyric
      const lyricElement = document.getElementById(`lyric-${index}`)
      if (lyricElement && lyricsRef.current) {
        lyricElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [currentTime, activeLyricIndex])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const skipForward = () => {
    const newTime = Math.min(duration, currentTime + 10)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <section id="music" className="py-24 px-6 relative">
      <div className="absolute inset-0">
        <img 
          src="/elaina-music.jpg" 
          alt="Music Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm tracking-widest uppercase">Opening Theme</span>
            <Music className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Literature
          </h2>
          <p className="text-gray-400">リテラチュア - Reina Ueda (上田麗奈)</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lyrics Display */}
          <div className="glass-dark rounded-2xl p-6 h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Lyrics
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRomaji(!showRomaji)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${showRomaji ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                >
                  Romaji
                </button>
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${showEnglish ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                >
                  English
                </button>
              </div>
            </div>
            
            <div 
              ref={lyricsRef}
              className="flex-1 overflow-y-auto pr-2 space-y-6"
            >
              {lyricsData.map((lyric, index) => (
                <div
                  key={index}
                  id={`lyric-${index}`}
                  className={`lyric-line transition-all duration-500 ${index === activeLyricIndex ? 'active' : 'inactive'}`}
                >
                  <p className="text-lg font-medium text-white mb-1">{lyric.japanese}</p>
                  {showRomaji && (
                    <p className="text-sm text-purple-300/80 mb-1">{lyric.romaji}</p>
                  )}
                  {showEnglish && (
                    <p className="text-sm text-gray-400 italic">{lyric.english}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player Controls */}
          <div className="glass-dark rounded-2xl p-8 flex flex-col justify-center">
            {/* Album Art / Visualizer */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-pulse-glow" />
              <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/elaina-music.jpg" 
                  alt="Album Art" 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                />
              </div>
              {isPlaying && (
                <div className="absolute -inset-4 border-2 border-purple-500/30 rounded-full animate-ping" />
              )}
            </div>

            {/* Song Info */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-1">Literature</h3>
              <p className="text-gray-400">Reina Ueda</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button 
                onClick={skipBackward}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button 
                onClick={togglePlay}
                className="p-5 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all hover:scale-110"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              <button 
                onClick={skipForward}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={(v) => setVolume(v[0])}
                className="flex-1"
              />
            </div>

            {/* Visualizer */}
            {isPlaying && (
              <div className="flex items-end justify-center gap-1 h-12 mt-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 bg-gradient-to-t from-purple-600 to-pink-400 rounded-full visualizer-bar"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animation: `pulse 0.5s ease-in-out ${i * 0.05}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Gallery section
function GallerySection() {
  const images = [
    { src: "/elaina-hero.jpg", title: "The Ashen Witch" },
    { src: "/elaina-reading.jpg", title: "Lost in Stories" },
    { src: "/elaina-flying.jpg", title: "Journey Begins" },
    { src: "/elaina-music.jpg", title: "Melodies of Magic" },
  ]

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm tracking-widest uppercase">Moments</span>
            <Star className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Gallery
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
            >
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Wand2 className="w-6 h-6 text-purple-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Elaina
          </span>
        </div>
        <p className="text-gray-400 mb-4">
          "The journey of a thousand miles begins with a single step."
        </p>
        <p className="text-sm text-gray-500">
          Majo no Tabitabi • The Journey of Elaina • 魔女の旅々
        </p>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <StarField />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <MusicPlayerSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  )
}

export default App
