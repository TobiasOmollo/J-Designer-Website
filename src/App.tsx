/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import {
  Scissors,
  MapPin,
  Clock,
  RotateCcw,
  Phone,
  Facebook,
  MessageCircle,
  CreditCard,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import React, { useState, useEffect } from "react";

// Image constants using reliable Picsum seeds for a high-end tailoring aesthetic
const IMAGES = {
  LOGO: "/Assets/j-designer-logo.png",
  ATELIER: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804661/Interior_img_d1psnx.jpg",
  SHIRTS: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804662/shirts_img_fsc3ye.jpg",
  FABRIC: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804660/children_outfit_w7ebrp.jpg",
  LADIES_SUIT: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804659/ladies_suit_bivaj3.jpg",
  MEN_SUIT: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804661/men_suit_egfym7.jpg",
  KIDS_SUIT: "https://picsum.photos/seed/kids-suits-navy/800/1000",
  MAROON_SUIT: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804643/women_suit_pepa3i.jpg",
  KITENGE: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804660/kitenge_background_we1dpg.jpg"
};

const SERVICES = [
  {
    title: "Custom Tailoring",
    description: "Crafted to fit you — not the other way around. Bespoke garments with precise measurements.",
    icon: Scissors
  },
  {
    title: "Repairs",
    description: "Restore your favorites to their best form. Handled with care to extend garment life.",
    icon: RotateCcw
  },
  {
    title: "Alterations",
    description: "Perfect fit, every time. Resizing and refining for body precision.",
    icon: Scissors
  },
  {
    title: "Mobile Tailoring",
    description: "Tailoring that comes to you. Professional home/office fittings.",
    icon: Phone
  }
];

const ADDITIONAL_GALLERY_ITEMS = [
  { img: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804661/download_avgsrf.jpg", label: "Men Suit" },
  { img: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775833804/samples/shoe.jpg", label: "Women Suits" },
  { img: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804660/children_outfit_w7ebrp.jpg", label: "Children's Outfit" },
  { img: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804658/womens_outfit_ewnmvb.jpg", label: "Stylish Kitenge Design" },
  { img: "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804658/mens_outfit_gy0jwy.jpg", label: "Men's Wear" }
];

export default function App() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [tappedCard, setTappedCard] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Tailoring',
    date: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;
      if (!webhookUrl) {
        throw new Error("Webhook URL is not defined in .env");
      }

      await fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 5000);
      setFormData({ name: '', email: '', phone: '', service: 'Custom Tailoring', date: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const HERO_BGS = [
    "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804664/Outdoor_rr1pen.jpg",
    "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804664/Kitenge_jc9znl.jpg",
    "https://res.cloudinary.com/dplvp1pn8/image/upload/v1775832254/samples/cloudinary-group.jpg"
  ];

  const HERO_CONTENT = [
    {
      title: "Master Tailors Nairobi",
      heading: "A showcase of craftsmanship, detail, and timeless style.",
      description: "Where every stitch tells a story. Located in Umoja 2 Estate, Nairobi along Moi Drive."
    },
    {
      title: "Our Story",
      heading: "Are you planning an event or attending a meeting?",
      description: "Don't worry, we've got you covered—and by 'covered,' we mean looking so sharp you might actually be a safety hazard. We build armor for the modern professional. Our suits are engineered to fit so precisely that your confidence becomes as unbreakable as our double-stitching."
    },
    {
      title: "Thank You",
      heading: "Your Journey to Elegance Begins Here.",
      description: "\"A well-tied tie is the first serious step in life.\" Thank you for trusting us to dress your finest moments."
    }
  ];


  useEffect(() => {
    const timer = setTimeout(() => setIsWelcomeVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BGS.length);
    }, 30000);
    return () => clearInterval(bgTimer);
  }, [HERO_BGS.length]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold selection:text-navy">
      <AnimatePresence>
        {isWelcomeVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-navy flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center"
            >

              <img
                src={IMAGES.LOGO}
                alt="J-Designer Logo"
                // Increased size and removed brightness/invert filters for better visibility
                className="w-56 h-56 md:w-64 md:h-64 mx-auto mb-8 object-contain"
                referrerPolicy="no-referrer"
              />
              <h1 className="text-gold text-4xl font-serif tracking-widest uppercase">J-Designer</h1>
              <p className="text-white/60 mt-4 font-sans tracking-widest uppercase text-sm">Bespoke Tailoring</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 gap-4">
            <div className="flex items-center gap-4">
              <img src={IMAGES.LOGO} alt="Logo" className="w-12 h-12" referrerPolicy="no-referrer" />
              <span className="text-navy font-serif text-xl font-bold tracking-tight hidden sm:block">J-Designer</span>
            </div>

            <button
              className="md:hidden text-navy border border-navy/10 p-2 rounded-md hover:bg-navy/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-navy hover:text-gold transition-colors font-medium">Home</a>
              <a href="#services" className="text-navy hover:text-gold transition-colors font-medium">Services</a>
              <a href="#gallery" className="text-navy hover:text-gold transition-colors font-medium">Gallery</a>
              <a href="#contact" className="px-6 py-2 bg-navy text-white hover:bg-gold transition-all rounded-full font-medium">Book Fitting</a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Refined Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }} // Slides in from the right for a premium feel
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-white flex flex-col md:hidden"
            >
              {/* Menu Header with Close Button */}
              <div className="flex justify-between items-center px-6 h-20 border-b border-navy/5">
                <div className="flex items-center gap-3">
                  <img src={IMAGES.LOGO} alt="Logo" className="w-10 h-10" />
                  <span className="text-navy font-serif font-bold text-lg">J-Designer</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-navy">
                  <X size={32} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
                {[
                  { name: "Home", href: "#home" },
                  { name: "Our Services", href: "#services" },
                  { name: "The Collection", href: "#gallery" },
                  { name: "Book a Fitting", href: "#contact", special: true }
                ].map((link, i) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl font-serif tracking-tight ${link.special ? "text-gold" : "text-navy"
                      }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Footer Context - Adds credibility */}
              <div className="p-8 bg-navy/5 space-y-4">
                <p className="text-navy/40 text-xs uppercase tracking-[0.2em] font-bold">Location</p>
                <p className="text-navy text-sm font-medium">
                  Umoja 2 Estate, Nairobi <br /> along Moi Drive
                </p>
                <div className="flex gap-6 pt-2">
                  <MessageCircle size={24} className="text-navy/60" />
                  <Facebook size={24} className="text-navy/60" />
                  <Phone size={24} className="text-navy/60" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-[90vh] flex items-center overflow-hidden cursor-pointer"
        onClick={() => setCurrentBgIndex((prev) => (prev + 1) % HERO_BGS.length)}
      >
        <div className="absolute inset-0 z-0 bg-navy">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentBgIndex}
              src={HERO_BGS[currentBgIndex]}
              alt="Background"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
            className="flex flex-col items-center w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBgIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {currentBgIndex === 0 && (
                  <img
                    src={IMAGES.LOGO}
                    alt="J-Designer Logo"
                    className="w-40 h-40 md:w-56 md:h-56 mb-8 object-cover rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                    referrerPolicy="no-referrer"
                  />
                )}
                <h2 className="text-gold font-sans uppercase tracking-[0.2em] text-2xl md:text-3xl font-bold mb-4">{HERO_CONTENT[currentBgIndex].title}</h2>
                <h1 className="text-5xl md:text-7xl font-serif mb-8 max-w-3xl leading-tight">
                  {HERO_CONTENT[currentBgIndex].heading}
                </h1>
                <p className="text-xl text-white/80 max-w-xl mb-10 font-sans leading-relaxed mx-auto">
                  {HERO_CONTENT[currentBgIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-4 bg-gold text-navy font-bold rounded-full hover:bg-white transition-all flex items-center gap-2 shadow-lg hover:shadow-gold/20 hover:-translate-y-1"
              >
                Explore Our Collection <ChevronRight size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentBgIndex(1); }}
                className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all"
              >
                Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-navy text-4xl font-serif mb-4">Our Expertise</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-navy/5 hover:border-gold/30 hover:shadow-xl transition-all group rounded-2xl"
              >
                <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                  <service.icon className="text-navy group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-navy/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dplvp1pn8/image/upload/v1775804660/kitenge_background_we1dpg.jpg"
            alt="Gallery Background"
            className="w-full h-full object-cover opacity-15"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-navy text-4xl font-serif mb-2">The Collection</h2>
              <p className="text-navy/60">A glimpse into our Cultured designs.</p>
            </div>
            <button
              onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
              className="text-gold font-bold flex items-center gap-2 hover:gap-4 transition-all"
            >
              {isGalleryExpanded ? "View Less Works" : "View All Works"}
              <ChevronRight size={20} className={`transition-transform duration-300 ${isGalleryExpanded ? "-rotate-90" : "rotate-0"}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl bg-black cursor-pointer"onClick={() => setTappedCard(tappedCard === 0 ? null : 0)}>
              <img src={IMAGES.MEN_SUIT} alt="The Executive Navy" className={`w-full h-full object-cover transition-transform duration-700 ${tappedCard === 0 ? 'scale-110 opacity-60' : 'opacity-90 hover:scale-110 hover:opacity-60'}`} referrerPolicy="no-referrer" />
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-navy/80 to-transparent transition-all duration-500 flex flex-col items-center justify-end p-8 text-center ${tappedCard === 0 ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                <p className={`text-gold font-serif text-3xl mb-4 transition-transform duration-500 ${tappedCard === 0 ? 'translate-y-0' : 'translate-y-4 hover:translate-y-0'}`}>The Executive Navy</p>
                <p className={`text-white/90 text-sm leading-relaxed transition-transform duration-500 delay-75 ${tappedCard === 0 ? 'translate-y-0' : 'translate-y-4 hover:translate-y-0'}`}>
                  A well-tailored suit is more than just a combination of fabric and thread; it is a silent manifesto of ambition and self-respect that bridges the gap between who a man is and who he aspires to be. Whether it is the sharp, architectural lines of an executive office suite designed for leadership, the romantic elegance of a bespoke wedding ensemble that captures a once-in-a-lifetime moment, or a refined professional look that commands a room without saying a word, craftsmanship is the defining factor. In the heart of Nairobi, where heritage meets modern style, a truly great suit serves as a showcase of meticulous detail and timeless sophistication, ensuring that every stitch tells a personal story of excellence and purpose.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl bg-black cursor-pointer"onClick={() => setTappedCard(tappedCard === 1 ? null : 1)}>
              <img src={IMAGES.LADIES_SUIT} alt="Bespoke Femininity" className={`w-full h-full object-cover transition-transform duration-700 ${tappedCard === 1 ? 'scale-110 opacity-60' : 'opacity-90 hover:scale-110 hover:opacity-60'}`} referrerPolicy="no-referrer" />
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-navy/80 to-transparent transition-all duration-500 flex flex-col items-center justify-end p-8 text-center ${tappedCard === 1 ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                <p className={`text-gold font-serif text-3xl mb-4 transition-transform duration-500 ${tappedCard === 1 ? 'translate-y-0' : 'translate-y-4 hover:translate-y-0'}`}>Bespoke Femininity</p>
                <p className={`text-white/90 text-sm leading-relaxed transition-transform duration-500 delay-75 ${tappedCard === 1 ? 'translate-y-0' : 'translate-y-4 hover:translate-y-0'}`}>
                  For a bespoke women’s suit, the true essence lies in the delicate balance between power and elegance, where the garment is meticulously crafted to honor the unique contours of the female silhouette. Whether it is a sharp, double-breasted power suit designed to command the boardroom with authority, or a fluid, tailored ensemble for a sophisticated evening event, each piece is a celebration of individuality and refined detail. Beyond mere clothing, these creations are an investment in confidence, using premium fabrics and expert craftsmanship to ensure that every stitch reflects the wearer’s grace, strength, and timeless sense of style.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl bg-black cursor-pointer" onClick={() => setTappedCard(tappedCard === 2 ? null : 2)}>
              <img src={IMAGES.MAROON_SUIT} alt="Bold Statements" className={`w-full h-full object-cover transition-transform duration-700 ${tappedCard === 2 ? 'scale-110 opacity-60' : 'opacity-90 hover:scale-110 hover:opacity-60'}`} referrerPolicy="no-referrer" />
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-navy/80 to-transparent transition-all duration-500 flex flex-col items-center justify-end p-8 text-center ${tappedCard === 2 ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                <p className={`text-gold font-serif text-3xl mb-4 transition-transform duration-500 ${tappedCard === 2 ? 'translate-y-0' : 'translate-y-4 hover:translate-y-0'}`}>Bold Statements</p>
                <p className={`text-white/90 text-sm leading-relaxed transition-transform duration-500 delay-75 ${tappedCard === 2 ? 'translate-y-0' : 'translate-y-4 hover:translate-y-0'}`}>
                  
                </p>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isGalleryExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {ADDITIONAL_GALLERY_ITEMS.map((item, id) => { 
                  const cardIndex = id + 3;
                  return (
                    <div key={id} className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl bg-black cursor-pointer"
                      onClick={() => setTappedCard(tappedCard === cardIndex ? null : cardIndex)}>
                      <img src={item.img} alt={item.label} className={`w-full h-full object-cover transition-transform duration-700 ${tappedCard === cardIndex ? 'scale-110 opacity-60' : 'opacity-90 hover:scale-110 hover:opacity-60'}`} referrerPolicy="no-referrer" />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black via-navy/60 to-transparent transition-all duration-500 flex flex-col items-center justify-end p-8 text-center ${tappedCard === cardIndex ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                        <p className={`text-gold font-serif text-3xl transition-transform duration-500 ${tappedCard === cardIndex ? 'translate-y-0' : 'translate-y-4 hover:translate-y-0'}`}>{item.label}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section id="contact" className="bg-[#FDFBF7]">
        <div className="flex flex-col lg:flex-row w-full min-h-[80vh]">
          {/* Left Side: Image */}
          <div className="lg:w-1/2 relative bg-navy flex items-center justify-center p-12 overflow-hidden min-h-[400px] lg:min-h-full">
            <img
              src="https://res.cloudinary.com/dplvp1pn8/image/upload/v1775845818/samples/canvas.jpg"
              alt="Tailor measuring fabric"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 text-center max-w-md">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Book a consultation with our master tailors and begin the journey to your perfect bespoke garment.</h2>
              <p className="text-white/80 font-sans text-xl leading-relaxed">Mastery in Every Thread</p>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16">
            <div className="w-full max-w-lg">
              <div className="mb-12 text-center">
                <h2 className="text-navy text-4xl md:text-5xl font-serif mb-4">Book Your Private Fitting</h2>
                <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
                <p className="text-navy/60">Schedule your fitting or consultation today.</p>
              </div>

              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-navy/80 text-sm font-bold uppercase tracking-widest mb-1" htmlFor="name">Full Name</label>
                  <input required value={formData.name} onChange={handleFormChange} type="text" id="name" className="w-full bg-transparent border-0 border-b-2 border-navy/20 px-0 py-2 focus:outline-none focus:border-gold focus:ring-0 transition-colors placeholder:text-navy/30" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-navy/80 text-sm font-bold uppercase tracking-widest mb-1" htmlFor="email">Email Address</label>
                  <input required value={formData.email} onChange={handleFormChange} type="email" id="email" className="w-full bg-transparent border-0 border-b-2 border-navy/20 px-0 py-2 focus:outline-none focus:border-gold focus:ring-0 transition-colors placeholder:text-navy/30" placeholder="client@example.com" />
                </div>
                <div>
                  <label className="block text-navy/80 text-sm font-bold uppercase tracking-widest mb-1" htmlFor="phone">Phone Number</label>
                  <input required value={formData.phone} onChange={handleFormChange} type="tel" id="phone" className="w-full bg-transparent border-0 border-b-2 border-navy/20 px-0 py-2 focus:outline-none focus:border-gold focus:ring-0 transition-colors placeholder:text-navy/30" placeholder="+254 700 000000" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy/80 text-sm font-bold uppercase tracking-widest mb-1" htmlFor="service">Service Type</label>
                    <select required value={formData.service} onChange={handleFormChange} id="service" className="w-full bg-transparent border-0 border-b-2 border-navy/20 px-0 py-2 focus:outline-none focus:border-gold focus:ring-0 transition-colors appearance-none text-navy">
                      <option>Custom Tailoring</option>
                      <option>Wedding Package</option>
                      <option>Alterations & Repairs</option>
                      <option>Corporate Wardrobe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-navy/80 text-sm font-bold uppercase tracking-widest mb-1" htmlFor="date">Preferred Date</label>
                    <input required value={formData.date} onChange={handleFormChange} type="date" id="date" className="w-full bg-transparent border-0 border-b-2 border-navy/20 px-0 py-2 focus:outline-none focus:border-gold focus:ring-0 transition-colors text-navy uppercase text-sm font-medium tracking-wider" />
                  </div>
                </div>

                {formStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 text-sm font-medium border-l-4 border-green-500">
                    Thank you! Your booking request has been securely sent.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 text-sm font-medium border-l-4 border-red-500">
                    Oops! Something went wrong or Webhook is missing. Please check your setup.
                  </div>
                )}

                <button disabled={formStatus === 'submitting'} type="submit" className="w-full bg-navy text-white font-bold tracking-widest uppercase py-5 mt-4 hover:bg-gold transition-colors flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                  {formStatus === 'submitting' ? 'Submitting...' : 'Confirm Booking'} {formStatus !== 'submitting' && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-navy text-white pt-24 pb-12 overflow-hidden">
        {/* Grayscale Kitenge Watermark */}
        <div className="absolute inset-0 kitenge-watermark pointer-events-none grayscale opacity-5 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <img src={IMAGES.LOGO} alt="J-Designer" className="w-24 h-24 mb-6 brightness-0 invert drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] object-contain" referrerPolicy="no-referrer" />
              <p className="text-white/60 leading-relaxed mb-6">
                Premium tailoring services in the heart of Nairobi. Crafting excellence one stitch at a time.
              </p>
              <div className="flex gap-4">
                <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors overflow-hidden border border-white/20">
                  <img src="https://res.cloudinary.com/dplvp1pn8/image/upload/v1775811839/cld-sample-2.jpg" alt="WhatsApp" className="w-full h-full object-cover" />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors overflow-hidden border border-white/20">
                  <img src="https://res.cloudinary.com/dplvp1pn8/image/upload/v1775811812/sample.jpg" alt="Facebook" className="w-full h-full object-cover" />
                </a>
                <a href="https://www.tiktok.com/en/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors overflow-hidden border border-white/20">
                  <img src="https://res.cloudinary.com/dplvp1pn8/image/upload/v1775811828/cld-sample.jpg" alt="TikTok" className="w-full h-full object-cover" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors overflow-hidden border border-white/20">
                  <img src="https://res.cloudinary.com/dplvp1pn8/image/upload/v1775811865/cld-sample-4.jpg" alt="X Account" className="w-full h-full object-cover" />
                </a>
              </div>
            </div>

            <div className="flex flex-col lg:pl-8">
              <h4 className="text-gold font-serif text-xl mb-6">Visit Us</h4>
              <ul className="space-y-4 text-white/60 mb-8">
                <li className="flex items-start gap-3">
                  <MapPin className="text-gold shrink-0 mt-1" size={18} />
                  <span>Umoja 2 Estate, Nairobi along Moi Drive</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-gold shrink-0" size={18} />
                  <span>Mon – Sat: 8 AM – 6 PM</span>
                </li>
                <li className="flex items-center gap-3">
                  <RotateCcw className="text-gold shrink-0" size={18} />
                  <span>Adjustments within 7 days</span>
                </li>
              </ul>
              <a
                href="https://maps.google.com/?q=Moi+Drive,+Umoja+2,+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:border-gold text-white hover:text-gold transition-all rounded-xl shadow-lg overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <MapPin size={20} className="relative z-10" />
                <span className="relative z-10 font-bold uppercase tracking-widest text-sm">Visit the Atelier</span>
              </a>
            </div>

            <div className="flex flex-col lg:pl-8">
              <h4 className="text-gold font-serif text-xl mb-6">Quick Links</h4>
              <ul className="space-y-4 text-white/60 flex flex-col">
                <li><a href="#" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">About J-Designer</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">Our Expertise</a></li>
                <li><a href="#gallery" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">The Collection</a></li>
                <li><button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentBgIndex(1); }} className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">Our Story</button></li>
                <li><a href="#contact" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-200">Connect With Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold font-serif text-xl mb-6">Payment Options</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gold/20 transition-colors">
                  <CreditCard size={18} className="text-gold" />
                  <span className="text-xs font-bold tracking-widest">M-PESA</span>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gold/20 transition-colors">
                  <CreditCard size={18} className="text-gold" />
                  <span className="text-xs font-bold tracking-widest">VISA</span>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gold/20 transition-colors">
                  <CreditCard size={18} className="text-gold" />
                  <span className="text-xs font-bold tracking-widest">PAYPAL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm flex flex-col items-center justify-center gap-2">
            <p>&copy; {new Date().getFullYear()} J-Designer Official. All Rights Reserved.</p>
            <p className="text-gold font-serif text-base tracking-widest">Titan Web Production</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
