// 等待DOM載入完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initTabs();
    initScrollAnimations();
    initChart();
    initMobileMenu();
});

// 導航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 標籤切換功能
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活動狀態
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 添加活動狀態
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// 滾動動畫
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 圖表初始化
function initChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['新竹站', '台南站', '左營站', '苗栗站', '桃園站'],
            datasets: [{
                label: '通車後3年房價漲幅 (%)',
                data: [62.6, 51.2, 44.2, 40, 29.7],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FF9800',
                    '#9C27B0',
                    '#F44336'
                ],
                borderColor: [
                    '#388E3C',
                    '#1976D2',
                    '#F57C00',
                    '#7B1FA2',
                    '#D32F2F'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `漲幅: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 70,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        color: '#666',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#666',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 行動裝置選單
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // 點擊選單項目後關閉選單
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// 平滑滾動到頂部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 數字動畫效果
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 50);
    });
}

// 監聽滾動事件，觸發數字動畫
let animated = false;
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero && !animated) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (window.pageYOffset >= heroBottom - window.innerHeight) {
            animateNumbers();
            animated = true;
        }
    }
});

// 添加CSS類別到行動裝置選單
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: #667eea;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);

// 添加載入動畫
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 延遲顯示內容
    setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 200);
        });
    }, 500);
});

// 添加載入動畫CSS
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(loadStyle);

// 添加工具提示功能
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// 初始化工具提示
initTooltips();

// 添加工具提示CSS
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    .tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 10000;
        pointer-events: none;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(tooltipStyle);
