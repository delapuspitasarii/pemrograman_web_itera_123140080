import { TaskItem, ScheduleItem, NoteItem } from './Models.js';

export class DashboardApp {
  #TASKS_KEY = 'itera_dela_tasks';
  #SCHED_KEY = 'itera_dela_sched';
  #NOTES_KEY = 'itera_dela_notes';
  #THEME_KEY = 'itera_dela_theme';

  constructor() {
    this.tasks = [];
    this.schedules = [];
    this.notes = [];
    this.currentTaskFilter = 'all';
    this.sortBy = 'deadline';
    this.searchQuery = '';
    this.editingTaskId = null;

    // Cache DOM Elements
    this.taskListEl = document.getElementById('taskList');
    this.schedListEl = document.getElementById('scheduleList');
    this.noteListEl = document.getElementById('noteList');
    this.weatherEl = document.getElementById('weatherContainer');
    this.quoteEl = document.getElementById('quoteContainer');
    this.progressBarEl = document.getElementById('progressBar');
    this.progressTextEl = document.getElementById('progressText');
  }

  init = async () => {
    this.initTheme();
    this.loadDataFromStorage();
    this.setupEventListeners();
    this.setupFormTabs();

    await Promise.all([
      this.fetchWeather(),
      this.fetchQuote()
    ]);

    this.renderAll();
  };

  // --- MANAJEMEN TEMA ---
  initTheme = () => {
    const savedTheme = localStorage.getItem(this.#THEME_KEY) || 'light';
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
  };

  toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(this.#THEME_KEY, isDark ? 'dark' : 'light');
  };

  // --- ASYNC API FETCHING ---
  fetchWeather = async () => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true';
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network Error');
      const { current_weather } = await res.json();
      this.weatherEl.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-3xl font-extrabold text-sky-600 dark:text-sky-400">${current_weather.temperature}°C</span>
          <div class="text-right text-xs text-slate-500 dark:text-slate-400">
            <p>🌬️ Kecepatan Angin</p>
            <p class="font-semibold text-slate-700 dark:text-slate-200">${current_weather.windspeed} km/h</p>
          </div>
        </div>
      `;
    } catch {
      this.weatherEl.innerHTML = `<p class="text-xs text-red-400">Gagal memuat cuaca ITERA</p>`;
    }
  };

  fetchQuote = async () => {
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      const { quote, author } = await res.json();
      this.quoteEl.innerHTML = `"${quote}" — <span class="font-semibold">${author}</span>`;
    } catch {
      this.quoteEl.innerHTML = `"Tetap berjuang Mahasiswa ITERA!" — <span class="font-semibold">ITERA Bot</span>`;
    }
  };

  // --- LOCALSTORAGE & PENGELOLAAN DATA ---
  loadDataFromStorage = () => {
    const rawTasks = JSON.parse(localStorage.getItem(this.#TASKS_KEY) || '[]');
    const rawSched = JSON.parse(localStorage.getItem(this.#SCHED_KEY) || '[]');
    const rawNotes = JSON.parse(localStorage.getItem(this.#NOTES_KEY) || '[]');

    this.tasks = rawTasks.length ? rawTasks.map(t => new TaskItem({ ...t })) : [
      new TaskItem({ title: 'Laporan Praktikum Pemweb ES6+', category: 'Praktikum', priority: 'Tinggi', deadline: '2026-10-17' }),
      new TaskItem({ title: 'Kuis Struktur Data', category: 'Kuis', priority: 'Sedang', deadline: '2026-10-22' })
    ];

    this.schedules = rawSched.length ? rawSched.map(s => new ScheduleItem({ ...s })) : [
      new ScheduleItem({ title: 'Pemrograman Web', day: 'Senin', mode: 'Luring', time: '08:00 - 10:00', room: 'GKU 1' }),
      new ScheduleItem({ title: 'Sistem Operasi', day: 'Rabu', mode: 'Daring', time: '13:00 - 15:00', room: 'Zoom' })
    ];

    this.notes = rawNotes.length ? rawNotes.map(n => new NoteItem({ ...n })) : [
      new NoteItem({ title: 'Ide Proyek Akhir', content: 'Pengembangan Personal Dashboard dengan Tailwind & ES6 Modules' })
    ];

    this.saveData();
  };

  saveData = () => {
    localStorage.setItem(this.#TASKS_KEY, JSON.stringify(this.tasks.map(t => t.toJSON())));
    localStorage.setItem(this.#SCHED_KEY, JSON.stringify(this.schedules.map(s => s.toJSON())));
    localStorage.setItem(this.#NOTES_KEY, JSON.stringify(this.notes.map(n => n.toJSON())));
  };

  // --- METODE RENDERING ---
  renderAll = () => {
    this.renderTasks();
    this.renderSchedules();
    this.renderNotes();
    this.updateProgress();
  };

  updateProgress = () => {
    if (!this.tasks.length) {
      this.progressBarEl.style.width = '0%';
      this.progressTextEl.innerText = '0% Selesai';
      return;
    }
    const completed = this.tasks.filter(t => t.completed).length;
    const percentage = Math.round((completed / this.tasks.length) * 100);
    this.progressBarEl.style.width = `${percentage}%`;
    this.progressTextEl.innerText = `${percentage}% Selesai`;
  };

  renderTasks = () => {
    let filtered = this.tasks.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      if (this.currentTaskFilter === 'active') return !t.completed && matchSearch;
      if (this.currentTaskFilter === 'completed') return t.completed && matchSearch;
      return matchSearch;
    });

    filtered.sort((a, b) => {
      if (this.sortBy === 'priority') {
        const pOrder = { 'Tinggi': 1, 'Sedang': 2, 'Rendah': 3 };
        return pOrder[a.priority] - pOrder[b.priority];
      }
      return new Date(a.deadline) - new Date(b.deadline);
    });

    document.getElementById('taskStats').innerText = `Total: ${this.tasks.length} | Belum Selesai: ${this.tasks.filter(t => !t.completed).length}`;

    if (!filtered.length) {
      this.taskListEl.innerHTML = `<p class="text-center text-slate-400 py-6 text-xs">Tidak ada tugas ditemukan.</p>`;
      return;
    }

    this.taskListEl.innerHTML = filtered.map(({ id, title, category, priority, deadline, completed }) => {
      const pColor = priority === 'Tinggi' ? 'text-red-500 bg-red-50 dark:bg-red-950/30' : priority === 'Sedang' ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30';

      return `
        <div class="task-card ${completed ? 'task-completed' : ''} bg-slate-50 dark:bg-slate-700/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 truncate">
            <input type="checkbox" ${completed ? 'checked' : ''} data-id="${id}" class="task-toggle w-4 h-4 rounded text-sky-600 cursor-pointer">
            <div class="truncate">
              <h3 class="task-title text-sm font-semibold truncate">${title}</h3>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${pColor}">${priority}</span>
                <span class="text-[10px] bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded-full">${category}</span>
                <span class="text-xs text-slate-400">📅 ${deadline}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button data-id="${id}" class="task-edit p-1 text-slate-400 hover:text-sky-600" title="Edit Tugas">✏️</button>
            <button data-id="${id}" class="task-del p-1 text-slate-400 hover:text-red-600" title="Hapus Tugas">🗑️</button>
          </div>
        </div>
      `;
    }).join('');
  };

  renderSchedules = () => {
    const filtered = this.schedules.filter(s => s.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    if (!filtered.length) {
      this.schedListEl.innerHTML = `<p class="text-slate-400 text-xs py-4 text-center">Jadwal kosong.</p>`;
      return;
    }
    this.schedListEl.innerHTML = filtered.map(({ id, title, day, mode, time, room }) => {
      const modeStyle = mode === 'Daring' 
        ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' 
        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';

      return `
        <div class="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 flex justify-between items-center text-xs">
          <div>
            <div class="flex items-center gap-2">
              <p class="font-bold text-slate-800 dark:text-slate-200">${title}</p>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${modeStyle}">${mode || 'Luring'}</span>
            </div>
            <p class="text-slate-400 mt-0.5">${day} | ${time} (${room})</p>
          </div>
          <button data-id="${id}" class="sched-del text-slate-400 hover:text-red-500">🗑️</button>
        </div>
      `;
    }).join('');
  };

  renderNotes = () => {
    const filtered = this.notes.filter(n => n.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || n.content.toLowerCase().includes(this.searchQuery.toLowerCase()));
    if (!filtered.length) {
      this.noteListEl.innerHTML = `<p class="text-slate-400 text-xs py-4 text-center">Catatan kosong.</p>`;
      return;
    }
    this.noteListEl.innerHTML = filtered.map(({ id, title, content, date }) => `
      <div class="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 text-xs space-y-1">
        <div class="flex justify-between font-bold">
          <span class="text-slate-800 dark:text-slate-200">${title}</span>
          <button data-id="${id}" class="note-del text-slate-400 hover:text-red-500">🗑️</button>
        </div>
        <p class="text-slate-500 dark:text-slate-300">${content}</p>
        <span class="text-[10px] text-slate-400 block">${date}</span>
      </div>
    `).join('');
  };

  // --- MANAJEMEN TAB & FORM ---
  switchFormTab = (targetTabId) => {
    const tabs = {
      tabTaskForm: document.getElementById('taskForm'),
      tabScheduleForm: document.getElementById('scheduleForm'),
      tabNoteForm: document.getElementById('noteForm')
    };

    Object.keys(tabs).forEach(tId => {
      const btn = document.getElementById(tId);
      if (tId === targetTabId) {
        btn.className = 'flex-1 py-2 text-sky-600 border-b-2 border-sky-600 font-bold';
        tabs[tId].classList.remove('hidden');
      } else {
        btn.className = 'flex-1 py-2 text-slate-400 hover:text-slate-600';
        tabs[tId].classList.add('hidden');
      }
    });
  };

  setupFormTabs = () => {
    ['tabTaskForm', 'tabScheduleForm', 'tabNoteForm'].forEach(tabId => {
      document.getElementById(tabId)?.addEventListener('click', () => this.switchFormTab(tabId));
    });
  };

  resetTaskForm = () => {
    this.editingTaskId = null;
    document.getElementById('taskForm')?.reset();
    document.getElementById('taskSubmitBtn').innerText = 'Simpan Tugas';
    document.getElementById('taskCancelBtn')?.classList.add('hidden');
  };

  setupEventListeners = () => {
    document.getElementById('themeToggle')?.addEventListener('click', this.toggleTheme);

    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderAll();
    });

    // Form Submit Tugas
    document.getElementById('taskForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('taskTitle').value.trim();
      const category = document.getElementById('taskCategory').value;
      const priority = document.getElementById('taskPriority').value;
      const deadline = document.getElementById('taskDeadline').value;

      if (!title || !deadline) return;

      if (this.editingTaskId) {
        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) task.updateDetails({ title, category, priority, deadline });
      } else {
        this.tasks = [new TaskItem({ title, category, priority, deadline }), ...this.tasks];
      }

      this.saveData();
      this.resetTaskForm();
      this.renderAll();
    });

    // Tombol Batal Edit
    document.getElementById('taskCancelBtn')?.addEventListener('click', () => {
      this.resetTaskForm();
    });

    // Form Submit Jadwal
    document.getElementById('scheduleForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('schedTitle').value.trim();
      const day = document.getElementById('schedDay').value;
      const mode = document.getElementById('schedMode').value;
      const time = document.getElementById('schedTime').value.trim();
      const room = document.getElementById('schedRoom').value.trim();

      this.schedules.push(new ScheduleItem({ title, day, mode, time, room }));
      this.saveData();
      this.renderSchedules();
      e.target.reset();
    });

    // Form Submit Catatan
    document.getElementById('noteForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('noteTitle').value.trim();
      const content = document.getElementById('noteContent').value.trim();

      this.notes.unshift(new NoteItem({ title, content }));
      this.saveData();
      this.renderNotes();
      e.target.reset();
    });

    // Event Delegation untuk Daftar Tugas (Toggle, Edit, Delete)
    this.taskListEl.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.task-toggle');
      const delBtn = e.target.closest('.task-del');
      const editBtn = e.target.closest('.task-edit');

      if (toggleBtn) {
        const id = toggleBtn.dataset.id;
        this.tasks.find(t => t.id === id)?.toggleComplete();
        this.saveData();
        this.renderAll();
      } else if (delBtn) {
        const id = delBtn.dataset.id;
        this.tasks = this.tasks.filter(t => t.id !== id);
        if (this.editingTaskId === id) this.resetTaskForm();
        this.saveData();
        this.renderAll();
      } else if (editBtn) {
        const id = editBtn.dataset.id;
        const task = this.tasks.find(t => t.id === id);
        if (task) {
          this.editingTaskId = id;
          document.getElementById('taskTitle').value = task.title;
          document.getElementById('taskCategory').value = task.category;
          document.getElementById('taskPriority').value = task.priority;
          document.getElementById('taskDeadline').value = task.deadline;

          // Pindah tab ke form tugas dan ubah status tombol
          this.switchFormTab('tabTaskForm');
          document.getElementById('taskSubmitBtn').innerText = 'Perbarui Tugas';
          document.getElementById('taskCancelBtn')?.classList.remove('hidden');
          document.getElementById('taskTitle').focus();
        }
      }
    });

    // Event Delegation Hapus Jadwal
    this.schedListEl.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.sched-del');
      if (delBtn) {
        const id = delBtn.dataset.id;
        this.schedules = this.schedules.filter(s => s.id !== id);
        this.saveData();
        this.renderSchedules();
      }
    });

    // Event Delegation Hapus Catatan
    this.noteListEl.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.note-del');
      if (delBtn) {
        const id = delBtn.dataset.id;
        this.notes = this.notes.filter(n => n.id !== id);
        this.saveData();
        this.renderNotes();
      }
    });

    // Event Filter Status
    document.querySelectorAll('.task-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.task-filter-btn').forEach(b => b.classList.remove('filter-active'));
        e.target.classList.add('filter-active');
        this.currentTaskFilter = e.target.dataset.filter;
        this.renderTasks();
      });
    });

    // Event Urutkan Tugas
    document.getElementById('sortTasks')?.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.renderTasks();
    });
  };
}
