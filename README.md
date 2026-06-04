# Lead Template Design

A modern, responsive lead template design built with **JavaScript**, **CSS**, and **HTML**. This project provides a clean and professional template for capturing leads with an intuitive user interface.

## 📋 Project Overview

This repository contains a fully-functional lead capture template with:
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI** - Smooth animations and user interactions powered by JavaScript
- **Clean Styling** - Professional CSS styling for a modern appearance
- **Form Validation** - Client-side validation for lead information

### Tech Stack

| Technology | Usage |
|-----------|-------|
| **JavaScript** | 51.9% - Logic and interactivity |
| **CSS** | 29.5% - Styling and layout |
| **HTML** | 18.6% - Markup and structure |

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git** - Version control system
- **Node.js** (Optional) - For local development server
- **npm or yarn** (Optional) - Package manager
- **Code Editor** - VS Code, Sublime Text, or your preferred editor
- **Web Browser** - Modern browser (Chrome, Firefox, Safari, Edge)

### 1️⃣ Clone the Repository

```bash
# Clone the repository to your local machine
git clone https://github.com/logicalaryan/lead_template_design.git

# Navigate into the project directory
cd lead_template_design
```

### 2️⃣ Project Structure

```
lead_template_design/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript logic
├── assets/             # Images and media files
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

### 3️⃣ Local Development

#### Option A: Using Live Server (Recommended)

If you have VS Code installed:

1. Install the **Live Server** extension from VS Code extensions marketplace
2. Right-click on `index.html` and select "Open with Live Server"
3. Your default browser will open automatically at `http://localhost:5500`

#### Option B: Using Python (Built-in)

```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Then visit: `http://localhost:8000`

#### Option C: Using Node.js http-server

```bash
# Install http-server globally (optional)
npm install -g http-server

# Start the server in the project directory
http-server

# Visit the URL shown in your terminal
```

#### Option D: Direct Browser Opening

Simply open `index.html` directly in your browser:
- Right-click on `index.html` → Open with → Your Browser
- Or double-click the file

---

## 📝 Making Changes

### 1. Create a New Branch

```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Example: git checkout -b feature/add-email-validation
```

### 2. Edit Files

Make your desired changes to:
- **index.html** - Update structure and content
- **css/style.css** - Modify styling
- **js/script.js** - Enhance functionality

**Example workflow:**

```bash
# Open and edit files
code .  # Opens VS Code with the project

# Or use any text editor
nano index.html
# or
vim css/style.css
```

### 3. Test Your Changes

1. Refresh your browser to see live changes (if using Live Server)
2. Check the browser console for any JavaScript errors (F12 → Console)
3. Test responsiveness using browser DevTools (F12 → Toggle Device Toolbar)

---

## 🔧 Git Workflow: Staging & Committing

### Check Repository Status

```bash
# See which files have been modified
git status
```

### Stage Your Changes

```bash
# Stage all modified files
git add .

# Or stage specific files
git add index.html css/style.css js/script.js

# Or stage interactively
git add -p
```

### Commit Your Changes

```bash
# Commit with a descriptive message
git commit -m "Add feature: improve form validation"

# Or use interactive commit for more details
git commit -v

# Example commit messages:
# "Add responsive navbar"
# "Fix: mobile menu toggle bug"
# "Refactor: organize CSS variables"
# "Docs: update installation instructions"
```

### Best Practices for Commits

✅ Do:
- Write clear, descriptive commit messages
- Keep commits small and focused on one feature
- Use present tense ("Add" not "Added")
- Reference issues if applicable: "Fix #123"

❌ Don't:
- Commit large unrelated changes together
- Use vague messages like "Update" or "Fix stuff"
- Commit without testing

---

## 📤 Pushing Code to Repository

### Push to Remote Repository

```bash
# Push your branch to GitHub
git push origin feature/your-feature-name

# Example:
git push origin feature/add-email-validation
```

### Create a Pull Request

1. Visit: `https://github.com/logicalaryan/lead_template_design`
2. Click the **"Compare & pull request"** button
3. Fill in the PR title and description:
   ```
   Title: Add email validation to form
   
   Description:
   - Validates email format on form submission
   - Shows user-friendly error messages
   - Uses regex pattern matching
   
   Closes #123 (if applicable)
   ```
4. Click **"Create pull request"**

### Merge to Main Branch

After PR review:

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Merge your feature branch
git merge feature/your-feature-name

# Push merged changes
git push origin main

# Delete the feature branch (optional)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## 📋 Complete Workflow Example

```bash
# 1. Clone the repository
git clone https://github.com/logicalaryan/lead_template_design.git
cd lead_template_design

# 2. Create a new branch
git checkout -b feature/dark-mode

# 3. Make changes
# Edit files in your editor...

# 4. Check what changed
git status

# 5. Stage your changes
git add .

# 6. Commit with a message
git commit -m "Add dark mode toggle to template"

# 7. Push to GitHub
git push origin feature/dark-mode

# 8. Create a pull request on GitHub
# (Visit the repository and click "Compare & pull request")

# 9. After merging, switch back to main
git checkout main
git pull origin main
```

---

## 🐛 Troubleshooting

### Issue: "fatal: not a git repository"

```bash
# Solution: Initialize git or ensure you're in the right directory
git init
# Or navigate to the project folder
cd lead_template_design
```

### Issue: "Permission denied (publickey)"

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add SSH key to ssh-agent
ssh-add ~/.ssh/id_ed25519

# Add SSH public key to GitHub
# https://github.com/settings/keys
```

### Issue: Changes not reflecting in browser

```bash
# Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
# Or: Open DevTools → Settings → Disable cache while DevTools is open
```

### Issue: Merge conflicts

```bash
# View conflicts
git diff

# Manually resolve conflicts in your editor
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

---

## 📚 Useful Git Commands

```bash
# View commit history
git log
git log --oneline
git log --graph --all --oneline

# View changes before committing
git diff

# Undo uncommitted changes
git checkout -- filename

# Undo last commit (keep changes)
git reset HEAD~1

# View all branches
git branch -a

# Rename a branch
git branch -m old-name new-name

# Fetch latest from remote
git fetch origin

# Sync with remote
git pull origin main
```

---

## 🎨 Customization Tips

### Change Colors
Edit `css/style.css`:
```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
}
```

### Add New Fields
Edit `index.html` and add form fields, then handle in `js/script.js`:
```javascript
const formData = {
  name: document.getElementById('name').value,
  email: document.getElementById('email').value,
  // Add new fields here
};
```

---

## 📞 Support & Contribution

- **Issues**: Report bugs on [GitHub Issues](https://github.com/logicalaryan/lead_template_design/issues)
- **Pull Requests**: Submit improvements via [Pull Requests](https://github.com/logicalaryan/lead_template_design/pulls)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/logicalaryan/lead_template_design/discussions)

---

## 📜 License

This project is open source. Feel free to use, modify, and distribute it.

---

## 👤 Author

**Logical Aryan**
- GitHub: [@logicalaryan](https://github.com/logicalaryan)
- Repository: [lead_template_design](https://github.com/logicalaryan/lead_template_design)

---

## 📅 Version History

- **v1.0.0** (2026-06-04) - Initial release with lead capture template

---

## ⭐ If You Find This Helpful

Don't forget to give this repository a star! ⭐ It helps others discover this project.

---

**Happy coding! 🚀**
