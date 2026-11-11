# ⚡ PulseFit - Centro de Alto Rendimiento y Fitness

Aplicación web interactiva desarrollada con **Angular 22** (arquitectura standalone, signals y computed state sin persistencia externa), basada en la maqueta original de Pulsefit.

---

## 🚀 Despliegue en Vercel

El proyecto incluye la configuración en [`vercel.json`](./vercel.json) optimizada para Angular como Single Page Application (SPA) con redirección de rutas y directorio de salida `dist/pulsefit/browser`.

### Opción 1: Despliegue automático con Git / GitHub (Recomendado)

1. Sube tus cambios a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: setup pulsefit angular with vercel deployment config"
   git push origin main
   ```
2. Ve a [vercel.com](https://vercel.com) e inicia sesión.
3. Haz clic en **"Add New..."** > **"Project"**.
4. Importa tu repositorio `Pulsefit`.
5. Vercel detectará automáticamente la configuración definida en `vercel.json`:
   - **Framework Preset**: Angular
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/pulsefit/browser`
6. Haz clic en **Deploy**. ¡Tu aplicación estará en línea con HTTPS y CDN global!

---

### Opción 2: Despliegue desde la terminal con Vercel CLI

1. Si no tienes Vercel CLI instalado:
   ```bash
   npm i -g vercel
   ```
2. Ejecuta el despliegue de prueba:
   ```bash
   vercel
   ```
3. Para desplegar directamente a producción:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Desarrollo Local

- **Instalar dependencias:**
  ```bash
  npm install
  ```
- **Iniciar servidor de desarrollo:**
  ```bash
  npm start
  ```
  Accede a `http://localhost:4200/`.

- **Compilar para producción:**
  ```bash
  npm run build
  ```

- **Ejecutar pruebas unitarias:**
  ```bash
  npm test
  ```

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── core/                    # Servicios singleton, modelos globales, interceptores y guardianes
│   │   ├── guards/              # Guardias de ruta funcionales
│   │   ├── interceptors/        # Interceptores HTTP
│   │   ├── models/              # Modelos TypeScript (Perfil, Rutinas, Entrenamientos, Colaboradores)
│   │   └── services/            # Lógica reactiva en memoria con Signals
│   ├── shared/                  # Componentes reutilizables, directivas y pipes
│   ├── features/                # Módulos y vistas lazy-loaded (Perfil, Actividad, Rutinas, Nutrición, Herramientas)
│   ├── layout/                  # Navbar, Footer y Sección de Colaboradores (Bootstrap Grid)
│   ├── app.component.ts         # Componente raíz
│   ├── app.config.ts            # Providers globales
│   └── app.routes.ts            # Rutas con lazy loading
├── assets/                      # Íconos y recursos estáticos
├── environments/                # Variables de entorno
├── index.html                   # CDN Tailwind, Bootstrap y FontAwesome
├── main.ts                      # Bootstrap standalone
└── styles.scss                  # Estilos globales y clases personalizadas
```
