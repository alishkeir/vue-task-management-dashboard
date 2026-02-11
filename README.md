# VUE Technical Assessment

A modern and interactive task management interface. This projects is to demonstrate  a scalable architecture using the **Common Component** pattern and centralized state management using **Pinia**


## Setup Instructions

 **Install dependencies:**

> `npm install`


 **Install dependencies:**
 > `npm run dev`


## Architecture Overview

### Folder Structure:

 - `/src/components/common`: Contains all the highly re-usable components (`Button`,`CardBadge`,`Loader`,`Select`,`TextInputField`). There components are context-aware only via props.
 - `src/components/tasks`: Contains all the domain-specific components (`TaskCard`, `TaskList`) that handle task-specific logic.
 - `src/stores`: Global/Centralized state management using Pinia.
 - `src/types`: TypeScript definitions following the `TType` and `IInterface` conventions to strict type safety.
 - `src/utils`: Helpers/Utils functions for formatting and transforming data/values.

### State Management:
Pinia was used wit the Setup Store syntax to initialize it in the Vue app.

 - **State**: Holds the `tasks`, `statuses` and `isLoading` status.
 - **Actions**: Handles data fetching and status updates. Ensuring business-logic stays out of the `.vue` files, making the component easier to scale, maintain and test.

### Key Patterns:

 - **Props/Emits:** Strict one-way data flow/binding. Components like `Select` use the default `modelValue` to stay in sync with the parent **In this case it's only the Dashboard**.
 - **Computed Filtering:** the dashboard uses a single computed property to handle multi-criteria filtering (status and search term) simultaneously.
 - **Helper Utilities:** String manipulation (like replacing `in_progress` to **In Progress**) into `taskHelpers.ts` to ensure UI consistency.

### Trade-offs and Decisions:

 - **Prioritized Developer Experience and Type Safety:** By using the `IInterface` and `TType` naming convention to make the code self-documenting.
 - **Persistence:** Data is currently held in the browser memory. In a production app I would instead implement Local Storage sync or an API integration.

### Scalability (10,000 Tasks and/or WebSockets):
In order to handle thousands of tasks with real-time updates:

 1. **Virtual Scrolling or Pagination:** I would implement a virtual list or pagination so that only specific number of tasks (10-20 max) are visible and rendered into the DOM, preventing high memory usage and browser lag.
 2. **WebWorkers:** Implement the heavy filtering and searching logic into WebWorkers to keep the main UI responsive and minimal.
 3. **Patch Updates:** Instead of keep fetching the whole list via WebSockets on updating any task, I would broadcast **delta updates** (eg. `{ id: 1, action: 'update', patch: { status: 'in_progress' } }` and update the Pinia store directly, to minimize the need of updating the whole store again.
 4. **Debounce Effect:** In case we need "search while typing" functionality, I would debounce the search inputs to prevent re-computation on each keystroke.

## Technical Leadership:

**The Challenge:** I led the migration of a legacy WordPress website into a modern Vue frontend while keeping the backend as it is on WordPress. The primary constraint was the deadline, it was supposed to be done by the end of my B2B contract, and it has a complex Amazon Pay integration.

**The Problem:** Integrating Amazon Payment on the frontend using SDK is completely different from the standard WordPress Ecommerce Amazon Payment plugin, since the frontend should initialize amazon pay as well, same to the backend, but there has to be a centralized place to connect both initializations together in order for the data to be valid.

**The Architecture:** I built a **Node.js** middleware/service to act as the bridge connection between the frontend and the backend. The service manages the generation and signing the public and private keys required by amazon, and sending them to the backend after initialization.

### The "Flow":

 1. The Vue frontend requests a session from the Node service.
 2. The Node service generates a new public and private key, signs them and sends them to the backend.
 3. The WordPress backend will use that signature to initialize Amazon Payment process with all the credentials and data related to the checkout items (cart) and the user.
 4. The WP backend sends the data back to the Node service
 5. The Node service validates everything with the signature and sends the response to the frontend
 6. The Vue frontend  will use the signed JSON response with the Amazon SDK and initialize the frontend instance and redirects the user into the Amazon payment page (`anmazon.com`).

**The Outcome:** I successfully bypassed the limitation of the legacy system and ensured a secure checkout, and the project was successfully met the deadline. The "only" small bad part of it was the latency of the Node process, since it was hosted on their own server, which will cause issues for people that are using their website from another country (eg. they have an online store in the US, Mexico AND Brazil but their server is based on Germany).

If I were to do it differently, I would have explored an edge function(s) (like Netlify) for the Node service to reduce the latency further and to try and ship it into multiple server locations. Or I could have made a whole new backend for the online shopping process while keeping the new backend in sync with the WP one (since they use it for analytics and many WP-based features.