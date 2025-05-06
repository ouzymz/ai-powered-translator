# Translator

A powerful translation application built with NestJS that provides real-time translation capabilities using Google AI and OpenAI APIs.

## Features

- Real-time translation using Google AI and OpenAI APIs
- Global keyboard hook for quick access
- Configuration panel for easy settings management

## Tech Stack

- **Backend Framework:** NestJS
- **AI Integration:**
  - Google AI (Gemini)
  - OpenAI
- **Key Dependencies:**
  - `@google/genai` - Google AI integration
  - `openai` - OpenAI integration
  - `node-global-key-listener` - Global keyboard hook
  - `copy-paste` - Clipboard management
  - `axios` - HTTP client
  - `rxjs` - Reactive programming

## Project Structure

```
translator/
├── apps/
│ ├── translator/ # Main application
│ └── translator-e2e/ # End-to-end tests
├── libs/
│ ├── config-panel/ # Configuration panel module
│ ├── keyboard-hook/ # Global keyboard hook module
│ └── google-api/ # Google AI integration module
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google AI API key
- OpenAI API key (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/translator.git
   cd translator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Starting the Application

1. To start the development server, run the following command:

   ```bash
   nx serve translator
   ```

2. Set up your ENV variables (options)
   - create .env file in ./apps/translator
   - select for manual configuration, enter your config.

The application will be available at `http://localhost:3000/api`

## 🛠️ Development

### Project Architecture

The project follows a modular architecture using NestJS:

- **Main Application (`apps/translator`)**: Core application logic and API endpoints
- **Configuration Panel (`libs/config-panel`)**: User interface for managing application settings
- **Keyboard Hook (`libs/keyboard-hook`)**: Global keyboard listener for quick access
- **Google API (`libs/google-api`)**: Integration with Google AI services

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/)
- [Google AI](https://ai.google.dev/)
- [OpenAI](https://openai.com/)
