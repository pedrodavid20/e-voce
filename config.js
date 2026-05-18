// ═══════════════════════════════════════════════════════════════
//  Personalize aqui — é só editar este arquivo
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  // Data em que começaram a namorar (ano, mês-1, dia, hora, minuto, segundo)
  // Exemplo: 14 de fevereiro de 2024 às 20:30
  startDate: new Date(2022, 9, 26, 20, 12, 0),

  // Nomes que aparecem na página
  names: {
    you: "Pedro",
    partner: "Nicoly",
  },

  // Frase principal (pode mudar quando quiser)
  headline: "Cada segundo ao seu lado",
  subheadline: "é um presente que guardo no coração",

  // Fotos — coloque os arquivos em assets/photos/ e liste aqui
  // legendas opcionais para cada foto
  photos: [
    { src: "assets/photos/foto1.JPEG", caption: "O nosso primeiro sorriso juntos" },
    { src: "assets/photos/foto2.JPEG", caption: "Um dia que nunca esqueço" },
    { src: "assets/photos/foto3.JPEG", caption: "Você ilumina tudo" },
    { src: "assets/photos/foto4.JPEG", caption: "Minha pessoa favorita" },
    { src: "assets/photos/foto5.JPEG", caption: "Para sempre nós" },
    { src: "assets/photos/foto6.JPEG", caption: "Te amo mais a cada dia" },
  ],

  // Vídeos opcionais — coloque em assets/videos/
  // deixe videos: [] se não quiser vídeo ainda
  videos: [
    { src: "assets/videos/primeiro-encontro.mp4", poster: "assets/photos/foto7.jpg", caption: "Lembra do primeiro encontro?" },
  ],

  // Música de fundo opcional (coloque em assets/audio/)
  // audio: "assets/audio/nossa-musica.mp3",
  audio: "assets/audio/nossa-musica.mp3",
};
