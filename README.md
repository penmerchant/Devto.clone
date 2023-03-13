# Devto.clone
A clone of site known as devto which is a programming blog for every tech enthusiast. Made for learning and having fun. 
This site consists of several pages and each of them has it owns functionality

# Tech
- Client - React
- Backend - Express
- Database - MongoDB
- ORM - Mongoose
- Image hosting - Cloudinary
- Code formatting - Eslint

# Features

- Home page
- Authentication page
- Create post page
- Edit post page
- Delete post page
- Comment section
- Edit comment
- Delete comment
- Profile page
- Edit profile
- Reading list page (archived post)
- Search post 
- Search post by tags

# How to set up locally

**Clone**

clone or fork the repo https://github.com/penmerchant/Devto.clone.git .

**Setup**

Navigate to the repo subdirectories ```/server``` && ```/client``` and install all of the depedencies with ```npm``` or ```yarn```.
```shell
$ cd /server && npm install
$ cd /client && npm install

```

**Assigning values to .env**

There are 2 .env files in this repo that are located in ```/client``` and ```/server```

***client .env***

```env
REACT_APP_API_URL=your backend api url

```

***server .env***

You need to sign up/sign in to your cloudinary account first to do this step. 

```env
PORT=your own port
MONGODB=mongodb atlas url or self-setup mongodb
ACCESS_TOKEN=base64 encryption
CORS_ORIGIN=your client-side url
CLOUD_NAME=your cloud name
CLOUDINARY_API_KEY= cloudinary api key
CLOUDINARY_API_SECRET= cloudinary api secret
```


              
    

            
