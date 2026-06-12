// ═══════════════════════════════════════════════════════════════
//  Personalize aqui — é só editar este arquivo
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  // Marcos da história — o visitante escolhe qual data contar
  // (ano, mês-1, dia, hora, minuto, segundo)
  milestones: [
    {
      id: "primeiro-encontro",
      label: "Primeiro encontro",
      date: new Date(2022, 9, 26, 20, 12, 0),
      counterLabel: "Juntos desde o primeiro encontro",
    },
    {
      id: "pedido-namoro",
      label: "Pedido de namoro",
      date: new Date(2023, 0, 14, 17, 0, 0),
      counterLabel: "Juntos desde o pedido de namoro",
    },
  ],

  // Marco exibido ao abrir a página (id de um item acima)
  defaultMilestone: "primeiro-encontro",

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
    { src: "assets/photos/foto1.JPEG", caption: "Seu sorriso ilumina meu mundo" },
    { src: "assets/photos/foto2.JPEG", caption: "Um dia que nunca esqueço" },
    { src: "assets/photos/foto3.JPEG", caption: "Você ilumina tudo" },
    { src: "assets/photos/foto4.JPEG", caption: "Minha pessoa favorita" },
    { src: "assets/photos/foto5.JPEG", caption: "Para sempre nós" },
    { src: "assets/photos/foto6.JPEG", caption: "Te amo mais a cada dia" },
  ],

  // Vídeos opcionais — coloque em assets/videos/
  // deixe videos: [] se não quiser vídeo ainda
  videos: [
    { src: "assets/videos/primeiro-encontro.MP4", poster: "assets/photos/foto7.JPEG", caption: "Lembra do primeiro encontro?" },
  ],

  // Música de fundo opcional (coloque em assets/audio/)
  // audio: "assets/audio/nossa-musica.mp3",
  audio: "assets/audio/nossa-musica.mp3",
};
