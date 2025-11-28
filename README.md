
# AL-E / L.U.C.I. Universal System

**Version:** 1.0.0
**Author:** Hostinger Horizons AI
**Last Updated:** 2025-11-27

---

![L.U.C.I. System Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop)

**AL-E (Asistente Logístico Ejecutivo)** is a next-generation, AI-powered executive assistant platform designed to streamline and automate complex workflows across multiple industries. Powered by the **L.U.C.I. (Logistics & Universal Command Interface)** engine, this system provides a seamless, voice-first experience for managing tasks, communications, documents, and much more.

## Table of Contents

1.  [Key Features](#key-features)
2.  [System Overview](#system-overview)
    *   [Core Functional Modules](#core-functional-modules)
    *   [Industry-Specific Modules](#industry-specific-modules)
3.  [L.U.C.I. Voice Assistant](#luci-voice-assistant)
    *   [Activation](#activation)
    *   [Voice Commands by Category](#voice-commands-by-category)
4.  [Core Modules in Detail](#core-modules-in-detail)
    *   [Dashboard (Panel de Control)](#1-dashboard-panel-de-control)
    *   [Agenda](#2-agenda)
    *   [Comunicaciones (Communications)](#3-comunicaciones-communications)
    *   [Documentos (Documents)](#4-documentos-documents)
    *   [Contactos (Contacts)](#5-contactos-contacts)
    *   [Tareas (Tasks)](#6-tareas-tasks)
    *   [Finanzas (Finance)](#7-finanzas-finance)
    *   [Centro de IA (AI Center)](#8-centro-de-ia-ai-center)
5.  [Setup & Configuration](#setup--configuration)
    *   [API Integrations](#api-integrations)
6.  [Keyboard Shortcuts](#keyboard-shortcuts)
7.  [Responsive Design](#responsive-design)
8.  [Getting Started](#getting-started)

---

## Key Features

-   **Voice-First Interface**: Control the entire application using over 200 voice commands with L.U.C.I., featuring real-time speech recognition and feedback.
-   **Multi-Language Support**: Fully translated interface and voice commands in 5 languages:
    *   🇪🇸 Spanish (Español)
    *   🇺🇸 English
    *   🇮🇹 Italian (Italiano)
    *   🇵🇹 Portuguese (Português)
    *   🇫🇷 French (Français)
-   **Adaptive Theme System**: Switch instantly between a sleek **Light Mode** and a professional **Dark Mode**. Your preference is saved locally.
-   **Modular Architecture**: A suite of powerful core modules for everyday executive tasks, complemented by specialized modules for 6 key industries.
-   **Fully Responsive**: A seamless experience across desktop, tablet, and mobile devices.

## System Overview

The AL-E system is built around a central command interface (L.U.C.I.) that integrates with a suite of functional and industry-specific modules.

### Core Functional Modules

These modules provide the foundational tools for any executive or professional.

1.  **Dashboard**: A master control panel for at-a-glance system status.
2.  **Agenda**: Advanced calendar and appointment management.
3.  **Comunicaciones**: Unified hub for chats and emails.
4.  **Documentos**: Secure document storage and management.
5.  **Contactos**: Comprehensive CRM for managing contacts.
6.  **Tareas**: Robust task and project management with Kanban boards.
7.  **Finanzas**: Financial overview, including income, expenses, and budgets.
8.  **Centro de IA**: A dedicated space to leverage generative AI for content creation and analysis.

### Industry-Specific Modules

AL-E is designed to be adapted for 6 key industries, providing specialized tools and workflows (Note: These modules are placeholders for future specialized implementation).

-   **Médico (Medical)**: Patient records, appointments, and teleconsultation.
-   **Legal (Legal)**: Case management, contract analysis, and jurisprudence search.
-   **Seguros (Insurance)**: Policy creation, claim management, and quotes.
-   **Contable (Accounting)**: Tax declarations, financial statements, and compliance.
-   **Hospital (Hospital)**: Bed management, nursing shifts, and critical alerts.
-   **Turismo Médico (Medical Tourism)**: Itinerary creation, booking, and patient coordination.

## L.U.C.I. Voice Assistant

L.U.C.I. is the heart of the AL-E system, enabling hands-free operation.

### Activation

-   Click the **microphone icon** in the header to activate the voice assistant UI.
-   The UI provides a waveform animation while listening and displays contextual command suggestions based on the active module.

### Voice Commands by Category

Below is a selection of available commands. For a full list, refer to the `src/lib/voice-utils.js` file.

| Category             | Spanish Example                            | English Example                     |
| -------------------- | ------------------------------------------ | ----------------------------------- |
| **Navigation**       | "Abrir agenda"                             | "Open agenda"                       |
|                      | "Ir al panel de control"                   | "Go to dashboard"                   |
|                      | "Mostrar mis tareas"                       | "Show my tasks"                     |
|                      | "Abrir módulo médico"                      | "Open medical module"               |
| **System**           | "Detener" / "Silencio"                     | "Stop" / "Silence"                  |
| **Medical Actions**  | "Registrar signos vitales"                 | "Record vital signs"                |
|                      | "Generar receta médica"                    | "Generate prescription"             |
| **Legal Actions**    | "Crear un nuevo contrato"                  | "Create a new contract"             |
|                      | "Analizar riesgos del caso"                | "Analyze case risks"                |
| **Insurance Actions**| "Generar cotización de seguro"             | "Generate insurance quote"          |
| **Accounting Actions**| "Realizar declaración mensual"            | "Do monthly tax return"             |
| **Hospital Actions** | "Asignar cama a paciente"                  | "Assign bed to patient"             |
| **Tourism Actions**  | "Crear itinerario de viaje"                | "Create travel itinerary"           |

## Core Modules in Detail

### 1. Dashboard (Panel de Control)

The master view of your entire system.
-   **Quick Stats**: Total modules, active users, pending tasks, and upcoming appointments.
-   **System Health**: Real-time status indicators for all 6 industry modules.
-   **API Status**: Color-coded status (Green/Yellow/Red) for all third-party integrations.
-   **Quick Access**: One-click buttons to navigate to any module.
-   **Recent Activity & Notifications**: A log of recent system events and important alerts.

### 2. Agenda

Manage your schedule with precision.
-   **Multiple Views**: Switch between Day, Week, and Month views.
-   **Appointment Details**: Click any event to see a detailed panel with location, attendees, and notes.
-   **Event Filtering**: Filter appointments by type (e.g., Meeting, Video Call).
-   **AI Context Panel**: Get smart suggestions related to your upcoming appointments.

### 3. Comunicaciones (Communications)

A unified inbox for all your conversations.
-   **Multi-Channel**: Manages both WhatsApp-style chats and emails in one list.
-   **Live Status**: See which contacts are online or offline.
-   **AI-Powered Responses**: Use the AI Action Panel to change the tone of a message or draft a quick reply.
-   **Rich Media**: Supports file attachments and audio messages.

### 4. Documentos (Documents)

Your secure, intelligent file cabinet.
-   **Grid & List Views**: Organize and view your files the way you prefer.
-   **Smart Folders**: Automatically categorizes documents into Contracts, Reports, Invoices, etc.
-   **Instant Preview**: Click a document to open a detailed preview panel without leaving the module.
-   **AI Analysis**: Use the AI panel to summarize, translate, or find key information within a document.

### 5. Contactos (Contacts)

A powerful, integrated CRM.
-   **Detailed Profiles**: View complete contact information, social media links, tags, and quick notes.
-   **Tabbed Interface**: Easily switch between a contact's profile, interaction history, associated files, and sales opportunities.
-   **Smart Filtering**: Quickly filter your contact list by status (Client, Prospect, VIP).
-   **AI Insights**: Get AI-powered suggestions for your next interaction with a contact.

### 6. Tareas (Tasks)

A flexible project and task management tool.
-   **Kanban Board**: Drag and drop tasks between "To Do", "In Progress", and "Done" columns.
-   **List View**: For a more traditional, linear view of your tasks.
-   **Priority System**: Assign High, Medium, or Low priority to tasks, indicated by color-coded badges.
-   **Pomodoro Timer**: A built-in timer to help you focus on tasks and manage breaks effectively.

### 7. Finanzas (Finance)

A clear overview of your financial health.
-   **Dashboard Widgets**: See net balance, income vs. expenses, and budget tracking at a glance.
-   **Transaction List**: A detailed log of all recent financial activities, filterable and searchable.
-   **Visual Charts**: AI-generated charts for income distribution and cash flow analysis.
-   **Budget Tracking**: Set budgets for different categories and monitor spending in real-time.

### 8. Centro de IA (AI Center)

A creative sandbox for leveraging generative AI.
-   **Chat Interface**: Interact with L.U.C.I. in a conversational format to ask questions or give complex instructions.
-   **Content Generators**: Dedicated forms for generating specific content types like presentations, reports, or brainstorming ideas.
-   **Shortcuts & History**: Quickly access frequently used prompts and review past conversations.

## Setup & Configuration

Navigate to the **Configuración (Settings)** module to manage your application.

-   **Profile**: Update your name, role, and avatar.
-   **Appearance**: Switch between Light/Dark themes and select one of the 5 supported languages.
-   **Notifications**: Configure how you receive alerts (Email, SMS, Push).
-   **API Integrations**: See the live status of all connected third-party services.
-   **Voice Assistant**: Adjust microphone sensitivity and view available commands.
-   **Security & Data**: Manage your password, 2FA, and data (export, delete).

### API Integrations

The system is designed to integrate with various third-party services. To enable them, you must provide the necessary API keys and credentials in your environment file (`.env.local`).

| Service             | Environment Variable       | Status      | Notes                                                              |
| ------------------- | -------------------------- | ----------- | ------------------------------------------------------------------ |
| **Supabase**        | `VITE_SUPABASE_URL`        | **Pending** | For database, auth, and storage. Requires project setup.           |
| **Google Calendar** | `VITE_GOOGLE_CLIENT_ID`    | Connected   | Requires OAuth 2.0 setup in Google Cloud Console.                  |
| **OpenAI**          | `VITE_OPENAI_API_KEY`      | Connected   | **Must be proxied through a secure backend (e.g., Supabase function).**|
| **Twilio (SMS)**    | `VITE_TWILIO_ACCOUNT_SID`  | Pending     | **Must be proxied through a secure backend.**                      |
| **Zoom**            | `VITE_ZOOM_API_KEY`        | Disconnected| Requires app setup in Zoom Marketplace.                            |

## Keyboard Shortcuts

Boost your productivity with these keyboard shortcuts:

| Shortcut          | Action                              |
| ----------------- | ----------------------------------- |
| `Ctrl` + `K`      | Focus the main search bar.          |
| `Ctrl` + `B`      | Toggle the main sidebar (collapse/expand). |
| `Alt` + `V`       | Activate the L.U.C.I. Voice Assistant. |
| `Alt` + `T`       | Toggle the Light/Dark theme.        |
| `Alt` + `N`       | Create a new item (task, contact, etc.) in the active module. |
| `Esc`             | Close any open modal or dialog.     |

## Responsive Design

The AL-E system is built with a mobile-first approach and is fully responsive.
-   **Mobile**: The sidebar is hidden, accessible via a hamburger menu. Modals and panels often appear as bottom sheets for easier reachability.
-   **Tablet**: A collapsed sidebar is shown, providing more screen real-estate while keeping navigation accessible.
-   **Desktop**: The full experience with an expandable sidebar and multi-column layouts.

## Getting Started

1.  **Install Dependencies**:
    