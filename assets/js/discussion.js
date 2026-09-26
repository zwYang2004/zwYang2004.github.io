// Private Feedback Form Handler for Zhiwen Yang's Personal Homepage
// Handles secure message routing to the author's email (zhiwenyang2004@gmail.com).
// Supports Web3Forms background delivery (seamless) and Mailto native fallback.

const FEEDBACK_CONFIG = {
    // Web3Forms Access Key (Get yours for free at https://web3forms.com/)
    // Enter it below to enable background email delivery directly to your inbox.
    // If left empty, the form will seamlessly launch the visitor's mail client (mailto:).
    web3FormsKey: "bacf2e4a-6386-4577-be84-836aed2b625f",
    
    // Receiver Email Address
    receiverEmail: "zhiwenyang2004@gmail.com"
};

// Main initializer hook (called from main.js)
function initDiscussionForum() {
    const feedbackForm = document.getElementById('feedback-email-form');
    if (!feedbackForm) return;
    
    // Guard against multiple bindings
    if (feedbackForm.getAttribute('data-bound')) return;
    feedbackForm.setAttribute('data-bound', 'true');
    
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const topicSelect = document.getElementById('feedback-topic');
        const nameInput = document.getElementById('feedback-name');
        const emailInput = document.getElementById('feedback-email');
        const roleInput = document.getElementById('feedback-role');
        const contentInput = document.getElementById('feedback-content');
        const msgBox = document.getElementById('form-feedback-message');
        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        
        const topic = topicSelect ? topicSelect.value : 'General Inquiry';
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const role = roleInput.value.trim();
        const content = contentInput.value.trim();
        
        // Reset message box
        msgBox.style.display = 'none';
        msgBox.className = '';
        msgBox.innerHTML = '';
        
        // Determine Language Mode to output localized messages
        const currentLangBtn = document.querySelector('.bio-btn.active');
        const lang = currentLangBtn ? currentLangBtn.getAttribute('data-lang') : 'en';
        
        if (FEEDBACK_CONFIG.web3FormsKey) {
            // ==============================================
            // METHOD A: Web3Forms Background AJAX Delivery
            // ==============================================
            submitBtn.disabled = true;
            submitBtn.innerHTML = lang === 'zh' 
                ? '<i class="fa-solid fa-spinner fa-spin"></i> 正在发送...' 
                : '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                
            const emailBody = `
Academic Feedback Form Submission
-----------------------------------------
Selected Topic: ${topic}
Visitor Name: ${name}
Visitor Email: ${email}
Affiliation: ${role ? role : 'Not Specified'}

Message:
${content}
            `;
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        access_key: FEEDBACK_CONFIG.web3FormsKey,
                        subject: `Academic Discussion: ${topic}`,
                        name: name,
                        from_name: `${name} (${role ? role : 'Academic Visitor'})`,
                        email: email,
                        message: emailBody
                    })
                });
                
                const result = await response.json();
                if (response.ok && result.success) {
                    msgBox.className = 'form-message-success';
                    msgBox.innerHTML = lang === 'zh'
                        ? '<i class="fa-solid fa-circle-check"></i> 留言成功！邮件已安全投递到博主信箱。'
                        : '<i class="fa-solid fa-circle-check"></i> Success! Your message has been sent directly to the author\'s inbox.';
                    feedbackForm.reset();
                } else {
                    throw new Error(result.message || 'Web3Forms submission failed');
                }
            } catch (error) {
                console.error("Web3Forms error, falling back to Mailto:", error);
                // Fallback to Mailto automatically on service failure
                triggerMailtoFallback(topic, name, email, role, content, msgBox, lang);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = lang === 'zh'
                    ? '<i class="fa-solid fa-paper-plane"></i> 发送私密留言'
                    : '<i class="fa-solid fa-paper-plane"></i> Send Message';
            }
        } else {
            // ==============================================
            // METHOD B: Native Mailto Fallback (No Config Key)
            // ==============================================
            triggerMailtoFallback(topic, name, email, role, content, msgBox, lang);
        }
    });
}

function triggerMailtoFallback(topic, name, email, role, content, msgBox, lang) {
    const subject = `Academic Discussion: ${topic}`;
    const body = `Dear Zhiwen Yang,

I would like to share my thoughts on: ${topic}

Name: ${name}
Affiliation: ${role ? role : 'Not Specified'}
Reply Email: ${email}

Message:
-----------------------------------------
${content}
-----------------------------------------

Best regards,
${name}`;

    const mailtoUrl = `mailto:${FEEDBACK_CONFIG.receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open native client
    window.location.href = mailtoUrl;
    
    // Show user guidance
    msgBox.style.display = 'block';
    msgBox.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
    msgBox.style.border = '1px solid var(--accent-purple)';
    msgBox.style.color = 'var(--text-primary)';
    
    msgBox.innerHTML = lang === 'zh'
        ? '<i class="fa-solid fa-envelope-open-text"></i> 正在拉取您的系统邮箱客户端，请发送为您预填好的信件！'
        : '<i class="fa-solid fa-envelope-open-text"></i> Launching your mail client... Please click "Send" on the pre-filled email!';
}

// Keep helper functions aligned
function toggleStaticBilingual(lang) {
    const enElements = document.querySelectorAll('.lang-en');
    const zhElements = document.querySelectorAll('.lang-zh');
    if (lang === 'zh') {
        enElements.forEach(el => el.style.display = 'none');
        zhElements.forEach(el => {
            if (el.tagName === 'SPAN' || el.tagName === 'I' || el.tagName === 'B' || el.tagName === 'STRONG') {
                el.style.display = 'inline';
            } else {
                el.style.display = 'block';
            }
        });
    } else {
        zhElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => {
            if (el.tagName === 'SPAN' || el.tagName === 'I' || el.tagName === 'B' || el.tagName === 'STRONG') {
                el.style.display = 'inline';
            } else {
                el.style.display = 'block';
            }
        });
    }
}

// Initialize academic paper detail specific commentary form
function initPaperFeedbackForm(postTitleEn) {
    const form = document.getElementById('paper-feedback-form');
    if (!form) return;
    
    // Clear dynamic bindings by cloning the form to avoid duplicate event listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('paper-feedback-name');
        const emailInput = document.getElementById('paper-feedback-email');
        const roleInput = document.getElementById('paper-feedback-role');
        const contentInput = document.getElementById('paper-feedback-content');
        const msgBox = document.getElementById('paper-feedback-message');
        const submitBtn = newForm.querySelector('button[type="submit"]');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const role = roleInput.value.trim();
        const content = contentInput.value.trim();
        const topic = `Comment on: "${postTitleEn}"`;
        
        msgBox.style.display = 'none';
        msgBox.className = '';
        msgBox.innerHTML = '';
        
        const currentLangBtn = document.querySelector('.bio-btn.active');
        const lang = currentLangBtn ? currentLangBtn.getAttribute('data-lang') : 'en';
        
        if (FEEDBACK_CONFIG.web3FormsKey) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = lang === 'zh' 
                ? '<i class="fa-solid fa-spinner fa-spin"></i> 正在发送...' 
                : '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                
            const emailBody = `
Academic Commentary Submission (Nature/PNAS style reader)
--------------------------------------------------
Article: ${postTitleEn}
Visitor Name: ${name}
Visitor Email: ${email}
Affiliation: ${role ? role : 'Not Specified'}

Commentary Content:
${content}
            `;
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        access_key: FEEDBACK_CONFIG.web3FormsKey,
                        subject: `Paper Commentary: ${postTitleEn}`,
                        name: name,
                        from_name: `${name} (${role ? role : 'Academic Reader'})`,
                        email: email,
                        message: emailBody
                    })
                });
                
                const result = await response.json();
                if (response.ok && result.success) {
                    msgBox.className = 'form-message-success';
                    msgBox.innerHTML = lang === 'zh'
                        ? '<i class="fa-solid fa-circle-check"></i> 评论提交成功！邮件已发送给作者。'
                        : '<i class="fa-solid fa-circle-check"></i> Success! Your commentary has been sent directly to the author\'s inbox.';
                    newForm.reset();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                console.error("Paper feedback error:", error);
                triggerMailtoFallback(topic, name, email, role, content, msgBox, lang);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = lang === 'zh'
                    ? '<i class="fa-solid fa-paper-plane"></i> 提交学术评论'
                    : '<i class="fa-solid fa-paper-plane"></i> Submit Commentary';
            }
        } else {
            triggerMailtoFallback(topic, name, email, role, content, msgBox, lang);
        }
    });
}
