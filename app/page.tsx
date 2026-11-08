'use client';
import { useEffect, useState } from 'react';
import { wedding } from '@/config';
import { ChevronDown, MapPin, Heart, CalendarDays, Camera, Gift, ArrowLeft, ArrowRight, X, Clock, Users } from 'lucide-react';

type Guest = { name: string; passes: number };
function BotanicalWreath() { return <svg className="wreath-art" viewBox="0 0 520 520" role="img" aria-label="Aro floral azul y dorado"><circle cx="260" cy="260" r="185" fill="none" stroke="#c5a059" strokeWidth="2" /><circle cx="260" cy="260" r="177" fill="none" stroke="#d4af70" strokeWidth="1" /><path d="M108 270c20 82 83 145 153 157m151-157c-16 58-53 103-99 127M112 248c13-57 48-102 91-128" fill="none" stroke="#6a829a" strokeWidth="2" strokeLinecap="round" /><g fill="#8b9daf"><ellipse cx="145" cy="333" rx="10" ry="25" transform="rotate(-48 145 333)" /><ellipse cx="177" cy="374" rx="10" ry="25" transform="rotate(-58 177 374)" /><ellipse cx="213" cy="400" rx="9" ry="24" transform="rotate(-76 213 400)" /><ellipse cx="371" cy="333" rx="9" ry="24" transform="rotate(35 371 333)" /><ellipse cx="339" cy="366" rx="9" ry="23" transform="rotate(52 339 366)" /><ellipse cx="150" cy="186" rx="8" ry="22" transform="rotate(-45 150 186)" /></g><g fill="#6a829a"><circle cx="126" cy="204" r="20" /><circle cx="371" cy="344" r="23" /><circle cx="298" cy="402" r="17" /></g><g fill="#a9bbc9"><circle cx="126" cy="204" r="11" /><circle cx="371" cy="344" r="13" /><circle cx="298" cy="402" r="9" /></g><path d="M207 390q-2-45-34-65M217 395q15-36 42-43m28 58q-1-39 24-61m47-4q3-37 32-54m-238-101q18-34 50-42" fill="none" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" /><g fill="#c5a059"><circle cx="183" cy="337" r="4" /><circle cx="199" cy="348" r="3" /><circle cx="277" cy="354" r="4" /><circle cx="295" cy="345" r="3" /><circle cx="337" cy="359" r="3" /></g></svg> }
function WaveDivider({ tone = 'paper' }: { tone?: 'paper' | 'white' }) { return <svg className={`wave-divider wave-divider-${tone}`} viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 44C180 90 360 96 540 67c190-31 280-71 470-47 170 22 274 58 430 20v60H0Z" /></svg> }
export default function Home({ guest }: { guest?: Guest } = {}) {
    const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 }), [active, setActive] = useState<number | null>(null), [response, setResponse] = useState(''), [copied, setCopied] = useState(false);
    useEffect(() => { const tick = () => { const ms = new Date(wedding.date + 'T18:00:00-05:00').getTime() - Date.now(), n = Math.max(0, ms); setTime({ d: Math.floor(n / 86400000), h: Math.floor(n / 3600000) % 24, m: Math.floor(n / 60000) % 60, s: Math.floor(n / 1000) % 60 }) }; tick(); const id = setInterval(tick, 1000); return () => clearInterval(id) }, []);
    useEffect(() => { const items = document.querySelectorAll<HTMLElement>('[data-reveal], [data-photo]'); if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('is-visible')); return } const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: .01 }); items.forEach(el => observer.observe(el)); return () => observer.disconnect() }, []);
    const calendar = () => { const url = new URL('https://calendar.google.com/calendar/render'); url.searchParams.set('action', 'TEMPLATE'); url.searchParams.set('text', `${wedding.names.join(' & ')} · Nuestra boda`); url.searchParams.set('dates', `${wedding.calendarStart.replace(/[-:]/g, '').slice(0, 15)}/${wedding.calendarEnd.replace(/[-:]/g, '').slice(0, 15)}`); url.searchParams.set('details', `${wedding.ceremony.title}: ${wedding.ceremony.venue}. ${wedding.reception.title}: ${wedding.reception.venue}.`); window.open(url.toString(), '_blank', 'noopener') };
    async function rsvp(answer: 'yes' | 'no') { const token = location.pathname.split('/').pop(); if (!token || token === '') return; try { const r = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, answer }) }); const j = await r.json(); setResponse(r.ok ? (answer === 'yes' ? '¡Gracias por confirmar!' : 'Gracias por avisarnos.') : (j.error || 'No pudimos guardar tu respuesta.')) } catch { setResponse('No pudimos guardar tu respuesta.') } }
    const eventDate = new Date(`${wedding.date}T12:00:00-05:00`), weekday = eventDate.toLocaleDateString('es-PE', { weekday: 'long' }), day = eventDate.toLocaleDateString('es-PE', { day: '2-digit' }), month = eventDate.toLocaleDateString('es-PE', { month: 'long' }), year = eventDate.getFullYear(), numericDate = eventDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', ' · ');
    return <main>

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
        <section data-reveal style={{
            marginTop: '10px',
            backgroundColor: 'rgba(220,229,237,.24)'
        }} className="date-band" aria-label={`Fecha de la boda: ${weekday} ${day} de ${month} de ${year}`}>
            <p>"Hay alegrías que se multiplican al compartirlas. Hoy celebramos nuestro amor y queremos tenerte cerca en uno de los días más especiales de nuestras vidas."</p>
        </section>
        <section id="invitacion" data-reveal className="invitation-section max-w-4xl mx-auto px-5 py-20 text-center">
            <svg className="invitation-top-triangle" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440L720 100Z" /></svg>
            <p className="uppercase tracking-[.28em] text-xs text-dusty-700">Una celebración de amor</p>
            <Heart className="mx-auto my-5 text-dusty-500" size={24} />{guest && 
            <div className="mb-5"><p className="text-xl">¡Hola, {guest.name}!</p>
            <p className="text-sm text-dusty-700 mt-1">Hemos reservado {guest.passes} {guest.passes === 1 ? 'pase' : 'pases'} para ti.</p>
            </div>}<h2 className="text-3xl md:text-5xl mb-5">Querida familia y amigos</h2>
            <p className="max-w-xl mx-auto text-lg leading-8">{wedding.welcome}</p>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10 mt-10">
                <div>
                    <h3 className="accent-heading text-5xl mt-3">Padres del novio</h3>{wedding.parents.groom.map(n => <p key={n} className="text-xl mt-3">{n}</p>)}
                </div>
                <div>             
                    <h3 className="accent-heading text-5xl mt-3">Padres de la novia</h3>{wedding.parents.bride.map(n => <p key={n} className="text-xl mt-3">{n}</p>)}
                </div>
                <div className="md:col-span-2">             
                    <h3 className="accent-heading text-5xl mt-3">Padrinos</h3>{wedding.parents.padrinos.map(n => <p key={n} className="text-xl mt-3">{n}</p>)}
                </div>
            </div>
            <div className="countdown-panel">
                <p className="countdown-title">La cuenta regresiva</p>
                <div className="countdown-grid">{Object.entries(time).map(([k, v]) => <div key={k} className="countdown-item">
                    <strong>{String(v).padStart(2, '0')}</strong>
                    <span>{{ d: 'Días', h: 'Horas', m: 'Min.', s: 'Seg.' }[k]}</span>
                </div>)}</div>
                <div className="countdown-ornament" aria-hidden="true"><span>✦</span></div>
            </div>
            <svg className="invitation-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
                <path className="invitation-wave-back" d="M0 45C190 5 340 95 540 63s300-58 470-24 280 49 430 6v75H0Z" />
                <path className="invitation-wave-front" d="M0 74c190-42 330 43 530 22s315-72 485-35 280 48 425 7v52H0Z" />
            </svg>
        </section>
        <section data-reveal className="bg-dusty-100 py-10 px-5 wave-section">
            <div className="max-w-5xl mx-auto text-center">
                <p className="uppercase tracking-[.3em] text-xs text-dusty-700">Nos encantará verte</p>
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
                    </div><WaveDivider />
        </section>
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
                    <div className="mt-14">
                        <p className="text-2xl">Código de vestimenta</p>
                        <p className="mt-3 font-semibold">{wedding.attire}</p>
                        <p className="text-sm text-dusty-800 mt-1">{wedding.attireNote}</p>
                    </div>
        </section>
        <section data-reveal className="gallery-section py-20 px-5 text-center"><p className="uppercase tracking-[.3em] text-xs text-dusty-700">Nuestros momentos</p><h2 className="text-4xl mt-3 mb-10">Galería</h2><div className="photo-collage max-w-6xl mx-auto">{wedding.photos.map((photo, i) => <button data-photo key={photo} onClick={() => setActive(i)} className={`photo-card photo-${i % 6}`} style={{ '--photo-order': i } as React.CSSProperties} aria-label={`Ampliar fotografía ${i + 1}`}><img src={'/fotos/' + photo} loading="lazy" alt={`Enma y Diego, fotografía ${i + 1}`} /></button>)}</div></section>
        {wedding.gifts.enabled && <section data-reveal className="gift-section py-20 px-5 text-center"><h2 className="accent-heading text-5xl mt-3">Sugerencia de regalo</h2>
        <p className="max-w-4xl mx-auto mt-4 leading-7 text-dusty-900">{wedding.gifts.text}</p>
        <div className="gift-grid max-w-5xl mx-auto mt-10">
            <article className="gift-card gift-envelope">
                <Gift className="mx-auto mb-5 text-gold-600" />
                <p>{wedding.gifts.envelope}</p>
            </article>
            <article className="gift-card gift-account">
                <div>
                    <p className="text-sm uppercase tracking-wider text-gold-700">Cuenta bancaria</p>
                    <p className="mt-2">Interbank</p>
                    <strong>{wedding.gifts.accountNumber}</strong>
                    <p>{wedding.gifts.accountHolder}</p>
                    <button className="copy-account" onClick={async () => { try { await navigator.clipboard.writeText(wedding.gifts.accountNumber); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch { setCopied(false) } }}>{copied ? 'Número copiado' : 'Copiar número'}</button>
                </div>
                <div className="qr-frame">{wedding.gifts.qrUrl ? <img src={wedding.gifts.qrUrl} alt="Código QR de regalo" /> : <span>QR<br />
                <small>Pendiente</small></span>}
                </div>
            </article></div><p className="sr-only" aria-live="polite">{copied ? 'Número de cuenta copiado' : ''}</p>
        </section>}
        <section data-reveal className="bg-white py-14 px-5 text-center">
            <Users className="mx-auto text-dusty-600" />
            <p className="max-w-2xl mx-auto mt-4 leading-7">{wedding.notes[0]}</p>
            <div className="mx-auto my-7 h-px max-w-xs bg-dusty-200" /><p className="max-w-2xl mx-auto leading-7">{wedding.notes[1]}</p></section>
        {wedding.albumUrl && <section className="py-14 text-center"><Camera className="mx-auto text-dusty-600" /><a href={wedding.albumUrl} className="underline mt-3 inline-block">Compartir fotografías</a></section>}
        <footer className="site-footer">Con cariño, {wedding.names.join(' & ')} · {wedding.date.slice(0, 4)} {wedding.contactUrl && <a href={wedding.contactUrl} className="underline ml-2">Contacto</a>}</footer>
        {active !== null && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setActive(null)}><button aria-label="Cerrar" className="absolute right-5 top-5 text-white"><X /></button><button aria-label="Anterior" className="absolute left-4 text-white" onClick={e => { e.stopPropagation(); setActive((active + wedding.photos.length - 1) % wedding.photos.length) }}><ArrowLeft /></button><img src={'/fotos/' + wedding.photos[active]} className="max-w-[85vw] max-h-[88vh] object-contain" /><button aria-label="Siguiente" className="absolute right-4 text-white" onClick={e => { e.stopPropagation(); setActive((active + 1) % wedding.photos.length) }}><ArrowRight /></button></div>}
    </main>
}
