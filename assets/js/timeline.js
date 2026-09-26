// Interactive Horizontal Timeline Controller

document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timeline-scroll-container');
    const flowLine = document.getElementById('timeline-flow');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    
    // ==========================================
    // 1. Click and Drag to Scroll Horizontal Timeline
    // ==========================================
    let isDown = false;
    let startX;
    let scrollLeft;
    
    timelineContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        timelineContainer.style.cursor = 'grabbing';
        startX = e.pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
    });
    
    timelineContainer.addEventListener('mouseleave', () => {
        isDown = false;
        timelineContainer.style.cursor = 'grab';
    });
    
    timelineContainer.addEventListener('mouseup', () => {
        isDown = false;
        timelineContainer.style.cursor = 'grab';
    });
    
    timelineContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timelineContainer.offsetLeft;
        const walk = (x - startX) * 2.5; // Scroll speed modifier
        timelineContainer.scrollLeft = scrollLeft - walk;
    });

    // ==========================================
    // 2. Timeline Line Growth Animation on Scroll
    // ==========================================
    const observeTimeline = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate SVG Line dashoffset to 0
                flowLine.style.strokeDashoffset = '0';
                
                // Cascade animate node dots to grow sequentially
                timelineNodes.forEach((node, index) => {
                    setTimeout(() => {
                        node.querySelector('.node-dot').style.transform = 'scale(1.2)';
                        node.querySelector('.node-dot').style.backgroundColor = 'var(--accent-cyan)';
                        
                        if (node.classList.contains('node-future')) {
                            node.querySelector('.node-dot').style.backgroundColor = 'var(--accent-purple)';
                        }
                    }, index * 120); // Sequence offset
                });
                
                // Unobserve once animation fires
                observeTimeline.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    observeTimeline.observe(timelineContainer);

    // ==========================================
    // 3. Node tooltip bounds correction
    // ==========================================
    // Corrects tooltip positions if they overflow the viewport bounds on smaller devices
    timelineNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const tooltip = node.querySelector('.node-tooltip');
            const rect = tooltip.getBoundingClientRect();
            
            if (rect.left < 0) {
                // Shift right
                tooltip.style.left = `calc(50% + ${Math.abs(rect.left) + 10}px)`;
            } else if (rect.right > window.innerWidth) {
                // Shift left
                tooltip.style.left = `calc(50% - ${rect.right - window.innerWidth + 10}px)`;
            }
        });
        
        node.addEventListener('mouseleave', () => {
            const tooltip = node.querySelector('.node-tooltip');
            tooltip.style.left = '50%'; // Reset to default centered position
        });
    });
});
