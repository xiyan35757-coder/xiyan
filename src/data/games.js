// ============================================================
// Game Imagery — 谢茂宇 游戏阅历真实图库（更新版）
// 图片来源优先级:
//   A. Steam官方CDN (https://cdn.cloudflare.steamstatic.com)
//      —— 稳定、支持外链、无403、无跨域
//   B. 游戏官网/Wikipedia官方公开资源 (米哈游/腾讯/Riot)
//   C. 公开稳定媒体CDN
// 尺寸规范:
//   4:5 竖版封面 =  640x800 (Hero 弧形卡)
//  16:9 横幅   = 1920x1080 (品类背景 / 身份人设图)
//   4:3 节点卡  =  640x480 (GamerDNA节点缩略)
// ============================================================

/* ---------------- 图片URL生成器（不再依赖picsum占位） ---------------- */

/** 4:5 竖版封面（Hero弧形卡） */
export const picStrip = (key) => stripMap[key] || stripMap.fallback;

/** 16:9 横幅（品类背景 / 人设图） */
export const picHero = (key) => heroBgMap[key] || heroBgMap.fallback;

/** 节点缩略 (4:3 / 3:2 / 1:1 自适应) */
export const picNode = (key) => nodeMap[key] || nodeMap.fallback;

/* -------------------------------------------------------
 * Hero 弧形3D图片带 12张游戏 4:5 竖版封面
 * 顺序对应：0 VALORANT / 1 LOL / 2 原神 / 3 CS2
 *          4 星穹铁道 / 5 KPL / 6 Apex / 7 CF
 *          8 文明6 / 9 我的世界 / 10 鸣潮 / 11 星际2
 * ------------------------------------------------------- */
export const heroGameStrip = [
  { id: 'valorant',   ratio: '4/5', label: 'VALORANT',       cat: 'FPS' },
  { id: 'lol',        ratio: '4/5', label: '英雄联盟',       cat: 'MOBA' },
  { id: 'genshin',    ratio: '4/5', label: '原神',           cat: 'RPG' },
  { id: 'cs2',        ratio: '4/5', label: 'CS2',            cat: 'FPS' },
  { id: 'starrail',   ratio: '4/5', label: '崩坏·星穹铁道',  cat: 'RPG' },
  { id: 'kpl',        ratio: '4/5', label: 'KPL 观赛',       cat: '电竞' },
  { id: 'apex',       ratio: '4/5', label: 'Apex Legends',   cat: 'FPS' },
  { id: 'cf',         ratio: '4/5', label: '穿越火线CF',     cat: 'FPS' },
  { id: 'civ6',       ratio: '4/5', label: '文明6',          cat: '策略' },
  { id: 'minecraft',  ratio: '4/5', label: '我的世界',        cat: '生存' },
  { id: 'wuwa',       ratio: '4/5', label: '鸣潮',           cat: 'RPG' },
  { id: 'sc2',        ratio: '4/5', label: '星际争霸2',      cat: '策略' },
];

/* -------------------------------------------------------
 * Gamer DNA 5大品类数据
 * 每个品类含：id / name / subtitle / prompt
 *          / bg   (品类背景，16:9大横幅)
 *          / nodes[].bg (节点卡缩略)
 * ------------------------------------------------------- */
export const gamerDNATabs = [
  /* ====== 1. MOBA ====== */
  {
    id: 'moba',
    name: 'MOBA',
    subtitle: '5000+局 深水区老玩家',
    prompt: '从BP博弈到团战拉扯，拆解MOBA的节奏与爽点设计',
    bg: 'bg-moba',
    nodes: [
      { title: '王者荣耀 5000+局', tag: 'Main',    img: 'n-honorofkings', size: 'lg' },
      { title: 'League of Legends', tag: 'Sub',    img: 'n-lol',           size: 'md' },
      { title: 'DOTA2',             tag: 'Sub',    img: 'n-dota2',         size: 'md' },
      { title: 'BP / 分路分析',     tag: 'Insight',img: 'n-moba-bp',       size: 'sm' },
      { title: '团战节奏拆解',      tag: 'Insight',img: 'n-moba-team',     size: 'sm' },
    ],
    stats: [
      { k: '累计局数', v: '5,000+' },
      { k: '主玩位置', v: '打野 / 中单' },
      { k: '段位峰值', v: '王者 / 钻石' },
    ],
    insights: [
      '对匹配/ELO机制体感敏锐，能快速识别局内"系统局"信号',
      '深度体验付费战令、抽奖、皮肤系统，对玩家留存钩子有体感',
      '长期追踪版本更新+补丁说明，独立撰写平衡分析笔记',
    ],
  },
  /* ====== 2. FPS ====== */
  {
    id: 'fps',
    name: 'FPS',
    subtitle: '无畏契约钻石 / CF校园代理',
    prompt: '从枪法博弈到地图控制，理解FPS玩家的爽点与挫败',
    bg: 'bg-fps',
    nodes: [
      { title: 'VALORANT 钻石',  tag: 'Main',    img: 'n-valorant', size: 'lg' },
      { title: 'CS2',             tag: 'Main',    img: 'n-cs2',      size: 'md' },
      { title: 'CF 校园代理人',   tag: 'Sub',     img: 'n-cf',       size: 'md' },
      { title: 'Apex Legends',    tag: 'Sub',     img: 'n-apex',     size: 'sm' },
      { title: '地图动线 / 枪法',  tag: 'Insight', img: 'n-fps-aim',  size: 'sm' },
    ],
    stats: [
      { k: '无畏契约', v: '钻石 300h+' },
      { k: 'CF身份',   v: '校园代理人' },
      { k: '覆盖品类', v: '战术/竞技/大逃杀' },
    ],
    insights: [
      '熟悉FPS核心付费：通行证/皮肤/开箱概率，独立完成过抽卡概率分析报告',
      '担任CF校园代理人期间组织过线下开黑活动，理解社区运营',
      '对TTK、后坐力、地图池轮换有玩家视角的第一手判断',
    ],
  },
  /* ====== 3. RPG / 二次元 ====== */
  {
    id: 'rpg',
    name: 'RPG / 二次元',
    subtitle: '原神 · 星穹铁道 · 鸣潮 全勤玩家',
    prompt: '从抽卡设计到长线留存，拆解二次元游戏的运营节奏',
    bg: 'bg-rpg',
    nodes: [
      { title: '原神',             tag: 'Main',    img: 'n-genshin',   size: 'lg' },
      { title: '崩坏：星穹铁道',   tag: 'Main',    img: 'n-starrail',  size: 'md' },
      { title: '鸣潮',             tag: 'Main',    img: 'n-wuwa',      size: 'md' },
      { title: '抽卡系统体验',     tag: 'Insight', img: 'n-gacha',     size: 'sm' },
      { title: '活动版本分析',     tag: 'Insight', img: 'n-rpg-event', size: 'sm' },
    ],
    stats: [
      { k: '原神 崩铁',   v: '开服玩家' },
      { k: '卡池经验',    v: '常驻+UP全体验' },
      { k: '活动参与率',  v: '90%' },
    ],
    insights: [
      '3份独立版本分析报告涵盖：抽卡概率、活动完成率、玩家流失节点',
      '深度理解二次元游戏"情绪价值+社交+养成"三重留存飞轮',
      '关注Z世代表达语境：B站/小红书/NGA/贴吧日均浏览1h+',
    ],
  },
  /* ====== 4. 策略 · 生存 ====== */
  {
    id: 'strategy',
    name: '策略 · 生存',
    subtitle: '文明6 · 星际2 · 我的世界 · 泰拉瑞亚',
    prompt: '从策略深度到沙盒自由度，理解创意型玩家的满足感',
    bg: 'bg-str',
    nodes: [
      { title: '文明6',         tag: 'Strategy', img: 'n-civ6',       size: 'lg' },
      { title: '星际争霸2',     tag: 'Strategy', img: 'n-sc2',        size: 'md' },
      { title: '皇室战争',      tag: 'Strategy', img: 'n-cr',         size: 'sm' },
      { title: '我的世界',      tag: 'Survival', img: 'n-mc',         size: 'md' },
      { title: '幻兽帕鲁',      tag: 'Survival', img: 'n-palworld',   size: 'sm' },
      { title: '泰拉瑞亚',      tag: 'Survival', img: 'n-terraria',   size: 'sm' },
    ],
    stats: [
      { k: '策略偏好', v: '4X / RTS / 塔防' },
      { k: '沙盒时长', v: '500h+' },
      { k: 'MOD体验',  v: '丰富' },
    ],
    insights: [
      '擅于拆解"数值难度曲线"——什么让策略玩家上头/劝退',
      '沙盒游戏的自驱型创造满足感，可迁移到UGC生态设计',
      '理解MOD社区和玩家共创生态的运营底层逻辑',
    ],
  },
  /* ====== 5. 电竞 · 观赛 ====== */
  {
    id: 'esports',
    name: '电竞 · 观赛',
    subtitle: 'KPL / LPL 3年+ 资深观众',
    prompt: '从联赛运营到社区梗传播，理解电竞内容的破圈密码',
    bg: 'bg-esp',
    nodes: [
      { title: 'KPL 王者职业联赛', tag: 'Main',  img: 'n-kpl',         size: 'lg' },
      { title: 'LPL 英雄联盟',    tag: 'Main',   img: 'n-lpl',         size: 'md' },
      { title: 'VCT 无畏契约',    tag: 'Sub',    img: 'n-vct',         size: 'md' },
      { title: '赛事内容二创',    tag: 'UGC',    img: 'n-ugc',         size: 'sm' },
      { title: '战队 / 选手IP',   tag: 'Brand',  img: 'n-team',        size: 'sm' },
    ],
    stats: [
      { k: '观赛时长', v: '3年+' },
      { k: '关注赛事', v: 'KPL / LPL / MSI / S赛' },
      { k: '二创消费', v: 'B站/小红书高频' },
    ],
    insights: [
      '理解职业联赛的"战队故事线+选手人设"运营逻辑',
      '观察社区梗和热梗传播路径，具备用"整活"触达年轻用户的嗅觉',
      'CF个人内容账号曾做到单条50万播放，验证数据驱动创意方法论',
    ],
  },
];

/* ============================================================
 *  ==== 真实游戏图片 URL 映射表 ====
 *  - 优先: Steam官方 CDN (cloudflare.steamstatic.com) — 完全稳定
 *  - 其次: 米哈游/腾讯/Riot 官方 wiki 或 公开品牌资产
 *  - 保底: Steam 相关品类官方艺术图 (保证不404)
 *  - 每个 key 提供 4:5 / 16:9 / 4:3 三尺寸
 * ============================================================ */

/* ============================================================
 * 图床选择说明：
 *   ✗ cdn.cloudflare.steamstatic.com  — ORB/CORS 拦截 (ERR_BLOCKED_BY_ORB)
 *   ✗ images.akamai.steamstatic.com   — 国内 DNS 不通 (ERR_NAME_NOT_RESOLVED)
 *   ✓ shared.steamstatic.com          — 官方 Canonical Store/Library 静态资产 Base (通过 gofurry/steam-go 验证)
 *       格式: https://shared.steamstatic.com/store_item_assets/steam/apps/{APPID}/{RESOURCE}
 *       RESOURCE ∈ { header.jpg, capsule_616x353.jpg, capsule_sm_120.jpg,
 *                    library_hero.jpg, library_600x900_2x.jpg, logo_2x.png }
 * ============================================================ */

/* 资源类型短名 */
const LIB   = 'library_hero.jpg'
const HDR   = 'header.jpg'
const CAP   = 'capsule_616x353.jpg'
const SMCAP = 'capsule_sm_120.jpg'
const SHARED_BASE = 'https://cdn.cloudflare.steamstatic.com/store_item_assets/steam/apps'

const sharedUrl = (appId, res) => `${SHARED_BASE}/${appId}/${res}`

/* ---------- 4:5 竖版封面 (Hero 12张弧形卡) ----------
   library_hero.jpg 是 3840x1240 横幅，用 CSS cover 裁成 4:5 竖封面
   objectPosition=center top 优先展示标题 + 主视觉人物区域
   ORB 拦截 APPID 白名单实测通过: 570/730/2211020/2424880/2410680/1172470/289070/1928890/2368310/1623730/1281930
   ORB 拦截 APPID: 2377060(原神) / 1969030(不存在) / 2059500(星际重制) / 1984880(CF HD) → 换 picsum
   ---------- */
const PICSUM = 'https://picsum.photos/seed'
/* 本地游戏图 (public/images/games/) — 用户提供的真实游戏图 */
const LOCAL = '/images/games'

/* ---------- 4:5 竖版封面 (Hero 12张弧形卡) ----------
   CSS object-fit: cover 自动裁成 4:5，object-position: center top ---------- */
const stripMap = {
  valorant:  sharedUrl(2424880, LIB),
  lol:       sharedUrl(2211020, LIB),
  genshin:   `${LOCAL}/genshin.jpg`,
  cs2:       sharedUrl(730, LIB),
  starrail:  `${LOCAL}/starrail.jpg`,
  kpl:       `${LOCAL}/kpl.jpg`,
  apex:      sharedUrl(1172470, LIB),
  cf:        `${LOCAL}/cf.jpg`,
  civ6:      sharedUrl(289070, LIB),
  minecraft: sharedUrl(1928890, LIB),
  wuwa:      sharedUrl(2368310, LIB),
  sc2:       `${PICSUM}/starcraft-2-remastered-terran-zerg-protoss/800/1000`,
  fallback:  sharedUrl(1172470, LIB),
};

/* ---------- 16:9 横幅 (品类背景 / 人设 Hero图) ---------- */
const heroBgMap = {
  /* Gamer DNA 5 品类背景图 */
  'bg-moba':     sharedUrl(570, LIB),             // Dota2 (MOBA 代表)
  'bg-fps':      sharedUrl(2424880, LIB),         // VALORANT
  'bg-rpg':      `${LOCAL}/genshin.jpg`,          // 原神 (用户提供)
  'bg-str':      sharedUrl(289070, LIB),          // 文明6
  'bg-esp':      `${LOCAL}/kpl.jpg`,              // KPL 电竞 (用户提供)
  /* Skills 4 人设 Hero 图 */
  'ps-analyst':  `${LOCAL}/ps-new.png`,           // 分析师：用户提供
  'ps-planner':  `${LOCAL}/ps-new2.png`,          // 策划：用户提供
  'ps-operator': `${LOCAL}/ps-new3.png`,          // 运营：用户提供
  'ps-pm':       `${LOCAL}/ps-new4.png`,          // 项目经理：用户提供
  fallback:      sharedUrl(2410680, LIB),
};

/* ---------- 节点缩略 (GamerDNA 卡片, 4:3) ---------- */
const nodeMap = {
  /* MOBA */
  'n-honorofkings': `${LOCAL}/kpl.jpg`,
  'n-lol':          sharedUrl(2211020, LIB),
  'n-dota2':        sharedUrl(570, HDR),
  'n-moba-bp':      `${LOCAL}/n-moba-bp.png`,
  'n-moba-team':    `${LOCAL}/n-moba-team.png`,
  /* FPS (cs2/cf 用用户提供的本地图) */
  'n-valorant':     `${LOCAL}/n-valorant.jpg`,
  'n-cs2':          sharedUrl(730, HDR),
  'n-cf':           `${LOCAL}/cf.jpg`,
  'n-apex':         `${LOCAL}/n-apex.jpg`,
  'n-fps-aim':      `${LOCAL}/n-fps-aim.png`,
  /* RPG / 二次元 */
  'n-genshin':      `${LOCAL}/genshin.jpg`,
  'n-starrail':     `${LOCAL}/starrail.jpg`,
  'n-wuwa':         `${LOCAL}/n-wuwa.jpg`,
  'n-gacha':        `${LOCAL}/n-gacha.jpg`,
  'n-rpg-event':    `${LOCAL}/n-rpg-event.png`,
  /* 策略 · 生存 */
  'n-civ6':         sharedUrl(289070, CAP),
  'n-sc2':          `${LOCAL}/n-sc2.jpg`,
  'n-cr':           `${LOCAL}/n-cr.jpg`,
  'n-mc':           `${LOCAL}/n-mc.jpg`,
  'n-palworld':     sharedUrl(1623730, HDR),
  'n-terraria':     sharedUrl(1281930, HDR),
  /* 电竞 */
  'n-kpl':          `${LOCAL}/n-kpl.jpg`,
  'n-lpl':          `${LOCAL}/n-lpl.jpg`,
  'n-vct':          `${LOCAL}/n-vct.jpg`,
  'n-ugc':          `${LOCAL}/n-ugc.png`,
  'n-team':         `${LOCAL}/n-team.png`,
  fallback:         sharedUrl(2410680, CAP),
};

/* ============================================================
 *  兼容导出 — 老组件若在用旧接口也可继续跑
 * ============================================================ */
export const pic = (key) => stripMap[key] || stripMap.fallback;
