
// ══════════════════════════════════════════════════════════════
//  DATA STORE
// ═══════════════════════════════════════════════════════════════
let currentRole = 'admin';
let currentFilter = 'All';

let rooms = [
  { id:1, bld:"Sunset Apartments",   room:"A-101", floor:1, rent:25000, type:"1BR",    status:"Occupied" },
  { id:2, bld:"Sunset Apartments",   room:"A-102", floor:1, rent:25000, type:"1BR",    status:"Vacant"   },
  { id:3, bld:"Sunset Apartments",   room:"A-203", floor:2, rent:32000, type:"2BR",    status:"Occupied" },
  { id:4, bld:"Westview Heights",    room:"B-101", floor:1, rent:20000, type:"Studio", status:"Vacant"   },
  { id:5, bld:"Westview Heights",    room:"B-103", floor:1, rent:20000, type:"Studio", status:"Occupied" },
  { id:6, bld:"Westview Heights",    room:"B-202", floor:2, rent:28000, type:"1BR",    status:"Occupied" },
  { id:7, bld:"Garden Court",        room:"C-301", floor:3, rent:45000, type:"3BR",    status:"Occupied" },
  { id:8, bld:"Garden Court",        room:"C-302", floor:3, rent:45000, type:"3BR",    status:"Vacant"   },
];

let tenants = [
  { id:1, name:"Amina Okonkwo",  phone:"+254 712 345 678", email:"amina@mail.com",   idNo:"A12345678", room:"A-101", moveIn:"2024-01-15", lease:12, status:"active" },
  { id:2, name:"Brian Mwangi",   phone:"+254 700 111 222", email:"brian@mail.com",   idNo:"B98765432", room:"B-202", moveIn:"2024-03-01", lease:6,  status:"active" },
  { id:3, name:"Cynthia Njeri",  phone:"+254 733 456 789", email:"cynthia@mail.com", idNo:"C11223344", room:"A-203", moveIn:"2023-11-01", lease:24, status:"active" },
  { id:4, name:"David Kamau",    phone:"+254 721 987 654", email:"david@mail.com",   idNo:"D55443322", room:"C-301", moveIn:"2024-02-10", lease:12, status:"active" },
  { id:5, name:"Esther Wanjiku", phone:"+254 710 555 666", email:"esther@mail.com",  idNo:"E66778899", room:"B-103", moveIn:"2024-04-01", lease:12, status:"active" },
];

let payments = [
  { id:1, tenant:"Amina Okonkwo",  room:"A-101", amount:25000, date:"2025-03-01", method:"M-Pesa", status:"Paid",    ref:"MP2503010001" },
  { id:2, tenant:"Brian Mwangi",   room:"B-202", amount:28000, date:"2025-03-03", method:"Bank",   status:"Paid",    ref:"BK2503030002" },
  { id:3, tenant:"Cynthia Njeri",  room:"A-203", amount:32000, date:"2025-03-08", method:"M-Pesa", status:"Paid",    ref:"MP2503080003" },
  { id:4, tenant:"David Kamau",    room:"C-301", amount:45000, date:"2025-03-05", method:"Card",   status:"Paid",    ref:"CD2503050004" },
  { id:5, tenant:"Esther Wanjiku", room:"B-103", amount:20000, date:"2025-03-01", method:"Cash",   status:"Paid",    ref:"CS2503010005" },
  { id:6, tenant:"Amina Okonkwo",  room:"A-101", amount:25000, date:"2025-02-01", method:"M-Pesa", status:"Paid",    ref:"MP2502010006" },
  { id:7, tenant:"Brian Mwangi",   room:"B-202", amount:28000, date:"2025-04-10", method:"—",      status:"Pending", ref:"—" },
  { id:8, tenant:"Esther Wanjiku", room:"B-103", amount:20000, date:"2025-04-12", method:"—",      status:"Overdue", ref:"—" },
];

let maintenance = [
  { id:1, tenant:"Amina Okonkwo",  room:"A-101", issue:"Leaking kitchen tap",        cat:"Plumbing",    date:"2025-03-10", status:"Completed",   pri:"High"   },
  { id:2, tenant:"Cynthia Njeri",  room:"A-203", issue:"Broken window latch",        cat:"Repairs",     date:"2025-03-14", status:"In Progress", pri:"Medium" },
  { id:3, tenant:"Brian Mwangi",   room:"B-202", issue:"Power socket not working",   cat:"Electricity", date:"2025-03-18", status:"Pending",     pri:"High"   },
  { id:4, tenant:"David Kamau",    room:"C-301", issue:"Low water pressure",         cat:"Water",       date:"2025-03-20", status:"Pending",     pri:"Low"    },
  { id:5, tenant:"Esther Wanjiku", room:"B-103", issue:"Door hinge broken",          cat:"Repairs",     date:"2025-03-22", status:"In Progress", pri:"Medium" },
];

let expenses = [
  { id:1, desc:"Water bill – March",          cat:"Water",       amount:8500,  date:"2025-03-05" },
  { id:2, desc:"Electricity – Common areas",  cat:"Electricity", amount:12000, date:"2025-03-05" },
  { id:3, desc:"Security guard salary",       cat:"Security",    amount:20000, date:"2025-03-01" },
  { id:4, desc:"Plumber – A-101 tap repair",  cat:"Repairs",     amount:3500,  date:"2025-03-11" },
  { id:5, desc:"Cleaning service",            cat:"Cleaning",    amount:6000,  date:"2025-03-15" },
];

let messages = [
  { id:1, title:"Water Maintenance Notice",  body:"Water will be off on 25th March from 8AM–2PM for maintenance repairs.", to:"All Tenants", date:"2025-03-20" },
  { id:2, title:"Rent Reminder – April",     body:"This is a reminder that rent for April is due on the 1st of the month.",  to:"All Tenants", date:"2025-03-28" },
];

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
const fmt = n => "KES " + Number(n).toLocaleString();
const today = () => new Date().toISOString().split("T")[0];
const genRef = method => method.replace("-","").slice(0,2).toUpperCase() + Date.now().toString().slice(-8);

function badge(status) {
  const map = {
    "Occupied":    ["rgba(59,130,246,0.15)",   "#3B82F6"],
    "Vacant":      ["rgba(16,185,129,0.12)",   "#10B981"],
    "active":      ["rgba(16,185,129,0.12)",   "#10B981"],
    "Paid":        ["rgba(16,185,129,0.12)",   "#10B981"],
    "Pending":     ["rgba(245,158,11,0.12)",   "#F59E0B"],
    "Overdue":     ["rgba(239,68,68,0.12)",    "#EF4444"],
    "In Progress": ["rgba(139,92,246,0.12)",   "#8B5CF6"],
    "Completed":   ["rgba(16,185,129,0.12)",   "#10B981"],
    "High":        ["rgba(239,68,68,0.12)",    "#EF4444"],
    "Medium":      ["rgba(245,158,11,0.12)",   "#F59E0B"],
    "Low":         ["rgba(59,130,246,0.12)",   "#3B82F6"],
  };
  const [bg, color] = map[status] || ["rgba(100,116,139,0.12)", "#64748B"];
  return `<span class="badge" style="background:${bg};color:${color};"><span class="badge-dot" style="background:${color};"></span>${status}</span>`;
}

function methodIcon(m) {
  const icons = { "M-Pesa":"📱", "Bank":"🏦", "Card":"💳", "Cash":"💵" };
  return icons[m] || "—";
}

// ═══════════════════════════════════════════════════════════════
//  LOGIN / LOGOUT
// ═══════════════════════════════════════════════════════════════
let selectedRole = 'admin';

function setRole(r) {
  selectedRole = r;
  document.getElementById('role-admin').classList.toggle('active', r === 'admin');
  document.getElementById('role-tenant').classList.toggle('active', r === 'tenant');
  document.getElementById('login-email').value = r === 'admin' ? 'admin@propnest.co.ke' : 'tenant@mail.com';
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const err   = document.getElementById('login-error');

  if (!email || !pass) { showErr('Please fill in all fields.'); return; }
  if (pass.length < 6) { showErr('Password must be at least 6 characters.'); return; }

  err.style.display = 'none';
  currentRole = selectedRole;

  // Show/hide admin-only nav items
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = currentRole === 'admin' ? 'flex' : 'none';
  });

  document.getElementById('sb-name').textContent = currentRole === 'admin' ? 'Admin' : 'Amina Okonkwo';
  document.getElementById('sb-role').textContent = currentRole === 'admin' ? 'Landlord · landlord@propnest.co.ke' : 'Tenant · Room A-101';

  document.getElementById('login-page').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  const startPage = currentRole === 'admin' ? 'dashboard' : 'portal';
  goPage(startPage, document.querySelector(`[data-page="${startPage}"]`));
  initAll();
}

function showErr(msg) {
  const el = document.getElementById('login-error');
  el.textContent = msg;
  el.style.display = 'block';
}

function doLogout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('login-pass').value = '';
}

// ═══════════════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════════════
const pageTitles = {
  dashboard:"Dashboard", apartments:"Apartment Management", tenants:"Tenant Management",
  payments:"Rent Payments", maintenance:"Maintenance Requests", expenses:"Expense Tracking",
  reports:"Reports & Analytics", messages:"Messages & Announcements", portal:"Tenant Portal"
};

function goPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  if (btn) btn.classList.add('active');
  document.getElementById('topbar-title').textContent = pageTitles[id] || id;
  closeNotif();
  refreshPage(id);
}

function refreshPage(id) {
  if (id === 'apartments')  renderRooms();
  if (id === 'tenants')     renderTenants();
  if (id === 'payments')    renderPayments();
  if (id === 'maintenance') renderMaint();
  if (id === 'expenses')    renderExpenses();
  if (id === 'reports')     renderReports();
  if (id === 'messages')    renderMessages();
  if (id === 'portal')      renderPortal();
}

// ═══════════════════════════════════════════════════════════════
//  NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════
function toggleNotif(e) {
  e.stopPropagation();
  document.getElementById('notif-dropdown').classList.toggle('open');
}
function closeNotif() {
  document.getElementById('notif-dropdown').classList.remove('open');
}
document.addEventListener('click', closeNotif);

// ═══════════════════════════════════════════════════════════════
//  PANELS (show/hide forms)
// ═══════════════════════════════════════════════════════════════
function togglePanel(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ═══════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════
function initDashboard() {
  buildChart('dash-chart');
  buildOccGrid();
}

const chartData = [
  { month:"Oct", income:115000, expense:42000 },
  { month:"Nov", income:128000, expense:38000 },
  { month:"Dec", income:120000, expense:55000 },
  { month:"Jan", income:135000, expense:40000 },
  { month:"Feb", income:150000, expense:46000 },
  { month:"Mar", income:150000, expense:50000 },
];

function buildChart(containerId) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const maxIncome = Math.max(...chartData.map(d => d.income));
  wrap.innerHTML = chartData.map(d => `
    <div class="chart-col">
      <div class="chart-bars-inner">
        <div class="bar bar-income" style="height:${(d.income/maxIncome*96).toFixed(1)}px"></div>
        <div class="bar bar-expense" style="height:${(d.expense/maxIncome*96).toFixed(1)}px"></div>
      </div>
      <div class="chart-label">${d.month}</div>
    </div>
  `).join('');
}

function buildOccGrid() {
  const wrap = document.getElementById('occ-grid');
  if (!wrap) return;
  wrap.innerHTML = rooms.map(r => `
    <div class="occ-cell ${r.status.toLowerCase()}" title="${r.room} – ${r.status}">
      <div class="occ-room" style="color:${r.status==='Occupied'?'var(--accent)':'var(--green)'}">${r.room}</div>
      <div class="occ-ico">${r.status==='Occupied'?'🔑':'✅'}</div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
//  APARTMENTS
// ═══════════════════════════════════════════════════════════════
function renderRooms() {
  const buildings = [...new Set(rooms.map(r => r.bld))];
  document.getElementById('apt-sub').textContent =
    `${rooms.length} rooms across ${buildings.length} buildings`;

  document.getElementById('apt-buildings').innerHTML = buildings.map(bld => {
    const bRooms = rooms.filter(r => r.bld === bld);
    const occ = bRooms.filter(r => r.status === 'Occupied').length;
    const rows = bRooms.map(r => `
      <tr>
        <td><strong>${r.room}</strong></td>
        <td>${r.floor}</td>
        <td>${r.type}</td>
        <td style="font-weight:600;">${fmt(r.rent)}</td>
        <td>${badge(r.status)}</td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button class="btn btn-sm btn-ghost" onclick="toggleRoomStatus(${r.id})">${r.status==='Occupied'?'Mark Vacant':'Mark Occupied'}</button>
            <button class="btn btn-sm btn-danger" onclick="deleteRoom(${r.id})">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
    return `
      <div class="card fade-up" style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <div class="syne" style="font-size:16px;font-weight:700;">🏢 ${bld}</div>
          <div style="font-size:12px;color:var(--muted);">${occ}/${bRooms.length} occupied</div>
        </div>
        <div class="table-wrap">
          <table><thead><tr><th>Room</th><th>Floor</th><th>Type</th><th>Rent/mo</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>${rows}</tbody></table>
        </div>
      </div>
    `;
  }).join('');
}

function addRoom() {
  const bld    = document.getElementById('f-apt-bld').value.trim();
  const room   = document.getElementById('f-apt-room').value.trim();
  const floor  = parseInt(document.getElementById('f-apt-floor').value) || 1;
  const rent   = parseFloat(document.getElementById('f-apt-rent').value);
  const type   = document.getElementById('f-apt-type').value;
  const status = document.getElementById('f-apt-status').value;
  if (!bld || !room || !rent) return alert('Please fill Building, Room Number and Rent.');
  rooms.push({ id: Date.now(), bld, room, floor, rent, type, status });
  ['f-apt-bld','f-apt-room','f-apt-rent'].forEach(id => document.getElementById(id).value = '');
  togglePanel('apt-form');
  renderRooms();
}

function toggleRoomStatus(id) {
  const r = rooms.find(r => r.id === id);
  if (r) r.status = r.status === 'Occupied' ? 'Vacant' : 'Occupied';
  renderRooms();
}

function deleteRoom(id) {
  if (!confirm('Delete this room?')) return;
  rooms = rooms.filter(r => r.id !== id);
  renderRooms();
}

// ═══════════════════════════════════════════════════════════════
//  TENANTS
// ═══════════════════════════════════════════════════════════════
function renderTenants() {
  const q = (document.getElementById('tenant-search').value || '').toLowerCase();
  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(q) || t.room.toLowerCase().includes(q) || t.email.toLowerCase().includes(q)
  );
  const tbody = document.getElementById('tenant-tbody');
  const empty = document.getElementById('tenant-empty');

  if (filtered.length === 0) { tbody.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  tbody.innerHTML = filtered.map(t => `
    <tr>
      <td><div style="font-weight:600;">${t.name}</div><div style="font-size:11px;color:var(--muted);">${t.email}</div></td>
      <td>${t.phone}</td>
      <td><span style="font-weight:700;color:var(--accent);">${t.room}</span></td>
      <td style="color:var(--muted);font-size:13px;">${t.moveIn}</td>
      <td>${t.lease} mo</td>
      <td style="color:var(--muted);font-size:12px;">${t.idNo}</td>
      <td>${badge(t.status)}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteTenant(${t.id})">Remove</button></td>
    </tr>
  `).join('');
}

function addTenant() {
  const name   = document.getElementById('f-t-name').value.trim();
  const phone  = document.getElementById('f-t-phone').value.trim();
  const email  = document.getElementById('f-t-email').value.trim();
  const idNo   = document.getElementById('f-t-id').value.trim();
  const room   = document.getElementById('f-t-room').value.trim();
  const moveIn = document.getElementById('f-t-movein').value;
  const lease  = parseInt(document.getElementById('f-t-lease').value) || 12;
  if (!name || !email) return alert('Name and Email are required.');
  tenants.push({ id: Date.now(), name, phone, email, idNo, room, moveIn, lease, status:'active' });
  ['f-t-name','f-t-phone','f-t-email','f-t-id','f-t-room','f-t-movein'].forEach(id => document.getElementById(id).value = '');
  togglePanel('tenant-form');
  renderTenants();
}

function deleteTenant(id) {
  if (!confirm('Remove this tenant?')) return;
  tenants = tenants.filter(t => t.id !== id);
  renderTenants();
}

// ═══════════════════════════════════════════════════════════════
//  PAYMENTS
// ═══════════════════════════════════════════════════════════════
function renderPayments() {
  // Stats
  const paid    = payments.filter(p => p.status === 'Paid').reduce((s,p) => s+p.amount, 0);
  const pending = payments.filter(p => p.status === 'Pending').length;
  const overdue = payments.filter(p => p.status === 'Overdue').length;
  document.getElementById('pay-stats').innerHTML = `
    <div class="card stat-card fade-up d1">
      <div><div class="stat-label">Total Collected</div><div class="stat-value" style="color:var(--green);font-size:20px;">${fmt(paid)}</div></div>
      <div class="stat-icon" style="background:rgba(16,185,129,0.12);">💰</div>
    </div>
    <div class="card stat-card fade-up d2">
      <div><div class="stat-label">Pending</div><div class="stat-value" style="color:var(--gold);">${pending}</div></div>
      <div class="stat-icon" style="background:rgba(245,158,11,0.12);">⏳</div>
    </div>
    <div class="card stat-card fade-up d3">
      <div><div class="stat-label">Overdue</div><div class="stat-value" style="color:var(--red);">${overdue}</div></div>
      <div class="stat-icon" style="background:rgba(239,68,68,0.12);">🚨</div>
    </div>
  `;

  const filtered = currentFilter === 'All' ? payments : payments.filter(p => p.status === currentFilter);
  const tbody = document.getElementById('pay-tbody');
  const empty = document.getElementById('pay-empty');

  if (filtered.length === 0) { tbody.innerHTML = ''; empty.style.display = 'block'; }
  else {
    empty.style.display = 'none';
    tbody.innerHTML = filtered.map(p => {
      const amtColor = p.status==='Paid' ? 'var(--green)' : p.status==='Overdue' ? 'var(--red)' : 'var(--gold)';
      return `
        <tr>
          <td style="font-weight:600;">${p.tenant}</td>
          <td>${p.room}</td>
          <td style="font-weight:700;color:${amtColor};">${fmt(p.amount)}</td>
          <td style="color:var(--muted);font-size:13px;">${p.date}</td>
          <td><span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;padding:3px 8px;border-radius:6px;background:var(--surface);">${methodIcon(p.method)} ${p.method}</span></td>
          <td style="font-size:12px;color:var(--muted);font-family:monospace;">${p.ref}</td>
          <td>${badge(p.status)}</td>
        </tr>
      `;
    }).join('');
  }

  const totalPaid = filtered.filter(p => p.status==='Paid').reduce((s,p) => s+p.amount, 0);
  document.getElementById('pay-total').innerHTML =
    `Filtered total paid: <strong style="color:var(--green);">${fmt(totalPaid)}</strong>`;
}

function filterPayments(status, btn) {
  currentFilter = status;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderPayments();
}

function addPayment() {
  const tenant = document.getElementById('f-p-tenant').value.trim();
  const room   = document.getElementById('f-p-room').value.trim();
  const amount = parseFloat(document.getElementById('f-p-amount').value);
  const method = document.getElementById('f-p-method').value;
  if (!tenant || !amount) return alert('Tenant name and amount are required.');
  payments.push({ id:Date.now(), tenant, room, amount, date:today(), method, status:'Paid', ref:genRef(method) });
  ['f-p-tenant','f-p-room','f-p-amount'].forEach(id => document.getElementById(id).value = '');
  togglePanel('pay-form');
  renderPayments();
}

// ═══════════════════════════════════════════════════════════════
//  MAINTENANCE
// ═══════════════════════════════════════════════════════════════
function renderMaint() {
  const counts = { Pending:0, 'In Progress':0, Completed:0 };
  maintenance.forEach(m => { if (counts[m.status] !== undefined) counts[m.status]++; });

  document.getElementById('maint-stats').innerHTML = `
    <div class="card stat-card fade-up d1">
      <div><div class="stat-label">Pending</div><div class="stat-value" style="color:var(--gold);">${counts.Pending}</div></div>
      <div class="stat-icon" style="background:rgba(245,158,11,0.12);">🕐</div>
    </div>
    <div class="card stat-card fade-up d2">
      <div><div class="stat-label">In Progress</div><div class="stat-value" style="color:var(--purple);">${counts['In Progress']}</div></div>
      <div class="stat-icon" style="background:rgba(139,92,246,0.12);">🔨</div>
    </div>
    <div class="card stat-card fade-up d3">
      <div><div class="stat-label">Completed</div><div class="stat-value" style="color:var(--green);">${counts.Completed}</div></div>
      <div class="stat-icon" style="background:rgba(16,185,129,0.12);">✅</div>
    </div>
  `;

  document.getElementById('maint-tbody').innerHTML = maintenance.map(m => {
    const canAdvance = m.status !== 'Completed';
    const btnLabel   = m.status === 'Pending' ? 'Start' : 'Complete';
    return `
      <tr>
        <td style="font-weight:600;">${m.tenant}</td>
        <td>${m.room}</td>
        <td style="max-width:200px;">${m.issue}</td>
        <td style="color:var(--muted);">${m.cat}</td>
        <td style="color:var(--muted);font-size:12px;">${m.date}</td>
        <td>${badge(m.pri)}</td>
        <td>${badge(m.status)}</td>
        <td>${canAdvance ? `<button class="btn btn-sm btn-success" onclick="advanceMaint(${m.id})">${btnLabel}</button>` : ''}</td>
      </tr>
    `;
  }).join('');
}

function addMaint() {
  const tenant = document.getElementById('f-m-tenant').value.trim();
  const room   = document.getElementById('f-m-room').value.trim();
  const issue  = document.getElementById('f-m-issue').value.trim();
  const cat    = document.getElementById('f-m-cat').value;
  const pri    = document.getElementById('f-m-pri').value;
  if (!tenant || !issue) return alert('Tenant name and issue are required.');
  maintenance.push({ id:Date.now(), tenant, room, issue, cat, pri, date:today(), status:'Pending' });
  ['f-m-tenant','f-m-room','f-m-issue'].forEach(id => document.getElementById(id).value = '');
  togglePanel('maint-form');
  renderMaint();
}

function advanceMaint(id) {
  const m = maintenance.find(m => m.id === id);
  if (!m) return;
  m.status = m.status === 'Pending' ? 'In Progress' : 'Completed';
  renderMaint();
}

// ═══════════════════════════════════════════════════════════════
//  EXPENSES
// ═══════════════════════════════════════════════════════════════
function renderExpenses() {
  const total = expenses.reduce((s,e) => s+e.amount, 0);

  // Categories
  const cats = {};
  expenses.forEach(e => { cats[e.cat] = (cats[e.cat]||0) + e.amount; });
  document.getElementById('exp-cats').innerHTML = `
    <div class="syne" style="font-weight:700;margin-bottom:16px;">By Category</div>
    ${Object.entries(cats).map(([cat,amt]) => `
      <div class="cat-row">
        <div class="cat-info"><span>${cat}</span><span style="color:var(--gold);font-weight:600;">${fmt(amt)}</span></div>
        <div class="cat-bar"><div class="cat-fill" style="width:${(amt/total*100).toFixed(1)}%"></div></div>
      </div>
    `).join('')}
    <div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--border);">
      <div style="font-size:12px;color:var(--muted);">Total Expenses</div>
      <div class="syne" style="font-weight:800;font-size:22px;color:var(--gold);">${fmt(total)}</div>
    </div>
  `;

  document.getElementById('exp-sub').textContent = `${expenses.length} expenses · Total: ${fmt(total)}`;

  document.getElementById('exp-tbody').innerHTML = expenses.map(e => `
    <tr>
      <td>${e.desc}</td>
      <td><span style="font-size:12px;padding:3px 8px;border-radius:6px;background:var(--surface);color:var(--muted);">${e.cat}</span></td>
      <td style="font-weight:600;color:var(--gold);">${fmt(e.amount)}</td>
      <td style="color:var(--muted);font-size:12px;">${e.date}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteExpense(${e.id})">×</button></td>
    </tr>
  `).join('');
}

function addExpense() {
  const desc   = document.getElementById('f-e-desc').value.trim();
  const cat    = document.getElementById('f-e-cat').value;
  const amount = parseFloat(document.getElementById('f-e-amount').value);
  if (!desc || !amount) return alert('Description and amount are required.');
  expenses.push({ id:Date.now(), desc, cat, amount, date:today() });
  ['f-e-desc','f-e-amount'].forEach(id => document.getElementById(id).value = '');
  togglePanel('exp-form');
  renderExpenses();
}

function deleteExpense(id) {
  if (!confirm('Delete this expense?')) return;
  expenses = expenses.filter(e => e.id !== id);
  renderExpenses();
}

// ═══════════════════════════════════════════════════════════════
//  REPORTS
// ═══════════════════════════════════════════════════════════════
function renderReports() {
  const totalIncome  = payments.filter(p => p.status==='Paid').reduce((s,p) => s+p.amount, 0);
  const totalExpense = expenses.reduce((s,e) => s+e.amount, 0);
  const netProfit    = totalIncome - totalExpense;

  document.getElementById('rep-stats').innerHTML = `
    <div class="card stat-card fade-up d1">
      <div><div class="stat-label">Total Income</div><div class="stat-value" style="color:var(--green);font-size:20px;">${fmt(totalIncome)}</div></div>
      <div class="stat-icon" style="background:rgba(16,185,129,0.12);">📈</div>
    </div>
    <div class="card stat-card fade-up d2">
      <div><div class="stat-label">Total Expenses</div><div class="stat-value" style="color:var(--red);font-size:20px;">${fmt(totalExpense)}</div></div>
      <div class="stat-icon" style="background:rgba(239,68,68,0.12);">📉</div>
    </div>
    <div class="card stat-card fade-up d3">
      <div><div class="stat-label">Net Profit</div><div class="stat-value" style="color:var(--accent);font-size:20px;">${fmt(netProfit)}</div></div>
      <div class="stat-icon" style="background:rgba(59,130,246,0.12);">💹</div>
    </div>
  `;

  buildChart('rep-chart');

  const outstanding = payments.filter(p => p.status !== 'Paid');
  document.getElementById('rep-outstanding').innerHTML = outstanding.length === 0
    ? '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px;">No outstanding payments 🎉</td></tr>'
    : outstanding.map(p => `
        <tr>
          <td style="font-weight:600;">${p.tenant}</td>
          <td>${p.room}</td>
          <td style="font-weight:700;color:${p.status==='Overdue'?'var(--red)':'var(--gold)'};">${fmt(p.amount)}</td>
          <td style="color:var(--muted);">${p.date}</td>
          <td>${badge(p.status)}</td>
        </tr>
      `).join('');
}

// ═══════════════════════════════════════════════════════════════
//  MESSAGES
// ═══════════════════════════════════════════════════════════════
function renderMessages() {
  document.getElementById('msg-sub').textContent = `${messages.length} announcement${messages.length!==1?'s':''} sent`;

  document.getElementById('msg-list').innerHTML = messages.length === 0
    ? '<div class="empty">No announcements yet.</div>'
    : messages.map(m => `
        <div class="card ann-card fade-up">
          <div class="ann-head">
            <div class="ann-title">${m.title}</div>
            <div class="ann-date">${m.date}</div>
          </div>
          <div class="ann-body">${m.body}</div>
          <div class="ann-footer">To: ${m.to} &nbsp;·&nbsp; <span style="color:var(--green);">✓ Delivered</span></div>
        </div>
      `).join('');
}

function addMessage() {
  const title = document.getElementById('f-msg-title').value.trim();
  const body  = document.getElementById('f-msg-body').value.trim();
  const to    = document.getElementById('f-msg-to').value;
  if (!title || !body) return alert('Title and message body are required.');
  messages.unshift({ id:Date.now(), title, body, to, date:today() });
  document.getElementById('f-msg-title').value = '';
  document.getElementById('f-msg-body').value  = '';
  togglePanel('msg-form');
  renderMessages();
}

// ═══════════════════════════════════════════════════════════════
//  TENANT PORTAL
// ═══════════════════════════════════════════════════════════════
function renderPortal() {
  const myPays = payments.filter(p => p.tenant === 'Amina Okonkwo');
  document.getElementById('portal-payments').innerHTML = myPays.length === 0
    ? '<div class="empty">No payments yet.</div>'
    : myPays.map(p => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
          <div>
            <div style="font-weight:600;font-size:13px;">${p.date}</div>
            <div style="font-size:11px;color:var(--muted);">${methodIcon(p.method)} ${p.method} · ${p.ref}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700;color:${p.status==='Paid'?'var(--green)':'var(--gold)'};">${fmt(p.amount)}</div>
            ${badge(p.status)}
          </div>
        </div>
      `).join('');

  const myMaint = maintenance.filter(m => m.tenant === 'Amina Okonkwo');
  document.getElementById('portal-maint').innerHTML = myMaint.length === 0
    ? '<div class="empty">No requests yet.</div>'
    : myMaint.map(m => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
          <div>
            <div style="font-weight:600;font-size:13px;">${m.issue}</div>
            <div style="font-size:11px;color:var(--muted);">${m.cat} · ${m.date}</div>
          </div>
          ${badge(m.status)}
        </div>
      `).join('');
}

function submitPortalMaint() {
  const issue = document.getElementById('f-pm-issue').value.trim();
  const cat   = document.getElementById('f-pm-cat').value;
  if (!issue) return alert('Please describe the issue.');
  maintenance.push({ id:Date.now(), tenant:'Amina Okonkwo', room:'A-101', issue, cat, pri:'Medium', date:today(), status:'Pending' });
  document.getElementById('f-pm-issue').value = '';
  togglePanel('portal-maint-form');
  renderPortal();
}

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
function initAll() {
  initDashboard();
  renderRooms();
  renderTenants();
  renderPayments();
  renderMaint();
  renderExpenses();
  renderReports();
  renderMessages();
  renderPortal();
}

// Allow pressing Enter on login
document.getElementById('login-pass').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});
