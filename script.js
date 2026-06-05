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
  {
    id: 26,
    username: 'ewwmer',
    avatar: 'assets/players/baboabe.png',
    region: 'ASIA',
    title: 'The Rising Star',
    socials: { youtube: '', twitter: '', discord: '' },
    tiers: { sword: 'HT3', axe: 'HT3', mace: 'HT3', crystal: 'HT3', diasmp: 'HT3', smp: 'HT3', pot: 'HT3', netherite: 'HT3', uhc: 'HT3' }
  },
];

let currentGamemode = 'overall';
let currentSort = 'points-desc';
let searchQuery = '';

function calculatePoints(player) {
  return Object.values(player.tiers).reduce((total, tier) => {
    return total + (tierPoints[tier] || 0);
  }, 0);
}

function getAvatarHtml(player) {
  return `<div class="player-avatar fallback">${player.username[0].toUpperCase()}</div>`;
}

function getRegionBadge(region) {
  const cls = region.toLowerCase();
  return `<span class="region-badge ${cls}">${region}</span>`;
}

function getRankBadge(index) {
  if (index === 0) return '<span class="rank-badge gold"><i class="fas fa-crown"></i></span>';
  if (index === 1) return '<span class="rank-badge silver"><i class="fas fa-crown"></i></span>';
  if (index === 2) return '<span class="rank-badge bronze"><i class="fas fa-crown"></i></span>';
  return `<span class="rank-badge default">${index + 1}</span>`;
}

function getTierHtml(tiers) {
  return tierOrder
    .filter(t => tiers[t])
    .map(t => `<span class="tier-badge ${t}">${t}</span>`)
    .join('');
}

function getFilteredAndSortedPlayers() {
  let result = [...players];

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
      tierDisplay = tier
        ? `<span class="tier-badge ${tier}">${gamemodeLabels[currentGamemode]}: ${tier}</span>`
        : '<span class="tier-badge" style="color:var(--text-muted)">N/A</span>';
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
        <td><span class="title-text">${player.title}</span></td>
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
      if (tier) {
        return '<div class="modal-tier-item"><span class="modal-tier-label">' + label + ':</span><span class="modal-tier-value tier-badge ' + tier + '">' + tier + '</span></div>';
      }
      return '<div class="modal-tier-item"><span class="modal-tier-label">' + label + ':</span><span class="modal-tier-value" style="color:var(--text-muted)">N/A</span></div>';
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
    <div class="modal-avatar fallback">${player.username[0].toUpperCase()}</div>
    <h2 class="modal-username">${player.username}</h2>
    <p class="modal-title">${player.title} - ${getRegionBadge(player.region)}</p>
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

  const heroStats = document.querySelectorAll('.stat-number');
  heroStats.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = current + (target > 100 ? '+' : '');
    }, 40);
  });
});
