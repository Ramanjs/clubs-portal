# Deploying the Student Event Management Application

The note describes how the student application system was released and deployed for use. As it is a web application, it was deployed on a server. This note explains the main steps in this process – it briefly discusses a couple of options for executing the step, and then the actual option chosen.
Recall that the FE of the application is in HTML/JS (React), the backend in NodeJS (TypeScript), and the DB used is MongoDB. For this application the FE code was on one GitHub repository and the BE code was on another repository.

## Packaging and Release

The application was ready for release after its requirements were implemented, the application had passed all the tests in the scripts, and the system test plan had been executed satisfactorily. Most of this testing was done when the application was still hosted on the local host, i.e. the machine of the developers.
For packaging the application for hosting, we need to send the FE to the server separately, and BE code
separately. For packaging and transmitting the package, we considered the following options:
1. Can combine all the files needed at the server in one file and then send it to the server, or
2. We can clone the folder on the server.

We finally chose the second optoin, due to these reasons:
1. The codebase was made public so there was no need to do additional git configuration at the server and create and and SSH keys to clone the private repository with one of the contributors account.
2. Updating the codebase/project is simple by using a the git pull/merge command from the upstream as compared to packaging and uploading the new version to server for each update.

We followed the following steps for packaging and transmitting the package – we will describe the step conceptually, and then describe the specific commands we gave. We will also explain how dependencies are addressed in the target machine.

## Installation
In installation, the package received at the target machine has to be installed and properly configured for use. It will also involve ensuring that the dependencies are also installed. It may also require configuring the target machine properly.
We considered the following options for installing: …. 1 …. 2 …. Finally we chose N due to these reasons:

1. First we need to install npm and node on the server. For this we choose to install nvm because as quoted from the npm website: " We strongly recommend using a Node version manager like nvm to install Node.js and npm. We do not recommend using a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally."
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install node
```

2. Then we clone both the frontend and backend repositories onto the server and build the projects by running the respective build commands (`npm run build`)

```
git clone https://github.com/Ramanjs/clubs-portal.git
git clone https://github.com/Ramanjs/clubs-portal-frontend.git
cd clubs-portal
npm run build
```

3. Install a web server. We chose nginx for no particular reason. Just that it has a relatively simpler configuration system, can be used as a load balancer (reverse proxy) and  in terms of serving static content, NGINX is faster than Apache because it caches the static files to make them available whenever requested.
```
sudo apt install nginx
```

4. Configure Nginx to serve the static frontend files.
```
sudo nano /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com www.example.com;

    # Define the root directory for your static files
    root /home/iiitd/clubs-portal-frontend/dist;

    # Configure access to static files
    location / {
        try_files $uri $uri/ =404;
    }
}
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

5. Install pm2 package. This is used to start the backend server as a process and monitor its health and possibly restart it automatically if it goes down.
```
npm install pm2 -g
```

## Activation

We followed the following steps for installing the package – we will describe the step conceptually, and then describe the specific commands we gave:

```
pm2 start app.js
pm2 restart app.js
sudo systemctl reload nginx
```


sudo apt install npm
