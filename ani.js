// Navegación responsive
      document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', function () {
          navLinks.classList.toggle('active');
          hamburger.innerHTML = navLinks.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
          });
        });

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#login') {
              showLoginModal();
              return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
              });
            }
          });
        });

        // Cambiar navbar al hacer scroll
        window.addEventListener('scroll', function () {
          const navbar = document.querySelector('.navbar');
          const backToTop = document.querySelector('.back-to-top');

          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }

          if (window.scrollY > 300) {
            backToTop.classList.add('active');
          } else {
            backToTop.classList.remove('active');
          }
        });

        // Botón volver arriba
        document.querySelector('.back-to-top').addEventListener('click', function (e) {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });

        // Formulario de contacto simplificado
        document.getElementById('formulario-contacto').addEventListener('submit', function (e) {
          e.preventDefault();
          window.location.href = "mailto:estudiantesccup@gmail.com";
        });

        // Funcionalidad de pestañas de carreras
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', function () {
            // Remover clase activa de todas las pestañas
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            // Añadir clase activa a la pestaña actual
            this.classList.add('active');

            // Ocultar todos los contenidos
            document.querySelectorAll('.carreras-content').forEach(c => c.classList.remove('active'));
            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
          });
        });

        // Funcionalidad de administrador
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginModal = document.getElementById('loginModal');
        const editModal = document.getElementById('editModal');
        const videoModal = document.getElementById('videoModal');
        const confirmDeleteModal = document.getElementById('confirmDeleteModal');
        const coverModal = document.getElementById('coverModal');
        const eleccionesCoverModal = document.getElementById('eleccionesCoverModal');
        const iconModal = document.getElementById('iconModal');
        const loginForm = document.getElementById('loginForm');
        const closeModals = document.querySelectorAll('.close-modal');
        const saveChangesBtn = document.getElementById('saveChanges');
        const saveAndExitBtn = document.getElementById('saveAndExit');
        const uploadVideoBtn = document.getElementById('uploadVideo');
        const cancelVideoBtn = document.getElementById('cancelVideo');
        const confirmDeleteBtn = document.getElementById('confirmDelete');
        const cancelDeleteBtn = document.getElementById('cancelDelete');
        const changeCoverBtn = document.getElementById('changeCoverBtn');
        const changeEleccionesCoverBtn = document.getElementById('changeEleccionesCoverBtn');
        const saveCoverImage = document.getElementById('saveCoverImage');
        const saveEleccionesCoverImage = document.getElementById('saveEleccionesCoverImage');
        const saveIconImage = document.getElementById('saveIconImage');
        const cancelCoverChange = document.getElementById('cancelCoverChange');
        const cancelEleccionesCoverChange = document.getElementById('cancelEleccionesCoverChange');
        const cancelIconChange = document.getElementById('cancelIconChange');
        const coverImageUrl = document.getElementById('coverImageUrl');
        const eleccionesCoverImageUrl = document.getElementById('eleccionesCoverImageUrl');
        const iconImageUrl = document.getElementById('iconImageUrl');
        const coverImageUpload = document.getElementById('coverImageUpload');
        const eleccionesCoverImageUpload = document.getElementById('eleccionesCoverImageUpload');
        const iconImageUpload = document.getElementById('iconImageUpload');
        const fullCover = document.querySelector('.full-cover');
        const eleccionesCover = document.querySelector('.elecciones-cover');

        // Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxVideo = document.getElementById('lightbox-video');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');

        let currentEditingElement = null;
        let isAdmin = false;
        let elementToDelete = null;
        let currentMediaIndex = 0;
        let mediaElements = [];

        // Mostrar modal de login
        function showLoginModal() {
          loginModal.style.display = 'flex';
          document.getElementById('loginError').style.display = 'none';
        }

        // Cerrar sesión
        function logout() {
          isAdmin = false;
          document.body.classList.remove('admin-mode');
          adminLoginBtn.style.display = 'block';
          logoutBtn.style.display = 'none';
          alert('Has cerrado sesión correctamente.');
        }

        // Cerrar modales
        closeModals.forEach(btn => {
          btn.addEventListener('click', function () {
            loginModal.style.display = 'none';
            editModal.style.display = 'none';
            videoModal.style.display = 'none';
            confirmDeleteModal.style.display = 'none';
            coverModal.style.display = 'none';
            eleccionesCoverModal.style.display = 'none';
            iconModal.style.display = 'none';
          });
        });

        // Cerrar al hacer clic fuera del modal
        window.addEventListener('click', function (e) {
          if (e.target === loginModal) {
            loginModal.style.display = 'none';
          }
          if (e.target === editModal) {
            editModal.style.display = 'none';
          }
          if (e.target === videoModal) {
            videoModal.style.display = 'none';
          }
          if (e.target === confirmDeleteModal) {
            confirmDeleteModal.style.display = 'none';
          }
          if (e.target === coverModal) {
            coverModal.style.display = 'none';
          }
          if (e.target === eleccionesCoverModal) {
            eleccionesCoverModal.style.display = 'none';
          }
          if (e.target === iconModal) {
            iconModal.style.display = 'none';
          }
          if (e.target === lightbox) {
            closeLightbox();
          }
        });

        // Login
        loginForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          // Credenciales: cecup / 1234
          if (username === 'cecup' && password === '1234') {
            isAdmin = true;
            document.body.classList.add('admin-mode');
            loginModal.style.display = 'none';
            adminLoginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            alert('Has iniciado sesión como administrador. Ahora puedes editar el contenido.');

            // Cargar datos guardados si existen
            loadSavedData();
          } else {
            document.getElementById('loginError').style.display = 'block';
          }
        });

        // Cerrar sesión
        logoutBtn.addEventListener('click', function (e) {
          e.preventDefault();
          logout();
        });

        // Guardar datos en localStorage
        function saveData() {
          const data = {};
          document.querySelectorAll('.editable').forEach(el => {
            const id = el.getAttribute('data-id');
            if (el.classList.contains('editable-image') || el.classList.contains('editable-icon')) {
              data[id] = el.src || el.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
            } else {
              data[id] = el.textContent;
            }
          });
          localStorage.setItem('cecupData', JSON.stringify(data));
        }

        // Cargar datos guardados
        function loadSavedData() {
          const savedData = localStorage.getItem('cecupData');
          if (savedData) {
            const data = JSON.parse(savedData);
            for (const [id, content] of Object.entries(data)) {
              const element = document.querySelector(`[data-id="${id}"]`);
              if (element) {
                if (element.classList.contains('editable-image')) {
                  element.src = content;
                } else if (element.classList.contains('editable-icon')) {
                  element.style.backgroundImage = `url('${content}')`;
                } else {
                  element.textContent = content;
                }
              }
            }
          }

          // Cargar imagen de portada guardada
          const savedCoverImage = localStorage.getItem('cecupCoverImage');
          if (savedCoverImage) {
            fullCover.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${savedCoverImage}')`;
          }

          // Cargar imagen de portada de elecciones guardada
          const savedEleccionesCoverImage = localStorage.getItem('cecupEleccionesCoverImage');
          if (savedEleccionesCoverImage) {
            eleccionesCover.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${savedEleccionesCoverImage}')`;
          }
        }

        // Efecto de partículas
        function createParticles() {
          const particlesContainer = document.getElementById('particles');
          const eleccionesParticlesContainer = document.getElementById('elecciones-particles');
          const particleCount = 30;

          for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Tamaño aleatorio entre 2px y 5px
            const size = Math.random() * 3 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Posición inicial aleatoria
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Animación
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `float ${duration}s linear ${delay}s infinite`;

            // Añadir al contenedor
            particlesContainer.appendChild(particle);

            // Crear partículas para la portada de elecciones
            if (eleccionesParticlesContainer) {
              const eleccionesParticle = particle.cloneNode(true);
              eleccionesParticlesContainer.appendChild(eleccionesParticle);
            }
          }

          // Crear keyframes para la animación
          const style = document.createElement('style');
          style.innerHTML = `
                    @keyframes float {
                        0% {
                            transform: translateY(0) translateX(0);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100}px);
                            opacity: 0;
                        }
                    }
                `;
          document.head.appendChild(style);
        }

        // Inicializar partículas
        createParticles();

        // Mostrar modal para cambiar imagen de portada
        changeCoverBtn.addEventListener('click', function () {
          coverModal.style.display = 'flex';
        });

        // Mostrar modal para cambiar imagen de portada de elecciones
        if (changeEleccionesCoverBtn) {
          changeEleccionesCoverBtn.addEventListener('click', function () {
            eleccionesCoverModal.style.display = 'flex';
          });
        }

        // Cerrar modal de portada
        cancelCoverChange.addEventListener('click', function () {
          coverModal.style.display = 'none';
          coverImageUrl.value = '';
          coverImageUpload.value = '';
        });

        // Cerrar modal de portada de elecciones
        if (cancelEleccionesCoverChange) {
          cancelEleccionesCoverChange.addEventListener('click', function () {
            eleccionesCoverModal.style.display = 'none';
            eleccionesCoverImageUrl.value = '';
            eleccionesCoverImageUpload.value = '';
          });
        }

        // Guardar nueva imagen de portada
        saveCoverImage.addEventListener('click', function () {
          let imageUrl = coverImageUrl.value;

          // Si se subió un archivo, convertirlo a URL
          if (coverImageUpload.files && coverImageUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
              imageUrl = e.target.result;
              applyNewCover(imageUrl);
            };
            reader.readAsDataURL(coverImageUpload.files[0]);
          } else if (imageUrl) {
            applyNewCover(imageUrl);
          } else {
            alert('Por favor, ingresa una URL o selecciona una imagen');
            return;
          }

          coverModal.style.display = 'none';
        });

        // Guardar nueva imagen de portada de elecciones
        if (saveEleccionesCoverImage) {
          saveEleccionesCoverImage.addEventListener('click', function () {
            let imageUrl = eleccionesCoverImageUrl.value;

            // Si se subió un archivo, convertirlo a URL
            if (eleccionesCoverImageUpload.files && eleccionesCoverImageUpload.files[0]) {
              const reader = new FileReader();
              reader.onload = function (e) {
                imageUrl = e.target.result;
                applyNewEleccionesCover(imageUrl);
              };
              reader.readAsDataURL(eleccionesCoverImageUpload.files[0]);
            } else if (imageUrl) {
              applyNewEleccionesCover(imageUrl);
            } else {
              alert('Por favor, ingresa una URL o selecciona una imagen');
              return;
            }

            eleccionesCoverModal.style.display = 'none';
          });
        }

        // Aplicar nueva imagen de fondo
        function applyNewCover(url) {
          fullCover.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${url}')`;

          // Guardar en localStorage si está en modo admin
          if (document.body.classList.contains('admin-mode')) {
            localStorage.setItem('cecupCoverImage', url);
          }
        }

        // Aplicar nueva imagen de fondo de elecciones
        function applyNewEleccionesCover(url) {
          eleccionesCover.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${url}')`;

          // Guardar en localStorage si está en modo admin
          if (document.body.classList.contains('admin-mode')) {
            localStorage.setItem('cecupEleccionesCoverImage', url);
          }
        }

        // Hacer elementos editables
        document.addEventListener('click', function (e) {
          if (!isAdmin) return;

          const editableElement = e.target.closest('.editable');
          const editableImage = e.target.closest('.editable-image');
          const editableIcon = e.target.closest('.editable-icon');
          const addMediaBtn = e.target.closest('.add-media-btn');
          const uploadVideoBtn = e.target.closest('.upload-video-btn');
          const deleteMediaBtn = e.target.closest('.delete-media-btn');

          if (editableElement) {
            e.preventDefault();
            currentEditingElement = editableElement;
            document.getElementById('editContent').value = editableElement.textContent;
            document.querySelector('.image-upload').style.display = 'none';
            editModal.style.display = 'flex';
          }

          if (editableImage) {
            e.preventDefault();
            currentEditingElement = editableImage;
            document.getElementById('editContent').value = '';
            document.querySelector('.image-upload').style.display = 'block';
            editModal.style.display = 'flex';
          }

          if (editableIcon) {
            e.preventDefault();
            e.stopPropagation();
            currentEditingElement = editableIcon;
            iconImageUrl.value = editableIcon.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
            iconModal.style.display = 'flex';
          }

          if (addMediaBtn) {
            e.preventDefault();
            e.stopPropagation();
            const mediaItem = addMediaBtn.closest('.galeria-item');
            currentEditingElement = mediaItem.querySelector('img, video');
            document.getElementById('editContent').value = '';
            document.querySelector('.image-upload').style.display = 'block';
            editModal.style.display = 'flex';
          }

          if (uploadVideoBtn) {
            e.preventDefault();
            e.stopPropagation();
            currentEditingElement = uploadVideoBtn.closest('.galeria-item');
            videoModal.style.display = 'flex';
          }

          if (deleteMediaBtn) {
            e.preventDefault();
            e.stopPropagation();
            elementToDelete = deleteMediaBtn.closest('.galeria-item');
            confirmDeleteModal.style.display = 'flex';
          }
        });

        // Guardar cambios
        saveChangesBtn.addEventListener('click', function () {
          if (!currentEditingElement) return;

          const newContent = document.getElementById('editContent').value;

          if (currentEditingElement.classList.contains('editable-image')) {
            const fileInput = document.getElementById('editImage');
            if (fileInput.files && fileInput.files[0]) {
              const reader = new FileReader();
              reader.onload = function (e) {
                currentEditingElement.src = e.target.result;
                saveData(); // Guardar cambios
              };
              reader.readAsDataURL(fileInput.files[0]);
            }
          } else {
            currentEditingElement.textContent = newContent;
            saveData(); // Guardar cambios
          }
        });

        // Guardar y salir
        saveAndExitBtn.addEventListener('click', function () {
          saveChangesBtn.click();
          editModal.style.display = 'none';
          saveData(); // Guardar cambios antes de salir
        });

        // Subir video
        uploadVideoBtn.addEventListener('click', function () {
          const videoFile = document.getElementById('videoFile').files[0];
          const videoTitle = document.getElementById('videoTitle').value;

          if (videoFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
              const videoElement = currentEditingElement.querySelector('video') || document.createElement('video');
              videoElement.controls = true;
              videoElement.innerHTML = `<source src="${e.target.result}" type="${videoFile.type}">Tu navegador no soporta videos.`;

              if (!currentEditingElement.querySelector('video')) {
                currentEditingElement.innerHTML = '';
                currentEditingElement.appendChild(videoElement);
              }

              // Actualizar el tipo a video
              const tipoElement = currentEditingElement.querySelector('.tipo');
              if (tipoElement) {
                tipoElement.textContent = 'Video';
              }

              videoModal.style.display = 'none';
              saveData(); // Guardar cambios
            };
            reader.readAsDataURL(videoFile);
          }
        });

        // Cancelar subida de video
        cancelVideoBtn.addEventListener('click', function () {
          videoModal.style.display = 'none';
        });

        // Confirmar eliminación
        confirmDeleteBtn.addEventListener('click', function () {
          if (elementToDelete) {
            elementToDelete.remove();
            saveData(); // Guardar cambios
            confirmDeleteModal.style.display = 'none';
          }
        });

        // Cancelar eliminación
        cancelDeleteBtn.addEventListener('click', function () {
          confirmDeleteModal.style.display = 'none';
          elementToDelete = null;
        });

        // Guardar nuevo icono de servicio
        saveIconImage.addEventListener('click', function () {
          let imageUrl = iconImageUrl.value;

          // Si se subió un archivo, convertirlo a URL
          if (iconImageUpload.files && iconImageUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
              imageUrl = e.target.result;
              currentEditingElement.style.backgroundImage = `url('${imageUrl}')`;
              currentEditingElement.querySelector('i').style.display = 'none';
              saveData(); // Guardar cambios
            };
            reader.readAsDataURL(iconImageUpload.files[0]);
          } else if (imageUrl) {
            currentEditingElement.style.backgroundImage = `url('${imageUrl}')`;
            currentEditingElement.querySelector('i').style.display = 'none';
            saveData(); // Guardar cambios
          } else {
            alert('Por favor, ingresa una URL o selecciona una imagen');
            return;
          }

          iconModal.style.display = 'none';
        });

        // Cancelar cambio de icono
        cancelIconChange.addEventListener('click', function () {
          iconModal.style.display = 'none';
          iconImageUrl.value = '';
          iconImageUpload.value = '';
        });

        // Funcionalidad de Lightbox para imágenes y videos
        function initLightbox() {
          // Recoger todas las imágenes y videos que se pueden ampliar
          const images = document.querySelectorAll('.editable-image, .servicio-imagen img, .hero-image img, .ivu-image img, .cecup-image img, .elecciones-image img, .noticia-image img');
          const videos = document.querySelectorAll('video');

          // Agregar eventos a las imágenes
          images.forEach((img, index) => {
            img.addEventListener('click', function (e) {
              if (isAdmin) return; // No abrir lightbox en modo admin
              e.preventDefault();
              currentMediaIndex = index;
              mediaElements = [...images]; // Convertir NodeList a Array
              openLightbox(this.src, 'image', this.alt);
            });
          });

          // Agregar eventos a los videos
          videos.forEach((video, index) => {
            if (video.parentElement.classList.contains('galeria-item')) {
              video.addEventListener('click', function (e) {
                if (isAdmin) return; // No abrir lightbox en modo admin
                e.preventDefault();
                currentMediaIndex = images.length + index;
                mediaElements = [...images, ...videos]; // Combinar imágenes y videos
                const source = video.querySelector('source');
                openLightbox(source ? source.src : '', 'video', 'Video');
              });
            }
          });

          // Eventos para navegación en lightbox
          lightboxClose.addEventListener('click', closeLightbox);
          lightboxPrev.addEventListener('click', showPrevMedia);
          lightboxNext.addEventListener('click', showNextMedia);

          // Eventos de teclado
          document.addEventListener('keydown', function (e) {
            if (lightbox.classList.contains('active')) {
              if (e.key === 'Escape') {
                closeLightbox();
              } else if (e.key === 'ArrowLeft') {
                showPrevMedia();
              } else if (e.key === 'ArrowRight') {
                showNextMedia();
              }
            }
          });
        }

        // Abrir lightbox
        function openLightbox(src, type, caption) {
          if (type === 'image') {
            lightboxImage.src = src;
            lightboxImage.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
          } else if (type === 'video') {
            lightboxVideo.querySelector('source').src = src;
            lightboxVideo.load();
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.play();
          }

          lightboxCaption.textContent = caption || '';
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Evitar scroll del body
        }

        // Cerrar lightbox
        function closeLightbox() {
          lightbox.classList.remove('active');
          lightboxVideo.pause();
          document.body.style.overflow = ''; // Restaurar scroll del body
        }

        // Mostrar elemento anterior en lightbox
        function showPrevMedia() {
          if (mediaElements.length === 0) return;

          currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
          const element = mediaElements[currentMediaIndex];

          if (element.tagName === 'IMG') {
            openLightbox(element.src, 'image', element.alt);
          } else if (element.tagName === 'VIDEO') {
            const source = element.querySelector('source');
            openLightbox(source ? source.src : '', 'video', 'Video');
          }
        }

        // Mostrar siguiente elemento en lightbox
        function showNextMedia() {
          if (mediaElements.length === 0) return;

          currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
          const element = mediaElements[currentMediaIndex];

          if (element.tagName === 'IMG') {
            openLightbox(element.src, 'image', element.alt);
          } else if (element.tagName === 'VIDEO') {
            const source = element.querySelector('source');
            openLightbox(source ? source.src : '', 'video', 'Video');
          }
        }

        // Inicializar lightbox
        initLightbox();

        // Activar enlace activo según scroll
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', function () {
          let current = '';

          sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
              current = section.getAttribute('id');
            }
          });

          document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
              a.classList.add('active');
            }
          });
        });

        // Funcionalidad de "Ver más" en servicios
        document.querySelectorAll('.ver-mas-btn').forEach(btn => {
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            const detalles = this.nextElementSibling;
            detalles.classList.toggle('active');
            this.textContent = detalles.classList.contains('active') ? 'Ver menos' : 'Ver más';
          });
        });
      });

      // Carrusel automático
      document.addEventListener('DOMContentLoaded', function() {
          const slides = document.querySelectorAll('.carousel-slide');
          const indicators = document.querySelectorAll('.indicator');
          let currentSlide = 0;
          const totalSlides = slides.length;
          
          // Función para mostrar slide específico
          function showSlide(index) {
              // Ocultar todos los slides
              slides.forEach(slide => slide.classList.remove('active'));
              indicators.forEach(indicator => indicator.classList.remove('active'));
              
              // Mostrar slide actual
              slides[index].classList.add('active');
              indicators[index].classList.add('active');
          }
          
          // Función para ir al siguiente slide
          function nextSlide() {
              currentSlide = (currentSlide + 1) % totalSlides;
              showSlide(currentSlide);
          }
          
          // Cambio automático cada 4 segundos
          setInterval(nextSlide, 4000);
          
          // Funcionalidad de los indicadores
          indicators.forEach((indicator, index) => {
              indicator.addEventListener('click', () => {
                  currentSlide = index;
                  showSlide(currentSlide);
              });
          });
      });

      document.addEventListener('DOMContentLoaded', function () {
        // Edición de imágenes del carrusel
        const editBtns = document.querySelectorAll('.edit-carousel-img-btn');
        const modal = document.getElementById('carouselImgModal');
        const closeModal = modal.querySelector('.close-modal');
        const urlInput = document.getElementById('carouselImgUrl');
        const fileInput = document.getElementById('carouselImgUpload');
        const saveBtn = document.getElementById('saveCarouselImg');
        const cancelBtn = document.getElementById('cancelCarouselImg');
        let currentSlide = null;

        editBtns.forEach(btn => {
          btn.addEventListener('click', function () {
            currentSlide = btn.getAttribute('data-slide');
            urlInput.value = '';
            fileInput.value = '';
            modal.style.display = 'flex';
          });
        });

        closeModal.addEventListener('click', () => modal.style.display = 'none');
        cancelBtn.addEventListener('click', () => modal.style.display = 'none');

        saveBtn.addEventListener('click', function () {
          const url = urlInput.value.trim();
          if (url && currentSlide !== null) {
            document.querySelector(`.carousel-slide img[data-slide="${currentSlide}"]`).src = url;
            modal.style.display = 'none';
          } else if (fileInput.files[0] && currentSlide !== null) {
            const reader = new FileReader();
            reader.onload = function (e) {
              document.querySelector(`.carousel-slide img[data-slide="${currentSlide}"]`).src = e.target.result;
              modal.style.display = 'none';
            };
            reader.readAsDataURL(fileInput.files[0]);
          }
        });

        // Cierra el modal si se hace clic fuera del contenido
        window.addEventListener('click', function (e) {
          if (e.target === modal) modal.style.display = 'none';
        });
      });
