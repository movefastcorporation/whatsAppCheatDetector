# CLAUDE.MD - Guía Operativa UI/UX para ChatScan

## 📋 REGLAS DE EDICIÓN "IN-PLACE" (OBLIGATORIO)

### 🚫 PROHIBICIONES ABSOLUTAS:
- **NUNCA crear archivos duplicados**: No `index_improved.html`, `styles_new.css`, `script_enhanced.js`
- **SIEMPRE modificar archivos originales**: `index.html`, `styles.css`, `script.js`
- **MANTENER nombres existentes**: Solo cambiar si hay bug crítico (actualizar TODAS las referencias)

### ✅ ARCHIVOS PRINCIPALES A EDITAR:
- **`index.html`** - Landing principal, estructura semántica
- **`styles.css`** - CSS con variables, responsive, animaciones (existe archivo separado)
- **`script.js`** - JavaScript funcional (existe archivo separado) 
- **`README.md`** - Documentación principal del proyecto

---

## 🎯 PROCESO DE TRABAJO POR CAMBIO

### 1️⃣ **AUDITORÍA RÁPIDA** (2-3 mins)
- **Jerarquía**: ¿H1 único? ¿H2-H6 en orden? ¿CTAs visibles above the fold?
- **Copy actual**: ¿Hooks atractivos? ¿Valor claro? ¿CTAs imperativos?
- **Accesibilidad**: ¿Contraste ≥4.5:1? ¿Alt text? ¿Focus visible?
- **Responsive**: ¿Mobile-first? ¿Breakpoints 390px, 768px, 1440px?

### 2️⃣ **PROPUESTA HOOKS "CATCHY"** (bullets)
- **Headline**: ≤ 8-10 palabras, beneficio emocional claro
- **Subheadline**: Explica CÓMO + beneficio de credibilidad/seguridad
- **CTA Principal**: Verbo imperativo + valor inmediato
- **Trust indicators**: Elementos de confianza (seguridad, privacidad, resultados)

### 3️⃣ **APLICACIÓN DE CAMBIOS**
- **Padding/Espaciado**: Mantener escala 8px/12px (--space-1 a --space-20)
- **No comprimir**: Mantener líneas de texto con respiro visual
- **Variables CSS**: Usar existentes en `:root` (--primary, --gray-*, etc.)
- **Animaciones**: Mantener/mejorar sin crear bloat

### 4️⃣ **VERIFICACIÓN QA**
- **Contraste**: ≥4.5:1 en textos principales
- **Foco teclado**: Tab navigation funcional y visible
- **Mobile**: 390x844 (iPhone), 768x1024 (iPad), 1440x900 (Desktop)
- **No errores consola**: 0 errores JavaScript/CSS

---

## ✅ CHECKLIST UI/UX MÍNIMA

### 🎯 **ABOVE THE FOLD** (Hero)
- [ ] Hook inicial claro y emocional (dolor/solución)
- [ ] CTA principal visible y contrastante
- [ ] Valor/beneficio principal en ≤10 palabras
- [ ] Trust indicators visibles (seguridad, privacidad)

### 📝 **JERARQUÍA TIPOGRÁFICA**
- [ ] H1 único, tamaño jerárquico correcto
- [ ] H2-H6 en cascada visual
- [ ] Espaciado consistente entre títulos y párrafos
- [ ] Line-height confortable (1.4-1.6 para texto)

### 🎨 **ESPACIADO Y COLORES**
- [ ] Múltiplos de 8px/12px en paddings/margins
- [ ] Variables CSS utilizadas consistentemente
- [ ] Colores con suficiente contraste
- [ ] Estados hover/focus definidos

### 📱 **RESPONSIVE**
- [ ] Mobile-first approach mantenido
- [ ] Grid adaptativos sin overflow
- [ ] Touch targets ≥44px en mobile
- [ ] Texto legible sin zoom

---

## 🔥 REGLAS DE COPY "CATCHY"

### 📢 **HEADLINES EFECTIVOS**
- **Fórmula**: [Dolor emocional] + [Solución rápida]
- **Ejemplos buenos**: 
  - "¿Qué Ocultan tus Chats?" ✅
  - "Descubre la Verdad en Minutos" ✅
- **Evitar**: "Análisis de Conversaciones WhatsApp" ❌ (aburrido)

### 💬 **SUBHEADLINES**
- **Debe explicar**: CÓMO + BENEFICIO + CREDIBILIDAD
- **Ejemplo actual**: "100% confidencial y seguro. Detecta patrones con IA." ✅
- **Longitud**: 1-2 líneas máximo

### 🚀 **CTAs IMPERATIVOS**
- **Verbos de acción**: "Descubrir", "Analizar", "Revelar", "Obtener"
- **Valor inmediato**: "Subir Chat Seguro", "Resultados en 2 mins"
- **NO genéricos**: "Empezar", "Comenzar" (sin contexto)

### 🛡️ **CREDIBILIDAD**
- **Números específicos**: "100% confidencial", "2 minutos", "0 datos comprometidos"
- **NO inventar**: Reviews, ratings, testimonios fake
- **Enfocar**: Privacidad, seguridad, tecnología

---

## 🎨 SISTEMA DE ESTILOS Y PADDING

### 🎨 **VARIABLES EXISTENTES** (usar siempre)
```css
/* Colores principales */
--primary: #3b82f6 (azul)
--secondary: #8b5cf6 (púrpura)
--accent: #f59e0b (naranja)

/* Espaciado (escala 8px) */
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-4: 1rem (16px)
--space-8: 2rem (32px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
```

### 📐 **REGLAS DE ESPACIADO**
- **Entre secciones**: var(--space-20) mínimo
- **Dentro de cards**: var(--space-8) a var(--space-12)
- **Botones padding**: var(--space-4) var(--space-8)
- **Textos margin-bottom**: var(--space-4) a var(--space-6)

### 🎪 **ANIMACIONES EXISTENTES**
- **float**: Para elementos flotantes (6s)
- **pulse-soft**: Elementos que respiran (2s)
- **gradient**: Backgrounds animados (15s)
- **heartbeat**: Elementos de atención (2s)

---

## ⚡ QA ANTES DE FINALIZAR

### 📱 **PRUEBAS RESPONSIVE**
1. **Mobile**: 390x844px (iPhone 12 Pro)
   - [ ] Navegación hamburguesa funcional
   - [ ] Textos legibles sin zoom
   - [ ] CTAs accesibles con pulgar

2. **Tablet**: 768x1024px (iPad)
   - [ ] Grid se adapta correctamente
   - [ ] Espaciados proporcionales

3. **Desktop**: 1440x900px+
   - [ ] Contenido no excede max-width
   - [ ] Hover states funcionan

### 🔍 **PRUEBAS TÉCNICAS**
- [ ] **Consola**: 0 errores JavaScript/CSS
- [ ] **Links**: Todos los enlaces navegables
- [ ] **Focus**: Tab order lógico y visible
- [ ] **Layout**: Sin "salto" al cargar página

### 🚀 **PERFORMANCE**
- [ ] **Carga rápida**: < 3 segundos percibidos
- [ ] **Animaciones fluidas**: 60fps
- [ ] **No recursos rotos**: Imágenes, fuentes, iconos

---

## 📊 MÉTRICAS DE ÉXITO

### 🎯 **OBJETIVOS PRINCIPALES**
1. **Retención**: Usuario pasa >30s en la página
2. **Engagement**: Scroll hasta sección "Cómo Funciona"
3. **Conversión**: Click en CTA principal
4. **Confianza**: Permanencia en sección "Seguridad"

### 📈 **KPIS A MEJORAR**
- **Bounce rate**: <40%
- **Time on page**: >2 minutos
- **Scroll depth**: >75%
- **CTA clicks**: >8% de visitantes

---

## ⚠️ EVITAR SIEMPRE

### 🚫 **ERRORES COMUNES**
- **Reseñas inventadas**: ⭐⭐⭐⭐⭐ fake
- **Estadísticas falsas**: "Miles de usuarios satisfechos" sin evidencia
- **Urgencia falsa**: "¡Solo hoy!", "Últimas 24 horas!"
- **Promesas irreales**: "100% efectivo", "Nunca falla"

### 🚫 **PROBLEMAS TÉCNICOS**
- **Crear archivos nuevos**: index_v2.html ❌
- **Romper responsive**: Elementos que sobresalen
- **Contraste bajo**: Textos grises sobre fondos claros
- **Animaciones excesivas**: Más de 3 animaciones simultáneas

### 🚫 **PROBLEMAS DE UX**
- **CTAs ocultos**: Botones poco contrastantes
- **Copys largos**: Párrafos >4 líneas en mobile
- **Jerarquía confusa**: H1 que no representa la página
- **Carga lenta**: >5 segundos percibidos

---

## 🛠️ FLUJO TRABAJO IDEAL

1. **Auditoría** (2 mins) → **Propuesta** (3 mins) → **Implementación** (15-20 mins) → **QA** (5 mins)
2. **Un solo archivo por vez**: Completar `index.html` antes de tocar `styles.css`
3. **Test continuo**: Verificar en mobile después de cada cambio grande
4. **Commit frecuente**: Guardar progreso cada mejora significativa

---

## 📚 RECURSOS DE REFERENCIA

### 🎨 **Inspiración Visual**
- Landing pages de seguridad/privacidad
- Apps de mensajería (WhatsApp, Telegram UI)
- Herramientas de análisis (Google Analytics style)

### 📝 **Copy Referencias**
- Headlines de páginas de ciberseguridad
- CTAs de apps de privacidad
- Trust indicators de servicios confidenciales

### 🎯 **Benchmarks UX**
- Tiempo carga: <3s (Google PageSpeed)
- Contraste: ≥4.5:1 (WCAG AA)
- Touch targets: ≥44px (Apple HIG)
- Legibilidad: 16px+ mobile (W3C)

---

*Esta guía debe consultarse ANTES de cualquier cambio UI/UX. Actualizar según aprendizajes del proyecto.*