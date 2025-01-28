# Code Transformer

A React-based web application for obfuscating and deobfuscating JavaScript code. Built with Vite and TypeScript, it provides configurable obfuscation settings and a user-friendly interface.

## Features

- **Dual Functionality**: Switch between **Obfuscate** and **Deobfuscate** modes.
- **Configurable Obfuscation**:
  - Compact code output
  - Control Flow Flattening
  - Dead Code Injection
  - Debug Protection
  - Disable Console Output
  - Rename Globals
  - Rotate String Array
  - Self Defending
  - Split Strings
  - String Array Threshold (configurable)
  - Unicode Escape Sequences
- **Output Options**: Copy to clipboard or download directly.
- **React Integration**: Responsive UI with real-time preview.

## Prerequisites

- Node.js (v18+)
- npm (v9+)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RGB-Outl4w/Code-Transformer-js-web.git
   ```
2. Install dependencies:
   ```bash
   cd Code-Transformer-js-web
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Input Code**: Paste your JavaScript code into the input section.
2. **Select Mode**:
   - **Obfuscate**: Toggle desired obfuscation settings from the options panel.
   - **Deobfuscate**: Switch to deobfuscation mode (supports reversing previously obfuscated code).
3. **Generate Output**: Click "Obfuscate Code" to process the input.
4. **Export**: Use the "Copy" button or "Download" to save the transformed code.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

- [MIT](LICENSE)
