# Diagnóstico de Habilidades Clínicas para Facilitadores

Este proyecto es una herramienta de software interactiva diseñada como un lead magnet de alto valor para **Dr. HOPE (Health Optimization Psychedelic Experiences)**. Su objetivo es diagnosticar el nivel de razonamiento clínico de terapeutas y facilitadores al enfrentar escenarios desafiantes durante una experiencia con psilocibina.

A diferencia de un simple quiz, esta herramienta utiliza un sistema de **puntuación ponderada** y feedback inmediato para educar al usuario mientras evalúa su competencia, alineándose con una marca de alto rigor clínico y pedagógico.

## 🎯 Propósito

El software busca resolver el problema: *“No saber si estás realmente preparado para acompañar verbalmente una experiencia desafiante con psilocibina.”*

Funciona como:
1.  **Herramienta de Diagnóstico:** Evalúa la toma de decisiones del facilitador.
2.  **Herramienta Educativa:** Proporciona feedback instantáneo sobre por qué una intervención es adecuada, plausible o riesgosa.
3.  **Lead Magnet Segmentado:** Ofrece un Call-To-Action (CTA) personalizado basado en el nivel de competencia del usuario, dirigiéndolo de manera empática y efectiva hacia un minicurso de pago.

## ✨ Características Principales

- **Modularidad:** Código separado en HTML, CSS y JS para fácil mantenimiento.
- **Escalabilidad:** Las preguntas y la lógica del quiz se cargan desde un archivo `data/preguntas.json`, permitiendo añadir o modificar contenido sin tocar el código de la aplicación.
- **Puntuación Ponderada:** Evalúa las respuestas con matices (correcta, plausible, incorrecta), ofreciendo un diagnóstico más preciso.
- **Accesibilidad (A11Y):** Mejoras con etiquetas ARIA para una mejor navegación y experiencia para usuarios con tecnologías de asistencia.
- **CTA Dinámico:** El mensaje pre-cargado para WhatsApp se personaliza según el nivel de resultado del usuario, optimizando la conversión.
- **Diseño Responsivo:** Totalmente funcional en dispositivos móviles y de escritorio.

## 🗂️ Estructura del Repositorio

facilitador-diagnostico/
├── index.html         # Archivo principal de la aplicación
├── css/
│   └── styles.css     # Hoja de estilos
├── js/
│   └── quiz.js        # Lógica de la aplicación
├── data/
│   └── preguntas.json # Base de datos de preguntas del quiz
├── README.md          # Este archivo
└── LICENSE            # (Recomendado) Archivo de licencia del proyecto
```

## 🚀 Cómo Usar

1.  Clona o descarga este repositorio.
2.  Sube los archivos a un servidor web o a un servicio de hosting estático como **GitHub Pages**.
3.  Asegúrate de mantener la estructura de carpetas (`css`, `js`, `data`).
4.  La aplicación se ejecutará abriendo el archivo `index.html` en un navegador.

## 🔧 Personalización

- **Cambiar el número de WhatsApp:** Modifica la constante `PHONE_NUMBER` en el archivo `js/quiz.js`.
- **Añadir/Modificar Preguntas:** Edita directamente el archivo `data/preguntas.json` siguiendo la estructura existente. Puedes añadir más preguntas al array o modificar las actuales. El sistema de puntuación máxima y los niveles se ajustarán automáticamente.

## 📜 Licencia

Se recomienda utilizar una licencia de código abierto como la **MIT License** para permitir su uso y modificación, manteniendo la atribución. Crea un archivo `LICENSE` en la raíz del proyecto y copia el texto de la licencia MIT en él.

---
Creado y desarrollado en colaboración con Dr. HOPE.
