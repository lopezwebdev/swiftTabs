# swiftTabs

# Tab Assist

A lightweight, privacy-focused Chrome extension for efficient tab management and navigation.

![Tab Assist Screenshot](assets/screenshot.png)

## Features

- **Smart Tab Groups**: Organize tabs into custom groups with color coding
- **Quick Tab Search**: Find any open tab instantly with powerful search
- **Tab History**: Keep track of your recently closed tabs
- **Light & Dark Themes**: Choose your preferred visual style
- **Keyboard Shortcuts**: Navigate and manage tabs with ease

## Installation

### From Chrome Web Store
1. Visit [Tab Assist on Chrome Web Store](https://chrome.google.com/webstore/detail/tab-assist/...)
2. Click "Add to Chrome"
3. Confirm the installation

### From Source
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/tab-assist.git
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `extension` directory

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

### Project Structure
```
tab-assist/
├── src/
│   ├── background/    # Background scripts
│   ├── content/       # Content scripts
│   ├── popup/         # Popup UI
│   └── utils/         # Utility functions
├── assets/           # Icons and images
├── manifest.json     # Extension manifest
└── package.json      # Project dependencies
```

## Usage

### Tab Groups
- Create groups to organize related tabs
- Color-code groups for easy identification
- Drag and drop tabs between groups

### Search
- Use the search bar to find tabs instantly
- Search by title or URL
- Results update in real-time

### Keyboard Shortcuts
- `Ctrl/Cmd + Shift + T`: Open popup
- `Ctrl/Cmd + Shift + F`: Focus search
- `Ctrl/Cmd + Shift + G`: Create new group
- `Esc`: Close popup

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy

Tab Assist is committed to protecting your privacy:
- No data collection
- No analytics
- All data stored locally
- No network requests
- No third-party services

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [Report a Bug](https://github.com/yourusername/tab-assist/issues)
- [Feature Request](https://github.com/yourusername/tab-assist/issues)
- [Documentation](https://github.com/yourusername/tab-assist/wiki)

## Acknowledgments

- [Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Chrome Web Store: [Tab Assist](https://chrome.google.com/webstore/detail/tab-assist/...)
