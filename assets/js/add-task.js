 <script>
        // Simple client-side validation
        document.getElementById('taskForm').addEventListener('submit', function(e) {
            const title = document.getElementById('title').value.trim();
            const dueDate = document.getElementById('due_date').value;
            
            if (!title) {
                alert('Please enter a task title');
                e.preventDefault();
                return;
            }
            
            const today = new Date().toISOString().split('T')[0];
            if (dueDate < today) {
                alert('Due date cannot be in the past');
                e.preventDefault();
                return;
            }
        });

        // Add character counter for description
        const description = document.getElementById('description');
        const charCounter = document.createElement('small');
        charCounter.style.display = 'block';
        charCounter.style.textAlign = 'right';
        charCounter.style.marginTop = '5px';
        charCounter.style.color = '#6c757d';
        charCounter.textContent = '0/500 characters';
        description.parentNode.appendChild(charCounter);

        description.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCounter.textContent = `${currentLength}/500 characters`;
            
            if (currentLength > 500) {
                charCounter.style.color = 'var(--danger-color)';
            } else {
                charCounter.style.color = 'var(--gray-color)';
            }
        });
    </script>
