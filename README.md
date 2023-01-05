# gym-qr-control
Gym access control software. 

![Screenshot from 2023-01-04 19-48-48](https://user-images.githubusercontent.com/108197820/210684492-5a45b69f-179c-4a8f-b790-b098f615f06c.png)


## Description 
This is an OS version of a software that I wrote for gym customers control.

It provides CRUD functionalites for users (Create, Read, Update, Delete), as well as updating memberships.
It also provides a QR generator and main page for reading QR. Also, a button to send this QR code automatically via a default outlook email.


![Screenshot from 2023-01-04 19-50-05](https://user-images.githubusercontent.com/108197820/210685114-70196459-e009-4e1c-bbe2-baa75ccf2b3f.png)
   
   
Backend can be found at: https://github.com/luigyy/gym-qr-control-backend 
and live API at https://gym-qr-control-backend.vercel.app/

_Backend is running on Vercel, which blocks SMTP by default,
so send QR via email won't work on the demo page, but works perfectly when run locally_

