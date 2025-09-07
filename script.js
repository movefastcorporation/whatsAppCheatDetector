// ChatScan JavaScript - Enhanced functionality for infidelity detection

// Smooth scroll functions
function scrollToAnalyzer() {
    document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// DOM Elements
let uploadArea;
let fileInput;
let resultsContainer;
let riskLevel;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    setupAnimations();
});

function initializeElements() {
    uploadArea = document.getElementById('uploadArea');
    fileInput = document.getElementById('fileInput');
    resultsContainer = document.getElementById('resultsContainer');
    riskLevel = document.getElementById('riskLevel');
}

function setupEventListeners() {
    // File upload handling
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileSelect);
    }

    // Navigation smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
}

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
    uploadArea.style.background = 'rgba(255, 71, 87, 0.1)';
    uploadArea.style.borderColor = 'var(--primary)';
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    uploadArea.style.background = '';
    uploadArea.style.borderColor = '';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

function processFile(file) {
    // Validate file type
    if (!file.name.toLowerCase().endsWith('.txt')) {
        showNotification('Por favor, selecciona un archivo .txt de WhatsApp', 'error');
        return;
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
        showNotification('Archivo demasiado grande. Máximo 50MB.', 'error');
        return;
    }

    showNotification('Archivo cargado. Iniciando análisis...', 'success');
    
    // Read file content
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        analyzeChat(content);
    };
    reader.readAsText(file);
}

function analyzeChat(content) {
    // Show loading state
    showLoadingAnimation();
    
    // Simulate analysis delay
    setTimeout(() => {
        const analysis = performChatAnalysis(content);
        displayResults(analysis);
    }, 3000);
}

function performChatAnalysis(content) {
    const lines = content.split('\n').filter(line => line.trim());
    const messages = parseWhatsAppChat(lines);
    
    if (messages.length === 0) {
        return {
            error: 'No se pudieron encontrar mensajes válidos en el archivo'
        };
    }

    // Analyze different patterns
    const timeAnalysis = analyzeTimePatterns(messages);
    const contentAnalysis = analyzeMessageContent(messages);
    const behaviorAnalysis = analyzeBehaviorPatterns(messages);
    const statisticsAnalysis = generateStatistics(messages);

    // Calculate risk score
    const riskScore = calculateRiskScore(timeAnalysis, contentAnalysis, behaviorAnalysis);

    return {
        riskScore,
        timeAnalysis,
        contentAnalysis,
        behaviorAnalysis,
        statistics: statisticsAnalysis,
        totalMessages: messages.length
    };
}

function parseWhatsAppChat(lines) {
    const messages = [];
    const messageRegex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s(\d{1,2}:\d{2}(?::\d{2})?(?:\s?[APap][Mm])?)\s?[-–]\s?([^:]+):\s(.+)$/;
    
    lines.forEach(line => {
        const match = line.match(messageRegex);
        if (match) {
            messages.push({
                date: match[1],
                time: match[2],
                sender: match[3].trim(),
                content: match[4].trim(),
                timestamp: parseTimestamp(match[1], match[2])
            });
        }
    });
    
    return messages;
}

function parseTimestamp(date, time) {
    // Convert to standard format for analysis
    const [day, month, year] = date.split('/');
    const fullYear = year.length === 2 ? '20' + year : year;
    return new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}`);
}

function analyzeTimePatterns(messages) {
    const lateNightMessages = messages.filter(msg => {
        const hour = msg.timestamp.getHours();
        return hour >= 22 || hour <= 5;
    });

    const earlyMorningMessages = messages.filter(msg => {
        const hour = msg.timestamp.getHours();
        return hour >= 1 && hour <= 6;
    });

    const weekendActivity = messages.filter(msg => {
        const day = msg.timestamp.getDay();
        return day === 0 || day === 6; // Sunday or Saturday
    });

    return {
        lateNightCount: lateNightMessages.length,
        earlyMorningCount: earlyMorningMessages.length,
        weekendCount: weekendActivity.length,
        suspiciousTimePattern: lateNightMessages.length > messages.length * 0.2
    };
}

function analyzeMessageContent(messages) {
    const suspiciousKeywords = [
        'secreto', 'oculto', 'no le digas', 'entre nosotros', 'confidencial',
        'borrar', 'eliminar', 'trabajo tarde', 'reunión', 'viaje de trabajo',
        'no puedo hablar', 'después hablamos', 'te llamo luego',
        'estoy ocupado', 'no estoy disponible', 'sin planes',
        'amigo', 'amiga', 'compañero', 'compañera', 'colega'
    ];

    const romanticKeywords = [
        'te amo', 'te quiero', 'mi amor', 'cariño', 'bebé', 'hermosa',
        'guapo', 'linda', 'preciosa', 'corazón', '❤️', '😘', '😍', '🥰'
    ];

    const evasivePatterns = [
        'después hablamos', 'no puedo ahora', 'estoy en reunión',
        'con la familia', 'durmiendo', 'ocupado', 'trabajando'
    ];

    let suspiciousContent = 0;
    let romanticContent = 0;
    let evasiveContent = 0;

    messages.forEach(msg => {
        const content = msg.content.toLowerCase();
        
        suspiciousKeywords.forEach(keyword => {
            if (content.includes(keyword)) suspiciousContent++;
        });

        romanticKeywords.forEach(keyword => {
            if (content.includes(keyword)) romanticContent++;
        });

        evasivePatterns.forEach(pattern => {
            if (content.includes(pattern)) evasiveContent++;
        });
    });

    return {
        suspiciousContent,
        romanticContent,
        evasiveContent,
        hasSuspiciousContent: suspiciousContent > 0,
        hasRomanticContent: romanticContent > 0,
        hasEvasivePatterns: evasiveContent > 0
    };
}

function analyzeBehaviorPatterns(messages) {
    const senders = [...new Set(messages.map(msg => msg.sender))];
    const senderStats = {};

    senders.forEach(sender => {
        const senderMessages = messages.filter(msg => msg.sender === sender);
        senderStats[sender] = {
            messageCount: senderMessages.length,
            avgLength: senderMessages.reduce((sum, msg) => sum + msg.content.length, 0) / senderMessages.length,
            timePatterns: analyzeTimePatterns(senderMessages)
        };
    });

    const responseTimes = [];
    for (let i = 1; i < messages.length; i++) {
        if (messages[i].sender !== messages[i-1].sender) {
            const timeDiff = messages[i].timestamp - messages[i-1].timestamp;
            responseTimes.push(timeDiff);
        }
    }

    const avgResponseTime = responseTimes.length > 0 
        ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
        : 0;

    return {
        senderCount: senders.length,
        senderStats,
        avgResponseTime: avgResponseTime / (1000 * 60), // in minutes
        hasMultipleSenders: senders.length > 2
    };
}

function generateStatistics(messages) {
    const totalMessages = messages.length;
    const dateRange = {
        start: new Date(Math.min(...messages.map(msg => msg.timestamp))),
        end: new Date(Math.max(...messages.map(msg => msg.timestamp)))
    };
    
    const daysDiff = (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24);
    const avgMessagesPerDay = totalMessages / Math.max(daysDiff, 1);

    const hourDistribution = {};
    messages.forEach(msg => {
        const hour = msg.timestamp.getHours();
        hourDistribution[hour] = (hourDistribution[hour] || 0) + 1;
    });

    const mostActiveHour = Object.keys(hourDistribution).reduce((a, b) => 
        hourDistribution[a] > hourDistribution[b] ? a : b
    );

    return {
        totalMessages,
        dateRange,
        daysDiff: Math.round(daysDiff),
        avgMessagesPerDay: Math.round(avgMessagesPerDay),
        mostActiveHour: parseInt(mostActiveHour),
        hourDistribution
    };
}

function calculateRiskScore(timeAnalysis, contentAnalysis, behaviorAnalysis) {
    let score = 0;
    const factors = [];

    // Time-based risk factors
    if (timeAnalysis.suspiciousTimePattern) {
        score += 25;
        factors.push('Actividad excesiva en horarios nocturnos');
    }

    if (timeAnalysis.earlyMorningCount > 5) {
        score += 15;
        factors.push('Mensajes frecuentes en madrugada');
    }

    // Content-based risk factors
    if (contentAnalysis.hasSuspiciousContent) {
        score += 30;
        factors.push('Contenido con palabras sospechosas');
    }

    if (contentAnalysis.hasRomanticContent) {
        score += 20;
        factors.push('Contenido romántico detectado');
    }

    if (contentAnalysis.hasEvasivePatterns) {
        score += 15;
        factors.push('Patrones de evasión en respuestas');
    }

    // Behavior-based risk factors
    if (behaviorAnalysis.avgResponseTime < 2) {
        score += 10;
        factors.push('Tiempo de respuesta muy rápido');
    }

    if (behaviorAnalysis.hasMultipleSenders) {
        score += 5;
        factors.push('Múltiples participantes en la conversación');
    }

    return {
        score: Math.min(score, 100),
        level: getRiskLevel(score),
        factors
    };
}

function getRiskLevel(score) {
    if (score >= 70) return { level: 'ALTO', color: '#ee5a52', description: 'Se detectaron múltiples señales de alerta' };
    if (score >= 40) return { level: 'MEDIO', color: '#ff6b35', description: 'Algunas señales requieren atención' };
    if (score >= 20) return { level: 'BAJO', color: '#ffa502', description: 'Pocas señales de alerta detectadas' };
    return { level: 'NORMAL', color: '#26de81', description: 'No se detectaron señales preocupantes' };
}

function displayResults(analysis) {
    if (analysis.error) {
        showNotification(analysis.error, 'error');
        hideLoadingAnimation();
        return;
    }

    hideLoadingAnimation();
    resultsContainer.style.display = 'block';

    // Update risk level
    const riskInfo = analysis.riskScore;
    const riskValueElement = document.getElementById('riskValue');
    riskValueElement.textContent = `${riskInfo.level} (${riskInfo.score}%)`;
    riskValueElement.style.background = riskInfo.level.color;

    // Update warning signals
    const warningSignals = document.getElementById('warningSignals');
    warningSignals.innerHTML = '';
    if (riskInfo.factors.length === 0) {
        warningSignals.innerHTML = '<li style="color: #26de81;">No se detectaron señales de alerta significativas</li>';
    } else {
        riskInfo.factors.forEach(factor => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: var(--primary); margin-right: 8px;"></i>${factor}`;
            warningSignals.appendChild(li);
        });
    }

    // Update statistics
    const statistics = document.getElementById('statistics');
    statistics.innerHTML = `
        <div class="stat-item">
            <strong>Total de mensajes:</strong> ${analysis.statistics.totalMessages}
        </div>
        <div class="stat-item">
            <strong>Período:</strong> ${analysis.statistics.daysDiff} días
        </div>
        <div class="stat-item">
            <strong>Mensajes por día:</strong> ${analysis.statistics.avgMessagesPerDay}
        </div>
        <div class="stat-item">
            <strong>Hora más activa:</strong> ${analysis.statistics.mostActiveHour}:00
        </div>
    `;

    // Update time patterns
    const timePatterns = document.getElementById('timePatterns');
    timePatterns.innerHTML = `
        <div class="pattern-item">
            <strong>Mensajes nocturnos:</strong> ${analysis.timeAnalysis.lateNightCount}
        </div>
        <div class="pattern-item">
            <strong>Mensajes de madrugada:</strong> ${analysis.timeAnalysis.earlyMorningCount}
        </div>
        <div class="pattern-item">
            <strong>Actividad fin de semana:</strong> ${analysis.timeAnalysis.weekendCount}
        </div>
    `;

    // Update content analysis
    const contentAnalysis = document.getElementById('contentAnalysis');
    contentAnalysis.innerHTML = `
        <div class="content-item">
            <strong>Contenido sospechoso:</strong> ${analysis.contentAnalysis.suspiciousContent} menciones
        </div>
        <div class="content-item">
            <strong>Contenido romántico:</strong> ${analysis.contentAnalysis.romanticContent} menciones
        </div>
        <div class="content-item">
            <strong>Patrones evasivos:</strong> ${analysis.contentAnalysis.evasiveContent} menciones
        </div>
    `;

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Análisis completado exitosamente', 'success');
}

function showLoadingAnimation() {
    const uploadContent = uploadArea.querySelector('.upload-content');
    uploadContent.innerHTML = `
        <div class="loading-animation">
            <i class="fas fa-spinner fa-spin upload-icon" style="color: var(--primary);"></i>
            <h3>Analizando chat...</h3>
            <p id="loading-status">Procesando mensajes...</p>
            <div class="progress-bar">
                <div class="progress-fill" style="animation: progress 3s ease-in-out infinite;"></div>
            </div>
        </div>
    `;

    // Update loading status
    const statuses = [
        'Procesando mensajes...',
        'Analizando patrones temporales...',
        'Detectando contenido sospechoso...',
        'Evaluando comportamiento...',
        'Generando reporte final...'
    ];

    let statusIndex = 0;
    const statusElement = document.getElementById('loading-status');
    const statusInterval = setInterval(() => {
        statusIndex = (statusIndex + 1) % statuses.length;
        if (statusElement) {
            statusElement.textContent = statuses[statusIndex];
        } else {
            clearInterval(statusInterval);
        }
    }, 600);

    // Store interval to clear later
    uploadArea.dataset.statusInterval = statusInterval;
}

function hideLoadingAnimation() {
    // Clear status interval
    if (uploadArea.dataset.statusInterval) {
        clearInterval(parseInt(uploadArea.dataset.statusInterval));
    }

    const uploadContent = uploadArea.querySelector('.upload-content');
    uploadContent.innerHTML = `
        <i class="fas fa-cloud-upload-alt upload-icon"></i>
        <h3>Arrastra tu chat de WhatsApp aquí</h3>
        <p>O haz clic para seleccionar archivo</p>
        <input type="file" id="fileInput" accept=".txt" style="display: none;">
        <button class="btn btn-upload" onclick="document.getElementById('fileInput').click()">
            Seleccionar Archivo
        </button>
    `;

    // Re-initialize file input
    fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#26de81',
        error: '#ee5a52',
        warning: '#ffa502',
        info: '#3b82f6'
    };

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button class="notification-close">×</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        margin-left: 10px;
        opacity: 0.8;
    `;

    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

function setupAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }

        @keyframes progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }

        .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin-top: 20px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            border-radius: 2px;
        }

        .stat-item, .pattern-item, .content-item {
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid var(--gray-200);
        }

        .stat-item:last-child, .pattern-item:last-child, .content-item:last-child {
            border-bottom: none;
        }

        .drag-over {
            transform: scale(1.02);
            transition: all 0.3s ease;
        }

        .loading-animation {
            text-align: center;
        }

        .loading-animation .upload-icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);

    // Initialize intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step');
    animatedElements.forEach(el => observer.observe(el));
}

// Export functions for global access
window.scrollToAnalyzer = scrollToAnalyzer;
window.scrollToFeatures = scrollToFeatures;