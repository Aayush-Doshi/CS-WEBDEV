# Student Grievance Management System

A **DSA-integrated web project** that allows students to submit grievances digitally and provides administrators with tools to manage and analyze them efficiently.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [DSA Integration](#dsa-integration)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributors](#contributors)
- [Getting Started](#getting-started)

## Overview

This project is built as part of a Data Structures & Algorithms (DSA) course to demonstrate the application of key data structures in real-world systems. It is a full-stack solution with user authentication, complaint categorization, admin dashboard, and live grievance tracking.

## Features

### Student Interface

- Submit grievances under predefined categories.
- Automatic suggestions based on past complaints.
- Track the status of submitted grievances.
- Institute-email-based registration.

### Administrator Interface

- View, filter, and manage all student complaints.
- Refresh to load the latest submissions.
- Analyze grievances based on urgency and category.

## DSA Integration

The project leverages core data structures and algorithms in the backend for efficient grievance processing:

- **HashMap**: Used to categorize grievances based on predefined keywords, allowing quick filtering by category.
- **Priority Queue**: Urgent complaints are pushed into a priority queue and displayed at the top for immediate attention.
- **Sorting & Filtering**: Complaints are sorted by urgency, date, and category using custom comparator logic.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Security**: JWT Authentication, Bcrypt Password Hashing
- **Data Structures**: HashMap, Priority Queue, Sorting Algorithms

## Usage

### Student Flow

1. Visit the homepage and register as the "Student" role.
2. Register with your **@collegestudent.edu** email address.
3. Log in and submit your grievance:
   - Select a category (e.g., Hostel, Academic, Mess).
   - Enter the problem description.
   - Optionally upload supporting documents.
   - View 5–6 similar suggested complaints.
4. View and track the status of your submitted grievances on your dashboard.

### Admin/Officer Flow

1. Visit the homepage and register as the "Officer" role.
2. Register with your **@collegeadmin.edu** email (admin verification required).
3. Log in to the admin dashboard:
   - View all submitted grievances.
   - Filter grievances using categories.
   - Refreshing the dashboard loads new complaints.
   - Use graphical analysis of grievance statuses (pending, resolved, etc.).

## Contributors

- **Aayush Doshi** – 202452301
- **Sujal Shah** – 202452330
- **Dhrumil Vaghani** – 202451165

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB installed locally

### Installation

```bash
git clone https://github.com/Aayush-Doshi/CS-WEBDEV.git
cd CS-WEBDEV/Backend
npm install
cd ../Frontend
npm install
