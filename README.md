# Share Me

Share Me is a React Native Expo application designed to facilitate file sharing. It allows users to upload files to a server and generate shareable download links. The app utilizes the File.io API for file uploads and incorporates animations using React Native Moti and Lottie Animation for loading animations.

![ShareME](https://github.com/sami3898/shareMe/assets/32996863/9a2b2543-7c15-4fa1-9059-0979e326e1c2)


## Features

- 📁 Upload images, videos, or files up to 2 GB in size.
- 📲 Copy or share download links directly from the app.

## How to Run the App

1. Clone this repository.
2. Create an account on [File.io](https://www.file.io/signup) to acquire an auth token.
3. Create a `.env` file in the root directory of the project.
4. Add the following line to the `.env` file, replacing `YOUR_API_KEY` with your actual File.io API key:
`AUTH_TOKEN=YOUR_API_KEY`
5. Install dependencies using `npm install` or `yarn install`.
6. Start the application using `npx expo start`.
7. Follow the instructions in the Expo development server to run the app on your desired platform.
8. Start sharing files seamlessly!

## Contributing
Contributions to ShareMe are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push the branch: `git push origin feature/my-feature`
6. Submit a pull request

## License
This project is licensed under the [MIT License](LICENSE).
