// Sidebar Toggle
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });

        // Refresh Button
        document.getElementById('refreshBtn').addEventListener('click', function() {
            const btn = this;
            const icon = btn.querySelector('i');
            
            // Add rotation animation
            icon.style.transition = 'transform 0.5s';
            icon.style.transform = 'rotate(360deg)';
            
            // Simulate data refresh
            btn.innerHTML = '<i class="fas fa-spinner"></i> Refreshing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Data Updated!';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
                    btn.disabled = false;
                    icon.style.transform = 'rotate(0deg)';
                    
                    // Update some random values to simulate fresh data
                    updateRandomStats();
                }, 1000);
            }, 1500);
        });

        // Chart Data and Configuration
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgb(55, 91, 250)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value/1000 + 'k';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Traffic Chart
        const trafficCtx = document.getElementById('trafficChart').getContext('2d');
        const trafficChart = new Chart(trafficCtx, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Social', 'Referral', 'Organic'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#4361ee',
                        '#3f37c9',
                        '#4cc9f0',
                        '#f72585'
                    ],
                    borderWidth: 0,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                        }
                    }
                },
                cutout: '70%'
            }
        });

        // Change chart period
        document.getElementById('chartPeriod').addEventListener('change', function() {
            const period = this.value;
            let newData, newLabels;
            
            switch(period) {
                case 'week':
                    newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    newData = [5000, 7000, 6500, 8000, 9000, 12000, 11000];
                    break;
                case 'quarter':
                    newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
                    newData = [45000, 52000, 48000, 60000];
                    break;
                case 'year':
                    newLabels = ['2021', '2022', '2023', '2024', '2025', '2026'];
                    newData = [80000, 95000, 110000, 125000, 145000 , 2000000 ];
                    break;
                case 'month':
                default:
                    newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                    newData = [12000, 19000, 15000, 25000, 22000, 30000, 28000];
            }
            
            revenueChart.data.labels = newLabels;
            revenueChart.data.datasets[0].data = newData;
            revenueChart.update();
        });

        // Orders Data
        const orders = [
            { id: '#ORD-001', customer: 'Faraz Ahmed', date: '2026-10-15', amount: '$245.99', status: 'completed' },
            { id: '#ORD-002', customer: 'Mathloob', date: '2026-10-14', amount: '$1,299.99', status: 'pending' },
            { id: '#ORD-003', customer: 'Hammad', date: '2026-10-13', amount: '$89.50', status: 'completed' },
            { id: '#ORD-004', customer: 'Ahmed', date: '2026-10-12', amount: '$550.00', status: 'processing' },
            { id: '#ORD-005', customer: 'Sufyan', date: '2026-10-11', amount: '$2,450.75', status: 'completed' },
            { id: '#ORD-006', customer: 'Arslan', date: '2026-10-10', amount: '$120.00', status: 'completed' },
            { id: '#ORD-007', customer: 'Sir Umer', date: '2026-10-09', amount: '$799.99', status: 'pending' },
            { id: '#ORD-008', customer: 'Sir Fasial', date: '2026-10-08', amount: '$345.25', status: 'processing' }
        ];

        // Populate orders table
        const ordersTable = document.getElementById('ordersTable');
        
        function populateOrdersTable() {
            ordersTable.innerHTML = '';
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.date}</td>
                    <td><strong>${order.amount}</strong></td>
                    <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                `;
                ordersTable.appendChild(row);
            });
        }

        // Function to update random stats
        function updateRandomStats() {
            // Update card values randomly
            const cards = document.querySelectorAll('.card-value');
            cards.forEach(card => {
                const currentValue = parseFloat(card.textContent.replace(/[^0-9.-]+/g, ""));
                const change = (Math.random() * 10) - 2; // Random change between -2% and +8%
                const newValue = Math.round(currentValue * (1 + change/100));
                
                // Format based on card type
                if (card.closest('.card-1')) {
                    card.textContent = '$' + newValue.toLocaleString();
                } else if (card.closest('.card-4')) {
                    card.textContent = change > 0 ? '+' + change.toFixed(1) + '%' : change.toFixed(1) + '%';
                } else {
                    card.textContent = newValue.toLocaleString();
                }
            });
            
            // Update change indicators
            const changes = document.querySelectorAll('.card-change');
            changes.forEach(change => {
                const isPositive = Math.random() > 0.3; // 70% chance of positive
                
                if (isPositive) {
                    change.className = 'card-change positive';
                    change.innerHTML = `<i class="fas fa-arrow-up"></i> ${(Math.random() * 10 + 2).toFixed(1)}% from last month`;
                } else {
                    change.className = 'card-change negative';
                    change.innerHTML = `<i class="fas fa-arrow-down"></i> ${(Math.random() * 5 + 1).toFixed(1)}% from last month`;
                }
            });
            
            // Add a new order
            const newId = `#ORD-${(orders.length + 1).toString().padStart(3, '0')}`;
            const customers = ['Alex Turner', 'Mia Williams', 'James Lee', 'Sophia Garcia', 'Daniel Martinez'];
            const statuses = ['completed', 'pending', 'processing'];
            
            const newOrder = {
                id: newId,
                customer: customers[Math.floor(Math.random() * customers.length)],
                date: new Date().toISOString().split('T')[0],
                amount: `$${(Math.random() * 2000 + 50).toFixed(2)}`,
                status: statuses[Math.floor(Math.random() * statuses.length)]
            };
            
            orders.unshift(newOrder);
            if (orders.length > 8) orders.pop();
            
            populateOrdersTable();
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            populateOrdersTable();
            
            // Set active nav link
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    navLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Close sidebar on mobile after click
                    if (window.innerWidth <= 768) {
                        document.querySelector('.sidebar').classList.remove('active');
                    }
                });
            });
            
            // Notification click
            document.querySelector('.notifications').addEventListener('click', function() {
                alert('You have 3 new notifications!');
            });
            
            // User profile click
            document.querySelector('.user-profile').addEventListener('click', function() {
                alert('Profile options would appear here.');
            });
        });