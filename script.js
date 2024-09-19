/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #1c1c1e;
    color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.cv-container {
    width: 800px;
    background: #2c2c2e;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.header {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #3a3a3c;
    align-items: center;
}

.profile-photo img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #0078d4;
}

.profile-info {
    margin-left: 20px;
}

.profile-info h1 {
    font-size: 24px;
    color: #f3f3f3;
}

.profile-info p {
    font-size: 16px;
    color: #a3a3a3;
}

.content {
    padding: 20px;
}

section {
    margin-bottom: 20px;
}

h2 {
    color: #0078d4;
    margin-bottom: 10px;
    font-size: 20px;
}

ul {
    list-style: none;
}

li {
    margin-bottom: 10px;
}

li h3 {
    font-size: 18px;
    color: #f3f3f3;
}

li span {
    font-size: 14px;
    color: #a3a3a3;
    display: block;
    margin-bottom: 5px;
}

li p {
    font-size: 14px;
    color: #c3c3c3;
}
