const mapSearch=(query:string)=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const wedding = {
  names: ['Enma', 'Diego'], initials: 'E & D', date: '2026-12-04', timezone: 'America/Bogota', city: 'Piura',
  welcome: 'Con mucha alegría queremos compartir contigo el comienzo de esta nueva historia.',
  quote: '“El amor no se mira, se siente, y aún más cuando está junto a ti.”',
  ceremony: { title: 'Ceremonia Religiosa', time: '6:00 p. m.', venue: 'Basílica Catedral San Miguel Arcángel', address: 'Piura, Perú', mapsUrl: mapSearch('Basílica Catedral San Miguel Arcángel, Piura, Perú') },
  reception: { title: 'Ceremonia Civil y Recepción', time: '7:30 p. m.', venue: 'Fundo Carlos', address: 'Piura, Perú', mapsUrl: mapSearch('Fundo Carlos, Piura, Perú') },
  calendarStart: '2026-12-04T18:00:00-05:00', calendarEnd: '2026-12-05T01:00:00-05:00',
  attire: 'Formal', attireNote: 'El blanco está reservado para la novia.',
  itinerary: [
    {time:'6:00 p. m.',activity:'Ceremonia religiosa'},
    {time:'7:30 p. m.',activity:'Recepción social'},
    {time:'8:00 p. m.',activity:'Ceremonia civil'},
    {time:'9:00 p. m.',activity:'Actos protocolares'},
    {time:'9:30 p. m.',activity:'Cena'},
    {time:'10:00 p. m.',activity:'Fiesta'}
  ],
  parents: { groom: ['Diego Estrada', 'Daniela Fernandez'], bride: ['Luis Ambrosio Valdiviezo', 'Nery Pingo'] },
  notes: ['Amamos a sus niños y queremos que ustedes disfruten y bailen sin parar. Por ello, la invitación es solo para adultos.', 'La fiesta comenzará puntualmente. Nos encantaría que llegues a tiempo para disfrutar cada detalle con nosotros.'],
  gifts: { enabled: true, text: 'Tu presencia y tus buenos deseos son nuestro mejor regalo. Si desean hacernos llegar algún presente estaremos muy agradecidos.', envelope: 'Lluvia de sobres', bank: 'Interbank', accountNumber: '00001922737373', accountHolder: 'Diego Estrada', qrUrl: '' },
  albumUrl: '', contactUrl: '',
  photos: ['DSC09736.jpg','DSC09778.jpg','DSC09844.jpg','foto.jpeg','DSC09914.jpg','DSC09937.jpg','DSC09897.jpg','foto2.jpeg', 'foto3.jpeg' ]
} as const;
