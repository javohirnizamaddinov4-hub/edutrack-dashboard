document.addEventListener('DOMContentLoaded', () => {

    // 1. KUN / TUN REJIMI (DARK MODE) MANTOQ!
    const themeBtn = document.getElementById('theme-toggle-btn');

    // Avvalgi saqlangan rejimni tekshirish
    const savedTheme = localStorage.getItem('edutrack_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.textContent = '🌙';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeBtn) themeBtn.textContent = '☀️';
    }

    // Tugma bosilganda rejimni o'zgartirish
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            themeBtn.textContent = isDark ? '🌙' : '☀️';
            localStorage.setItem('edutrack_theme', isDark ? 'dark' : 'light');
        });
    }

    // 2. TABLARNI ALMASHTIRISH (MENYU VA TEZKOR AMALLAR UCHUN)
    const tabTitles = {
        'dashboard': 'Bosh sahifa',
        'students': 'O\'quvchilar Boshqaruvi',
        'groups': 'O\'quv Guruhlari',
        'teachers': 'O\'qituvchilar Jamoasi',
        'attendance': 'Davomat Nazorati',
        'payments': 'Moliya va To\'lovlar',
        'reports': 'Hisobotlar va Statistika',
        'settings': 'Tizim Sozlamalari'
    };

    function activateTab(tabId) {
        // Menyudagi faol klassni yangilash
        document.querySelectorAll('.menu-item').forEach(item => {
            if (item.getAttribute('data-tab') === tabId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Barcha oynalarni yashirish va mosini ko'rsatish
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const activeWindow = document.getElementById('tab-' + tabId);
        if (activeWindow) {
            activeWindow.classList.add('active');
        }

        // Header sarlavhasini yangilash
        const pageTitleEl = document.getElementById('page-title');
        if (pageTitleEl && tabTitles[tabId]) {
            pageTitleEl.textContent = tabTitles[tabId];
        }
    }

    // Chap menyu bosilganda
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');
            if (tabId) activateTab(tabId);
        });
    });

    // Bosh sahifadagi Tezkor Amallar kartochkalaridan birontasi bosilganda
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', () => {
            const tabId = card.getAttribute('data-tab');
            if (tabId) activateTab(tabId);
        });
    });

    // 3. JONLI SOAT VA SANA
    function updateClock() {
        const now = new Date();
        const clockEl = document.getElementById('live-clock');
        const dateEl = document.getElementById('live-date');

        if (clockEl) {
            clockEl.textContent = '🕒 ' + now.toLocaleTimeString('uz-UZ');
        }

        if (dateEl) {
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            dateEl.textContent = `📅 ${day}.${month}.${year}`;
        }
    }

    setInterval(updateClock, 1000);
    updateClock();

    // 4. QO'SHIMCHA TUGMALAR INTERAKTIVLIGI
    const addStudentBtn = document.getElementById('add-student-btn');
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', () => {
            const name = prompt("Yangi o'quvchi F.I.SH.ni kiriting:");
            if (name) {
                const phone = prompt("Telefon raqamini kiriting (+998...):", "+998 ");
                const group = prompt("Guruh nomini kiriting:", "Frontend-101");
                
                const tbody = document.getElementById('students-table-body');
                if (tbody) {
                    const rowCount = tbody.rows.length + 1;
                    const newRow = `
                        <tr>
                            <td>${rowCount}</td>
                            <td>${name}</td>
                            <td>${phone || '+998 90 000 00 00'}</td>
                            <td>${group || 'Yangi guruh'}</td>
                            <td><span class="status-pill active">Faol</span></td>
                        </tr>
                    `;
                    tbody.insertAdjacentHTML('beforeend', newRow);
                    alert(`${name} bazaga muvaffaqiyatli qo'shildi!`);
                }
            }
        });
    }

    const saveSettingsBtn = document.getElementById('save-settings-btn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            alert("Sozlamalar saqlandi!");
        });
    }

});