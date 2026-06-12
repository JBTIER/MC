const tierPoints = {
  HT1: 60, LT1: 45,
  HT2: 30, LT2: 20,
  HT3: 10, LT3: 6,
  HT4: 4,  LT4: 3,
  HT5: 2,  LT5: 1
};

const tierOrder = [
  'HT1','LT1','HT2','LT2','HT3','LT3','HT4','LT4','HT5','LT5'
];

const gamemodeLabels = {
  overall: 'Overall',
  sword: 'Sword',
  axe: 'Axe',
  mace: 'Mace',
  crystal: 'Crystal',
  diasmp: 'DiasMP',
  smp: 'SMP',
  pot: 'Pot',
  netherite: 'Netherite Pot',
  uhc: 'UHC'
};

const players = [
  { id: 1, username: 'imewwmer', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: '', crystal: '', diasmp: '', smp: 'LT3', pot: '', netherite: '', uhc: '' } },
  { id: 2, username: 'fortld', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: '', crystal: 'LT3', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 3, username: '_SLipIn', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: '', crystal: '', diasmp: '', smp: '', pot: 'LT3', netherite: '', uhc: '' } },
  { id: 4, username: 'Moonlorddddd', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: 'LT3', uhc: '' } },
  { id: 5, username: 'Ohcreme', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: 'LT3' } },
  { id: 6, username: 'Itsnotflako', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'LT3', axe: '', mace: '', crystal: '', diasmp: '', smp: 'LT3', pot: '', netherite: '', uhc: '' } },
  { id: 7, username: 'Miloevery4day', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: 'LT3', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 8, username: 'LUFFY_PARADISE', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: 'LT3', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 9, username: 'ry266', region: 'EU', platform: 'Bedrock', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: 'LT3', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: 'LT3' } },
  { id: 10, username: 'ORD Takamura', region: 'ASIA', platform: 'Bedrock', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'LT3', axe: '', mace: '', crystal: '', diasmp: 'LT3', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 11, username: 'UrRev', region: 'ASIA', platform: 'Bedrock', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'LT3', axe: '', mace: '', crystal: '', diasmp: '', smp: 'LT3', pot: '', netherite: 'LT3', uhc: '' } },
  { id: 12, username: 'longhairchinita', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'LT3', axe: '', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 13, username: 'SedralM', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'LT5', axe: '', mace: '', crystal: 'LT3', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 14, username: 'kelv1n_', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'LT3', axe: '', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 15, username: 'DashPixel', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'LT3', axe: 'LT3', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 16, username: 'H4d0gx', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: 'HT4', axe: '', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } },
  { id: 17, username: 'Deadlox', region: 'ASIA', platform: 'Java', socials: { youtube: '', twitter: '', discord: '' }, tiers: { sword: '', axe: '', mace: '', crystal: '', diasmp: '', smp: '', pot: '', netherite: '', uhc: '' } }
];

let currentGamemode = 'overall';
let currentSort = 'points-desc';
let searchQuery = '';
let currentPlatform = 'all';

function calculatePoints(player) {
  return Object.values(player.tiers).reduce((total, tier) => {
    return total + (tierPoints[tier] || 0);
  }, 0);
}

function getAvatarHtml(player, size = 36) {
  return `<img class="player-avatar" src="https://mc-heads.net/avatar/${player.username}/${size}" alt="${player.username}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="player-avatar fallback" style="display:none">${player.username[0].toUpperCase()}</div>`;
}

function getRegionBadge(region) {
  const cls = region.toLowerCase();
  return `<span class="region-badge ${cls}">${region}</span>`;
}

function getPlatformBadge(platform) {
  const icon = platform === 'Java' ? 'fa-cube' : 'fa-mobile-alt';
  return `<span class="platform-badge ${platform.toLowerCase()}"><i class="fas ${icon}"></i> ${platform}</span>`;
}

function getRankBadge(index) {
  if (index === 0) return '<span class="rank-badge gold"><i class="fas fa-crown"></i></span>';
  if (index === 1) return '<span class="rank-badge silver"><i class="fas fa-crown"></i></span>';
  if (index === 2) return '<span class="rank-badge bronze"><i class="fas fa-crown"></i></span>';
  return `<span class="rank-badge default">${index + 1}</span>`;
}

function getTierHtml(tiers) {
  return Object.entries(tiers)
    .filter(([, t]) => t && tierOrder.includes(t))
    .sort(([, a], [, b]) => tierOrder.indexOf(a) - tierOrder.indexOf(b))
    .map(([g, t]) => `<span class="tier-badge ${t}"><img class="kit-icon-xs" src="assets/kits/${g}.svg" alt="" loading="lazy"> ${t}</span>`)
    .join('');
}

function getFilteredAndSortedPlayers() {
  let result = [...players];

  if (currentPlatform !== 'all') {
    result = result.filter(p => p.platform.toLowerCase() === currentPlatform);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(p =>
      p.username.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q)
    );
  }

  switch (currentSort) {
    case 'points-desc':
      result.sort((a, b) => calculatePoints(b) - calculatePoints(a));
      break;
    case 'points-asc':
      result.sort((a, b) => calculatePoints(a) - calculatePoints(b));
      break;
    case 'name-asc':
      result.sort((a, b) => a.username.localeCompare(b.username));
      break;
    case 'name-desc':
      result.sort((a, b) => b.username.localeCompare(a.username));
      break;
    case 'region':
      result.sort((a, b) => a.region.localeCompare(b.region) || calculatePoints(b) - calculatePoints(a));
      break;
  }

  return result;
}

function renderLeaderboard() {
  const tbody = document.getElementById('leaderboardBody');
  const noResults = document.getElementById('noResults');
  const sorted = getFilteredAndSortedPlayers();

  if (sorted.length === 0) {
    tbody.innerHTML = '';
    noResults.classList.add('visible');
    return;
  }
  noResults.classList.remove('visible');

  tbody.innerHTML = sorted.map((player, index) => {
    const points = calculatePoints(player);

    let tierDisplay = '';
    if (currentGamemode === 'overall') {
      tierDisplay = getTierHtml(player.tiers);
    } else {
      const tier = player.tiers[currentGamemode];
      const icon = `<img class="kit-icon-xs" src="assets/kits/${currentGamemode}.svg" alt="" loading="lazy">`;
      tierDisplay = tier
        ? `<span class="tier-badge ${tier}">${icon} ${gamemodeLabels[currentGamemode]}: ${tier}</span>`
        : `<span class="tier-badge" style="color:var(--text-muted)">${icon} N/A</span>`;
    }

    return `
      <tr onclick="openModal(${player.id})">
        <td>${getRankBadge(index)}</td>
        <td>
          <div class="player-cell">
            ${getAvatarHtml(player)}
            <span class="player-name">${player.username}</span>
          </div>
        </td>
        <td>${getRegionBadge(player.region)}</td>
        <td>${getPlatformBadge(player.platform)}</td>
        <td><span class="points-text">${points}</span></td>
        <td>${tierDisplay}</td>
      </tr>
    `;
  }).join('');
}

function openModal(playerId) {
  const player = players.find(p => p.id === playerId);
  if (!player) return;

  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');
  const points = calculatePoints(player);

  const sorted = getFilteredAndSortedPlayers();
  const rank = sorted.findIndex(p => p.id === playerId) + 1;

  let tierItems = Object.keys(gamemodeLabels)
    .filter(g => g !== 'overall')
    .map(g => {
      const tier = player.tiers[g];
      const label = gamemodeLabels[g];
      const icon = '<img class="kit-icon-sm" src="assets/kits/' + g + '.svg" alt="" loading="lazy">';
      if (tier) {
        return '<div class="modal-tier-item">' + icon + '<span class="modal-tier-label">' + label + ':</span><span class="modal-tier-value tier-badge ' + tier + '">' + tier + '</span></div>';
      }
      return '<div class="modal-tier-item">' + icon + '<span class="modal-tier-label">' + label + ':</span><span class="modal-tier-value" style="color:var(--text-muted)">N/A</span></div>';
    }).join('');

  function socialLink(url, platform, icon) {
    if (url) {
      return '<a href="' + url + '" target="_blank" class="modal-social-link ' + platform + '"><i class="' + icon + '"></i> ' + platform.charAt(0).toUpperCase() + platform.slice(1) + '</a>';
    }
    return '<span class="modal-social-link ' + platform + ' disabled"><i class="' + icon + '"></i> ' + platform.charAt(0).toUpperCase() + platform.slice(1) + '</span>';
  }
  const socYt = socialLink(player.socials.youtube, 'youtube', 'fab fa-youtube');
  const socDisc = socialLink(player.socials.discord, 'discord', 'fab fa-discord');
  const socTwt = socialLink(player.socials.twitter, 'twitter', 'fab fa-twitter');

  body.innerHTML = `
    <img class="modal-avatar" src="https://mc-heads.net/avatar/${player.username}/80" alt="${player.username}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="modal-avatar fallback" style="display:none">${player.username[0].toUpperCase()}</div>
    <h2 class="modal-username">${player.username}</h2>
    <p class="modal-title">${getPlatformBadge(player.platform)} ${getRegionBadge(player.region)}</p>
    <div class="modal-meta">
      <div class="modal-meta-item">
        <span class="modal-meta-value">#${rank}</span>
        <span class="modal-meta-label">Rank</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-value">${points}</span>
        <span class="modal-meta-label">Points</span>
      </div>
    </div>
    <div class="modal-tiers">${tierItems}</div>
    <div class="modal-socials">${socYt}${socDisc}${socTwt}</div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function addPlayer(playerData) {
  const maxId = players.reduce((max, p) => Math.max(max, p.id), 0);
  playerData.id = maxId + 1;
  players.push(playerData);
  renderLeaderboard();
}

function removePlayer(playerId) {
  const idx = players.findIndex(p => p.id === playerId);
  if (idx !== -1) {
    players.splice(idx, 1);
    renderLeaderboard();
  }
}

function updatePlayer(playerId, updatedData) {
  const player = players.find(p => p.id === playerId);
  if (player) {
    Object.assign(player, updatedData);
    renderLeaderboard();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hide');
  }, 1200);

  renderLeaderboard();

  document.getElementById('year').textContent = new Date().getFullYear();

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentGamemode = tab.dataset.gamemode;
      renderLeaderboard();
    });
  });

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderLeaderboard();
  });

  const sortSelect = document.getElementById('sortSelect');
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderLeaderboard();
  });

  const platformTabs = document.querySelectorAll('.platform-tab');
  platformTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      platformTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentPlatform = tab.dataset.platform;
      renderLeaderboard();
    });
  });

  const modalOverlay = document.getElementById('modalOverlay');
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const navSearchBtn = document.getElementById('navSearchBtn');
  navSearchBtn.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const navMenuBtn = document.getElementById('navMenuBtn');
  navMenuBtn.addEventListener('click', () => {
    const main = document.querySelector('.main-content');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  const statTargets = {
    statPlayers: players.length,
    statRegions: new Set(players.map(p => p.region)).size,
    statModes: Object.keys(gamemodeLabels).filter(g => g !== 'overall').length
  };
  Object.keys(statTargets).forEach(id => {
    const el = document.getElementById(id);
    const target = statTargets[id];
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const suffix = (id === 'statPlayers' && target > 100) ? '+' : '';
      el.textContent = current + suffix;
    }, 40);
  });
});
