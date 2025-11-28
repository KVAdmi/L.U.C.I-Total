
# AL-E System Setup Guide

This document provides step-by-step instructions for setting up your AL-E System development environment and configuring all necessary third-party API integrations.

---

## Table of Contents

1.  [Prerequisites](#1-prerequisites)
2.  [Initial Project Setup](#2-initial-project-setup)
3.  [Environment Variables (`.env.local`)](#3-environment-variables-envlocal)
4.  [Supabase Integration](#4-supabase-integration)
    *   [Supabase Project Creation](#supabase-project-creation)
    *   [Database Schema Setup](#database-schema-setup)
    *   [File Storage Setup](#file-storage-setup)
    *   [Row-Level Security (RLS) Configuration](#row-level-security-rls-configuration)
5.  [Google Calendar API](#5-google-calendar-api)
6.  [Outlook Calendar API](#6-outlook-calendar-api)
7.  [Zoom API](#7-zoom-api)
8.  [Google Meet API](#8-google-meet-api)
9.  [Twilio API (SMS Reminders)](#9-twilio-api-sms-reminders)
10. [WhatsApp Cloud API](#10-whatsapp-cloud-api)
11. [Google Maps API (for Waze/Maps functionality)](#11-google-maps-api-for-wazemaps-functionality)
12. [OpenAI API (AI Contextual)](#12-openai-api-ai-contextual)
13. [Text-to-Speech (TTS) & Speech-to-Text (STT)](#13-text-to-speech-tts--speech-to-text-stt)

---

## 1. Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 20.x (LTS recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm**: Node Package Manager, usually installed with Node.js.

## 2. Initial Project Setup

1.  **Clone the repository** (if applicable) or ensure you have the project files.
2.  **Navigate to the project directory** in your terminal.
3.  **Install dependencies**:
    