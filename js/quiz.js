document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const introScreen = document.getElementById('intro-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const hintBtn = document.getElementById('hint-btn');
    
    const questionCounter = document.getElementById('question-counter');
    const questionTitle = document.getElementById('question-title');
    const questionScenario = document.getElementById('question-scenario');
    const optionsContainer = document.getElementById('options-container');
    const hintText = document.getElementById('hint-text');
    const feedbackContainer = document.getElementById('feedback-container');

    const resultsSummary = document.getElementById('results-summary');
    const ctaBlock = document.getElementById('cta-block');
    const ctaText = document.getElementById('cta-text');
    const ctaLink = document.getElementById('cta-link');

    // --- ESTADO DEL QUIZ ---
    let quizData = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const PHONE_NUMBER = "593989760520"; // Número de WhatsApp

    // --- CARGA DE DATOS Y INICIALIZACIÓN ---
    async function initQuiz() {
        try {
            const response = await fetch('data/preguntas.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            quizData = await response.json();
            // Agregar listeners solo después de cargar los datos
            if (startBtn) {
                startBtn.addEventListener('click', startQuiz);
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', handleNextQuestion);
            }
            if (hintBtn) {
                hintBtn.addEventListener('click', showHint);
            }
            console.log("Quiz inicializado con éxito.");
        } catch (error) {
            console.error("No se pudo cargar el archivo de preguntas del quiz:", error);
            // Opcionalmente, mostrar un mensaje de error al usuario en la UI
        }
    }

    // --- FUNCIONES DEL QUIZ ---
    function startQuiz() {
        if (!introScreen || !quizScreen || !resultsScreen) return;
        introScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        resultsScreen.classList.add('hidden');
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = quizData[currentQuestionIndex];
        
        if (questionCounter) questionCounter.innerText = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;
        if (questionTitle) questionTitle.innerText = currentQuestion.question;
        if (questionScenario) questionScenario.innerText = currentQuestion.scenario;
        if (hintText) hintText.innerText = currentQuestion.hint;

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn', 'btn-option');
            button.dataset.weight = option.weight; // Guardar el peso en el dataset
            button.addEventListener('click', () => selectAnswer(option, button));
            if (optionsContainer) optionsContainer.appendChild(button);
        });
    }

    function resetState() {
        if(nextBtn) nextBtn.classList.add('hidden');
        if(hintBtn) hintBtn.classList.remove('hidden');
        if(hintText) hintText.classList.add('hidden');
        if(feedbackContainer) {
            feedbackContainer.classList.add('hidden');
            feedbackContainer.className = 'hidden'; // Resetea clases de color
        }
        if (optionsContainer) {
            while (optionsContainer.firstChild) {
                optionsContainer.removeChild(optionsContainer.firstChild);
            }
        }
    }

    function selectAnswer(selectedOption, selectedButton) {
        score += selectedOption.weight;
        
        // Deshabilitar todas las opciones y aplicar estilos
        if (optionsContainer) {
            Array.from(optionsContainer.children).forEach(button => {
                button.disabled = true;
                const weight = parseInt(button.dataset.weight);
                if (weight === 2) button.classList.add('correct');
                else if (weight === 1) button.classList.add('plausible');
            });
        }
        
        if (selectedOption.weight < 2) {
             selectedButton.classList.add('incorrect'); // Marca la opción seleccionada si no es la ideal
        }

        // Mostrar feedback
        const feedback = selectedOption.feedback;
        if (feedbackContainer) {
            feedbackContainer.innerHTML = `<div class="feedback-title">${feedback.title}</div><p>${feedback.text}</p>`;
            feedbackContainer.classList.remove('hidden');
            if(selectedOption.weight === 2) feedbackContainer.classList.add('feedback-correct');
            else if (selectedOption.weight === 1) feedbackContainer.classList.add('feedback-plausible');
            else feedbackContainer.classList.add('feedback-incorrect');
        }
        
        if(hintBtn) hintBtn.classList.add('hidden');
        if(hintText) hintText.classList.add('hidden');
        if(nextBtn) nextBtn.classList.remove('hidden');
    }

    function showHint() {
        if (hintText && hintBtn) {
            const isHidden = hintText.classList.toggle('hidden');
            hintBtn.setAttribute('aria-expanded', !isHidden);
        }
    }

    function handleNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
    
    function showResults() {
        if (!quizScreen || !resultsScreen) return;
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        
        const maxScore = quizData.reduce((total, q) => total + Math.max(...q.options.map(opt => opt.weight)), 0);
        
        let ctaMessage, ctaBgColor, levelText, whatsappMessage;

        // Niveles basados en la puntuación ponderada
        if (score <= maxScore * 0.4) { // Nivel Bajo
            levelText = "Bajo";
            ctaMessage = "Tus resultados muestran que tienes la intención correcta, pero que tus herramientas actuales pueden estar generando un impacto no deseado. Es una brecha muy común y el punto de partida de grandes facilitadores.\n\nReconocer esta brecha es el paso más importante. Ahora, el siguiente es adquirir un método clínico probado para cerrarla.";
            ctaBgColor = "#fff3cd";
            whatsappMessage = `Hola, Dr. HOPE. He completado el diagnóstico con un resultado en el nivel inicial y quisiera recibir más información sobre el minicurso para reforzar mis bases clínicas.`;
        } else if (score <= maxScore * 0.8) { // Nivel Medio
            levelText = "Medio";
            ctaMessage = "Tus respuestas demuestran una base sólida y una intuición correcta. Estás por encima del promedio, pero la diferencia entre un buen acompañamiento y uno transformador reside en los matices.\n\nYa entiendes el 'qué'. El siguiente nivel es dominar el 'cómo' y el 'porqué' detrás de cada intervención.";
            ctaBgColor = "#d1ecf1";
            whatsappMessage = `Hola, Dr. HOPE. He completado el diagnóstico con un resultado de nivel medio. Me interesa profundizar en los matices del método clínico y quisiera más información sobre el minicurso.`;
        } else { // Nivel Alto
            levelText = "Alto";
            ctaMessage = "¡Excelente! Tus respuestas reflejan una comprensión profunda y matizada del acompañamiento. Tu enfoque ya se alinea con las mejores prácticas clínicas, priorizando la seguridad y la autonomía del participante.\n\nPara profesionales como tú, el crecimiento no está en lo básico, sino en la maestría y la supervisión de casos complejos.";
            ctaBgColor = "#d4edda";
            whatsappMessage = `Hola, Dr. HOPE. He completado el diagnóstico con un resultado avanzado y quisiera saber más sobre cómo su minicurso o mentorías pueden ayudarme a refinar mi práctica con casos complejos.`;
        }
        
        if (resultsSummary) resultsSummary.innerHTML = `Puntuación: <strong>${score} sobre ${maxScore}</strong> (Nivel ${levelText})`;
        if (ctaText) ctaText.innerText = ctaMessage;
        if (ctaBlock) ctaBlock.style.backgroundColor = ctaBgColor;
        if (ctaLink) {
            const encodedMessage = encodeURIComponent(whatsappMessage);
            ctaLink.href = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
        }
    }

    // --- INICIO DE LA APLICACIÓN ---
    initQuiz();
});
