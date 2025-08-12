<script>
// Create tech background elements
        function createTechBackground() {
            const container = document.getElementById('techBg');
            container.innerHTML = '';
            
            // Create nodes
            for (let i = 0; i < 15; i++) {
                const node = document.createElement('div');
                node.classList.add('circuit-node');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                node.style.left = `${posX}%`;
                node.style.top = `${posY}%`;
                
                // Random size
                const size = Math.random() * 10 + 5;
                node.style.width = `${size}px`;
                node.style.height = `${size}px`;
                
                // Random animation delay
                const delay = Math.random() * 5;
                node.style.animationDelay = `${delay}s`;
                
                container.appendChild(node);
            }
            
            // Create connecting lines (simplified for demo)
            for (let i = 0; i < 8; i++) {
                const line = document.createElement('div');
                line.classList.add('circuit-line');
                
                // Random position and angle
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const length = Math.random() * 15 + 5;
                const angle = Math.random() * 360;
                
                line.style.left = `${startX}%`;
                line.style.top = `${startY}%`;
                line.style.width = `${length}%`;
                line.style.transform = `rotate(${angle}deg)`;
                
                // Random animation
                const duration = Math.random() * 5 + 3;
                line.style.animation = `pulse ${duration}s infinite alternate`;
                
                container.appendChild(line);
            }
            
            // Create floating tech icons
            const icons = ['fa-microchip', 'fa-server', 'fa-code', 'fa-database', 'fa-network-wired'];
            for (let i = 0; i < 8; i++) {
                const icon = document.createElement('i');
                icon.classList.add('fas', icons[Math.floor(Math.random() * icons.length)], 'floating-icon');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                icon.style.left = `${posX}%`;
                icon.style.top = `${posY}%`;
                
                // Random animation duration and delay
                const duration = Math.random() * 10 + 10;
                const delay = Math.random() * 5;
                icon.style.animationDuration = `${duration}s`;
                icon.style.animationDelay = `${delay}s`;
                
                container.appendChild(icon);
            }
        }
        
        // Toggle password visibility
        function setupPasswordToggle(toggleId, inputId) {
            const toggle = document.getElementById(toggleId);
            const input = document.getElementById(inputId);
            
            if (toggle && input) {
                toggle.addEventListener('click', function() {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                });
            }
        }
        
        // Password strength indicator
        document.getElementById('regPassword')?.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');
            
            // Reset
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#F56565';
            strengthText.textContent = 'Password strength';
            strengthText.style.color = 'rgba(255, 255, 255, 0.5)';
            
            if (password.length === 0) return;
            
            // Calculate strength
            let strength = 0;
            
            // Length
            if (password.length > 7) strength += 20;
            if (password.length > 12) strength += 10;
            
            // Lowercase
            if (/[a-z]/.test(password)) strength += 15;
            
            // Uppercase
            if (/[A-Z]/.test(password)) strength += 15;
            
            // Numbers
            if (/[0-9]/.test(password)) strength += 15;
            
            // Special characters
            if (/[!@#$%^&*]/.test(password)) strength += 15;
            
            // Repeated characters penalty
            if (/(.)\1/.test(password)) strength -= 10;
            
            // Cap at 100
            strength = Math.min(100, Math.max(0, strength));
            
            // Update UI
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 40) {
                strengthBar.style.backgroundColor = '#F56565';
                strengthText.textContent = 'Weak password';
                strengthText.style.color = '#F56565';
            } else if (strength < 70) {
                strengthBar.style.backgroundColor = '#ED8936';
                strengthText.textContent = 'Medium password';
                strengthText.style.color = '#ED8936';
            } else {
                strengthBar.style.backgroundColor = '#48BB78';
                strengthText.textContent = 'Strong password';
                strengthText.style.color = '#48BB78';
            }
        });
        
        // Switch between login and register forms
        document.getElementById('showLogin')?.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registerContainer').style.transform = 'translateX(-100%)';
            document.getElementById('registerContainer').style.opacity = '0';
            document.getElementById('loginContainer').style.transform = 'translateX(0)';
            document.getElementById('loginContainer').style.opacity = '1';
            window.history.pushState(null, '', '?login');
        });
        
        document.getElementById('showRegister')?.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginContainer').style.transform = 'translateX(100%)';
            document.getElementById('loginContainer').style.opacity = '0';
            document.getElementById('registerContainer').style.transform = 'translateX(0)';
            document.getElementById('registerContainer').style.opacity = '1';
            window.history.pushState(null, '', window.location.pathname);
        });
        
        // Form validation
        document.getElementById('registerForm')?.addEventListener('submit', function(e) {
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            
            if (!email || !password) {
                e.preventDefault();
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }
            
            // University email check (example)
            if (!email.endsWith('.edu')) {
                if (!confirm('This doesn\'t look like a university email. Are you sure you want to proceed?')) {
                    e.preventDefault();
                    return;
                }
            }
            
            // Password length check
            if (password.length < 8) {
                e.preventDefault();
                alert('Password must be at least 8 characters');
                return;
            }
        });
        
        // Initialize
        window.onload = function() {
            createTechBackground();
            setupPasswordToggle('toggleRegPassword', 'regPassword');
            setupPasswordToggle('toggleLoginPassword', 'loginPassword');
            
            // Handle back/forward navigation
            window.addEventListener('popstate', function() {
                const isLogin = window.location.search.includes('login');
                if (isLogin) {
                    document.getElementById('registerContainer').style.transform = 'translateX(-100%)';
                    document.getElementById('registerContainer').style.opacity = '0';
                    document.getElementById('loginContainer').style.transform = 'translateX(0)';
                    document.getElementById('loginContainer').style.opacity = '1';
                } else {
                    document.getElementById('loginContainer').style.transform = 'translateX(100%)';
                    document.getElementById('loginContainer').style.opacity = '0';
                    document.getElementById('registerContainer').style.transform = 'translateX(0)';
                    document.getElementById('registerContainer').style.opacity = '1';
                }
            });
        };
    </script>
