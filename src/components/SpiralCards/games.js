// 螺旋旋转卡片 — 15 个游戏（覆盖简历重点 + 多品类）
// 图片统一使用 trae-api 文本转图：每张 prompt 描述官方主视觉/封面海报风格，避免 generic 风格
const P = (desc) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(desc)}&image_size=landscape_16_9`

export const games = [
  {
    name: 'Counter-Strike 2',
    nameZh: 'CS2',
    category: 'FPS',
    prompt:
      'OFFICIAL KEY ART: Counter-Strike 2 CSGO2 official cover art, de_dust2 central gate silhouette, AK47 and desert eagle in foreground, orange dust storm sky, cinematic dark tactical atmosphere, source 2 engine quality, ultra detailed, premium game poster, NO TEXT',
  },
  {
    name: 'VALORANT',
    nameZh: '无畏契约',
    category: 'FPS',
    prompt:
      'OFFICIAL KEY ART: Valorant Riot Games official cover art style, duelist agent Jett silhouette mid air blade dash, red blue magenta neon hexagon geometry particle burst, dark gradient cyan black background, futuristic tactical FPS, premium poster, NO TEXT',
  },
  {
    name: 'League of Legends',
    nameZh: '英雄联盟',
    category: 'MOBA',
    prompt:
      'OFFICIAL KEY ART: League of Legends Riot Games official cover style, Summoner\'s Rift Nexus blue glow, Lux golden light final sparkle spell, Yasuo wind slash silhouette, dramatic dark cinematic purple teal fantasy skyline, premium MOBA poster, NO TEXT',
  },
  {
    name: 'DOTA 2',
    nameZh: 'DOTA2',
    category: 'MOBA',
    prompt:
      'OFFICIAL KEY ART: DOTA 2 Valve official cover poster, Radiant crystal ancient glowing gold left vs Dire crystal throne burning red right, Shadow Fiend silhouette dark center, ancient runic battlefield, epic dark fantasy atmosphere, premium poster, NO TEXT',
  },
  {
    name: 'Arena of Valor',
    nameZh: '王者荣耀',
    category: 'MOBA',
    prompt:
      'OFFICIAL KEY ART: Honor of Kings Arena of Valor Tencent mobile MOBA official poster style, Chinese xianxia Diaochan Lu Bu elegant hero silhouette, golden cloud pattern, jade pavilion lanterns, deep indigo sky, premium cinematic dark fantasy aesthetic, NO TEXT',
  },
  {
    name: 'APEX Legends',
    nameZh: 'APEX 英雄',
    category: 'FPS',
    prompt:
      'OFFICIAL KEY ART: Apex Legends Respawn Entertainment official cover art, Wraith Bangalore Lifeline trio jumping from dropship, Kings Canyon desert mountain below, teal purple orange neon night sky, tactical battle royale, premium poster, NO TEXT',
  },
  {
    name: 'PUBG',
    nameZh: '绝地求生',
    category: 'FPS',
    prompt:
      'OFFICIAL KEY ART: PUBG PlayerUnknown\'s Battlegrounds Krafton official cover, level 3 helmet military soldier foreground, Erangel island smoke plane drop parachute, realistic gritty dusk blue sky, battlefield debris, winner winner chicken dinner atmosphere, premium poster, NO TEXT',
  },
  {
    name: 'Genshin Impact',
    nameZh: '原神',
    category: 'RPG',
    prompt:
      'OFFICIAL KEY ART: Genshin Impact Hoyoverse official main visual style, Traveler Aether Lumine silhouette with Paimon floating, Mondstadt windmills and Liyue harbor mountains landscape, Anemo Geo Electro Cryo Hydro Pyro Dendro seven elements glowing symbols, blue sky anime style, premium poster, NO TEXT',
  },
  {
    name: 'Honkai: Star Rail',
    nameZh: '崩坏：星穹铁道',
    category: 'RPG',
    prompt:
      'OFFICIAL KEY ART: Honkai Star Rail Hoyoverse official key art, Astral Express space train flying through purple nebula galaxy, March 7th and Trailblazer silhouette on front, deep magenta cosmic cyan dark background, stellar jade stars, premium sci-fi poster, NO TEXT',
  },
  {
    name: 'Wuthering Waves',
    nameZh: '鸣潮',
    category: 'RPG',
    prompt:
      'OFFICIAL KEY ART: Wuthering Waves Kuro Games official poster, Rover protagonist silhouette standing before resona acoustic tower ruins, cyan teal tidal energy waves bursting, post-apocalyptic modern city ruins at dawn, anime open world cinematic aesthetic, premium dark poster, NO TEXT',
  },
  {
    name: 'Cyberpunk 2077',
    nameZh: '赛博朋克 2077',
    category: 'ARPG',
    prompt:
      'OFFICIAL KEY ART: Cyberpunk 2077 CD Projekt Red official cover art, V male silhouette with mantis blade, Night City neon skyline rain, magenta hot pink electric yellow cyan neon signs, holographic skyscrapers, Arasaka tower, dystopian cyberpunk megacity night, premium poster, NO TEXT',
  },
  {
    name: 'Elden Ring',
    nameZh: '艾尔登法环',
    category: 'ARPG',
    prompt:
      'OFFICIAL KEY ART: Elden Ring FromSoftware official cover, massive glowing golden Erdtree dominating Lands Between skyline, Stormveil Castle silhouette below sunset orange mist, Tarnished in armor holding greatsword silhouette, epic dark fantasy medieval atmosphere, premium poster, NO TEXT',
  },
  {
    name: 'GTA V',
    nameZh: 'GTA5',
    category: '开放世界',
    prompt:
      'OFFICIAL KEY ART: GTA 5 Rockstar Games official cover poster, Los Santos skyline palm tree ocean sunset, Michael Franklin Trevor three character silhouettes, pink purple turquoise sky gradient, Vinewood sign hills, cinematic heist aesthetic, premium open world poster, NO TEXT',
  },
  {
    name: 'Black Myth: Wukong',
    nameZh: '黑神话：悟空',
    category: '动作',
    prompt:
      'OFFICIAL KEY ART: Black Myth Wukong Game Science official main visual, Sun Wukong Monkey King holding golden Ruyi Jingu Bang staff standing on mountain peak, dark Chinese ink wash painting style, golden flame aura, dramatic clouds and waterfall, epic Chinese mythology atmosphere, premium cinematic poster, NO TEXT',
  },
  {
    name: 'Delta Force',
    nameZh: '三角洲行动',
    category: 'FPS',
    prompt:
      'OFFICIAL KEY ART: Delta Force Hawk Ops TiMi Studio official modern military FPS cover art, tier 1 special forces operator with tactical helmet night vision, Black Hawk helicopter flying over desert town, smoke tracer fire, dark olive green realistic military atmosphere, premium cinematic poster, NO TEXT',
  },
]

// Pre-resolve image URLs (landscape_16_9 → thumbs)
export const gameCards = games.map((g) => ({
  name: g.name,
  nameZh: g.nameZh,
  category: g.category,
  image: P(g.prompt),
}))
