import { Era } from './types';

export const ERAS: Era[] = [
  {
    id: 'ancient-egypt',
    name: 'Ancient Egypt',
    description: 'Walk among the Pharaohs and pyramids in the golden sands of 2500 BC.',
    promptModifier: 'as an Ancient Egyptian nobility, wearing gold jewelry, nemes headdress or ornate wig, linen robes, background of pyramids and desert sunset, cinematic lighting, photorealistic, 8k resolution',
    imagePlaceholder: 'https://picsum.photos/id/1015/400/300',
    color: 'from-yellow-600 to-yellow-800'
  },
  {
    id: 'viking-age',
    name: 'Viking Age',
    description: 'Sail the icy seas and embrace the warrior spirit of the 9th century.',
    promptModifier: 'as a fierce Viking warrior, wearing leather and fur armor, holding a shield, braided hair, background of a fjord and longships, dramatic stormy sky, cinematic lighting, photorealistic',
    imagePlaceholder: 'https://picsum.photos/id/1043/400/300',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 'renaissance',
    name: 'The Renaissance',
    description: 'Experience the art and elegance of 15th century Florence.',
    promptModifier: 'as a Renaissance noble, wearing velvet doublet or elaborate gown, pearls, ruffs, background of an ornate Italian palace balcony, soft painterly lighting, photorealistic style of an oil painting',
    imagePlaceholder: 'https://picsum.photos/id/106/400/300',
    color: 'from-red-700 to-rose-900'
  },
  {
    id: 'roaring-20s',
    name: 'Roaring 20s',
    description: 'Jazz, glitz, and glamour from the Gatsby era of 1920.',
    promptModifier: 'in 1920s fashion, flapper dress or tuxedo, art deco background, jazz club atmosphere, vintage filter effect, cinematic lighting, photorealistic, highly detailed',
    imagePlaceholder: 'https://picsum.photos/id/453/400/300',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    description: 'Neon lights and high-tech implants in a dystopian future.',
    promptModifier: 'as a cyberpunk character, futuristic clothing, glowing neon accents, cybernetic implants, rainy neon city street background at night, blue and purple lighting, photorealistic, 8k',
    imagePlaceholder: 'https://picsum.photos/id/532/400/300',
    color: 'from-fuchsia-600 to-purple-900'
  },
  {
    id: 'space-explorer',
    name: 'Galactic Future',
    description: 'Explore the cosmos in the year 3050.',
    promptModifier: 'wearing a futuristic high-tech spacesuit, floating inside a spaceship observation deck with a view of a nebula and planets, sleek white and silver aesthetic, cinematic sci-fi lighting, photorealistic',
    imagePlaceholder: 'https://picsum.photos/id/903/400/300',
    color: 'from-blue-600 to-cyan-800'
  }
];