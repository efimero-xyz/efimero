# Encrypted End-to-End Real-Time Chat Application

This application provides a secure, end-to-end encrypted chat platform where users can create rooms with ephemeral messages, ensuring privacy and security by encrypting all communication. No data is stored on servers, and messages are only visible to users with the unique encryption key.

## Features

- **End-to-End Encryption**: All messages sent and received are encrypted to ensure privacy.
- **Room Creation**: Users can create chat rooms with a unique encryption key embedded in the URL hash (#) for secure access.
- **Real-Time Communication**: Utilizes WebSocket Secure (WSS) to establish real-time communication between connected users.
- **No Server Storage**: Messages are ephemeral and not stored on any servers, ensuring data confidentiality.
- **Customizable WSS Servers**: Users can choose from a list of provided WSS servers or use their own for communication.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ggenzone/efimero.git
   ```

2. Install dependencies:

   ```bash
   cd encrypted-realtime-chat
   npm install
   ```

### Usage

1. Run the development server:

   ```bash
   npm start
   ```

2. Access the application via `http://localhost:3000` in your browser.

## Usage Guide

1. Open the application in a browser.
2. Create a new chat room.
3. Share the unique URL generated with others who should have access to the chat room.
4. Enter the room by clicking the shared link. Users with the encryption key will be able to read and send messages.

## Configuration

- **WebSocket Secure (WSS) Servers**: Edit the configuration file to add custom WSS servers or choose from the provided list.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- **Excalidraw Project Inspiration**: We are grateful to the Excalidraw project for inspiring the implementation of end-to-end encryption (EE2E) in our chat application. Their approach and dedication to secure communication served as a valuable inspiration.

- **Shadcn UI Library**: Special thanks to Shadcn for their incredible UI library contributions that have significantly enhanced the visual aspects and user experience of our application. Their UI components played a pivotal role in shaping the interface and making it user-friendly.


