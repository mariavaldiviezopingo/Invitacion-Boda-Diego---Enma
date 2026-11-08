const mapSearch=(query:string)=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const wedding = {
  names: ['Enma', 'Diego'], initials: 'E & D', date: '2026-12-04', timezone: 'America/Bogota', city: 'Piura',
  welcome: 'Con la bendicion de Dios y nuestros padres.',
  quote: '“El amor no se mira, se siente, y aún más cuando está junto a ti.”',
  ceremony: { title: 'Ceremonia Religiosa', time: '6:00 p. m.', venue: 'Basílica Catedral San Miguel Arcángel', address: 'Piura, Perú', mapsUrl: mapSearch('Basílica Catedral San Miguel Arcángel, Piura, Perú') },
  reception: { title: 'Recepción', time: '7:30 p. m.', venue: 'Fundo el Madrigal', address: 'Piura, Perú', mapsUrl: mapSearch('El Madrigal, Piura, Perú') },
  calendarStart: '2026-12-04T18:00:00-05:00', calendarEnd: '2026-12-05T01:00:00-05:00',
  attire: 'Elegante', attireNote: 'El blanco está reservado para la novia.',
  itinerary: [
    {time:'6:00 p. m.',activity:'Ceremonia religiosa'},
    {time:'7:30 p. m.',activity:'Recepción social'},
    {time:'8:00 p. m.',activity:'Actos protocolares'},
    {time:'9:00 p. m.',activity:'Cena'},
    {time:'10:00 p. m.',activity:'Fiesta'}
  ],
  parents: { groom: ['José Guillermo Estrada Herrera', 'Jeovana Jaqueline Neira Llanos'], bride: ['Luis Ambrocio Valdiviezo Flores', 'Nery Alejandrina Pingo Adrianzen'], padrinos: ['Luis Ambrocio Valdiviezo Flores', 'Jeovana Jaqueline Neira Llanos'],  testigos1: ['Miguel Angel Neira Llanos', 'Maria Luisa Valdiviezo Pingo'],  testigos2: ['Jordy Junior Vallejos Curo', 'Denisse del Milagro Quezasa Paiva']  },
  notes: ['Amamos a sus niños y queremos que ustedes disfruten y bailen sin parar. Por ello, la invitación es solo para adultos.'],
  gifts: { enabled: true, text: 'Tu compañía es el regalo más especial; si deseas obsequiarnos algo más, hemos dispuesto este espacio para ti.', envelope: 'Lluvia de sobres', bank: 'BCP', accountNumber: '00247510972703604629', accountHolder: 'Enma Esperanza Valdiviezo Pingo', qrUrl: '' },
  albumUrl: '', contactUrl: '',
  photos: ['DSC09736.jpg','DSC09778.jpg','FOTO7.jpeg','foto.jpeg','FOTO6.jpeg' ,'FOTO8.jpeg'  ]
} as const;
