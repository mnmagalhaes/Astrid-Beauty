document.addEventListener('DOMContentLoaded', function() {
    // 1. Configura a data mínima como a data de hoje
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = today;
        dateInput.addEventListener('change', generateTimeSlots);
    }
    
    // Submissão do formulário
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            confirmBooking();
        });
    }
    
    // Botão de Novo Agendamento (Reseta formulário e MANTÉM NA SEÇÃO DE AGENDAMENTO)
    const newBookingBtn = document.getElementById('new-booking');
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', function() {
            // Reseta o formulário e limpa horários selecionados
            document.getElementById('booking-form').reset();
            document.getElementById('time-slots').innerHTML = ''; 
            
            // Esconde a caixa de confirmação e reexibe o formulário de agendamento
            document.getElementById('confirmation').style.display = 'none';
            document.getElementById('booking-form').style.display = 'grid'; 
            
            // Rola suavemente para a própria seção de Agendamento
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Função que gera os horários e bloqueia Domingo e Segunda
function generateTimeSlots() {
    const dateInput = document.getElementById('date');
    const container = document.getElementById('time-slots');
    const errorMsg = document.getElementById('date-error');
    
    container.innerHTML = ''; // Limpa slots antigos

    if (!dateInput.value) return;

    // Converte a data selecionada
    const selectedDate = new Date(dateInput.value + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay(); // 0 = Domingo, 1 = Segunda

    // Bloqueio de Domingo (0) e Segunda (1)
    if (dayOfWeek === 0 || dayOfWeek === 1) {
        if (errorMsg) errorMsg.style.display = 'block';
        alert('O salão não abre aos domingos e segundas-feiras. Por favor, selecione uma data de terça a sábado.');
        dateInput.value = ''; // Limpa a data inválida
        return;
    } else {
        if (errorMsg) errorMsg.style.display = 'none';
    }
    
    // Horários das 08:00 às 18:30
    const times = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    
    times.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
        
        container.appendChild(slot);
    });
}

// Confirma o agendamento trocando o formulário pela confirmação dentro da mesma caixa
function confirmBooking() {
    const name = document.getElementById('name').value;
    const prof = document.getElementById('professional').value;
    const date = document.getElementById('date').value;
    const selectedTime = document.querySelector('.time-slot.selected');
    
    if (!selectedTime) {
        alert('Por favor, escolha um horário disponível.');
        return;
    }

    // Formata a data para exibir DD/MM/AAAA
    const formattedDate = date.split('-').reverse().join('/');
    
    // Oculta o formulário e exibe o bloco de confirmação no mesmo local
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    
    // Injeta os dados formatados
    document.getElementById('booking-details').innerHTML = `
        <p><strong>Cliente:</strong> ${name}</p>
        <p><strong>Atendimento:</strong> ${prof}</p>
        <p><strong>Data:</strong> ${formattedDate}</p>
        <p><strong>Horário:</strong> ${selectedTime.textContent}</p>
    `;

    // Garante que a tela permaneça centralizada no card do agendamento
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

/* ===================================================
   SLIDER DA HERO E ROLAGEM SUAVE NOS LINKS
=================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slides .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});