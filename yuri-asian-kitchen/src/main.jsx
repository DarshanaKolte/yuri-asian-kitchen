import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { CalendarDays, Clock, MapPin, MessageCircle, Phone, Sparkles, Star, Utensils, ArrowRight, Flame, ChefHat } from 'lucide-react';
import './styles.css';

const restaurant = {
  name: 'YURI',
  tagline: 'The Asian Kitchen',
  rating: '4.4',
  reviews: '86 Google reviews',
  price: '₹400–600 per person',
  address: 'Shop No. 6, ABC Tiara Complex, near Akurdi Railway Station Road, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044',
  shortAddress: 'ABC Tiara Complex, near Akurdi Railway Station, Nigdi, Pune',
  phone: '+919960221311',
  phoneDisplay: '099602 21311',
  hours: 'Open till 11 PM',
  instagram: 'https://www.instagram.com/yuri.pune/'
};

const dishes = [
  { cat: 'Korean Ramen', name: 'Seoul Fire Ramen', price: '₹349', desc: 'Gochujang heat, deep broth, spring onion, nori, egg and sesame aroma.', icon: '🍜', tag: 'Signature' },
  { cat: 'Korean Ramen', name: 'Creamy Kimchi Ramen', price: '₹379', desc: 'Creamy kimchi base with mushroom, cheese pull and chilli oil finish.', icon: '🥢', tag: 'Korean' },
  { cat: 'Sushi', name: 'Dragon Crunch Roll', price: '₹499', desc: 'Crunchy tempura, spicy mayo, avocado, teriyaki glaze and toasted sesame.', icon: '🍣', tag: 'Popular' },
  { cat: 'Dimsums', name: 'Crystal Chilli Dimsums', price: '₹289', desc: 'Juicy translucent dumplings tossed in aromatic chilli garlic oil.', icon: '🥟', tag: 'Hot' },
  { cat: 'Bao Buns', name: 'Korean BBQ Bao', price: '₹319', desc: 'Soft bao, Korean glaze, pickled crunch and smoky-sweet sauce.', icon: '🥙', tag: 'Must try' },
  { cat: 'Rice Bowls', name: 'K-BBQ Bibimbap Bowl', price: '₹429', desc: 'Sticky rice, Korean BBQ sauce, crunchy vegetables, sesame and fried egg.', icon: '🍚', tag: 'Bowl' },
  { cat: 'Pan-Asian', name: 'Lotus Stem Toss', price: '₹299', desc: 'Crispy lotus stem, sweet chilli glaze and sesame crunch.', icon: '🌶️', tag: 'Recommended' },
  { cat: 'Fusion', name: 'Teriyaki Asian Pizza', price: '₹449', desc: 'Cheesy comfort with teriyaki sauce, peppers, scallions and chilli flakes.', icon: '🍕', tag: 'Fusion' },
  { cat: 'Fusion', name: 'Wok Tossed Pasta', price: '₹399', desc: 'Italian comfort meets wok-fired Asian spices and umami sauce.', icon: '🍝', tag: 'New' }
];

const categories = ['All', 'Korean Ramen', 'Sushi', 'Dimsums', 'Bao Buns', 'Rice Bowls', 'Pan-Asian', 'Fusion'];

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 180}px, ${e.clientY - 180}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

function FloatingIngredients() {
  const items = [
    ['🍣', '8%', '18%', 0], ['🥟', '83%', '16%', .3], ['🌶️', '14%', '73%', .8], ['🥢', '76%', '66%', 1.1],
    ['🍚', '50%', '9%', .5], ['🍤', '89%', '45%', 1.4], ['🍥', '27%', '40%', 1.8], ['🧄', '64%', '76%', 2.1]
  ];
  return <div className="floating-layer">{items.map(([emoji, left, top, delay], i) => (
    <motion.div key={i} className="floating-food" style={{ left, top }} animate={{ y: [-18, 18, -18], rotate: [-9, 10, -9], scale: [1, 1.14, 1] }} transition={{ duration: 5 + i * .35, repeat: Infinity, delay, ease: 'easeInOut' }}>{emoji}</motion.div>
  ))}</div>;
}

function HeroBowl() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, .7], [0, 220]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  return <motion.div className="hero-bowl" style={{ rotate, y }}>
    <div className="steam steam-one" /><div className="steam steam-two" /><div className="steam steam-three" />
    <div className="chopstick one" /><div className="chopstick two" />
    <motion.div className="noodle-lift" animate={{ y: [-8, 8, -8] }} transition={{ duration: 2.5, repeat: Infinity }}>〰️〰️</motion.div>
    <div className="bowl-shadow" />
    <div className="bowl-rim"><div className="broth"><span>🥚</span><span>🌽</span><span>🥬</span><span>🍥</span></div></div>
    <div className="bowl-base" />
  </motion.div>;
}

function PremiumLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return <AnimatePresence>{show && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .65 }}><motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} className="loader-bowl">🍜</motion.div><p>Preparing the YURI experience...</p></motion.div>}</AnimatePresence>;
}

function MenuCard({ item, index }) {
  return <motion.article className="food-card" layout initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * .045 }} viewport={{ once: true }} whileHover={{ y: -12, rotateX: 4 }}>
    <div className="dish-orbit"><span>{item.icon}</span></div>
    <div className="card-tag">{item.tag}</div>
    <small>{item.cat}</small>
    <h3>{item.name}</h3>
    <p>{item.desc}</p>
    <div className="price-row"><b>{item.price}</b><button>Tempt me</button></div>
  </motion.article>;
}

function App() {
  const [active, setActive] = useState('All');
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', request: '' });
  const filtered = useMemo(() => active === 'All' ? dishes : dishes.filter(d => d.cat === active), [active]);
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (marqueeRef.current) gsap.to(marqueeRef.current, { xPercent: -50, duration: 18, repeat: -1, ease: 'linear' });
  }, []);

  async function submitBooking(e) {
    e.preventDefault();
    const booking = { ...form, createdAt: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('yuriBookings') || '[]');
    localStorage.setItem('yuriBookings', JSON.stringify([booking, ...saved]));
    try { await fetch('http://localhost:8080/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(booking) }); } catch {}
    setBooked(true);
  }

  return <main>
    <PremiumLoader />
    <CursorGlow />
    <nav className="nav"><a className="brand" href="#top">YŪRI<span>The Asian Kitchen</span></a><div><a href="#menu">Menu</a><a href="#experience">Experience</a><a href="#booking">Reserve</a><a href="#contact">Contact</a></div></nav>

    <section id="top" className="hero">
      <FloatingIngredients />
      <div className="hero-noise" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .8 }}>
        <p className="eyebrow"><Sparkles size={16}/> Akurdi’s cinematic Pan-Asian kitchen</p>
        <h1>Ramen that rotates in your mind before it reaches your table.</h1>
        <p className="sub">Korean ramen, sushi, dim sums, bao buns, rice bowls, lotus stem and Asian fusion served with a premium Seoul-inspired vibe.</p>
        <div className="proof-row"><span><Star size={17}/> {restaurant.rating}</span><span>{restaurant.reviews}</span><span>{restaurant.price}</span></div>
        <div className="hero-actions"><a className="btn primary" href="#menu">Explore Menu <ArrowRight size={18}/></a><a className="btn ghost" href="#booking">Book a Table</a></div>
      </motion.div>
      <HeroBowl />
    </section>

    <section className="marquee"><div ref={marqueeRef}> RAMEN • SUSHI • DIM SUMS • BAO BUNS • LOTUS STEM • RICE BOWLS • KOREAN BBQ • ASIAN PIZZA • WOK PASTA • RAMEN • SUSHI • DIM SUMS • BAO BUNS • LOTUS STEM • RICE BOWLS • KOREAN BBQ • ASIAN PIZZA • WOK PASTA •</div></section>

    <section id="experience" className="section split">
      <motion.div className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><p>Why YURI feels premium</p><h2>Designed like a food film, built like a conversion machine.</h2></motion.div>
      <div className="lux-grid">
        <motion.div className="lux-card large" whileHover={{ scale: 1.025 }}><ChefHat/><h3>Korean soul</h3><p>Hero visuals focus on hot ramen, steam, chopsticks and bold Korean comfort flavours.</p></motion.div>
        <motion.div className="lux-card" whileHover={{ scale: 1.035 }}><Flame/><h3>Scroll drama</h3><p>Floating sushi, dimsums and sauce glows create an expensive animated feel.</p></motion.div>
        <motion.div className="lux-card" whileHover={{ scale: 1.035 }}><Utensils/><h3>Owner-ready</h3><p>Booking form saves locally and is backend-ready for a proper dashboard.</p></motion.div>
      </div>
    </section>

    <section id="menu" className="section menu-section">
      <div className="section-title"><p>Signature plates</p><h2>Food cards that sell cravings before the customer calls.</h2></div>
      <div className="tabs">{categories.map(c => <button key={c} className={active === c ? 'active' : ''} onClick={() => setActive(c)}>{c}</button>)}</div>
      <motion.div className="menu-grid" layout>{filtered.map((item, i) => <MenuCard key={item.name} item={item} index={i} />)}</motion.div>
    </section>

    <section className="section gallery"><div className="section-title"><p>Visual cravings</p><h2>Gallery built for Instagram-first customers.</h2></div><div className="gallery-grid">{['🍜','🍣','🥟','🥙','🍚','🍕','🍝','🌶️'].map((e,i)=><motion.div key={i} className={`gallery-item item-${i}`} whileHover={{ scale: 1.06, rotate: i % 2 ? -1 : 1 }}><span>{e}</span><small>{['Ramen','Sushi','Dimsums','Bao','Rice Bowl','Pizza','Pasta','Lotus Stem'][i]}</small></motion.div>)}</div></section>

    <section className="section offer"><motion.div className="offer-card" initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}><div><p className="eyebrow"><Star size={16}/> Popular picks from reviews</p><h2>Lotus Stem • Chicken Tori Yaki • Bao Buns</h2><p>Highlighting best-loved dishes, pleasant ambience, affordable prices and polite staff.</p></div><a className="btn primary" href="#booking">Reserve the vibe</a></motion.div></section>

    <section id="booking" className="section booking"><div className="section-title"><p>Reservations</p><h2>Book a table without friction.</h2></div><form className="booking-form" onSubmit={submitBooking}><input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/><input required type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/><select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select><textarea placeholder="Special request" value={form.request} onChange={e=>setForm({...form,request:e.target.value})}/><button className="btn primary" type="submit"><CalendarDays size={18}/> Confirm Booking</button>{booked && <p className="success">Booking saved. Run the backend server to also store bookings in server/bookings.json.</p>}</form></section>

    <section className="section reviews"><div className="section-title"><p>Customer love</p><h2>Luxury proof section for trust.</h2></div><div className="review-grid">{['Flavorful and authentic Asian cuisine with a cozy ambience.', 'Bao buns and lotus stem are the kind of dishes people recommend.', 'Affordable, polite staff and a location that is easy to visit near Akurdi station.'].map((r,i)=><motion.div className="review" key={i} whileHover={{ y: -8 }}><div>★★★★★</div><p>{r}</p></motion.div>)}</div></section>

    <section id="contact" className="contact"><div><h2>Visit {restaurant.name} - {restaurant.tagline}</h2><p><MapPin size={18}/>{restaurant.shortAddress}</p><p><Clock size={18}/>{restaurant.hours}</p><p><Phone size={18}/>{restaurant.phoneDisplay}</p></div><div className="contact-actions"><a className="btn primary" href={`tel:${restaurant.phone}`}><Phone size={18}/> Call</a><a className="btn ghost" href={`https://wa.me/${restaurant.phone.replace('+','')}`}><MessageCircle size={18}/> WhatsApp</a><a className="btn ghost" href={restaurant.instagram}><Instagram size={18}/> Instagram</a></div></section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
