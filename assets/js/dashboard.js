
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Initialize tech background
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
        }
        
        // Initialize study chart
        function initStudyChart() {
            const ctx = document.getElementById('studyChart').getContext('2d');
            
            // Sample data - in a real app this would come from PHP/DB
            const studyData = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Study Time (hours)',
                    data: [2.5, 3, 1.75, 2.25, 4, 1.5, 0.5],
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    borderColor: 'rgba(108, 99, 255, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            };
            
            new Chart(ctx, {
                type: 'line',
                data: studyData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        }
                    }
                }
            });
        }
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            createTechBackground();
            initStudyChart();
            
            // Add animation to cards
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `all 0.3s ease ${index * 0.1}s`;
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            });
        });
    </script>
