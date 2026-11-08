'use client';
import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/config';
import { ChevronDown, MapPin, Heart, CalendarDays, Camera, Gift, ArrowLeft, ArrowRight, X, Clock, Users, Music2, VolumeX } from 'lucide-react';

type Guest = { name: string; passes: number };
function SectionDivider({ from, to }: { from: string; to: string }) {
    return <svg className="section-divider" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path fill={from} d="M0 0H1440V45C1280 82 1170 82 1000 52S720 18 540 55 180 7 0 45Z" />
        <path fill={to} d="M0 45C180 7 360 91 540 55S820 20 1000 52 1280 82 1440 45V100H0Z" />
    </svg>;
}
function PhotoSectionWaves() {
    return <>
        <svg className="photo-wave photo-wave-top" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V48C1260 85 1160 83 1000 52S720 18 540 55 180 8 0 48Z" /></svg>
        <svg className="photo-wave photo-wave-bottom" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48C180 8 360 93 540 55S820 20 1000 52 1260 85 1440 48V100H0Z" /></svg>
    </>;
}
export default function Home({ guest }: { guest?: Guest } = {}) {
    const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 }), [active, setActive] = useState<number | null>(null), [response, setResponse] = useState(''), [copied, setCopied] = useState(false), [musicPlaying, setMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const play = () => { void audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false)); };
        const startAfterGesture = (event: Event) => {
            if ((event.target as Element | null)?.closest?.('.music-toggle')) return;
            window.removeEventListener('pointerdown', startAfterGesture);
            window.removeEventListener('keydown', startAfterGesture);
            play();
        };
        play();
        window.addEventListener('pointerdown', startAfterGesture);
        window.addEventListener('keydown', startAfterGesture);
        return () => {
            window.removeEventListener('pointerdown', startAfterGesture);
            window.removeEventListener('keydown', startAfterGesture);
        };
    }, []);
    useEffect(() => { const tick = () => { const ms = new Date(wedding.date + 'T18:00:00-05:00').getTime() - Date.now(), n = Math.max(0, ms); setTime({ d: Math.floor(n / 86400000), h: Math.floor(n / 3600000) % 24, m: Math.floor(n / 60000) % 60, s: Math.floor(n / 1000) % 60 }) }; tick(); const id = setInterval(tick, 1000); return () => clearInterval(id) }, []);
    useEffect(() => {
        const items = document.querySelectorAll<HTMLElement>('[data-reveal], [data-photo]');
        if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('is-visible')); return }
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            const target = entry.target as HTMLElement;
            if (target.classList.contains('countdown-section')) {
                target.classList.toggle('is-visible', entry.isIntersecting);
                return;
            }
            if (entry.isIntersecting) { target.classList.add('is-visible'); observer.unobserve(target) }
        }), { threshold: .01 });
        items.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    const calendar = () => { const url = new URL('https://calendar.google.com/calendar/render'); url.searchParams.set('action', 'TEMPLATE'); url.searchParams.set('text', `${wedding.names.join(' & ')} · Nuestra boda`); url.searchParams.set('dates', `${wedding.calendarStart.replace(/[-:]/g, '').slice(0, 15)}/${wedding.calendarEnd.replace(/[-:]/g, '').slice(0, 15)}`); url.searchParams.set('details', `${wedding.ceremony.title}: ${wedding.ceremony.venue}. ${wedding.reception.title}: ${wedding.reception.venue}.`); window.open(url.toString(), '_blank', 'noopener') };
    const toggleMusic = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            try { await audio.play(); setMusicPlaying(true); }
            catch { setMusicPlaying(false); }
        } else { audio.pause(); setMusicPlaying(false); }
    };
    async function rsvp(answer: 'yes' | 'no') { const token = location.pathname.split('/').pop(); if (!token || token === '') return; try { const r = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, answer }) }); const j = await r.json(); setResponse(r.ok ? (answer === 'yes' ? '¡Gracias por confirmar!' : 'Gracias por avisarnos.') : (j.error || 'No pudimos guardar tu respuesta.')) } catch { setResponse('No pudimos guardar tu respuesta.') } }
    const eventDate = new Date(`${wedding.date}T12:00:00-05:00`), weekday = eventDate.toLocaleDateString('es-PE', { weekday: 'long' }), day = eventDate.toLocaleDateString('es-PE', { day: '2-digit' }), month = eventDate.toLocaleDateString('es-PE', { month: 'long' }), year = eventDate.getFullYear();
    return <main>
        <audio ref={audioRef} src="/fotos/por-eso-te-amo.mp3" loop preload="auto" />
        <button type="button" className="music-toggle" onClick={toggleMusic} aria-label={musicPlaying ? 'Pausar música' : 'Reproducir música'}>
            {musicPlaying ? <VolumeX size={17} aria-hidden="true" /> : <Music2 size={17} aria-hidden="true" />}
            <span>{musicPlaying ? 'Pausar música' : 'Activar música'}</span>
        </button>

        <section className="cover story-cover relative min-h-[100svh] flex items-center justify-center text-center overflow-hidden">
            <div className="cover-photo" aria-hidden="true" />
            <div className="cover-content relative z-10 px-5 py-16 reveal">
                <p className="cover-quote py-10">
                    “El amor nunca se da por vencido, jamás pierde la fe,<br className="hidden sm:block" />
                    siempre tiene esperanzas y se mantiene firme en toda circunstancia.”
                </p>
                <p className="cover-scripture">1 CORINTIOS 13:7</p>
                <h1 className="cover-names">{wedding.names[1]} y {wedding.names[0]}</h1>
                <p className="cover-married">¡Nos casamos!</p>
            </div>
            <a href="#invitacion" aria-label="Deslizar para descubrir la invitación" className="cover-down"><ChevronDown /></a>
            <svg className="cover-wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
                <path className="cover-wave-back" d="M0 52C190 108 326 120 505 82c178-38 278-61 450-31 187 32 295 83 485 33v56H0Z" />
                <path className="cover-wave-front" d="M0 83c192-54 338-62 515-27 170 34 271 51 444 25 186-28 309-67 481-29v88H0Z" />
            </svg>
        </section>
        <section data-reveal className="date-band date-message-band" aria-label="Mensaje para nuestros invitados">
            <p className="date-message">“Hay alegrías que se multiplican al compartirlas. Hoy celebramos nuestro amor y queremos tenerte cerca en uno de los días más especiales de nuestras vidas.”</p>
        </section>
        <SectionDivider from="#eef2f5" to="#f8f8f6" />
        <section id="invitacion" data-reveal className="invitation-section px-5 py-20 text-center">
            <p className="uppercase tracking-[.28em] text-xs text-dusty-700">Una celebración de amor</p>
            <Heart className="mx-auto my-5 text-dusty-500" size={24} />{guest && 
            <div className="mb-5"><p className="text-base md:text-lg">¡Hola, {guest.name}!</p>
            <p className="text-sm text-dusty-700 mt-1">Hemos reservado {guest.passes} {guest.passes === 1 ? 'pase' : 'pases'} para ti.</p>
            </div>}<h2 className="text-2xl sm:text-3xl md:text-4xl mb-5">Querida familia y amigos</h2>
            <p className="max-w-xl mx-auto text-base md:text-lg leading-7 md:leading-8">{wedding.welcome}</p>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10 mt-10">
                <div>
                    <h3 className="accent-heading text-3xl md:text-4xl mt-3">Padres del novio</h3>{wedding.parents.groom.map(n => <p key={n} className="text-base md:text-lg mt-3">{n}</p>)}
                </div>
                <div>             
                    <h3 className="accent-heading text-3xl md:text-4xl mt-3">Padres de la novia</h3>{wedding.parents.bride.map(n => <p key={n} className="text-base md:text-lg mt-3">{n}</p>)}
                </div>
                <div className="md:col-span-2">
                    <h3 className="accent-heading text-3xl md:text-4xl mt-3">Padrinos</h3>{wedding.parents.padrinos.map(n => <p key={n} className="text-base md:text-lg mt-3">{n}</p>)}
                </div>
                <div className="md:col-span-2">
                    <h3 className="accent-heading text-3xl md:text-4xl mt-3">Testigos</h3>{wedding.parents.testigos1.map(n => <p key={n} className="text-base md:text-lg mt-1">{n}</p>)}
                    <div className="mt-8">{wedding.parents.testigos2.map(n => <p key={n} className="text-base md:text-lg mt-1">{n}</p>)}</div>
                </div>
            </div>
        </section>
        <section data-reveal className="couple-photo-section" aria-label="Fotografía de Diego y Enma">
            <div className="couple-photo-background" role="img" aria-label="Diego y Enma tomados de la mano entre la vegetación" />
            <PhotoSectionWaves />
        </section>
        <section data-reveal className="countdown-section py-20 px-5 text-center">
            <div className="countdown-content">
                <p className="uppercase tracking-[.3em] text-xs text-dusty-700">Tenemos el agrado de invitarlos a </p>
                <h2 className="accent-heading text-5xl mt-3">Nuestra boda</h2>
                <div className="countdown-date-row" role="group" aria-label={`Fecha de la boda: ${weekday} ${day} de ${month} de ${year}`}>
                    <div className="date-side"><span>{weekday}</span></div>
                    <div className="date-medallion">
                        <span>{wedding.city}</span>
                        <strong>{day}</strong>
                        <small>{year}</small>
                    </div>
                    <div className="date-side"><span>{month}</span></div>
                </div>
                <div className="countdown-panel">
                    <p className="countdown-title">La cuenta regresiva</p>
                    <div className="countdown-grid">{Object.entries(time).map(([k, v]) => <div key={k} className="countdown-item">
                        <strong>{String(v).padStart(2, '0')}</strong>
                        <span>{{ d: 'Días', h: 'Horas', m: 'Min.', s: 'Seg.' }[k]}</span>
                    </div>)}</div>
                    <div className="countdown-ornament" aria-hidden="true"><span>✦</span></div>
                </div>
                <p className="countdown-quote max-w-2xl mx-auto mt-4 leading-7">{wedding.quote}</p>
            </div>
        </section>
        <SectionDivider from="#edf2f5" to="#f8f8f6" />
        <section data-reveal className="couple-photo-section" aria-label="Fotografía de Diego y Enma">
            <div className="couple-photo-background2" role="img" aria-label="Diego y Enma tomados de la mano entre la vegetación" />
            <PhotoSectionWaves />
        </section>
        <section data-reveal className="bg-paper py-20 px-5 text-center">
            <p className="uppercase tracking-[.3em] text-xs text-dusty-700">¡Nos encantará verte!</p>
            <h2 className="accent-heading text-5xl mt-3">Detalles del evento</h2>
        </section>
        <SectionDivider from="#f8f8f6" to="#edf2f5" />
        <section data-reveal className="bg-dusty-100 py-10 px-5 wave-section">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl mt-3 mb-12">Ceremonias y recepción</h2>
                <div className="grid md:grid-cols-2 gap-8">{[wedding.ceremony, wedding.reception].map((e, i) => <article key={e.title} className="event-card bg-ivory p-8 rounded-2xl border border-dusty-200"><MapPin className="mx-auto text-dusty-600" />
                <h3 className="text-2xl mt-3 text-dusty-900">{e.title}</h3>
                <div className="my-5 flex items-center justify-center gap-2 text-dusty-700">
                    <Clock size={17} />{e.time}
                </div>
                    <p className="font-semibold text-lg">{e.venue}</p>
                    <p className="text-sm text-stone-600 mt-1">{e.address}</p>
                    <a className="map-button inline-block mt-6" target="_blank" rel="noreferrer" href={e.mapsUrl}>Ver ubicación</a>
                    </article>)}
                </div>
                <button onClick={calendar} className="mt-9 inline-flex items-center gap-2 border border-dusty-600 text-dusty-900 rounded-full px-6 py-3 hover:bg-dusty-700 hover:text-white transition"><CalendarDays size={17} /> Agregar al calendario</button>
                    </div>
        </section>
        <SectionDivider from="#edf2f5" to="#f8f8f6" />
        <section data-reveal className="itinerary-section bg-ivory py-20 px-5 text-center">
            <p className="uppercase tracking-[.3em] text-xs text-dusty-700">Acompáñanos</p>
            <h2 className="accent-heading text-5xl mt-3">Itinerario</h2>
            <span aria-hidden="true" className="floral-spark">✾</span>
            <div className="timeline max-w-2xl mx-auto mt-12">{wedding.itinerary.map((x, i) => <div key={i} className={`timeline-row ${i % 2 ? 'left' : 'right'}`}>
                <span className="timeline-dot" />
                <div className="timeline-card">
                    <span aria-hidden="true" className="timeline-flower">✿</span>
                    <time>{x.time}</time>
                    <p>{x.activity}</p>
                </div>
                </div>)}
            </div>
                    <div className="dress-code mt-14">
                        <h3 className="dress-code-title">Código de vestimenta</h3>
                        <p className="dress-code-summary">{wedding.attire}</p>

                        <div className="dress-code-grid">
                            <div className="dress-code-item">
                                <h2 className='text-xl'>Ellas · Vestido</h2>
                                <p>Colores reservados para la novia:</p>
                                <strong>Blanco, dusty blue, crema, perla y sus variaciones; beige claro u oscuro.</strong>
                            </div>
                            <div className="dress-code-item">
                                <h2 className="text-xl">Ellos · Traje y corbata</h2>
                                <p>Colores reservados para el novio:</p>
                                <strong>Gris claro, blanco, beige y sus variaciones.</strong>
                            </div>
                        </div>
                    </div>
        </section>
        <SectionDivider from="#f8f8f6" to="#edf2f5" />
        <section data-reveal className="gallery-section py-20 px-5 text-center"><p className="uppercase tracking-[.3em] text-xs text-dusty-700">Nuestros momentos</p><h2 className="text-4xl mt-3 mb-10">Galería</h2><div className="photo-collage max-w-6xl mx-auto">{wedding.photos.map((photo, i) => <button data-photo key={photo} onClick={() => setActive(i)} className={`photo-card photo-${i % 6}`} style={{ '--photo-order': i } as React.CSSProperties} aria-label={`Ampliar fotografía ${i + 1}`}><img src={'/fotos/' + photo} loading="lazy" alt={`Enma y Diego, fotografía ${i + 1}`} /></button>)}</div></section>
        <SectionDivider from="#edf2f5" to="#f8f8f6" />
        {wedding.gifts.enabled && <section data-reveal className="gift-section py-20 px-5 text-center"><h2 className="accent-heading text-5xl mt-3">Sugerencia de regalo</h2>
        <p className="max-w-4xl mx-auto mt-4 leading-7 text-dusty-900">{wedding.gifts.text}</p>
         <p className="max-w-4xl mx-auto mt-4 leading-7 text-dusty-900">Direcciones para entrega de regalos</p>
        <div className="gift-locations" aria-label="Ubicaciones del evento">
            <a href="https://maps.app.goo.gl/v17pEjcRe9AmcRm97" target="_blank" rel="noopener noreferrer">
                <MapPin size={17} aria-hidden="true" />Ubcacion 1
            </a>
            <a href="https://maps.app.goo.gl/sJyX1fEj524VgTrZA" target="_blank" rel="noopener noreferrer">
                <MapPin size={17} aria-hidden="true" />Ubicacion 2
            </a>
        </div>
        <div className="gift-grid max-w-5xl mx-auto mt-10">
            <article className="gift-card gift-envelope">
                <Gift className="mx-auto mb-5 text-gold-600" />
                <p>{wedding.gifts.envelope}</p>
            </article>
            <article className="gift-card gift-account">
                <div>
                    <p className="text-sm uppercase tracking-wider text-gold-700">Cuenta bancaria</p>
                    <p className="mt-2">BCP</p>
                    <strong>{wedding.gifts.accountNumber}</strong>
                    <p>{wedding.gifts.accountHolder}</p>
                    <button className="copy-account" onClick={async () => { try { await navigator.clipboard.writeText(wedding.gifts.accountNumber); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch { setCopied(false) } }}>{copied ? 'Número copiado' : 'Copiar número'}</button>
                </div>
                <div className="yape-payment">
                    <p className="yape-caption">Escanea para enviar un regalo</p>
                    <div className="qr-frame yape-qr-frame">
                        <img src="/fotos/yape-qr-dusty-blue.png" alt="Código QR de Yape de Enma Esperanza Valdiviezo Pingo" loading="lazy" decoding="async" />
                    </div>
                </div>
            </article></div><p className="sr-only" aria-live="polite">{copied ? 'Número de cuenta copiado' : ''}</p>
        </section>}
        {wedding.gifts.enabled
            ? <SectionDivider from="#f8f8f6" to="#edf2f5" />
            : <SectionDivider from="#edf2f5" to="#edf2f5" />}
        <section data-reveal className="notes-section py-14 px-5 text-center">
            <Users className="mx-auto text-dusty-600" />
            <p className="max-w-2xl mx-auto mt-4 leading-7">{wedding.notes[0]}</p>
            <div className="mx-auto my-7 h-px max-w-xs bg-dusty-200" />
            <p className="max-w-2xl mx-auto leading-7">{wedding.notes[1]}</p>
        </section>
        <section data-reveal className="couple-photo-section couple-photo-section--closing" aria-label="Fotografía de Diego y Enma">
            <div className="couple-photo-background3" role="img" aria-label="Diego y Enma tomados de la mano entre la vegetación" />
            <PhotoSectionWaves />
        </section>
        <section data-reveal className="couple-caption-section" aria-label="Mensaje de los novios">
            <p>“Con mucha alegría deseamos celebrar este día tan especial junto a quienes han sido parte de nuestro camino. Nos encantaría contar contigo.”</p>
            <span>¡Te esperamos!</span>
        </section>

        {wedding.albumUrl
            ? <><SectionDivider from="#edf2f5" to="#f8f8f6" /><section data-reveal className="album-section text-center"><Camera className="mx-auto text-dusty-600" /><a href={wedding.albumUrl} className="underline inline-block">Compartir fotografías</a></section><SectionDivider from="#f8f8f6" to="#3f5d73" /></>
            : <SectionDivider from="#edf2f5" to="#3f5d73" />}
        <footer className="site-footer">Con cariño, {wedding.names.join(' & ')} · {wedding.date.slice(0, 4)} {wedding.contactUrl && <a href={wedding.contactUrl} className="underline ml-2">Contacto</a>}</footer>
        {active !== null && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setActive(null)}><button aria-label="Cerrar" className="absolute right-5  text-white"><X /></button><button aria-label="Anterior" className="absolute left-4 text-white" onClick={e => { e.stopPropagation(); setActive((active + wedding.photos.length - 1) % wedding.photos.length) }}><ArrowLeft /></button><img src={'/fotos/' + wedding.photos[active]} className="max-w-[85vw] max-h-[88vh] object-contain" /><button aria-label="Siguiente" className="absolute right-4 text-white" onClick={e => { e.stopPropagation(); setActive((active + 1) % wedding.photos.length) }}><ArrowRight /></button></div>}
    </main>
}
