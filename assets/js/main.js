// Main JS Core for Zhiwen Yang's Academic Website

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Dark/Light Theme Toggle
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or defaults (Default to Light Mode)
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
        toggleIcon.className = 'fa-solid fa-sun';
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
        toggleIcon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark-mode')) {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            toggleIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
            toggleIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // 2. SPA Hash-based Tab Routing & Header Scroll Hide
    // ==========================================
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    
    // Hide/Show navbar based on scroll direction
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 150) {
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    function handleRouting() {
        const hash = window.location.hash || '#home';
        
        // Subpage routing for detailed academic blog posts
        if (hash.startsWith('#blog-post/')) {
            const postId = hash.replace('#blog-post/', '');
            const post = typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS.find(p => p.id === postId) : null;
            
            if (post) {
                document.querySelectorAll('.page-tab').forEach(tab => {
                    tab.style.display = 'none';
                    tab.style.opacity = 0;
                });
                
                const targetTab = document.getElementById('tab-blog-post');
                if (targetTab) {
                    targetTab.style.display = 'block';
                    renderDetailedBlogPost(post);
                    
                    const heroCanvas = document.getElementById('hero-canvas');
                    if (heroCanvas) {
                        heroCanvas.style.display = 'none';
                    }
                    
                    gsap.fromTo(targetTab, 
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                    );
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#blog') {
                            link.classList.add('active');
                        }
                    });
                    
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }
                return;
            }
        }
        
        const targetTabId = 'tab-' + hash.replace('#', '');
        const targetTab = document.getElementById(targetTabId);
        
        if (targetTab) {
            // Hide all tabs
            document.querySelectorAll('.page-tab').forEach(tab => {
                tab.style.display = 'none';
                tab.style.opacity = 0;
            });
            
            // Show target tab
            targetTab.style.display = 'block';

            // Toggle Three.js Background canvas visibility (only show on Home tab)
            const heroCanvas = document.getElementById('hero-canvas');
            if (heroCanvas) {
                heroCanvas.style.display = (hash === '#home') ? 'block' : 'none';
            }
            
            // Trigger GSAP fade-in
            gsap.fromTo(targetTab, 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
            
            // Update active state in nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });
            
            // Scroll back to top
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // Trigger horizontal timeline flow line animation when switching to experience tab
            if (hash === '#experience') {
                const flowLine = document.getElementById('timeline-flow');
                if (flowLine) {
                    // Let the thread breathe then run animation
                    setTimeout(() => {
                        flowLine.style.strokeDashoffset = '0';
                        
                        // Cascade animate node dots
                        const timelineNodes = document.querySelectorAll('.timeline-node');
                        timelineNodes.forEach((node, index) => {
                            setTimeout(() => {
                                node.querySelector('.node-dot').style.transform = 'scale(1.2)';
                                node.querySelector('.node-dot').style.backgroundColor = 'var(--accent-cyan)';
                                if (node.classList.contains('node-future')) {
                                    node.querySelector('.node-dot').style.backgroundColor = 'var(--accent-purple)';
                                }
                            }, index * 120);
                        });
                    }, 200);
                }
            }
            
            // Initialize Blog rendering when switching to blog tab
            if (hash === '#blog') {
                renderBlogPosts();
            }
            
            // Initialize Contact page feedback form when switching to contact tab
            if (hash === '#contact') {
                renderBlogPosts(); // Populate the dropdown select field
                if (typeof initDiscussionForum === 'function') {
                    initDiscussionForum();
                }
            }
        }
    }
    
    window.addEventListener('hashchange', handleRouting);
    // Initial routing call
    handleRouting();

    // ==========================================
    // 2a. Mobile Navigation Toggle Menu Handler
    // ==========================================
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });

        // Close menu when clicking outside of navbar
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    // ==========================================
    // 2b. Bilingual Bio Toggle (EN/ZH Switcher)
    // ==========================================
    const bioButtons = document.querySelectorAll('.bio-btn');
    const bioEn = document.getElementById('bio-en');
    const bioZh = document.getElementById('bio-zh');
    
    bioButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            
            // Save selection to local storage
            localStorage.setItem('preferred-lang', lang);
            
            // Sync all language toggle buttons active states
            bioButtons.forEach(b => {
                if (b.getAttribute('data-lang') === lang) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            
            // Toggle bio elements
            if (lang === 'zh') {
                if (bioEn) bioEn.style.display = 'none';
                if (bioZh) {
                    bioZh.style.display = 'block';
                    gsap.fromTo(bioZh, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
                }
            } else {
                if (bioZh) bioZh.style.display = 'none';
                if (bioEn) {
                    bioEn.style.display = 'block';
                    gsap.fromTo(bioEn, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
                }
            }

            // Sync other language-toggleable elements on the page (Research page, etc.)
            const enElements = document.querySelectorAll('.lang-en');
            const zhElements = document.querySelectorAll('.lang-zh');
            if (lang === 'zh') {
                enElements.forEach(el => el.style.display = 'none');
                zhElements.forEach(el => {
                    const isInline = ['SPAN', 'I', 'B', 'STRONG', 'A'].includes(el.tagName);
                    el.style.display = isInline ? 'inline' : 'block';
                    gsap.fromTo(el, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
                });
            } else {
                zhElements.forEach(el => el.style.display = 'none');
                enElements.forEach(el => {
                    const isInline = ['SPAN', 'I', 'B', 'STRONG', 'A'].includes(el.tagName);
                    el.style.display = isInline ? 'inline' : 'block';
                    gsap.fromTo(el, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
                });
            }
        });
    });

    // Restore preferred language
    const preferredLang = localStorage.getItem('preferred-lang') || 'en';
    const initialLangBtn = document.querySelector(`.bio-btn[data-lang="${preferredLang}"]`);
    if (initialLangBtn) {
        initialLangBtn.click();
    }

    // ==========================================
    // 3. Scroll Entrance Animations (IntersectionObserver)
    // ==========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Unobserve after showing
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        elementObserver.observe(el);
    });

    // ==========================================
    // 4. Figure Lightbox / Image Zoom Viewer
    // ==========================================
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    
    // Event listeners on publication and gallery visual elements
    const zoomableElements = document.querySelectorAll('.pub-visual, .pub-row-thumb, .home-pub-thumb, .gallery-image-box');
    
    zoomableElements.forEach(element => {
        element.addEventListener('click', () => {
            const img = element.querySelector('img');
            if (img) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                modalCaption.textContent = img.alt || "Research Figure View";
                
                // GSAP Entry Animation for Modal Content
                gsap.fromTo(modalImg, 
                    { scale: 0.8, opacity: 0 }, 
                    { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
                );
            }
        });
    });
    
    const closeModal = () => {
        gsap.to(modalImg, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ==========================================
    // 4b. BibTeX Citation Toggle & Copy Handler
    // ==========================================
    const bibtexToggles = document.querySelectorAll('.btn-bibtex-toggle');
    bibtexToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            if (panel) {
                const isHidden = panel.style.display === 'none';
                panel.style.display = isHidden ? 'block' : 'none';
                toggle.classList.toggle('active', isHidden);
            }
        });
    });

    const copyBibtexBtns = document.querySelectorAll('.btn-copy-bibtex');
    copyBibtexBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);
            if (codeBlock) {
                const textToCopy = codeBlock.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Visual feedback
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    
                    // Style feedback
                    btn.style.borderColor = 'var(--accent-purple)';
                    btn.style.color = 'var(--accent-purple)';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.borderColor = '';
                        btn.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy BibTeX: ', err);
                });
            }
        });
    });

    // ==========================================
    // 5. Three.js 3D WebGL Background Setup (Interactive Particles)
    // ==========================================
    const canvas = document.getElementById('hero-canvas');
    let scene, camera, renderer, particleSystem;
    const particleCount = 120;
    
    // Switch to quickly toggle rollback/fallback to original single-color circular particles
    const USE_LEGACY_PARTICLES = true;
    
    // Arrays to hold particle data for the custom physics simulation
    let originalPositionsArr, velocitiesArr, spinsArr;

    // Track mouse coordinate for interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    // Custom shader source code for rotated multicolored dash particles
    const vertexShader = `
        uniform float uDarkMode;
        attribute float size;
        attribute vec3 lightColor;
        attribute vec3 darkColor;
        attribute float rotation;
        varying vec3 vColor;
        varying float vRotation;
        void main() {
            // Linearly interpolate color based on current dark mode state
            vColor = mix(lightColor, darkColor, uDarkMode);
            vRotation = rotation;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        varying float vRotation;
        void main() {
            float angle = vRotation;
            float s = sin(angle);
            float c = cos(angle);
            vec2 coords = gl_PointCoord - 0.5;
            vec2 rotatedCoords = vec2(
                coords.x * c - coords.y * s,
                coords.x * s + coords.y * c
            ) + 0.5;
            
            if (rotatedCoords.x < 0.0 || rotatedCoords.x > 1.0 || rotatedCoords.y < 0.0 || rotatedCoords.y > 1.0) {
                discard;
            }
            
            vec4 texColor = texture2D(pointTexture, rotatedCoords);
            if (texColor.a < 0.05) discard;
            gl_FragColor = vec4(vColor, texColor.a);
        }
    `;
    
    function initThree() {
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 250;
        
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        originalPositionsArr = new Float32Array(particleCount * 3);
        velocitiesArr = new Float32Array(particleCount * 3);
        
        // Color palettes optimized for light mode (high contrast) and dark mode (neon/luminous)
        const lightColors = new Float32Array(particleCount * 3);
        const darkColors = new Float32Array(particleCount * 3);
        
        const rotations = new Float32Array(particleCount);
        spinsArr = new Float32Array(particleCount);
        const sizes = new Float32Array(particleCount);
        
        // Single low-saturation accent. Academic restraint: the background should
        // read as faint texture, never as decoration competing with the content.
        const lightPalette = [
            new THREE.Color('#7c9aa6'), // Muted slate-teal
            new THREE.Color('#8fa8b2')  // Slightly lighter, for depth only
        ];

        const darkPalette = [
            new THREE.Color('#4d6b74'), // Muted slate-teal, dimmed
            new THREE.Color('#5a7a84')
        ];
        
        // Distribute points in a spherical/cloud structure
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const distance = Math.random() * 240 + 20;
            
            const x = distance * Math.sin(phi) * Math.cos(theta);
            const y = distance * Math.sin(phi) * Math.sin(theta);
            const z = distance * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            originalPositionsArr[i * 3] = x;
            originalPositionsArr[i * 3 + 1] = y;
            originalPositionsArr[i * 3 + 2] = z;
            
            // Random slow velocity
            velocitiesArr[i * 3] = (Math.random() - 0.5) * 0.12;
            velocitiesArr[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
            velocitiesArr[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
            
            // Assign light mode color
            const lColor = lightPalette[Math.floor(Math.random() * lightPalette.length)];
            lightColors[i * 3] = lColor.r;
            lightColors[i * 3 + 1] = lColor.g;
            lightColors[i * 3 + 2] = lColor.b;
            
            // Assign dark mode color
            const dColor = darkPalette[Math.floor(Math.random() * darkPalette.length)];
            darkColors[i * 3] = dColor.r;
            darkColors[i * 3 + 1] = dColor.g;
            darkColors[i * 3 + 2] = dColor.b;
            
            // Rotation angle & spin speed
            rotations[i] = Math.random() * Math.PI * 2;
            spinsArr[i] = (Math.random() - 0.5) * 0.012;
            
            // Dash size (larger and thicker)
            sizes[i] = Math.random() * 12 + 12;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        let material;
        
        if (USE_LEGACY_PARTICLES) {
            // Revert fallback configuration: circular purple/cyan glow dots
            const particleTexture = createCircleTexture();
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            const particleColor = isDarkMode ? 0x8a2be2 : 0x7c5dfa;
            const blendingMode = isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending;
            
            material = new THREE.PointsMaterial({
                size: 3.5,
                color: particleColor,
                transparent: true,
                opacity: isDarkMode ? 0.7 : 0.45,
                map: particleTexture,
                blending: blendingMode,
                depthWrite: false
            });
        } else {
            // New optimized configuration: colorful capsule dashes
            geometry.setAttribute('lightColor', new THREE.BufferAttribute(lightColors, 3));
            geometry.setAttribute('darkColor', new THREE.BufferAttribute(darkColors, 3));
            geometry.setAttribute('rotation', new THREE.BufferAttribute(rotations, 1));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            
            const dashTexture = createDashTexture();
            material = new THREE.ShaderMaterial({
                uniforms: {
                    pointTexture: { value: dashTexture },
                    uDarkMode: { value: 0.0 }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                depthWrite: false,
                blending: THREE.NormalBlending
            });
        }
        
        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
        
        // Event Listeners
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);
        
        // Start animation loop
        animate();
    }


    
    // Dynamic canvas texture builder for the capsule/dash shape (Google Antigravity style)
    function createDashTexture() {
        const canvasTexture = document.createElement('canvas');
        canvasTexture.width = 64;
        canvasTexture.height = 64;
        const ctx = canvasTexture.getContext('2d');
        
        ctx.clearRect(0, 0, 64, 64);
        
        // Solid white, high-contrast thick rounded line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(32, 12);
        ctx.lineTo(32, 52);
        ctx.stroke();
        
        const texture = new THREE.CanvasTexture(canvasTexture);
        texture.minFilter = THREE.LinearFilter;
        return texture;
    }
    
    // Dynamic canvas texture builder (soft circular particle)
    function createCircleTexture() {
        const canvasSize = 16;
        const canvasTexture = document.createElement('canvas');
        canvasTexture.width = canvasSize;
        canvasTexture.height = canvasSize;
        const ctx = canvasTexture.getContext('2d');
        
        const gradient = ctx.createRadialGradient(
            canvasSize / 2, canvasSize / 2, 0,
            canvasSize / 2, canvasSize / 2, canvasSize / 2
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(28, 220, 220, 0.8)'); // Cyan core
        gradient.addColorStop(1, 'rgba(124, 93, 250, 0)');     // Purple edge fading
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        
        return new THREE.CanvasTexture(canvasTexture);
    }
    
    function onMouseMove(event) {
        // Mouse interaction disabled so mouse movement won't move particles
        mouse.targetX = 0;
        mouse.targetY = 0;
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function renderStatic() {
        if (!renderer || !scene || !camera) return;
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        if (particleSystem && particleSystem.material) {
            if (USE_LEGACY_PARTICLES) {
                particleSystem.material.color.setHex(isDarkMode ? 0x7c5dfa : 0x5c3dfa);
                particleSystem.material.opacity = isDarkMode ? 0.7 : 0.45;
                particleSystem.material.blending = isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending;
                particleSystem.material.needsUpdate = true;
            } else if (particleSystem.material.uniforms && particleSystem.material.uniforms.uDarkMode) {
                particleSystem.material.uniforms.uDarkMode.value = isDarkMode ? 1.0 : 0.0;
            }
        }
        renderer.render(scene, camera);
    }

    function animate() {
        renderStatic();
    }

    // Global liveness tracker for WebGL rendering
    let isHeroVisible = true;
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isHeroVisible = entry.isIntersecting;
            });
        }, { threshold: 0 });
        heroObserver.observe(heroSection);
    }
    
    // Dynamic canvas texture builder for the capsule/dash shape (Google Antigravity style)
    function createDashTexture() {
        const canvasTexture = document.createElement('canvas');
        canvasTexture.width = 64;
        canvasTexture.height = 64;
        const ctx = canvasTexture.getContext('2d');
        
        ctx.clearRect(0, 0, 64, 64);
        
        // Solid white, high-contrast thick rounded line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(32, 12);
        ctx.lineTo(32, 52);
        ctx.stroke();
        
        const texture = new THREE.CanvasTexture(canvasTexture);
        texture.minFilter = THREE.LinearFilter;
        return texture;
    }
    
    // Dynamic canvas texture builder (soft circular particle)
    function createCircleTexture() {
        const canvasSize = 16;
        const canvasTexture = document.createElement('canvas');
        canvasTexture.width = canvasSize;
        canvasTexture.height = canvasSize;
        const ctx = canvasTexture.getContext('2d');
        
        const gradient = ctx.createRadialGradient(
            canvasSize / 2, canvasSize / 2, 0,
            canvasSize / 2, canvasSize / 2, canvasSize / 2
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(28, 220, 220, 0.8)'); // Cyan core
        gradient.addColorStop(1, 'rgba(124, 93, 250, 0)');     // Purple edge fading
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        
        return new THREE.CanvasTexture(canvasTexture);
    }
    
    function onMouseMove(event) {
        // Mouse interaction disabled so mouse movement won't move particles
        mouse.targetX = 0;
        mouse.targetY = 0;
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Pause WebGL rendering when hero is not in viewport or active tab is not home
        const currentTabHash = window.location.hash || '#home';
        if (currentTabHash !== '#home' || !isHeroVisible) {
            return; // Exit early to save GPU and battery
        }
        
        // Smoothly interpolate mouse positions
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
        
        // Rotate background systems based on scroll positions
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        
        if (USE_LEGACY_PARTICLES) {
            // Legacy Animation loop: rotate static spherical cloud
            particleSystem.rotation.y += 0.0008;
            particleSystem.rotation.x += 0.0003;
            
            particleSystem.rotation.y = scrollPercent * Math.PI * 0.5 + (mouse.x * 0.1);
            particleSystem.rotation.x = scrollPercent * Math.PI * 0.2 + (-mouse.y * 0.1);
            
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            if (isDarkMode) {
                particleSystem.material.color.setHex(0x7c5dfa);
                particleSystem.material.opacity = 0.7;
                particleSystem.material.blending = THREE.AdditiveBlending;
            } else {
                particleSystem.material.color.setHex(0x5c3dfa);
                particleSystem.material.opacity = 0.45;
                particleSystem.material.blending = THREE.NormalBlending;
            }
            particleSystem.material.needsUpdate = true;
        } else {
            // Update dark mode uniform state dynamically
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            particleSystem.material.uniforms.uDarkMode.value = isDarkMode ? 1.0 : 0.0;
            
            // New Optimized Motion: Swirling vortex, physics integration, wave noise, and mouse reactive push
            particleSystem.rotation.y = scrollPercent * Math.PI * 0.1 + (mouse.x * 0.02) + (Date.now() * 0.00004);
            particleSystem.rotation.x = scrollPercent * Math.PI * 0.05 + (-mouse.y * 0.02);
            
            const positions = particleSystem.geometry.attributes.position.array;
            const rotations = particleSystem.geometry.attributes.rotation.array;
            
            // Map 2D mouse position to 3D workspace at z = 0 (scaled)
            const mouse3D = new THREE.Vector3(mouse.x * 180, mouse.y * 180, 0);
            const time = Date.now() * 0.001; // Waving frequency base
            
            for (let i = 0; i < particleCount; i++) {
                let x = positions[i * 3];
                let y = positions[i * 3 + 1];
                let z = positions[i * 3 + 2];
                
                const ox = originalPositionsArr[i * 3];
                const oy = originalPositionsArr[i * 3 + 1];
                const oz = originalPositionsArr[i * 3 + 2];
                
                let vx = velocitiesArr[i * 3];
                let vy = velocitiesArr[i * 3 + 1];
                let vz = velocitiesArr[i * 3 + 2];
                
                // 1. Endless organic wave motion (Perlin-like wave force to keep active when mouse is still)
                const waveX = Math.sin(time * 0.5 + i * 0.1) * 0.035;
                const waveY = Math.cos(time * 0.4 + i * 0.15) * 0.035;
                const waveZ = Math.sin(time * 0.6 + i * 0.08) * 0.035;
                
                vx += waveX;
                vy += waveY;
                vz += waveZ;
                
                // 2. Move particle
                x += vx;
                y += vy;
                z += vz;
                
                // 3. Slow horizontal swirl (vortex motion around Y axis)
                const swirlSpeed = 0.0004;
                const cosA = Math.cos(swirlSpeed);
                const sinA = Math.sin(swirlSpeed);
                const rx = x * cosA - z * sinA;
                const rz = x * sinA + z * cosA;
                x = rx;
                z = rz;
                
                // 4. Anchor pull (soft return force to anchor/original position)
                const pull = 0.0002;
                vx += (ox - x) * pull;
                vy += (oy - y) * pull;
                vz += (oz - z) * pull;
                
                // 5. Mouse wake interaction (repels particles when mouse is close)
                const dx = x - mouse3D.x;
                const dy = y - mouse3D.y;
                const dz = z - mouse3D.z;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                if (dist < 90) {
                    const force = (90 - dist) * 0.015;
                    vx += (dx / dist) * force;
                    vy += (dy / dist) * force;
                    vz += (dz / dist) * force;
                }
                
                // Dampen velocities
                velocitiesArr[i * 3] = vx * 0.95;
                velocitiesArr[i * 3 + 1] = vy * 0.95;
                velocitiesArr[i * 3 + 2] = vz * 0.95;
                
                // Update arrays
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
                
                // 6. Spin: Rotate individual dash angle over time
                rotations[i] += spinsArr[i];
            }
            
            // Mark buffers for WebGL re-upload
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.geometry.attributes.rotation.needsUpdate = true;
        }
        
        renderer.render(scene, camera);
    }
    
    // Initialize ThreeJS Background
    initThree();

    // ==========================================
    // 6. Footer Actions: CV Print & Share Links
    // ==========================================
    document.querySelectorAll('.js-print-cv, #btn-print-cv').forEach((printCvBtn) => {
        if (printCvBtn.getAttribute('data-bound-print')) return;
        printCvBtn.setAttribute('data-bound-print', 'true');
        printCvBtn.addEventListener('click', () => {
            window.print();
        });
    });

    const copyUrlBtn = document.getElementById('btn-copy-url');
    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', () => {
            const currentUrl = window.location.origin + window.location.pathname;
            navigator.clipboard.writeText(currentUrl).then(() => {
                const originalIcon = copyUrlBtn.innerHTML;
                copyUrlBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                copyUrlBtn.style.background = 'var(--accent-cyan)';
                copyUrlBtn.style.color = '#ffffff';
                
                setTimeout(() => {
                    copyUrlBtn.innerHTML = originalIcon;
                    copyUrlBtn.style.background = '';
                    copyUrlBtn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy site URL: ', err);
            });
        });
    }

    // ==========================================
    // 7. Dynamic Blog Post Rendering Handler
    // ==========================================
    // Helper to initialize session likes counters (honestly starting from 0)
    function initMetrics() {
        if (typeof BLOG_POSTS === 'undefined') return;
        BLOG_POSTS.forEach(post => {
            if (localStorage.getItem(`likes_${post.id}`) === null) {
                localStorage.setItem(`likes_${post.id}`, '0');
            }
        });
    }

    function renderBlogPosts() {
        initMetrics();
        
        const commentariesContainer = document.getElementById('pnas-commentaries-list');
        const newsContainer = document.getElementById('pnas-news-list');
        const trendingContainer = document.getElementById('pnas-trending-list');

        // Populate discussion form dropdown with current blog post titles
        const topicDropdown = document.getElementById('feedback-topic');
        if (topicDropdown && typeof BLOG_POSTS !== 'undefined' && BLOG_POSTS.length > 0) {
            topicDropdown.innerHTML = `
                <option value="General Inquiry / 其它学术探讨">General Inquiry / 其它学术探讨</option>
                <option value="Research Collaboration / 科研合作探讨">Research Collaboration / 科研合作探讨</option>
                <option value="Proteomics & Machine Learning / 蛋白质组与机器学习">Proteomics & Machine Learning / 蛋白质组与机器学习</option>
                <option value="VitaGRN & Network Inference / 基因网络调控建模">VitaGRN & Network Inference / 基因网络调控建模</option>
                <option value="PhD Opportunities & Recruitment / 博士招募与科研机会交流">PhD Opportunities & Recruitment / 博士招募与科研机会交流</option>
            `;
            BLOG_POSTS.forEach(post => {
                const option = document.createElement('option');
                option.value = post.titleEn;
                option.textContent = `${post.titleZh} (${post.titleEn})`;
                topicDropdown.appendChild(option);
            });
        }
        
        if (typeof BLOG_POSTS === 'undefined' || BLOG_POSTS.length === 0) return;
        
        if (commentariesContainer) commentariesContainer.innerHTML = '';
        if (newsContainer) newsContainer.innerHTML = '';
        if (trendingContainer) trendingContainer.innerHTML = '';
        
        // Sort by date descending (most recent first)
        const sortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedPosts.forEach(post => {
            const likes = localStorage.getItem(`likes_${post.id}`) || '0';
            
            if (post.category === 'Commentary') {
                if (!commentariesContainer) return;
                const article = document.createElement('article');
                article.className = 'blog-post-card';
                
                const tagsHtml = post.tags.map(t => `<span class="blog-post-tag">#${t}</span>`).join('');
                
                article.innerHTML = `
                    <!-- English Version -->
                    <div class="lang-en">
                        <a href="#blog-post/${post.id}" style="text-decoration: none; color: inherit;">
                            <h4 class="blog-post-title" style="cursor: pointer; transition: var(--transition-fast);">${post.titleEn}</h4>
                        </a>
                        <div class="blog-post-meta">
                            <span class="blog-post-date"><i class="fa-regular fa-calendar-days"></i> ${post.date}</span>
                            <span class="blog-post-readtime"><i class="fa-regular fa-clock"></i> ${post.readTimeEn}</span>
                            <div class="blog-post-tags">${tagsHtml}</div>
                        </div>
                        <p class="blog-post-summary">${post.summaryEn}</p>
                    </div>
                    
                    <!-- Chinese Version -->
                    <div class="lang-zh" style="display: none;">
                        <a href="#blog-post/${post.id}" style="text-decoration: none; color: inherit;">
                            <h4 class="blog-post-title" style="cursor: pointer; transition: var(--transition-fast);">${post.titleZh}</h4>
                        </a>
                        <div class="blog-post-meta">
                            <span class="blog-post-date"><i class="fa-regular fa-calendar-days"></i> ${post.date}</span>
                            <span class="blog-post-readtime"><i class="fa-regular fa-clock"></i> ${post.readTimeZh}</span>
                            <div class="blog-post-tags">${tagsHtml}</div>
                        </div>
                        <p class="blog-post-summary">${post.summaryZh}</p>
                    </div>
                    
                    <a href="#blog-post/${post.id}" class="btn-read-more" style="margin-top: 1rem; text-decoration: none;">
                        <span class="lang-en">Read Full Commentary <i class="fa-solid fa-arrow-right-long"></i></span>
                        <span class="lang-zh" style="display:none;">阅读学术评论 <i class="fa-solid fa-arrow-right-long"></i></span>
                    </a>
                `;
                commentariesContainer.appendChild(article);
            } else {
                const targetContainer = post.category === 'News' ? newsContainer : trendingContainer;
                if (!targetContainer) return;
                
                const article = document.createElement('article');
                article.className = 'pnas-small-card';
                
                article.innerHTML = `
                    <!-- English Version -->
                    <div class="lang-en">
                        <a href="#blog-post/${post.id}" style="text-decoration: none; color: inherit;">
                            <h4 class="pnas-small-title">${post.titleEn}</h4>
                        </a>
                        <p class="pnas-small-summary">${post.summaryEn}</p>
                        <div class="pnas-card-metrics">
                            <span class="pnas-card-metric-item"><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                        </div>
                    </div>
                    
                    <!-- Chinese Version -->
                    <div class="lang-zh" style="display: none;">
                        <a href="#blog-post/${post.id}" style="text-decoration: none; color: inherit;">
                            <h4 class="pnas-small-title">${post.titleZh}</h4>
                        </a>
                        <p class="pnas-small-summary">${post.summaryZh}</p>
                        <div class="pnas-card-metrics">
                            <span class="pnas-card-metric-item"><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                        </div>
                    </div>
                `;
                targetContainer.appendChild(article);
            }
        });
        
        // Sync bilingual tags of newly generated cards
        const currentLangBtn = document.querySelector('.bio-btn.active');
        const lang = currentLangBtn ? currentLangBtn.getAttribute('data-lang') : 'en';
        if (typeof toggleStaticBilingual === 'function') {
            toggleStaticBilingual(lang);
        }
    }

    // Setup Scroll Spy for detailed reader Table of Contents
    function setupScrollSpy() {
        const sections = ['sec-significance', 'sec-abstract', 'sec-results', 'sec-references', 'feedback-section'];
        const tocItems = document.querySelectorAll('.pnas-toc-item');
        
        window.addEventListener('scroll', () => {
            let currentActive = '';
            sections.forEach(secId => {
                const element = document.getElementById(secId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Active if section top is near or passed the top header threshold
                    if (rect.top <= 200) {
                        currentActive = secId;
                    }
                }
            });
            
            tocItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentActive}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Helper to render detailed PNAS/Nature style blog post
    function renderDetailedBlogPost(post) {
        const breadcrumb = document.querySelector('.reader-breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = ` / ${post.titleEn}`;
        }
        
        const titleField = document.getElementById('paper-title-field');
        if (titleField) titleField.textContent = post.titleEn;
        
        const dateField = document.getElementById('paper-date-field');
        if (dateField) dateField.textContent = post.date;
        
        const readField = document.getElementById('paper-read-field');
        if (readField) readField.textContent = post.readTimeEn;
        
        // Detailed page stats row requires no metrics binding since views/likes were removed
        
        // Dynamically set category value
        const sectorField = document.getElementById('paper-sector-field');
        if (sectorField) sectorField.textContent = post.category;
        
        const contentField = document.getElementById('paper-content-field');
        if (contentField) {
            const currentLangBtn = document.querySelector('.bio-btn.active');
            const lang = currentLangBtn ? currentLangBtn.getAttribute('data-lang') : 'en';
            
            let contentHtml = lang === 'zh' ? post.contentZh : post.contentEn;
            
            // Build PNAS-style References HTML
            if (post.references && post.references.length > 0) {
                const refTitle = lang === 'zh' ? '参考文献 (References)' : 'References';
                let refsHtml = '';
                
                post.references.forEach(ref => {
                    let actionLinks = `<a href="${ref.viewLink}" target="_blank" class="pnas-ref-btn-view">View</a>`;
                    if (ref.pubmedLink) {
                        actionLinks += ` <span class="pnas-ref-divider">|</span> <a href="${ref.pubmedLink}" target="_blank" class="pnas-ref-link">PubMed</a>`;
                    }
                    if (ref.scholarLink) {
                        actionLinks += ` <span class="pnas-ref-divider">|</span> <a href="${ref.scholarLink}" target="_blank" class="pnas-ref-link">Google Scholar</a>`;
                    }
                    
                    refsHtml += `
                        <div class="pnas-reference-item">
                            <div class="pnas-ref-number">${ref.id}</div>
                            <div class="pnas-ref-body">
                                <div class="pnas-ref-text">${ref.citation}</div>
                                <div class="pnas-ref-actions">
                                    ${actionLinks}
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                contentHtml += `
                    <div class="paper-references" id="sec-references">
                        <h2>${refTitle}</h2>
                        <div class="pnas-references-list">
                            ${refsHtml}
                        </div>
                    </div>
                `;
            }
            
            contentField.innerHTML = contentHtml;
        }
        
        // Sync language toggle inside detailed reader
        const currentLangBtn = document.querySelector('.bio-btn.active');
        const lang = currentLangBtn ? currentLangBtn.getAttribute('data-lang') : 'en';
        if (typeof toggleStaticBilingual === 'function') {
            toggleStaticBilingual(lang);
        }
        
        // Bind dynamic feedback commentary form for this post
        if (typeof initPaperFeedbackForm === 'function') {
            initPaperFeedbackForm(post.titleEn);
        }
        
        // Trigger scroll spy
        setupScrollSpy();
    }
    
    // Expose to global scope
    window.renderBlogPosts = renderBlogPosts;
    window.renderDetailedBlogPost = renderDetailedBlogPost;
});
