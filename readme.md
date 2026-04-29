# 🌄 Asturias Explorer (PWA)

Una aplicación web progresiva (PWA) ligera que permite explorar destinos turísticos de Asturias, España. Está construida con **HTML, CSS y JavaScript puro**, y utiliza un archivo JSON como fuente de datos.

El proyecto está enfocado en la simplicidad, el rendimiento y la información turística honesta (sin exageraciones comerciales).

---

## 🚀 Funcionalidades

- 🔎 Búsqueda de lugares por nombre o ubicación  
- 🧭 Filtros por categoría (naturaleza, playas, ciudades, pueblos, parques)  
- 📸 Tarjetas con imágenes usando Picsum Photos  
- ⚠️ Notas honestas sobre cada destino (afluencia, accesibilidad, etc.)  
- 📱 Instalable como aplicación PWA  
- ⚡ Funcionamiento offline mediante Service Worker  

---

## 📁 Estructura del proyecto
/asturias-explorer

├── index.html # Interfaz principal

├── style.css # Estilos

├── script.js # Lógica de la aplicación

├── places.json # Datos de los lugares

├── manifest.json # Configuración PWA

├── sw.js # Service Worker (modo offline)



---

## 🧠 Cómo funciona

La aplicación carga un archivo JSON local con diferentes lugares de Asturias. Cada lugar incluye:

- Nombre  
- Ubicación  
- Tipo de lugar (categoría)  
- Descripción  
- Nota honesta sobre el lugar  
- Etiquetas  
- Imagen generada dinámicamente  

JavaScript se encarga de renderizar las tarjetas y aplicar filtros y búsqueda en el lado del cliente.

---

## 📸 Sistema de imágenes

Las imágenes se generan usando:
https://picsum.photos/seed/{nombre-del-lugar}/800/500


Esto permite:
- Imágenes consistentes por lugar  
- No depender de backend  
- Visuales realistas para prototipado rápido  

---

## 📱 Funcionalidades PWA

### Instalación como app
La aplicación puede instalarse en:
- Android (Chrome)  
- Escritorio (Chrome / Edge)  

### Modo offline
El Service Worker almacena en caché:
- HTML  
- CSS  
- JavaScript  
- Datos JSON  

Esto permite usar la app sin conexión tras la primera carga.

---

## ⚙️ Tecnologías utilizadas

- HTML5  
- CSS3 (Grid + Flexbox)  
- JavaScript (ES6+)  
- Service Workers (PWA)  
- JSON como base de datos local  
- Picsum Photos (imágenes de placeholder)  


---

## 🧭 Filosofía del proyecto

Este proyecto evita el marketing exagerado y se centra en:
- Descripciones realistas de los lugares  
- Limitaciones reales del turismo  
- Experiencia ligera y rápida  
- Información útil para viajeros  

---

## 📌 Posibles mejoras

- 🗺️ Mapa interactivo (Leaflet.js)  
- ❤️ Sistema de favoritos (localStorage / IndexedDB)  
- 🌦️ Clima en tiempo real por ubicación  
- 🧳 Planificador de viajes automático  
- 📍 Modo “cerca de mí” con geolocalización  
- 🔍 Autocompletado en la búsqueda  

---

## 🏔️ Sobre Asturias

Asturias es una región del norte de España conocida por:
- Costa salvaje y playas naturales  
- Montañas (Picos de Europa)  
- Pueblos tradicionales  
- Gastronomía y cultura muy arraigadas  
