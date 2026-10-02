/** Cambia aquí los nombres, la fecha, la carta, la canción y los cupones. */
export const BIRTHDAY_CONFIG = {
  recipient: 'Ana',
  sender: 'Sergio',
  birthday: '2026-10-02T00:00:00-04:00',
  birthdayEnd: '2026-10-03T00:00:00-04:00',
  dateLabel: '2 de octubre',
  music: {
    title: 'You',
    artist: 'Romeo Santos',
    videoId: 'ElU-VcWEhRU',
    youtubeUrl: 'https://www.youtube.com/watch?v=ElU-VcWEhRU',
  },
  letter: [
    'Nos conocimos hace poquito por Facebook, pero me gusta la idea de seguir descubriendo a la persona que está del otro lado de la pantalla.',
    'Por eso quise prepararte algo con las cosas que te gustan: rosas, lirios, cafecitos, perritos y hasta un poquito de terror. Un detalle sencillo, pero pensado para ti.',
    'Espero que este nuevo año te regale motivos para sonreír, gente que te cuide y muchos momentos que quieras volver a vivir.',
    'Y si te apetece, me gustaría compartir alguno de esos momentos contigo. Sin apuro: un café, una buena conversación y ver qué bonita historia puede empezar.',
    'Feliz cumpleaños, Ana. Que hoy te sientas tan especial como eres.',
  ],
  coupons: [
    { id: 'cocolatte', number: '01', category: 'coffee', icon: 'coffee', title: 'Un cafecito en Cocolatte', subtitle: 'Cocolatte', description: 'Algo rico, una mesa para dos y una conversación sin mirar el reloj.', detail: 'Un café o chocolate y algo dulce para acompañar. Tú eliges lo que más se te antoje; yo invito.', note: 'Para pasar de los mensajes a una buena charla.', color: 'rose' },
    { id: 'chocolateria', number: '02', category: 'coffee', icon: 'cookie', title: 'Un plan bien dulce', subtitle: 'La Chocolatería', description: 'Chocolate, un postrecito y la excusa perfecta para seguir conociéndonos.', detail: 'Una salida a La Chocolatería para elegir algo dulce y conversar. Tú eliges el antojo; yo invito.', note: 'El chocolate sabe mejor con buena compañía.', color: 'cocoa' },
    { id: 'matilda', number: '03', category: 'coffee', icon: 'cup-soda', title: 'Una tarde en Matilda', subtitle: 'Matilda', description: 'Probamos algo rico y dejamos que la tarde nos sorprenda.', detail: 'Una tarde en Matilda, con tu bebida favorita y algo rico para compartir. Tú propones el día; yo invito.', note: 'Una tarde sencilla que puede quedar en el recuerdo.', color: 'sage' },
    { id: 'terror', number: '04', category: 'plans', icon: 'clapperboard', title: 'Sustos para dos', subtitle: 'Noche de terror', description: 'Tú eliges la peli. Yo llevo los snacks y trato de no asustarme tanto.', detail: 'Una película de terror elegida por ti, algo rico para picar y buena compañía. Coordinamos juntos dónde verla.', note: 'Se vale pausar la peli si el susto viene fuerte.', color: 'night' },
    { id: 'matambre', number: '05', category: 'plans', icon: 'pizza', title: 'Tu antojo favorito', subtitle: 'Matambre a la pizza', description: 'Porque un cumpleaños también se celebra comiendo lo que más te gusta.', detail: 'Una salida por matambre a la pizza. Elegimos juntos el lugar y la fecha; yo invito.', note: 'La conversación y el buen apetito van incluidos.', color: 'peach' },
    { id: 'perritos', number: '06', category: 'plans', icon: 'paw-print', title: 'Patitas y una caminata', subtitle: 'Un paseo bonito', description: 'Un paseo tranquilo y todos los perritos que se crucen por el camino.', detail: 'Una caminata en un lugar que nos guste. Si se cruzan perritos, nos tomamos el tiempo para saludarlos con permiso de sus dueños.', note: 'Sin apuro, a tu ritmo.', color: 'butter' },
  ] as const,
};

export type Coupon = (typeof BIRTHDAY_CONFIG.coupons)[number];
export type CouponCategory = 'all' | 'coffee' | 'plans';
