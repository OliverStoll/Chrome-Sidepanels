# 🚀 Chrome Side-Panels for Everything
Use your favorite tools — ChatGPT, Notion, GitHub, Telegram — directly inside Chrome's side panel.  

---

## 📦 What’s Inside?

Each tool is a standalone Chrome extension, bundled in its own folder:


```
/
├── chatgpt/
├── notion/
├── github/
└── telegram/
``` 
Extensions also include custom CSS for clean layout in narrow sidepanels. 


## 🛠️ Installation Guide
1. Clone this repository
```
git clone https://github.com/OliverStoll/chrome-sidepanels.git
```

2. Install the extensions
- Go to chrome://extensions
- Enable Developer Mode (top right)
- Click Load unpacked
- Select a folder (e.g., `chatgpt/`) — repeat for each tool you want
- 
## 💡 Default Hotkeys

You can launch each side panel with a single key combo (configurable via `manifest.json` or Chrome's keyboard shortcut settings):

| Tool     | Default Hotkey |
|----------|----------------|
| ChatGPT  | `Alt + I`      |
| Notion   | `Alt + O`      |
| Telegram | `Alt + W`      |
| GitHub   | `Alt + G`      |

To customize:  
→ Go to [`chrome://extensions/shortcuts`](chrome://extensions/shortcuts)

## 🎨 Narrow Panel Layout

All extensions include custom CSS to:
- Remove distracting UI elements
- Improve mobile view usability
- Adapt layout to side panel constraints

Beware that this custom CSS might be applied to the websites in full layout as well.


## 🧩 Compatibility

- Built with **Manifest V3** and the **Chrome Extension API**
- May work in Chromium-based browsers like Brave or Edge — not officially tested
- Firefox support is not yet available, but may be possible via [`browser` API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs)


## 🤝 Contributing

Contributions are welcome!  
Want to add a new tool or improve layout?  
→ Fork the repo, open a PR, or start a discussion in Issues.


## 📬 Questions?

Feel free to open an [Issue](https://github.com/yourname/chrome-sidepanels/issues) for help, suggestions, or bug reports.
